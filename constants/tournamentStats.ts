export type PlayerStat = {
  rank: number;
  player: string;
  chineseName: string;
  team: string;
  teamCode: string;
  value: number;
  matches: number;
};

export const goalsRanking: PlayerStat[] = [];

export const assistsRanking: PlayerStat[] = [];

export const statsNotice = {
  title: "赛事尚未开赛",
  body: "2026 世界杯开赛后，可在 constants/tournamentStats.ts 中录入进球和助攻数据，页面会自动生成排行表。"
};
