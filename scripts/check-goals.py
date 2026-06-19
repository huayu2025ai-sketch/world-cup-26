#!/usr/bin/env python3
"""Check and update tournamentStats.ts goals ranking from scheduleData.ts"""
import re
from collections import defaultdict

# 读取 scheduleData.ts
with open("constants/scheduleData.ts", "r", encoding="utf-8") as f:
    schedule = f.read()

# 读取 tournamentStats.ts
with open("constants/tournamentStats.ts", "r", encoding="utf-8") as f:
    stats = f.read()

# 从 scheduleData.ts 提取所有进球者 (按球员中文名统计)
goal_scorers = defaultdict(int)
for m in re.finditer(r'goalScorers:\s*\[([\s\S]*?)\]', schedule):
    block = m.group(1)
    for player_match in re.finditer(r'player:\s*"([^"]+)"', block):
        player = player_match.group(1)
        goal_scorers[player] += 1

# 从 tournamentStats.ts 提取进球榜
goals_ranking = []
for line in re.finditer(r'\{\s*rank:\s*(\d+),\s*player:\s*"([^"]+)",\s*chineseName:\s*"([^"]+)",\s*team:\s*"([^"]+)",\s*teamCode:\s*"([^"]+)",\s*value:\s*(\d+),\s*matches:\s*(\d+)\s*\}', stats):
    goals_ranking.append({
        "rank": int(line.group(1)),
        "player": line.group(2),
        "chineseName": line.group(3),
        "team": line.group(4),
        "teamCode": line.group(5),
        "value": int(line.group(6)),
        "matches": int(line.group(7))
    })

print("=== 进球榜当前数据 ===")
for g in goals_ranking:
    print(f"  {g['chineseName']} ({g['teamCode']}): {g['value']} 球, {g['matches']} 场")

print("\n=== 从 scheduleData.ts 统计的进球 ===")
sorted_scorers = sorted(goal_scorers.items(), key=lambda x: -x[1])
for player, count in sorted_scorers:
    if count >= 2:
        print(f"  {player}: {count} 球")

print("\n=== 检查差异 ===")
# 建立中文名到数据的映射
stats_by_chinese = {g['chineseName']: g for g in goals_ranking}
schedule_by_chinese = dict(goal_scorers)

# 检查 scheduleData.ts 中有但进球榜中没有的球员
for player, count in sorted_scorers:
    if player not in stats_by_chinese and count > 0:
        print(f"  MISSING: {player} 有 {count} 球但不在进球榜")

# 检查进球数不一致的
for player, count in sorted_scorers:
    if player in stats_by_chinese:
        stats_count = stats_by_chinese[player]['value']
        if count != stats_count:
            print(f"  MISMATCH: {player} schedule={count} 球, stats={stats_count} 球")

print("\n=== 需要更新的球员 ===")
needs_update = []
for player, count in sorted_scorers:
    if player in stats_by_chinese:
        stats_count = stats_by_chinese[player]['value']
        if count != stats_count:
            needs_update.append({
                'player': stats_by_chinese[player]['player'],
                'chineseName': player,
                'team': stats_by_chinese[player]['team'],
                'teamCode': stats_by_chinese[player]['teamCode'],
                'old_value': stats_count,
                'new_value': count,
                'old_matches': stats_by_chinese[player]['matches']
            })
            print(f"  {player}: {stats_count} -> {count} 球")
    elif count > 0:
        print(f"  {player}: 新增 {count} 球 (需要手动添加英文名等信息)")

if not needs_update:
    print("  无需更新")
