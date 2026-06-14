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
  { rank: 1, player: "Folarin Balogun", chineseName: "福拉林·巴洛贡", team: "美国", teamCode: "USA", value: 2, matches: 1 },
  { rank: 2, player: "Julian Quinones", chineseName: "胡利安·基尼奥内斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 2, player: "Raul Jimenez", chineseName: "劳尔·希门尼斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 2, player: "Cyle Larin", chineseName: "赛尔·拉林", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 2, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 2, player: "Hyeongyu Oh", chineseName: "吴贤揆", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 2, player: "Ladislav Krejci", chineseName: "拉迪斯拉夫·克雷伊奇", team: "捷克", teamCode: "CZE", value: 1, matches: 1 },
  { rank: 2, player: "Jovo Lukic", chineseName: "约沃·卢基奇", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 2, player: "Giovanni Reyna", chineseName: "吉奥·雷纳", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 2, player: "Mauricio", chineseName: "Mauricio", team: "巴拉圭", teamCode: "PAR", value: 1, matches: 1 },
  { rank: 2, player: "Breel Embolo", chineseName: "布雷尔·恩博洛", team: "瑞士", teamCode: "SUI", value: 1, matches: 1 },
  { rank: 2, player: "Boualem Khoukhi", chineseName: "布阿莱姆·胡希", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 2, player: "Ismael Saibari", chineseName: "伊斯梅尔·塞巴里", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 2, player: "Vinicius Junior", chineseName: "维尼修斯·儒尼奥尔", team: "巴西", teamCode: "BRA", value: 1, matches: 1 },
  { rank: 2, player: "John McGinn", chineseName: "约翰·麦金", team: "苏格兰", teamCode: "SCO", value: 1, matches: 1 }
];

export const assistsRanking: PlayerStat[] = [
  { rank: 1, player: "Roberto Alvarado", chineseName: "罗伯托·阿尔瓦拉多", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 1, player: "Christian Pulisic", chineseName: "克里斯蒂安·普利西奇", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 1, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 1, player: "Promise David", chineseName: "普罗米斯·戴维", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 1, player: "Sead Kolasinac", chineseName: "塞亚德·科拉希纳茨", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 1, player: "Homam Ahmed", chineseName: "霍马姆·艾哈迈德", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 1, player: "Brahim Diaz", chineseName: "卜拉欣·迪亚斯", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 1, player: "Bruno Guimaraes", chineseName: "布鲁诺·吉马良斯", team: "巴西", teamCode: "BRA", value: 1, matches: 1 }
];

export const statsNotice = {
    title: "海地 0-1 苏格兰赛果已更新",
    body: "已按终场比分补入约翰·麦金 28' 进球；助攻来源表述不稳定，本次未新增助攻。"
  };
