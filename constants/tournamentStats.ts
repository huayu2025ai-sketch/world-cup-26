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
  { rank: 1, player: "Lionel Messi", chineseName: "莱昂内尔·梅西", team: "阿根廷", teamCode: "ARG", value: 3, matches: 1 },
  { rank: 2, player: "Folarin Balogun", chineseName: "福拉林·巴洛贡", team: "美国", teamCode: "USA", value: 2, matches: 1 },
  { rank: 3, player: "Kai Havertz", chineseName: "凯·哈弗茨", team: "德国", teamCode: "GER", value: 2, matches: 1 },
  { rank: 4, player: "Yasin Ayari", chineseName: "Yasin Ayari", team: "瑞典", teamCode: "SWE", value: 2, matches: 1 },
  { rank: 5, player: "Eli Just", chineseName: "Eli Just", team: "新西兰", teamCode: "NZL", value: 2, matches: 1 },
  { rank: 6, player: "Kylian Mbappe", chineseName: "基利安·姆巴佩", team: "法国", teamCode: "FRA", value: 2, matches: 1 },
  { rank: 7, player: "Erling Haaland", chineseName: "埃尔林·哈兰德", team: "挪威", teamCode: "NOR", value: 2, matches: 1 },
  { rank: 8, player: "Cristiano Ronaldo", chineseName: "Ronaldo", team: "葡萄牙", teamCode: "POR", value: 2, matches: 1 },
  { rank: 9, player: "Julian Quinones", chineseName: "胡利安·基尼奥内斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 10, player: "Raul Jimenez", chineseName: "劳尔·希门尼斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 11, player: "Cyle Larin", chineseName: "赛尔·拉林", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 12, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 13, player: "Hyeongyu Oh", chineseName: "吴贤揆", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 14, player: "Ladislav Krejci", chineseName: "拉迪斯拉夫·克雷伊奇", team: "捷克", teamCode: "CZE", value: 1, matches: 1 },
  { rank: 15, player: "Jovo Lukic", chineseName: "约沃·卢基奇", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 16, player: "Giovanni Reyna", chineseName: "吉奥·雷纳", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 17, player: "Mauricio", chineseName: "Mauricio", team: "巴拉圭", teamCode: "PAR", value: 1, matches: 1 },
  { rank: 18, player: "Breel Embolo", chineseName: "布雷尔·恩博洛", team: "瑞士", teamCode: "SUI", value: 1, matches: 1 },
  { rank: 19, player: "Boualem Khoukhi", chineseName: "布阿莱姆·胡希", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 20, player: "Ismael Saibari", chineseName: "伊斯梅尔·塞巴里", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 21, player: "Vinicius Junior", chineseName: "维尼修斯·儒尼奥尔", team: "巴西", teamCode: "BRA", value: 1, matches: 1 },
  { rank: 22, player: "John McGinn", chineseName: "约翰·麦金", team: "苏格兰", teamCode: "SCO", value: 1, matches: 1 },
  { rank: 23, player: "Nestory Irankunda", chineseName: "内斯托里·伊兰昆达", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 24, player: "Connor Metcalfe", chineseName: "康纳·梅特卡夫", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 25, player: "Felix Nmecha", chineseName: "费利克斯·恩梅查", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 26, player: "Livano Comenencia", chineseName: "Livano Comenencia", team: "库拉索", teamCode: "CUW", value: 1, matches: 1 },
  { rank: 27, player: "Nico Schlotterbeck", chineseName: "尼科·施洛特贝克", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 28, player: "Jamal Musiala", chineseName: "贾马尔·穆西亚拉", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 29, player: "Nathaniel Brown", chineseName: "Nathaniel Brown", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 30, player: "Deniz Undav", chineseName: "德尼兹·翁达夫", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 31, player: "Virgil van Dijk", chineseName: "维吉尔·范戴克", team: "荷兰", teamCode: "NED", value: 1, matches: 1 },
  { rank: 32, player: "Keito Nakamura", chineseName: "中村敬斗", team: "日本", teamCode: "JPN", value: 1, matches: 1 },
  { rank: 33, player: "Crysencio Summerville", chineseName: "Crysencio Summerville", team: "荷兰", teamCode: "NED", value: 1, matches: 1 },
  { rank: 34, player: "Daichi Kamada", chineseName: "镰田大地", team: "日本", teamCode: "JPN", value: 1, matches: 1 },
  { rank: 35, player: "Amad Diallo", chineseName: "阿马德·迪亚洛", team: "科特迪瓦", teamCode: "CIV", value: 1, matches: 1 },
  { rank: 36, player: "Alexander Isak", chineseName: "亚历山大·伊萨克", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 37, player: "Omar Rekik", chineseName: "Omar Rekik", team: "突尼斯", teamCode: "TUN", value: 1, matches: 1 },
  { rank: 38, player: "Viktor Gyokeres", chineseName: "维克托·约克雷斯", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 39, player: "Mattias Svanberg", chineseName: "马蒂亚斯·斯万贝里", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 40, player: "Emam Ashour", chineseName: "埃马姆·阿舒尔", team: "埃及", teamCode: "EGY", value: 1, matches: 1 },
  { rank: 41, player: "Abdulelah Alamri", chineseName: "Abdulelah Alamri", team: "沙特阿拉伯", teamCode: "KSA", value: 1, matches: 1 },
  { rank: 42, player: "Maxi Araujo", chineseName: "Maxi Araujo", team: "乌拉圭", teamCode: "URU", value: 1, matches: 1 },
  { rank: 43, player: "Ramin Rezaeian", chineseName: "Ramin Rezaeian", team: "伊朗", teamCode: "IRN", value: 1, matches: 1 },
  { rank: 44, player: "Mohammad Mohebi", chineseName: "Mohammad Mohebi", team: "伊朗", teamCode: "IRN", value: 1, matches: 1 },
  { rank: 45, player: "Bradley Barcola", chineseName: "布拉德利·巴尔科拉", team: "法国", teamCode: "FRA", value: 1, matches: 1 },
  { rank: 46, player: "Ibrahim Mbaye", chineseName: "Ibrahim Mbaye", team: "塞内加尔", teamCode: "SEN", value: 1, matches: 1 },
  { rank: 47, player: "Aymen Hussein", chineseName: "艾曼·侯赛因", team: "伊拉克", teamCode: "IRQ", value: 1, matches: 1 },
  { rank: 48, player: "Leo Ostigard", chineseName: "莱奥·厄斯蒂高", team: "挪威", teamCode: "NOR", value: 1, matches: 1 },
  { rank: 49, player: "Romano Schmid", chineseName: "Romano Schmid", team: "奥地利", teamCode: "AUT", value: 1, matches: 1 },
  { rank: 50, player: "Marko Arnautovic", chineseName: "Marko Arnautovic", team: "奥地利", teamCode: "AUT", value: 1, matches: 1 },
  { rank: 51, player: "Musa Al-Taamari", chineseName: "Musa Al-Taamari", team: "约旦", teamCode: "JOR", value: 1, matches: 1 },
  { rank: 52, player: "Bruno Fernandes", chineseName: "Fernandes", team: "葡萄牙", teamCode: "POR", value: 1, matches: 1 },
  { rank: 53, player: "Yoane Wissa", chineseName: "Wissa", team: "刚果民主共和国", teamCode: "COD", value: 1, matches: 1 },
  { rank: 54, player: "Harry Kane", chineseName: "Kane", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 },
  { rank: 55, player: "Bukayo Saka", chineseName: "Saka", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 },
  { rank: 56, player: "Luka Modric", chineseName: "Modric", team: "克罗地亚", teamCode: "CRO", value: 1, matches: 1 }
  ];

export const assistsRanking: PlayerStat[] = [
  { rank: 1, player: "Ryan Gravenberch", chineseName: "赖恩·赫拉芬贝赫", team: "荷兰", teamCode: "NED", value: 2, matches: 1 },
  { rank: 2, player: "Chris Wood", chineseName: "Chris Wood", team: "新西兰", teamCode: "NZL", value: 2, matches: 1 },
  { rank: 3, player: "Michael Olise", chineseName: "迈克尔·奥利塞", team: "法国", teamCode: "FRA", value: 2, matches: 1 },
  { rank: 4, player: "Roberto Alvarado", chineseName: "罗伯托·阿尔瓦拉多", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 5, player: "Christian Pulisic", chineseName: "克里斯蒂安·普利西奇", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 6, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 7, player: "Promise David", chineseName: "普罗米斯·戴维", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 8, player: "Sead Kolasinac", chineseName: "塞亚德·科拉希纳茨", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 9, player: "Homam Ahmed", chineseName: "霍马姆·艾哈迈德", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 10, player: "Brahim Diaz", chineseName: "卜拉欣·迪亚斯", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 11, player: "Bruno Guimaraes", chineseName: "布鲁诺·吉马良斯", team: "巴西", teamCode: "BRA", value: 1, matches: 1 },
  { rank: 12, player: "Paul Okon-Engstler", chineseName: "保罗·奥孔-恩斯特勒", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 13, player: "Viktor Gyokeres", chineseName: "维克托·约克雷斯", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 14, player: "Hannibal Mejbri", chineseName: "Hannibal Mejbri", team: "突尼斯", teamCode: "TUN", value: 1, matches: 1 },
  { rank: 15, player: "Alexander Isak", chineseName: "亚历山大·伊萨克", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 16, player: "Mohamed Salah", chineseName: "穆罕默德·萨拉赫", team: "埃及", teamCode: "EGY", value: 1, matches: 1 },
  { rank: 17, player: "Saman Ghoddos", chineseName: "Saman Ghoddos", team: "伊朗", teamCode: "IRN", value: 1, matches: 1 },
  { rank: 18, player: "Adrien Rabiot", chineseName: "阿德里安·拉比奥", team: "法国", teamCode: "FRA", value: 1, matches: 1 },
  { rank: 19, player: "David Moller Wolfe", chineseName: "大卫·默勒·沃尔夫", team: "挪威", teamCode: "NOR", value: 1, matches: 1 },
  { rank: 20, player: "Amir Al-Ammari", chineseName: "Amir Al-Ammari", team: "伊拉克", teamCode: "IRQ", value: 1, matches: 1 },
  { rank: 21, player: "Bernardo Silva", chineseName: "Silva", team: "葡萄牙", teamCode: "POR", value: 1, matches: 1 },
  { rank: 22, player: "Joao Felix", chineseName: "Felix", team: "葡萄牙", teamCode: "POR", value: 1, matches: 1 },
  { rank: 23, player: "Declan Rice", chineseName: "Rice", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 },
  { rank: 24, player: "Jude Bellingham", chineseName: "Bellingham", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 }
  ];

export const statsNotice = {
    title: "英格兰 2-1 克罗地亚",
    body: "比赛已完成，进球榜和助攻榜已更新。"
  };
