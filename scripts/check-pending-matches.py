#!/usr/bin/env python3
"""
世界杯比赛数据更新条件检测脚本

逻辑：
1. 读取 constants/scheduleData.ts 中的赛程数据
2. 对每个比赛，计算北京时间开始时间（date + localTime 转北京时间）
3. 判断：当前北京时间 > 比赛开始时间 + 90分钟（即比赛已结束）
4. 检查该比赛是否已有比分（homeScore/awayScore 字段存在）
5. 如果有比赛已结束但无比分 → 输出需要更新的比赛列表，exit code 1
6. 如果没有 → 输出 NO_PENDING_MATCHES，exit code 0

全部时间按北京时间计算。
"""

import sys
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path

BJ_TIMEZONE = timezone(timedelta(hours=8))
ET_TIMEZONE = timezone(timedelta(hours=-4))  # EDT

def get_beijing_now():
    return datetime.now(BJ_TIMEZONE)

def parse_schedule():
    """解析 scheduleData.ts，返回所有比赛列表"""
    schedule_path = Path(__file__).parent.parent / "constants" / "scheduleData.ts"
    with open(schedule_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 找到 matchInputs 数组
    array_start = content.find("const matchInputs: ScheduleMatchInput[] = [")
    if array_start == -1:
        return []
    
    array_content = content[array_start:]
    array_end = array_content.find("];\n")
    array_content = array_content[:array_end+2]
    
    # 按 id 分割
    id_matches = list(re.finditer(r'id:\s*(\d+)', array_content))
    matches = []
    
    for i, id_m in enumerate(id_matches):
        pos = id_m.start()
        match_id = int(id_m.group(1))
        
        if i < len(id_matches) - 1:
            end_pos = id_matches[i+1].start()
        else:
            end_pos = len(array_content)
        
        match_text = array_content[pos:end_pos]
        
        # 提取字段
        date_m = re.search(r'date:\s*"([^"]+)"', match_text)
        et_m = re.search(r'localTime:\s*"([^"]+)"', match_text)
        home_m = re.search(r'home:\s*"([^"]+)"', match_text)
        away_m = re.search(r'away:\s*"([^"]+)"', match_text)
        stage_m = re.search(r'stage:\s*"([^"]+)"', match_text)
        group_m = re.search(r'group:\s*"([^"]*)"', match_text)
        
        has_score = "homeScore" in match_text and "awayScore" in match_text
        
        if date_m and et_m and home_m and away_m:
            date_str = date_m.group(1)
            et_time = et_m.group(1)
            home = home_m.group(1)
            away = away_m.group(1)
            stage = stage_m.group(1) if stage_m else "?"
            group = group_m.group(1) if group_m else None
            
            # 计算北京时间
            et_dt_str = f"{date_str}T{et_time}:00"
            et_dt = datetime.strptime(et_dt_str, "%Y-%m-%dT%H:%M:%S").replace(tzinfo=ET_TIMEZONE)
            bj_dt = et_dt.astimezone(BJ_TIMEZONE)
            
            matches.append({
                "id": match_id,
                "stage": stage,
                "group": group,
                "home": home,
                "away": away,
                "bj_start": bj_dt,
                "has_score": has_score,
            })
    
    return matches

def find_pending(matches):
    """找出需要更新的比赛：已结束（开始+90分钟 < 现在）但无比分"""
    now = get_beijing_now()
    pending = []
    
    for m in matches:
        # 只检查分组赛（32强及以后对手未确定，跳过）
        if m["stage"] != "分组赛":
            continue
        
        end_time = m["bj_start"] + timedelta(minutes=90)
        
        if now >= end_time and not m["has_score"]:
            pending.append(m)
    
    return pending

def main():
    matches = parse_schedule()
    pending = find_pending(matches)
    
    if not pending:
        print("NO_PENDING_MATCHES")
        sys.exit(0)
    
    print(f"PENDING_MATCHES_COUNT:{len(pending)}")
    for p in pending:
        bt_str = p["bj_start"].strftime("%m-%d %H:%M")
        print(f"MATCH:{p['id']}|{p['home']} vs {p['away']}|{p['group']}组|北京{bt_str}")
    
    sys.exit(1)

if __name__ == "__main__":
    main()
