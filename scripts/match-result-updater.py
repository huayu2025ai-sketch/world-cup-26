#!/usr/bin/env python3
"""
Stage 1: 轻量级条件检测与状态拦截
检测是否有新完赛的比赛需要更新
"""

import sys
import json
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path

# 北京时区
BJ_TIMEZONE = timezone(timedelta(hours=8))

def get_beijing_time():
    return datetime.now(BJ_TIMEZONE)

def parse_schedule_data():
    """读取并解析赛程数据"""
    schedule_path = Path(__file__).parent.parent / "constants" / "scheduleData.ts"
    with open(schedule_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 提取 scheduleMatches 数组
    match = re.search(r'scheduleMatches:\s*ScheduleMatch\[\]\s*=\s*\[([\s\S]*?)\];', content)
    if not match:
        return []
    
    array_content = match.group(1)
    matches = []
    
    # 解析每个比赛对象
    # 格式: { id: N, stage: "...", group: "...", date: "...", etTime: "...", beijingTime: "...", home: "...", away: "...", venue: "...", city: "..." }
    pattern = r'\{[^}]*id:\s*(\d+)[^}]*stage:\s*"([^"]+)"[^}]*group:\s*"([^"]*)"[^}]*date:\s*"([^"]+)"[^}]*etTime:\s*"([^"]+)"[^}]*beijingTime:\s*"([^"]+)"[^}]*home:\s*"([^"]+)"[^}]*away:\s*"([^"]+)"[^}]*venue:\s*"([^"]+)"[^}]*city:\s*"([^"]+)"[^}]*\}'
    
    for m in re.finditer(pattern, array_content):
        match_id = int(m.group(1))
        stage = m.group(2)
        group = m.group(3) if m.group(3) else None
        date = m.group(4)
        et_time = m.group(5)
        beijing_time = m.group(6)
        home = m.group(7)
        away = m.group(8)
        venue = m.group(9)
        city = m.group(10)
        
        matches.append({
            "id": match_id,
            "stage": stage,
            "group": group,
            "date": date,
            "etTime": et_time,
            "beijingTime": beijing_time,
            "home": home,
            "away": away,
            "venue": venue,
            "city": city
        })
    
    return matches

def parse_beijing_time(bt_str):
    """
    解析北京时间字符串
    格式如: "06-12 03:00" 表示 6月12日 03:00
    注意: 跨年的日期可能需要处理
    """
    now = get_beijing_time()
    # 解析 MM-DD HH:MM 格式
    parts = bt_str.strip().split()
    if len(parts) != 2:
        return None
    
    date_part = parts[0]  # MM-DD
    time_part = parts[1]  # HH:MM
    
    month_day = date_part.split("-")
    if len(month_day) != 2:
        return None
    
    month = int(month_day[0])
    day = int(month_day[1])
    hour_min = time_part.split(":")
    if len(hour_min) != 2:
        return None
    
    hour = int(hour_min[0])
    minute = int(hour_min[1])
    
    # 确定年份（如果月份小于当前月份，说明是明年）
    year = now.year
    if month < now.month:
        year = year + 1
    
    return datetime(year, month, day, hour, minute, tzinfo=BJ_TIMEZONE)

def check_score_in_file(match_id):
    """检查本地文件是否已有比分"""
    # 这个函数检查 scheduleData.ts 中是否已有 homeScore/awayScore
    # 但由于当前数据结构中没有这些字段，我们用状态文件来追踪
    state_file = Path(__file__).parent.parent / ".match-results.json"
    if state_file.exists():
        with open(state_file, "r") as f:
            state = json.load(f)
            return str(match_id) in state and "homeScore" in state[str(match_id)]
    return False

def find_pending_matches(matches):
    """找出满足更新条件的比赛"""
    now = get_beijing_time()
    pending = []
    
    for match in matches:
        # 跳过 32强 及之后的比赛（因为对手还未确定）
        if match["stage"] not in ["分组赛"]:
            continue
        
        # 解析比赛开始时间
        bt = parse_beijing_time(match["beijingTime"])
        if bt is None:
            continue
        
        # 比赛开始时间 + 90分钟 <= 当前时间
        match_end_time = bt + timedelta(minutes=90)
        
        if now >= match_end_time:
            # 检查是否已有比分
            if not check_score_in_file(match["id"]):
                pending.append({
                    "id": match["id"],
                    "home": match["home"],
                    "away": match["away"],
                    "group": match["group"],
                    "stage": match["stage"],
                    "beijingTime": match["beijingTime"],
                    "endTime": bt.isoformat()
                })
    
    return pending

def main():
    matches = parse_schedule_data()
    pending = find_pending_matches(matches)
    
    if not pending:
        # 没有需要更新的比赛
        print("NO_PENDING_MATCHES")
        sys.exit(0)
    
    # 输出待更新比赛列表
    print(f"PENDING_MATCHES_COUNT:{len(pending)}")
    for p in pending:
        print(f"MATCH:{json.dumps(p, ensure_ascii=False)}")
    
    sys.exit(1)

if __name__ == "__main__":
    main()