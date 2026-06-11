#!/usr/bin/env python3
"""
World Cup Match Result Updater
自动更新比赛比分和小组排名

Usage: python3 update-match-results.py --match-id=1 --home-score=2 --away-score=1
"""

import sys
import json
import re
import argparse
from datetime import datetime, timezone, timedelta
from pathlib import Path

# 北京时区
BJ_TIMEZONE = timezone(timedelta(hours=8))

PROJECT_ROOT = Path(__file__).parent.parent

def get_beijing_time():
    return datetime.now(BJ_TIMEZONE)

def load_state():
    """加载状态文件"""
    state_file = PROJECT_ROOT / ".match-results.json"
    if state_file.exists():
        with open(state_file, "r") as f:
            return json.load(f)
    return {}

def save_state(state):
    """保存状态文件"""
    state_file = PROJECT_ROOT / ".match-results.json"
    with open(state_file, "w") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)

def parse_beijing_time(bt_str, year=None):
    """解析北京时间字符串"""
    now = get_beijing_time()
    if year is None:
        year = now.year
    
    parts = bt_str.strip().split()
    if len(parts) != 2:
        return None
    
    date_part, time_part = parts[0], parts[1]
    month_day = date_part.split("-")
    if len(month_day) != 2:
        return None
    
    month, day = int(month_day[0]), int(month_day[1])
    hour_min = time_part.split(":")
    if len(hour_min) != 2:
        return None
    
    hour, minute = int(hour_min[0]), int(hour_min[1])
    
    # 跨年处理
    if month < now.month:
        year = year + 1
    
    return datetime(year, month, day, hour, minute, tzinfo=BJ_TIMEZONE)

def update_schedule_with_score(match_id, home_score, away_score):
    """更新 scheduleData.ts 中对应比赛的比分"""
    schedule_path = PROJECT_ROOT / "constants" / "scheduleData.ts"

    with open(schedule_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 查找对应的比赛行并更新
    # 格式: { id: 1, stage: "...", group: "...", ..., homeScore: N, awayScore: M }
    # 使用更灵活的 pattern：先找到 id 行，再找 homeScore/awayScore 是否已存在
    id_pattern = r'(\{\s*id:\s*' + str(match_id) + r'\s*,[^}]+\})'

    match = re.search(id_pattern, content)
    if not match:
        print(f"ERROR: Match {match_id} not found in scheduleData.ts")
        return False

    match_block = match.group(1)

    # 检查是否已有比分
    if "homeScore" in match_block:
        print(f"Match {match_id} already has score, skipping update")
        return False

    # 在 match_block 末尾（`},` 之前）插入 homeScore 和 awayScore
    # 找到最后一个 `,` 在 `},` 之前的位置
    insert_pos = match_block.rfind(',')
    if insert_pos == -1:
        print(f"ERROR: Could not find comma in match block")
        return False

    new_fields = f"\n  homeScore: {home_score},\n  awayScore: {away_score}"
    new_block = match_block[:insert_pos] + new_fields + match_block[insert_pos:]

    new_content = content.replace(match_block, new_block)

    with open(schedule_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True

def update_worldcup_data_for_match(match_id, home_team, away_team, home_score, away_score, group):
    """更新 worldcupData.ts 中的小组排名"""
    if not group:
        print(f"Match {match_id} has no group, skipping worldcupData update")
        return True

    data_path = PROJECT_ROOT / "constants" / "worldcupData.ts"

    with open(data_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 找到对应小组的 standings 块
    # 格式: id: "A", ... standings: [{ name: ..., code: ..., played: N, ... }, ...]
    group_pattern = r'(id:\s*"' + group + r'"[\s\S]*?standings:\s*)(\[[\s\S]*?)(\])'
    match = re.search(group_pattern, content)

    if not match:
        print(f"Group {group} standings not found in worldcupData.ts")
        return False

    standings_start = match.start(1)
    standings_content = match.group(2)

    # 解析现有 standings
    standing_entries = re.findall(r'\{([^}]+)\}', standings_content)
    standings = []
    for entry in standing_entries:
        s = {}
        for field in ['name', 'code', 'played', 'won', 'draw', 'lost', 'goalsFor', 'goalsAgainst', 'goalDiff', 'points']:
            m = re.search(field + r':\s*([^,}]+)', entry)
            if m:
                val = m.group(1).strip()
                s[field] = int(val) if field != 'name' and field != 'code' else val
        if s.get('code'):
            standings.append(s)

    # 找到主队和客队的 code
    team_code_map = {}
    for s in standings:
        team_code_map[s['name']] = s['code']

    # 简化：根据名字找 code（精确匹配优先）
    home_code = None
    away_code = None
    for s in standings:
        if home_team in s['name'] or s['name'] in home_team:
            home_code = s['code']
        if away_team in s['name'] or s['name'] in away_team:
            away_code = s['code']

    if not home_code or not away_code:
        print(f"Could not find team codes for {home_team}/{away_team} in group {group}")
        return False

    # 更新积分
    for s in standings:
        if s['code'] == home_code:
            s['played'] += 1
            s['goalsFor'] += home_score
            s['goalsAgainst'] += away_score
            if home_score > away_score:
                s['won'] += 1
                s['points'] += 3
            elif home_score == away_score:
                s['draw'] += 1
                s['points'] += 1
            else:
                s['lost'] += 1
        elif s['code'] == away_code:
            s['played'] += 1
            s['goalsFor'] += away_score
            s['goalsAgainst'] += home_score
            if away_score > home_score:
                s['won'] += 1
                s['points'] += 3
            elif away_score == home_score:
                s['draw'] += 1
                s['points'] += 1
            else:
                s['lost'] += 1

    # 计算 goalDiff
    for s in standings:
        s['goalDiff'] = s['goalsFor'] - s['goalsAgainst']

    # 按 points DESC, goalDiff DESC, goalsFor DESC 排序
    standings.sort(key=lambda x: (-x['points'], -x['goalDiff'], -x['goalsFor']))

    # 重建 standings 数组
    new_standings_parts = []
    for s in standings:
        new_standings_parts.append(
            '{ name: "' + s['name'] + '", code: "' + s['code'] + '", played: ' + str(s['played']) + ', won: ' + str(s['won']) + ', draw: ' + str(s['draw']) + ', lost: ' + str(s['lost']) + ', goalsFor: ' + str(s['goalsFor']) + ', goalsAgainst: ' + str(s['goalsAgainst']) + ', goalDiff: ' + str(s['goalDiff']) + ', points: ' + str(s['points']) + ' }'
        )
    new_standings_str = '[\n      ' + ',\n      '.join(new_standings_parts) + '\n    ]'

    # 替换旧 standings
    new_content = content[:match.start(2)] + new_standings_str + content[match.end(2):]

    with open(data_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Updated standings for group {group}: {home_team}({home_code}) {home_score}-{away_score} {away_team}({away_code})")
    return True

def add_group_overview_update(title, summary, changes):
    """在 worldcupData.ts 的 groupOverviewUpdates 中添加新记录"""
    data_path = PROJECT_ROOT / "constants" / "worldcupData.ts"
    
    with open(data_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    now = get_beijing_time()
    timestamp = now.strftime("%Y-%m-%dT%H:%M:%S+08:00")
    date_label = now.strftime("北京时间 %Y年%m月%d日 %H:%M")
    
    new_entry = f'''  {{
    updatedAt: "{timestamp}",
    updatedAtLabel: "{date_label}",
    title: "{title}",
    summary: "{summary}",
    changes: [
      {chr(10).join('      "' + c + '",' for c in changes)}
    ]
  }},'''
    
    # 在 groupOverviewUpdates 数组的第一个元素后插入
    first_entry_pattern = r'(export const groupOverviewUpdates: GroupOverviewUpdate\[\] = \[)([\s\S]*?\{[\s\S]*?\})'
    match = re.search(first_entry_pattern, content)
    
    if match:
        insert_pos = match.end(2)
        new_content = content[:insert_pos] + "\n" + new_entry + "\n" + content[insert_pos:]
        
        with open(data_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        return True
    
    return False

def main():
    parser = argparse.ArgumentParser(description="Update World Cup match results")
    parser.add_argument("--match-id", type=int, required=True, help="Match ID to update")
    parser.add_argument("--home-score", type=int, required=True, help="Home team score")
    parser.add_argument("--away-score", type=int, required=True, help="Away team score")
    parser.add_argument("--home-team", type=str, help="Home team name")
    parser.add_argument("--away-team", type=str, help="Away team name")
    parser.add_argument("--group", type=str, help="Match group")
    parser.add_argument("--stage", type=str, default="分组赛", help="Match stage")
    
    args = parser.parse_args()
    
    # 加载状态
    state = load_state()
    
    match_id_str = str(args.match_id)
    if match_id_str in state and "homeScore" in state[match_id_str]:
        print(f"Match {args.match_id} already updated. Skipping.")
        sys.exit(0)
    
    # 更新 scheduleData.ts
    if not update_schedule_with_score(args.match_id, args.home_score, args.away_score):
        print("Failed to update scheduleData.ts")
        sys.exit(1)
    
    # 更新状态文件
    state[match_id_str] = {
        "homeScore": args.home_score,
        "awayScore": args.away_score,
        "homeTeam": args.home_team,
        "awayTeam": args.away_team,
        "group": args.group,
        "stage": args.stage,
        "updatedAt": get_beijing_time().isoformat()
    }
    save_state(state)
    
    # 更新 worldcupData.ts（如果适用）
    if args.group:
        update_worldcup_data_for_match(
            args.match_id, args.home_team, args.away_team,
            args.home_score, args.away_score, args.group
        )
    
    # 添加 groupOverviewUpdate 记录
    home_flag = "🏠" if args.home_score > args.away_score else ("🏳️" if args.home_score == args.away_score else "🏆")
    away_flag = "🏆" if args.away_score > args.home_score else ("🏳️" if args.home_score == args.away_score else "🏠")
    
    changes = [
        f"{args.home_team} {home_flag} {args.home_score} - {args.away_score} {args.away_team}",
        f"{args.stage} {args.group}组第{args.match_id}场比分已更新"
    ]
    
    add_group_overview_update(
        title=f"比赛结果更新",
        summary=f"{args.home_team} vs {args.away_team} ({args.home_score}-{args.away_score})",
        changes=changes
    )
    
    print(f"SUCCESS: Match {args.match_id} updated with score {args.home_score}-{args.away_score}")
    sys.exit(0)

if __name__ == "__main__":
    main()