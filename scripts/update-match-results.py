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
    # 格式: { id: N, stage: "...", ... }
    pattern = r'(\{\s*id:\s*' + str(match_id) + r'\s*,[^}]+venue:\s*"[^"]+"\s*,\s*city:\s*"[^"]+"\s*\})'
    
    match = re.search(pattern, content)
    if not match:
        print(f"ERROR: Match {match_id} not found in scheduleData.ts")
        return False
    
    match_block = match.group(1)
    
    # 检查是否已有比分
    if "homeScore" in match_block:
        print(f"Match {match_id} already has score: {match_block}")
        return False
    
    # 添加比分字段
    # 在 city 字段后添加 homeScore 和 awayScore
    new_block = match_block.replace(
        'city: "' + re.search(r'city:\s*"([^"]+)"', match_block).group(1) + '"',
        'city: "' + re.search(r'city:\s*"([^"]+)"', match_block).group(1) + '"\n  homeScore: ' + str(home_score) + ',\n  awayScore: ' + str(away_score)
    )
    
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
    
    # 找到对应小组
    group_pattern = r'(const\s+worldCupGroups:\s*WorldCupGroup\[\]\s*=\s*\[[\s\S]*?id:\s*"' + group + r'"[\s\S]*?\}\s*\]\s*,)'
    match = re.search(group_pattern, content)
    
    if not match:
        print(f"Group {group} not found in worldcupData.ts")
        return False
    
    group_block = match.group(1)
    
    # 解析当前小组的 teams
    # 找到 teams: [...] 数组
    teams_match = re.search(r'teams:\s*\[([\s\S]*?)\]', group_block)
    if not teams_match:
        print(f"Could not parse teams in group {group}")
        return False
    
    teams_str = teams_match.group(1)
    
    # 解析每个 team
    team_pattern = r'\{[^}]*name:\s*"([^"]+)"[^}]*\}'
    teams = re.findall(team_pattern, teams_str)
    
    print(f"Group {group} teams: {teams}")
    
    # 简化处理：记录比赛结果到小组的额外数据中
    # 实际排名计算需要更多逻辑，这里先记录比赛结果
    # 后续可以扩展为完整的积分计算
    
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