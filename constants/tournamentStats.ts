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
  { rank: 2, player: "Kai Havertz", chineseName: "凯·哈弗茨", team: "德国", teamCode: "GER", value: 2, matches: 1 },
  { rank: 2, player: "Yasin Ayari", chineseName: "亚辛·阿亚里", team: "瑞典", teamCode: "SWE", value: 2, matches: 1 },
  { rank: 2, player: "Eli Just", chineseName: "伊莱·贾斯特", team: "新西兰", teamCode: "NZL", value: 2, matches: 1 },
  { rank: 2, player: "Kylian Mbappe", chineseName: "基利安·姆巴佩", team: "法国", teamCode: "FRA", value: 2, matches: 1 },
  { rank: 2, player: "Erling Haaland", chineseName: "埃尔林·哈兰德", team: "挪威", teamCode: "NOR", value: 2, matches: 1 },
  { rank: 2, player: "Cristiano Ronaldo", chineseName: "C罗", team: "葡萄牙", teamCode: "POR", value: 2, matches: 1 },
  { rank: 7, player: "Julian Quinones", chineseName: "胡利安·基尼奥内斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 7, player: "Raul Jimenez", chineseName: "劳尔·希门尼斯", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 7, player: "Cyle Larin", chineseName: "赛尔·拉林", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 7, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 7, player: "Hyeongyu Oh", chineseName: "吴贤揆", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 7, player: "Ladislav Krejci", chineseName: "拉迪斯拉夫·克雷伊奇", team: "捷克", teamCode: "CZE", value: 1, matches: 1 },
  { rank: 7, player: "Jovo Lukic", chineseName: "约沃·卢基奇", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 7, player: "Giovanni Reyna", chineseName: "吉奥·雷纳", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 7, player: "Mauricio", chineseName: "毛里西奥", team: "巴拉圭", teamCode: "PAR", value: 1, matches: 1 },
  { rank: 7, player: "Breel Embolo", chineseName: "布雷尔·恩博洛", team: "瑞士", teamCode: "SUI", value: 1, matches: 1 },
  { rank: 7, player: "Boualem Khoukhi", chineseName: "布阿莱姆·胡希", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 7, player: "Ismael Saibari", chineseName: "伊斯梅尔·塞巴里", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 7, player: "Vinicius Junior", chineseName: "维尼修斯·儒尼奥尔", team: "巴西", teamCode: "BRA", value: 1, matches: 1 },
  { rank: 7, player: "John McGinn", chineseName: "约翰·麦金", team: "苏格兰", teamCode: "SCO", value: 1, matches: 1 },
  { rank: 7, player: "Nestory Irankunda", chineseName: "内斯托里·伊兰昆达", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 7, player: "Connor Metcalfe", chineseName: "康纳·梅特卡夫", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 7, player: "Felix Nmecha", chineseName: "费利克斯·恩梅查", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 7, player: "Livano Comenencia", chineseName: "利瓦诺·科梅嫩西亚", team: "库拉索", teamCode: "CUW", value: 1, matches: 1 },
  { rank: 7, player: "Nico Schlotterbeck", chineseName: "尼科·施洛特贝克", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 7, player: "Jamal Musiala", chineseName: "贾马尔·穆西亚拉", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 7, player: "Nathaniel Brown", chineseName: "纳撒尼尔·布朗", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 7, player: "Deniz Undav", chineseName: "德尼兹·翁达夫", team: "德国", teamCode: "GER", value: 1, matches: 1 },
  { rank: 7, player: "Virgil van Dijk", chineseName: "维吉尔·范戴克", team: "荷兰", teamCode: "NED", value: 1, matches: 1 },
  { rank: 7, player: "Keito Nakamura", chineseName: "中村敬斗", team: "日本", teamCode: "JPN", value: 1, matches: 1 },
  { rank: 7, player: "Crysencio Summerville", chineseName: "克里森西奥·萨默维尔", team: "荷兰", teamCode: "NED", value: 1, matches: 1 },
  { rank: 7, player: "Daichi Kamada", chineseName: "镰田大地", team: "日本", teamCode: "JPN", value: 1, matches: 1 },
  { rank: 7, player: "Amad Diallo", chineseName: "阿马德·迪亚洛", team: "科特迪瓦", teamCode: "CIV", value: 1, matches: 1 },
  { rank: 7, player: "Alexander Isak", chineseName: "亚历山大·伊萨克", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 7, player: "Omar Rekik", chineseName: "奥马尔·雷基克", team: "突尼斯", teamCode: "TUN", value: 1, matches: 1 },
  { rank: 7, player: "Viktor Gyokeres", chineseName: "维克托·约克雷斯", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 7, player: "Mattias Svanberg", chineseName: "马蒂亚斯·斯万贝里", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 7, player: "Emam Ashour", chineseName: "埃马姆·阿舒尔", team: "埃及", teamCode: "EGY", value: 1, matches: 1 },
  { rank: 7, player: "Abdulelah Alamri", chineseName: "阿卜杜勒拉·阿拉姆里", team: "沙特阿拉伯", teamCode: "KSA", value: 1, matches: 1 },
  { rank: 7, player: "Maxi Araujo", chineseName: "马克西·阿劳霍", team: "乌拉圭", teamCode: "URU", value: 1, matches: 1 },
  { rank: 7, player: "Ramin Rezaeian", chineseName: "拉明·雷扎伊安", team: "伊朗", teamCode: "IRN", value: 1, matches: 1 },
  { rank: 7, player: "Mohammad Mohebi", chineseName: "穆罕默德·莫赫比", team: "伊朗", teamCode: "IRN", value: 1, matches: 1 },
  { rank: 7, player: "Bradley Barcola", chineseName: "布拉德利·巴尔科拉", team: "法国", teamCode: "FRA", value: 1, matches: 1 },
  { rank: 7, player: "Ibrahim Mbaye", chineseName: "易卜拉欣·姆巴耶", team: "塞内加尔", teamCode: "SEN", value: 1, matches: 1 },
  { rank: 7, player: "Aymen Hussein", chineseName: "艾曼·侯赛因", team: "伊拉克", teamCode: "IRQ", value: 1, matches: 1 },
  { rank: 7, player: "Leo Ostigard", chineseName: "莱奥·厄斯蒂高", team: "挪威", teamCode: "NOR", value: 1, matches: 1 },
  { rank: 7, player: "Romano Schmid", chineseName: "罗马诺·施密德", team: "奥地利", teamCode: "AUT", value: 1, matches: 1 },
  { rank: 7, player: "Marko Arnautovic", chineseName: "马尔科·阿瑙托维奇", team: "奥地利", teamCode: "AUT", value: 1, matches: 1 },
  { rank: 7, player: "Musa Al-Taamari", chineseName: "穆萨·阿尔塔马里", team: "约旦", teamCode: "JOR", value: 1, matches: 1 },
  { rank: 7, player: "Bruno Fernandes", chineseName: "布鲁诺·费尔南德斯", team: "葡萄牙", teamCode: "POR", value: 1, matches: 1 },
  { rank: 7, player: "Yoane Wissa", chineseName: "约昂·维萨", team: "刚果民主共和国", teamCode: "COD", value: 1, matches: 1 },
  { rank: 7, player: "Harry Kane", chineseName: "哈里·凯恩", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 },
  { rank: 7, player: "Bukayo Saka", chineseName: "布卡约·萨卡", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 },
  { rank: 7, player: "Luka Modric", chineseName: "卢卡·莫德里奇", team: "克罗地亚", teamCode: "CRO", value: 1, matches: 1 }
];

export const assistsRanking: PlayerStat[] = [
  { rank: 1, player: "Ryan Gravenberch", chineseName: "赖恩·赫拉芬贝赫", team: "荷兰", teamCode: "NED", value: 2, matches: 1 },
  { rank: 1, player: "Chris Wood", chineseName: "克里斯·伍德", team: "新西兰", teamCode: "NZL", value: 2, matches: 1 },
  { rank: 1, player: "Michael Olise", chineseName: "迈克尔·奥利塞", team: "法国", teamCode: "FRA", value: 2, matches: 1 },
  { rank: 4, player: "Roberto Alvarado", chineseName: "罗伯托·阿尔瓦拉多", team: "墨西哥", teamCode: "MEX", value: 1, matches: 1 },
  { rank: 4, player: "Christian Pulisic", chineseName: "克里斯蒂安·普利西奇", team: "美国", teamCode: "USA", value: 1, matches: 1 },
  { rank: 4, player: "Inbeom Hwang", chineseName: "黄仁范", team: "韩国", teamCode: "KOR", value: 1, matches: 1 },
  { rank: 4, player: "Promise David", chineseName: "普罗米斯·戴维", team: "加拿大", teamCode: "CAN", value: 1, matches: 1 },
  { rank: 4, player: "Sead Kolasinac", chineseName: "塞亚德·科拉希纳茨", team: "波黑", teamCode: "BIH", value: 1, matches: 1 },
  { rank: 4, player: "Homam Ahmed", chineseName: "霍马姆·艾哈迈德", team: "卡塔尔", teamCode: "QAT", value: 1, matches: 1 },
  { rank: 4, player: "Brahim Diaz", chineseName: "卜拉欣·迪亚斯", team: "摩洛哥", teamCode: "MAR", value: 1, matches: 1 },
  { rank: 4, player: "Bruno Guimaraes", chineseName: "布鲁诺·吉马良斯", team: "巴西", teamCode: "BRA", value: 1, matches: 1 },
  { rank: 4, player: "Paul Okon-Engstler", chineseName: "保罗·奥孔-恩斯特勒", team: "澳大利亚", teamCode: "AUS", value: 1, matches: 1 },
  { rank: 4, player: "Viktor Gyokeres", chineseName: "维克托·约克雷斯", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 4, player: "Hannibal Mejbri", chineseName: "汉尼拔·梅布里", team: "突尼斯", teamCode: "TUN", value: 1, matches: 1 },
  { rank: 4, player: "Alexander Isak", chineseName: "亚历山大·伊萨克", team: "瑞典", teamCode: "SWE", value: 1, matches: 1 },
  { rank: 4, player: "Mohamed Salah", chineseName: "穆罕默德·萨拉赫", team: "埃及", teamCode: "EGY", value: 1, matches: 1 },
  { rank: 4, player: "Saman Ghoddos", chineseName: "萨曼·古多斯", team: "伊朗", teamCode: "IRN", value: 1, matches: 1 },
  { rank: 4, player: "Adrien Rabiot", chineseName: "阿德里安·拉比奥", team: "法国", teamCode: "FRA", value: 1, matches: 1 },
  { rank: 4, player: "David Moller Wolfe", chineseName: "大卫·默勒·沃尔夫", team: "挪威", teamCode: "NOR", value: 1, matches: 1 },
  { rank: 4, player: "Amir Al-Ammari", chineseName: "阿米尔·阿拉马里", team: "伊拉克", teamCode: "IRQ", value: 1, matches: 1 },
  { rank: 4, player: "Bernardo Silva", chineseName: "贝尔纳多·席尔瓦", team: "葡萄牙", teamCode: "POR", value: 1, matches: 1 },
  { rank: 4, player: "Joao Felix", chineseName: "若昂·费利克斯", team: "葡萄牙", teamCode: "POR", value: 1, matches: 1 },
  { rank: 4, player: "Declan Rice", chineseName: "德克兰·赖斯", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 },
  { rank: 4, player: "Jude Bellingham", chineseName: "祖德·贝林厄姆", team: "英格兰", teamCode: "ENG", value: 1, matches: 1 }
];

export const statsNotice = {
    title: "第 21-22 场赛果已更新",
    body: "已补入葡萄牙 3-1 刚果民主共和国（C罗 2球、B费 1球）、英格兰 2-1 克罗地亚（凯恩、萨卡、莫德里奇）；K组/L组积分榜已更新。"
  };
