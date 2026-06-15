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
  { rank: 1, player: "Kai Havertz", chineseName: "凯·哈弗茨", team: "德国", teamCode: "GER", value: 2, matches: 1 },
  { rank: 1, player: "Yasin Ayari", chineseName: "Yasin Ayari", team: "瑞典", teamCode: "SWE", value: 2, matches: 1 },
  { rank: 4, player: "Julian Quinones", chineseName: "胡利安·基尼奥内斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 4, player: "Raul Jimenez", chineseName: "劳尔·希门尼斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 4, player: "Cyle Larin", chineseName: "赛尔·拉林", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 4, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 4, player: "Hyeongyu Oh", chineseName: "吴贤揆", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 4, player: "Ladislav Krejci", chineseName: "拉迪斯拉夫·克雷伊奇", team: "捷克", teamCode: "CZE", value: 1, matches: 1 },
  { rank: 4, player: "Jovo Lukic", chineseName: "约沃·卢基奇", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 4, player: "Giovanni Reyna", chineseName: "吉奥·雷纳", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 4, player: "Mauricio", chineseName: "Mauricio", team: "巴拉圭", teamCode: "PAR", value: 1, matches: 1 },
  { rank: 4, player: "Breel Embolo", chineseName: "布雷尔·恩博洛", team: "瑞士", teamCode: "SUI", value: 1, matches: 1 },
  { rank: 4, player: "Boualem Khoukhi", chineseName: "布阿莱姆·胡希", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 4, player: "Ismael Saibari", chineseName: "伊斯梅尔·塞巴里", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 4, player: "Vinicius Junior", chineseName: "维尼修斯·儒尼奥尔", team: "巴西", teamCode: "BRA", value: 1, matches: 1 },
  { rank: 4, player: "John McGinn", chineseName: "约翰·麦金", team: "苏格兰", teamCode: "SCO", value: 1, matches: 1 },
  { rank: 4, player: "Nestory Irankunda", chineseName: "内斯托里·伊兰昆达", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 4, player: "Connor Metcalfe", chineseName: "康纳·梅特卡夫", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 4, player: "Felix Nmecha", chineseName: "费利克斯·恩梅查", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 4, player: "Livano Comenencia", chineseName: "Livano Comenencia", team: "库拉索", teamCode: "CUW", value: 1, matches: 1 },
  { rank: 4, player: "Nico Schlotterbeck", chineseName: "尼科·施洛特贝克", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 4, player: "Jamal Musiala", chineseName: "贾马尔·穆西亚拉", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 4, player: "Nathaniel Brown", chineseName: "Nathaniel Brown", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 4, player: "Deniz Undav", chineseName: "德尼兹·翁达夫", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 4, player: "Virgil van Dijk", chineseName: "维吉尔·范戴克", team: "荷兰", teamCode: "NED", value: 1, matches: 1 },
  { rank: 4, player: "Keito Nakamura", chineseName: "中村敬斗", team: "日本", teamCode: "JPN", value: 1, matches: 1 },
  { rank: 4, player: "Crysencio Summerville", chineseName: "Crysencio Summerville", team: "荷兰", teamCode: "NED", value: 1, matches: 1 },
  { rank: 4, player: "Daichi Kamada", chineseName: "镰田大地", team: "日本", teamCode: "JPN", value: 1, matches: 1 },
  { rank: 4, player: "Amad Diallo", chineseName: "阿马德·迪亚洛", team: "科特迪瓦", teamCode: "CIV", value: 1, matches: 1 },
  { rank: 4, player: "Alexander Isak", chineseName: "亚历山大·伊萨克", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 4, player: "Omar Rekik", chineseName: "Omar Rekik", team: "突尼斯", teamCode: "TUN", value: 1, matches: 1 },
  { rank: 4, player: "Viktor Gyokeres", chineseName: "维克托·约克雷斯", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 4, player: "Mattias Svanberg", chineseName: "马蒂亚斯·斯万贝里", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 4, player: "Emam Ashour", chineseName: "埃马姆·阿舒尔", team: "埃及", teamCode: "EGY", value: 1, matches: 1 }
];

export const assistsRanking: PlayerStat[] = [
  { rank: 1, player: "Ryan Gravenberch", chineseName: "赖恩·赫拉芬贝赫", team: "荷兰", teamCode: "NED", value: 2, matches: 1 },
  { rank: 2, player: "Roberto Alvarado", chineseName: "罗伯托·阿尔瓦拉多", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 2, player: "Christian Pulisic", chineseName: "克里斯蒂安·普利西奇", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 2, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 2, player: "Promise David", chineseName: "普罗米斯·戴维", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 2, player: "Sead Kolasinac", chineseName: "塞亚德·科拉希纳茨", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 2, player: "Homam Ahmed", chineseName: "霍马姆·艾哈迈德", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 2, player: "Brahim Diaz", chineseName: "卜拉欣·迪亚斯", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 2, player: "Bruno Guimaraes", chineseName: "布鲁诺·吉马良斯", team: "巴西", teamCode: "BRA", value: 1, matches: 1 },
  { rank: 2, player: "Paul Okon-Engstler", chineseName: "保罗·奥孔-恩斯特勒", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 2, player: "Viktor Gyokeres", chineseName: "维克托·约克雷斯", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 2, player: "Hannibal Mejbri", chineseName: "Hannibal Mejbri", team: "突尼斯", teamCode: "TUN", value: 1, matches: 1 },
  { rank: 2, player: "Alexander Isak", chineseName: "亚历山大·伊萨克", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 2, player: "Mohamed Salah", chineseName: "穆罕默德·萨拉赫", team: "埃及", teamCode: "EGY", value: 1, matches: 1 }
];

export const statsNotice = {
    title: "第 12-14 场赛果已更新",
    body: "已补入瑞典 5-1 突尼斯、西班牙 0-0 佛得角、比利时 1-1 埃及；射手榜新增已确认非乌龙进球，助攻榜只加入来源明确的助攻。"
  };
