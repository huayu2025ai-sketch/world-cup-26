export type PlayerStat = {
  rank: number;
  player: string;
  chineseName: string;
  team: string;
  teamCode: string;
  value: number;
  matches: number;
};

export const goalsRanking: PlayerStat[] = [
  { rank: 1, player: "Julian Quinones", chineseName: "胡利安·基尼奥内斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 1, player: "Raul Jimenez", chineseName: "劳尔·希门尼斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 1, player: "Cyle Larin", chineseName: "赛尔·拉林", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 1, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 1, player: "Hyeongyu Oh", chineseName: "吴贤揆", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 1, player: "Ladislav Krejci", chineseName: "拉迪斯拉夫·克雷伊奇", team: "捷克", teamCode: "CZE", value: 1, matches: 1 },
  { rank: 1, player: "Jovo Lukic", chineseName: "约沃·卢基奇", team: "波黑", teamCode: "BIH", value: 1, matches: 1 }
];

export const assistsRanking: PlayerStat[] = [
  { rank: 1, player: "Roberto Alvarado", chineseName: "罗伯托·阿尔瓦拉多", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 1, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 1, player: "Promise David", chineseName: "普罗米斯·戴维", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 1, player: "Sead Kolasinac", chineseName: "塞亚德·科拉希纳茨", team: "波黑", teamCode: "BIH", value: 1, matches: 1 }
];

export const statsNotice = {
    title: "A组与B组已有三场完赛",
    body: "已更新墨西哥 2-0 南非、韩国 2-1 捷克、加拿大 1-1 波黑后的进球榜和可确认助攻榜。"
  };
