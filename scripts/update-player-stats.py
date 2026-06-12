#!/usr/bin/env python3
"""
更新球员进球和助攻数据榜
配合比赛比分更新任务使用
"""

import sys
import json
import re
import argparse
from datetime import datetime, timezone, timedelta
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent

def load_team_rosters():
    """加载球队名单，用于匹配球员名"""
    rosters_path = PROJECT_ROOT / "constants" / "teamRosters.ts"
    with open(rosters_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 解析 teamRosters
    teams = {}
    team_pattern = r'teamName:\s*"([^"]+)"[^}]*players:\s*\[([\s\S]*?)\]\s*\}'
    
    for match in re.finditer(team_pattern, content):
        team_name = match.group(1)
        players_str = match.group(2)
        
        # 解析球员名
        name_pattern = r'name:\s*"([^"]+)"'
        player_names = re.findall(name_pattern, players_str)
        teams[team_name] = player_names
    
    return teams

def find_player_in_roster(player_name, teams):
    """在球队名单中查找球员，返回球队名"""
    for team_name, players in teams.items():
        if player_name in players:
            return team_name
    return None

def update_tournament_stats(match_id, home_team, away_team, home_score, away_score, goals=None, assists=None):
    """
    更新 tournamentStats.ts 中的进球榜和助攻榜
    
    goals: 列表，格式 [{"player": "球员名", "team": "球队名", "count": 1}, ...]
    assists: 列表，格式 [{"player": "球员名", "team": "球队名", "count": 1}, ...]
    """
    stats_path = PROJECT_ROOT / "constants" / "tournamentStats.ts"
    
    with open(stats_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 构建新的 PlayerStat 条目
    def make_stat_entry(rank, player, chinese_name, team, team_code, value, matches):
        return f'  {{ rank: {rank}, player: "{player}", chineseName: "{chinese_name}", team: "{team}", teamCode: "{team_code}", value: {value}, matches: {matches} }}'
    
    # 解析现有排名数据
    goals_ranking = []
    assists_ranking = []
    
    goals_match = re.search(r'goalsRanking:\s*PlayerStat\[\]\s*=\s*\[([\s\S]*?)\];', content)
    if goals_match and goals_match.group(1).strip():
        for entry in goals_match.group(1).split('},'):
            m = re.search(r'rank:\s*(\d+).*?player:\s*"([^"]+)".*?chineseName:\s*"([^"]+)".*?team:\s*"([^"]+)".*?teamCode:\s*"([^"]+)".*?value:\s*(\d+).*?matches:\s*(\d+)', entry + '}')
            if m:
                goals_ranking.append({
                    'rank': int(m.group(1)),
                    'player': m.group(2),
                    'chineseName': m.group(3),
                    'team': m.group(4),
                    'teamCode': m.group(5),
                    'value': int(m.group(6)),
                    'matches': int(m.group(7))
                })
    
    assists_match = re.search(r'assistsRanking:\s*PlayerStat\[\]\s*=\s*\[([\s\S]*?)\];', content)
    if assists_match and assists_match.group(1).strip():
        for entry in assists_match.group(1).split('},'):
            m = re.search(r'rank:\s*(\d+).*?player:\s*"([^"]+)".*?chineseName:\s*"([^"]+)".*?team:\s*"([^"]+)".*?teamCode:\s*"([^"]+)".*?value:\s*(\d+).*?matches:\s*(\d+)', entry + '}')
            if m:
                assists_ranking.append({
                    'rank': int(m.group(1)),
                    'player': m.group(2),
                    'chineseName': m.group(3),
                    'team': m.group(4),
                    'teamCode': m.group(5),
                    'value': int(m.group(6)),
                    'matches': int(m.group(7))
                })
    
    # 加载球队名单
    teams = load_team_rosters()
    
    # 球队代码映射
    team_code_map = {
        '墨西哥': 'MEX', '南非': 'RSA', '韩国': 'KOR', '捷克': 'CZE',
        '加拿大': 'CAN', '波黑': 'BIH', '卡塔尔': 'QAT', '瑞士': 'SUI',
        '巴西': 'BRA', '摩洛哥': 'MAR', '美国': 'USA', '巴拉圭': 'PAR',
        '德国': 'GER', '库拉索': 'CUW', '荷兰': 'NED', '日本': 'JPN',
        '比利时': 'BEL', '埃及': 'EGY', '西班牙': 'ESP', '佛得角': 'CPV',
        '法国': 'FRA', '塞内加尔': 'SEN', '阿根廷': 'ARG', '阿尔及利亚': 'ALG',
        '葡萄牙': 'POR', '刚果民主共和国': 'COD', '英格兰': 'ENG', '克罗地亚': 'CRO'
    }
    
    # 更新进球榜
    if goals:
        for goal in goals:
            player = goal.get('player', '')
            count = goal.get('count', 1)
            team_name = goal.get('team', '')
            
            # 查找球队
            if not team_name:
                team_name = find_player_in_roster(player, teams)
            
            team_code = team_code_map.get(team_name, team_name[:3].upper() if team_name else 'UNK')
            
            # 查找或创建条目
            existing = next((g for g in goals_ranking if g['player'] == player), None)
            if existing:
                existing['value'] += count
                existing['matches'] += 1
            else:
                # 添加新条目
                chinese_name = player.split()[-1] if ' ' in player else player  # 简化处理
                goals_ranking.append({
                    'rank': 0,
                    'player': player,
                    'chineseName': chinese_name,
                    'team': team_name,
                    'teamCode': team_code,
                    'value': count,
                    'matches': 1
                })
    
    # 更新助攻榜
    if assists:
        for assist in assists:
            player = assist.get('player', '')
            count = assist.get('count', 1)
            team_name = assist.get('team', '')
            
            if not team_name:
                team_name = find_player_in_roster(player, teams)
            
            team_code = team_code_map.get(team_name, team_name[:3].upper() if team_name else 'UNK')
            
            existing = next((a for a in assists_ranking if a['player'] == player), None)
            if existing:
                existing['value'] += count
                existing['matches'] += 1
            else:
                chinese_name = player.split()[-1] if ' ' in player else player
                assists_ranking.append({
                    'rank': 0,
                    'player': player,
                    'chineseName': chinese_name,
                    'team': team_name,
                    'teamCode': team_code,
                    'value': count,
                    'matches': 1
                })
    
    # 排序并更新rank
    goals_ranking.sort(key=lambda x: x['value'], reverse=True)
    for i, entry in enumerate(goals_ranking):
        entry['rank'] = i + 1
    
    assists_ranking.sort(key=lambda x: x['value'], reverse=True)
    for i, entry in enumerate(assists_ranking):
        entry['rank'] = i + 1
    
    # 重新生成代码
    def format_stat_list(stats):
        if not stats:
            return '  []'
        lines = []
        for s in stats:
            lines.append(f'  {{ rank: {s["rank"]}, player: "{s["player"]}", chineseName: "{s["chineseName"]}", team: "{s["team"]}", teamCode: "{s["teamCode"]}", value: {s["value"]}, matches: {s["matches"]} }}')
        return '[\n' + ',\n'.join(lines) + '\n  ]'
    
    new_goals_str = format_stat_list(goals_ranking)
    new_assists_str = format_stat_list(assists_ranking)
    
    # 更新 content
    content = re.sub(
        r'goalsRanking:\s*PlayerStat\[\]\s*=\s*\[[\s\S]*?\];',
        f'goalsRanking: PlayerStat[] = {new_goals_str};',
        content
    )
    content = re.sub(
        r'assistsRanking:\s*PlayerStat\[\]\s*=\s*\[[\s\S]*?\];',
        f'assistsRanking: PlayerStat[] = {new_assists_str};',
        content
    )
    
    # 更新 statsNotice
    now = datetime.now(timezone(timedelta(hours=8)))
    date_str = now.strftime("%Y年%m月%d日 %H:%M")
    notice_title = f"{home_team} {home_score}-{away_score} {away_team}"
    notice_body = f"比赛已完成，进球榜和助攻榜已更新。"
    
    content = re.sub(
        r'statsNotice\s*=\s*\{[^}]*title:\s*"[^"]*"[^}]*body:\s*"[^"]*"[^}]*\}',
        f'''statsNotice = {{
    title: "{notice_title}",
    body: "{notice_body}"
  }}''',
        content
    )
    
    with open(stats_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Updated tournamentStats.ts: {len(goals_ranking)} players in goals ranking, {len(assists_ranking)} players in assists ranking")
    return True

def main():
    parser = argparse.ArgumentParser(description="Update player goals and assists stats")
    parser.add_argument("--match-id", type=int, required=True, help="Match ID")
    parser.add_argument("--home-team", type=str, required=True, help="Home team name")
    parser.add_argument("--away-team", type=str, required=True, help="Away team name")
    parser.add_argument("--home-score", type=int, required=True, help="Home team score")
    parser.add_argument("--away-score", type=int, required=True, help="Away team score")
    parser.add_argument("--goals", type=str, help="JSON array of goals: [{\"player\": \"Name\", \"team\": \"Team\", \"count\": 1}, ...]")
    parser.add_argument("--assists", type=str, help="JSON array of assists: [{\"player\": \"Name\", \"team\": \"Team\", \"count\": 1}, ...]")
    
    args = parser.parse_args()
    
    goals = None
    assists = None
    
    if args.goals:
        try:
            goals = json.loads(args.goals)
        except json.JSONDecodeError as e:
            print(f"Warning: Failed to parse goals JSON: {e}")
    
    if args.assists:
        try:
            assists = json.loads(args.assists)
        except json.JSONDecodeError as e:
            print(f"Warning: Failed to parse assists JSON: {e}")
    
    success = update_tournament_stats(
        args.match_id,
        args.home_team,
        args.away_team,
        args.home_score,
        args.away_score,
        goals,
        assists
    )
    
    if success:
        print(f"SUCCESS: Updated player stats for match {args.match_id}")
        sys.exit(0)
    else:
        print(f"ERROR: Failed to update player stats")
        sys.exit(1)

if __name__ == "__main__":
    main()