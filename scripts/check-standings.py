#!/usr/bin/env python3
"""Check if standings match the number of played games in scheduleData.ts"""
import re
from pathlib import Path
from collections import defaultdict

schedule_path = Path("constants/scheduleData.ts")
with open(schedule_path, "r", encoding="utf-8") as f:
    schedule = f.read()

data_path = Path("constants/worldcupData.ts")
with open(data_path, "r", encoding="utf-8") as f:
    data = f.read()

matches = []
for m in re.finditer(
    r'\{\s*id:\s*(\d+)\s*,\s*stage:\s*"分组赛"\s*,\s*group:\s*"([^"]+)"\s*,\s*date:\s*"([^"]+)"\s*,\s*localTime:\s*"([^"]+)"\s*,\s*home:\s*"([^"]+)"\s*,\s*away:\s*"([^"]+)"[^}]*homeScore:\s*(\d+)\s*,\s*awayScore:\s*(\d+)',
    schedule
):
    matches.append({
        "id": int(m.group(1)),
        "group": m.group(2),
        "date": m.group(3),
        "home": m.group(5),
        "away": m.group(6),
        "homeScore": int(m.group(7)),
        "awayScore": int(m.group(8))
    })

group_matches = defaultdict(list)
for m in matches:
    group_matches[m["group"]].append(m)

issues = []
for group in sorted(group_matches.keys()):
    games = group_matches[group]
    total_games = len(games)
    
    pattern = r'id:\s*"' + group + r'"[\s\S]*?standings:\s*\[([\s\S]*?)\]'
    match = re.search(pattern, data)
    if match:
        standings_text = match.group(1)
        played_sum = sum(int(p) for p in re.findall(r'played:\s*(\d+)', standings_text))
        expected_played = total_games * 2
        
        status = "OK" if played_sum == expected_played else "ISSUE"
        print(f"{status} 组 {group}: {total_games} 场比赛, standings played 总和={played_sum}, 期望={expected_played}")
        if played_sum != expected_played:
            issues.append(group)
            for g in games:
                print(f"    - id {g['id']}: {g['home']} {g['homeScore']}-{g['awayScore']} {g['away']} ({g['date']})")
    else:
        print(f"ISSUE 组 {group}: standings 未找到")
        issues.append(group)

print(f"\n{'='*50}")
if issues:
    print(f"发现问题组: {issues}")
else:
    print("所有组 standings 数据一致!")
