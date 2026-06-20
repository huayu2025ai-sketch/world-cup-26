#!/usr/bin/env python3
"""Analyze group standings and determine mathematically qualified teams"""
import re
from collections import defaultdict

# 读取 worldcupData.ts
with open("constants/worldcupData.ts", "r", encoding="utf-8") as f:
    data = f.read()

# 提取所有小组的 standings
for group_match in re.finditer(r'id:\s*"([A-L])"[\s\S]*?standings:\s*\[([\s\S]*?)\]', data):
    group_id = group_match.group(1)
    standings_text = group_match.group(2)
    
    standings = []
    for entry in re.finditer(r'\{\s*name:\s*"([^"]+)"\s*,\s*code:\s*"([^"]+)"\s*,\s*played:\s*(\d+)\s*,\s*won:\s*(\d+)\s*,\s*draw:\s*(\d+)\s*,\s*lost:\s*(\d+)\s*,\s*goalsFor:\s*(\d+)\s*,\s*goalsAgainst:\s*(\d+)\s*,\s*goalDiff:\s*([-\d]+)\s*,\s*points:\s*(\d+)\s*\}', standings_text):
        standings.append({
            "name": entry.group(1),
            "code": entry.group(2),
            "played": int(entry.group(3)),
            "won": int(entry.group(4)),
            "draw": int(entry.group(5)),
            "lost": int(entry.group(6)),
            "goalsFor": int(entry.group(7)),
            "goalsAgainst": int(entry.group(8)),
            "goalDiff": int(entry.group(9)),
            "points": int(entry.group(10))
        })
    
    # 按积分排序
    standings.sort(key=lambda x: (-x["points"], -x["goalDiff"], -x["goalsFor"]))
    
    print(f"\n{group_id}组:")
    for i, s in enumerate(standings):
        remaining = 3 - s["played"]
        max_possible = s["points"] + remaining * 3
        
        if i < 2 and len(standings) > 2:  # 前两名
            third = standings[2]
            third_remaining = 3 - third["played"]
            third_max = third["points"] + third_remaining * 3
            
            # 确定晋级的条件：当前积分 > 第三名最大可能积分
            qualified = s["points"] > third_max
            
            status = "✅ 已确定晋级" if qualified else "待定"
            line = f"  {i+1}. {s['name']} ({s['code']}): {s['points']}分, 净胜球{s['goalDiff']}, 已赛{s['played']}/3 {status}"
            print(line)
        else:
            line = f"  {i+1}. {s['name']} ({s['code']}): {s['points']}分, 净胜球{s['goalDiff']}, 已赛{s['played']}/3"
            print(line)
