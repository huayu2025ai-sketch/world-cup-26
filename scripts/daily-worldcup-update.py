#!/usr/bin/env python3
"""Daily World Cup sync coordinator.

This script:
1. Detects pending finished matches.
2. Loads verified results from a configurable JSON feed.
3. Applies match, standings, and stats updates.

Supported result feed sources, in order:
- WORLD_CUP_RESULTS_JSON: inline JSON string
- WORLD_CUP_RESULTS_URL: remote JSON endpoint
- WORLD_CUP_RESULTS_FILE: local JSON file path

Expected feed format:
{
  "matches": [
    {
      "matchId": 59,
      "homeTeam": "土耳其",
      "awayTeam": "美国",
      "group": "D",
      "homeScore": 3,
      "awayScore": 2,
      "goalScorers": [
        {"player": "阿尔达·居莱尔", "team": "土耳其", "minute": "10'", "type": "goal"}
      ],
      "assists": [
        {"player": "X", "team": "Y", "minute": "10'", "count": 1}
      ],
      "standings": [
        {"name": "...", "code": "...", "played": 3, "won": 2, "draw": 1, "lost": 0, "goalsFor": 7, "goalsAgainst": 3, "goalDiff": 4, "points": 7}
      ]
    }
  ]
}
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any
from urllib.request import urlopen

PROJECT_ROOT = Path(__file__).resolve().parent.parent


def run_command(cmd: list[str]) -> None:
    subprocess.run(cmd, cwd=PROJECT_ROOT, check=True)


def load_pending_matches() -> list[dict[str, Any]]:
    result = subprocess.run(
        [sys.executable, "scripts/check-pending-matches.py"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )

    if result.returncode == 0:
        return []

    pending: list[dict[str, Any]] = []
    for line in result.stdout.splitlines():
        if line.startswith("MATCH:"):
            parts = line.removeprefix("MATCH:").split("|")
            if len(parts) >= 4:
                match_str = parts[1]
                vs_idx = match_str.find(" vs ")
                home = match_str[:vs_idx].strip() if vs_idx != -1 else ""
                away = match_str[vs_idx + 4:].strip() if vs_idx != -1 else ""
                pending.append({
                    "id": parts[0],
                    "home": home,
                    "away": away,
                    "group": parts[2],
                    "bjTime": parts[3],
                })
    return pending


def load_results_feed() -> list[dict[str, Any]]:
    inline_json = os.environ.get("WORLD_CUP_RESULTS_JSON")
    if inline_json:
        payload = json.loads(inline_json)
        return normalize_feed(payload)

    source_url = os.environ.get("WORLD_CUP_RESULTS_URL")
    if source_url:
        with urlopen(source_url, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
            return normalize_feed(payload)

    source_file = os.environ.get("WORLD_CUP_RESULTS_FILE")
    if not source_file:
        source_file = str(PROJECT_ROOT / ".match-results.json")

    file_path = Path(source_file)
    if file_path.exists():
        payload = json.loads(file_path.read_text(encoding="utf-8"))
        return normalize_feed(payload)

    return []


def normalize_feed(payload: Any) -> list[dict[str, Any]]:
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if isinstance(payload, dict):
        if isinstance(payload.get("matches"), list):
            return [item for item in payload["matches"] if isinstance(item, dict)]
        normalized = []
        for key, value in payload.items():
            if isinstance(value, dict):
                item = dict(value)
                item.setdefault("matchId", int(key) if str(key).isdigit() else key)
                normalized.append(item)
        return normalized
    return []


def find_result(feed: list[dict[str, Any]], match_id: int) -> dict[str, Any] | None:
    for item in feed:
        if int(item.get("matchId", -1)) == match_id:
            return item
    return None


def normalize_goals(goal_scorers: list[dict[str, Any]] | None) -> list[dict[str, Any]]:
    if not goal_scorers:
        return []
    normalized: list[dict[str, Any]] = []
    for goal in goal_scorers:
        if not isinstance(goal, dict):
            continue
        count = int(goal.get("count", 1))
        base = {
            "player": goal.get("player", ""),
            "team": goal.get("team", ""),
            "minute": goal.get("minute", ""),
            "type": goal.get("type", "goal"),
        }
        if goal.get("chineseName"):
            base["chineseName"] = goal["chineseName"]
        if goal.get("teamCode"):
            base["teamCode"] = goal["teamCode"]
        for _ in range(max(count, 1)):
            normalized.append(base)
    return normalized


def main() -> int:
    pending = load_pending_matches()
    if not pending:
        print("NO_PENDING_MATCHES")
        return 0

    feed = load_results_feed()
    if not feed:
        print("No result feed configured; nothing to update.")
        return 0

    updated = 0
    for match in pending:
        result = find_result(feed, int(match["id"]))
        if not result:
            continue

        home_score = result.get("homeScore")
        away_score = result.get("awayScore")
        if home_score is None or away_score is None:
            continue

        cmd = [
            sys.executable,
            "scripts/update-match-results.py",
            "--match-id", str(match["id"]),
            "--home-score", str(home_score),
            "--away-score", str(away_score),
            "--home-team", str(result.get("homeTeam", match["home"])),
            "--away-team", str(result.get("awayTeam", match["away"])),
            "--group", str(result.get("group", match.get("group", ""))),
        ]

        goal_scorers = normalize_goals(result.get("goalScorers") or result.get("goals"))
        if goal_scorers:
            cmd.extend(["--goal-scorers-json", json.dumps(goal_scorers, ensure_ascii=False)])

        standings = result.get("standings")
        if standings:
            cmd.extend(["--standings-json", json.dumps(standings, ensure_ascii=False)])

        run_command(cmd)

        assists = result.get("assists")
        if assists:
            assist_cmd = [
                sys.executable,
                "scripts/update-player-stats.py",
                "--match-id", str(match["id"]),
                "--home-team", str(result.get("homeTeam", match["home"])),
                "--away-team", str(result.get("awayTeam", match["away"])),
                "--home-score", str(home_score),
                "--away-score", str(away_score),
                "--goals", json.dumps(goal_scorers, ensure_ascii=False),
                "--assists", json.dumps(assists, ensure_ascii=False),
            ]
        else:
            assist_cmd = [
                sys.executable,
                "scripts/update-player-stats.py",
                "--match-id", str(match["id"]),
                "--home-team", str(result.get("homeTeam", match["home"])),
                "--away-team", str(result.get("awayTeam", match["away"])),
                "--home-score", str(home_score),
                "--away-score", str(away_score),
                "--goals", json.dumps(goal_scorers, ensure_ascii=False),
            ]

        if goal_scorers or assists:
            run_command(assist_cmd)

        updated += 1

    print(f"UPDATED_MATCHES:{updated}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
