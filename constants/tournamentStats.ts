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
  body: ""
};
