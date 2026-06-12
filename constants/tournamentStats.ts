export type PlayerStat = {
  rank: number;
  player: string;
  chineseName: string;
  team: string;
  teamCode: string;
  value: number;
  matches: number;
};

export const goalsRanking: PlayerStat[] =   [];

export const assistsRanking: PlayerStat[] =   [];

export const statsNotice = {
    title: "墨西哥 2-0 南非",
    body: "比赛已完成，进球榜和助攻榜已更新。"
  };
