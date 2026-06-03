export type RosterPlayer = {
  name: string;
  chineseName: string;
  position: "门将" | "后卫" | "中场" | "前锋";
  number?: number | "待核实";
};

export type TeamRoster = {
  teamCode: string;
  teamName: string;
  confirmed: boolean;
  publishedDate: string;
  source: string;
  sourceUrl: string;
  note?: string;
  players: RosterPlayer[];
};

export const officialSquadsNotice = {
  confirmedDate: "2026-06-02",
  source: "FIFA",
  sourceUrl: "https://www.fifa.com/en/articles/fifa-world-cup-2026-squads-confirmed",
  text: "FIFA 已确认 48 支参赛队的最终名单。"
};

const p = (
  name: string,
  chineseName: string,
  position: RosterPlayer["position"],
  number: RosterPlayer["number"] = "待核实"
): RosterPlayer => ({ name, chineseName, position, number });

export const teamRosters: Record<string, TeamRoster> = {
  MEX: {
    teamCode: "MEX",
    teamName: "墨西哥",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / El Financiero",
    sourceUrl: "https://www.elfinanciero.com.mx/deportes/2026/06/02/lista-de-convocados-de-mexico-en-mundial-2026-quienes-son-los-jugadores-de-seleccion-mexicana/",
    note: "A组东道主之一。墨西哥名单和球衣号码已公开，奥乔亚、希门尼斯、圣地亚哥·希门尼斯等人入选。",
    players: [
      { number: 1, name: "Raul Rangel", chineseName: "劳尔·兰赫尔", position: "门将" },
      { number: 12, name: "Carlos Acevedo", chineseName: "卡洛斯·阿塞韦多", position: "门将" },
      { number: 13, name: "Guillermo Ochoa", chineseName: "吉列尔莫·奥乔亚", position: "门将" },
      { number: 2, name: "Jorge Sanchez", chineseName: "豪尔赫·桑切斯", position: "后卫" },
      { number: 3, name: "Cesar Montes", chineseName: "塞萨尔·蒙特斯", position: "后卫" },
      { number: 5, name: "Johan Vasquez", chineseName: "约翰·巴斯克斯", position: "后卫" },
      { number: 15, name: "Israel Reyes", chineseName: "伊斯拉埃尔·雷耶斯", position: "后卫" },
      { number: 19, name: "Jesus Orozco Chiquete", chineseName: "赫苏斯·奥罗斯科·奇克特", position: "后卫" },
      { number: 22, name: "Jesus Gallardo", chineseName: "赫苏斯·加利亚多", position: "后卫" },
      { number: 23, name: "Rodrigo Huescas", chineseName: "罗德里戈·韦斯卡斯", position: "后卫" },
      { number: 4, name: "Edson Alvarez", chineseName: "埃德松·阿尔瓦雷斯", position: "中场" },
      { number: 6, name: "Erik Lira", chineseName: "埃里克·利拉", position: "中场" },
      { number: 7, name: "Luis Romo", chineseName: "路易斯·罗莫", position: "中场" },
      { number: 8, name: "Alvaro Fidalgo", chineseName: "阿尔瓦罗·菲达尔戈", position: "中场" },
      { number: 17, name: "Orbelin Pineda", chineseName: "奥尔韦林·皮内达", position: "中场" },
      { number: 18, name: "Obed Vargas", chineseName: "奥贝德·巴尔加斯", position: "中场" },
      { number: 20, name: "Gilberto Mora", chineseName: "希尔伯托·莫拉", position: "中场" },
      { number: 24, name: "Marcel Ruiz", chineseName: "马塞尔·鲁伊斯", position: "中场" },
      { number: 25, name: "Carlos Rodriguez", chineseName: "卡洛斯·罗德里格斯", position: "中场" },
      { number: 26, name: "Erick Sanchez", chineseName: "埃里克·桑切斯", position: "中场" },
      { number: 9, name: "Raul Jimenez", chineseName: "劳尔·希门尼斯", position: "前锋" },
      { number: 10, name: "Alexis Vega", chineseName: "亚历克西斯·贝加", position: "前锋" },
      { number: 11, name: "Santiago Gimenez", chineseName: "圣地亚哥·希门尼斯", position: "前锋" },
      { number: 14, name: "Armando Gonzalez", chineseName: "阿曼多·冈萨雷斯", position: "前锋" },
      { number: 16, name: "Julian Quinones", chineseName: "胡利安·基尼奥内斯", position: "前锋" },
      { number: 21, name: "Cesar Huerta", chineseName: "塞萨尔·韦尔塔", position: "前锋" }
    ]
  },
  RSA: {
    teamCode: "RSA",
    teamName: "南非",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA squad list",
    sourceUrl: "https://www.fifa.com/en/articles/fifa-world-cup-2026-squads-confirmed",
    note: "FIFA 已确认南非 26 人最终名单；当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Ronwen Williams", chineseName: "朗文·威廉姆斯", position: "门将" },
      { number: "待核实", name: "Sipho Chaine", chineseName: "西福·沙伊内", position: "门将" },
      { number: "待核实", name: "Ricardo Goss", chineseName: "里卡多·戈斯", position: "门将" },
      { number: "待核实", name: "Khuliso Mudau", chineseName: "库利索·穆道", position: "后卫" },
      { number: "待核实", name: "Nyiko Mobbie", chineseName: "尼科·莫比", position: "后卫" },
      { number: "待核实", name: "Mothobi Mvala", chineseName: "莫托比·姆瓦拉", position: "后卫" },
      { number: "待核实", name: "Grant Kekana", chineseName: "格兰特·凯卡纳", position: "后卫" },
      { number: "待核实", name: "Nkosinathi Sibisi", chineseName: "恩科西纳蒂·西比西", position: "后卫" },
      { number: "待核实", name: "Siyanda Xulu", chineseName: "西亚ンダ·祖鲁", position: "后卫" },
      { number: "待核实", name: "Aubrey Modiba", chineseName: "奥布里·莫迪巴", position: "后卫" },
      { number: "待核实", name: "Terrence Mashego", chineseName: "特伦斯·马谢戈", position: "后卫" },
      { number: "待核实", name: "Teboho Mokoena", chineseName: "特博霍·莫科纳", position: "中场" },
      { number: "待核实", name: "Sphephelo Sithole", chineseName: "斯费费洛·西托莱", position: "中场" },
      { number: "待核实", name: "Bathusi Aubaas", chineseName: "巴图西·奥巴斯", position: "中场" },
      { number: "待核实", name: "Thalente Mbatha", chineseName: "塔伦特·姆巴塔", position: "中场" },
      { number: "待核实", name: "Jayden Adams", chineseName: "杰登·亚当斯", position: "中场" },
      { number: "待核实", name: "Themba Zwane", chineseName: "滕巴·兹瓦内", position: "中场" },
      { number: "待核实", name: "Percy Tau", chineseName: "珀西·陶", position: "前锋" },
      { number: "待核实", name: "Evidence Makgopa", chineseName: "埃维登斯·马克戈帕", position: "前锋" },
      { number: "待核实", name: "Lyle Foster", chineseName: "莱尔·福斯特", position: "前锋" },
      { number: "待核实", name: "Zakhele Lepasa", chineseName: "扎赫莱·莱帕萨", position: "前锋" },
      { number: "待核实", name: "Iqraam Rayners", chineseName: "伊克拉姆·雷纳斯", position: "前锋" },
      { number: "待核实", name: "Oswin Appollis", chineseName: "奥斯温·阿波利斯", position: "前锋" },
      { number: "待核实", name: "Relebohile Mofokeng", chineseName: "雷勒博希莱·莫福肯", position: "前锋" },
      { number: "待核实", name: "Mihlali Mayambela", chineseName: "米赫拉利·马扬贝拉", position: "前锋" },
      { number: "待核实", name: "Sibongiseni Mthethwa", chineseName: "西邦吉塞尼·姆泰特瓦", position: "中场" }
    ]
  },
  KOR: {
    teamCode: "KOR",
    teamName: "韩国",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / KBS News",
    sourceUrl: "https://world.kbs.co.kr/service/news_view.htm?Seq_Code=192992&lang=e",
    note: "韩国最终名单已确认。公开报道明确提到孙兴慜7号、李刚仁19号、金玟哉4号、吴贤揆18号，其余号码待核实。",
    players: [
      { number: "待核实", name: "Jo Hyeon-woo", chineseName: "赵贤祐", position: "门将" },
      { number: "待核实", name: "Song Bum-keun", chineseName: "宋范根", position: "门将" },
      { number: "待核实", name: "Kim Seung-gyu", chineseName: "金承奎", position: "门将" },
      { number: 4, name: "Kim Min-jae", chineseName: "金玟哉", position: "后卫" },
      { number: "待核实", name: "Kim Young-gwon", chineseName: "金英权", position: "后卫" },
      { number: "待核实", name: "Jung Seung-hyun", chineseName: "郑昇炫", position: "后卫" },
      { number: "待核实", name: "Kim Moon-hwan", chineseName: "金纹奂", position: "后卫" },
      { number: "待核实", name: "Seol Young-woo", chineseName: "薛英佑", position: "后卫" },
      { number: "待核实", name: "Lee Myung-jae", chineseName: "李明载", position: "后卫" },
      { number: "待核实", name: "Cho Yu-min", chineseName: "赵佑民", position: "后卫" },
      { number: "待核实", name: "Hwang In-beom", chineseName: "黄仁范", position: "中场" },
      { number: "待核实", name: "Park Yong-woo", chineseName: "朴镕宇", position: "中场" },
      { number: "待核实", name: "Hong Hyun-seok", chineseName: "洪贤锡", position: "中场" },
      { number: "待核实", name: "Paik Seung-ho", chineseName: "白昇浩", position: "中场" },
      { number: 19, name: "Lee Kang-in", chineseName: "李刚仁", position: "中场" },
      { number: "待核实", name: "Lee Jae-sung", chineseName: "李在城", position: "中场" },
      { number: "待核实", name: "Jeong Woo-yeong", chineseName: "郑优营", position: "中场" },
      { number: "待核实", name: "Yang Hyun-jun", chineseName: "杨贤俊", position: "中场" },
      { number: 7, name: "Son Heung-min", chineseName: "孙兴慜", position: "前锋" },
      { number: "待核实", name: "Hwang Hee-chan", chineseName: "黄喜灿", position: "前锋" },
      { number: "待核实", name: "Cho Gue-sung", chineseName: "曹圭成", position: "前锋" },
      { number: 18, name: "Oh Hyeon-gyu", chineseName: "吴贤揆", position: "前锋" },
      { number: "待核实", name: "Joo Min-kyu", chineseName: "周敏圭", position: "前锋" },
      { number: "待核实", name: "Bae Jun-ho", chineseName: "裴峻浩", position: "中场" },
      { number: "待核实", name: "Um Won-sang", chineseName: "严原上", position: "前锋" },
      { number: "待核实", name: "Lee Han-beom", chineseName: "李汉汎", position: "后卫" }
    ]
  },
  CZE: {
    teamCode: "CZE",
    teamName: "捷克",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA squad list",
    sourceUrl: "https://www.fifa.com/en/articles/fifa-world-cup-2026-squads-confirmed",
    note: "FIFA 已确认捷克 26 人最终名单；当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Jindrich Stanek", chineseName: "因德日赫·斯塔涅克", position: "门将" },
      { number: "待核实", name: "Matej Kovar", chineseName: "马捷伊·科瓦日", position: "门将" },
      { number: "待核实", name: "Vitezslav Jaros", chineseName: "维捷斯拉夫·亚罗什", position: "门将" },
      { number: "待核实", name: "Vladimir Coufal", chineseName: "弗拉迪米尔·曹法尔", position: "后卫" },
      { number: "待核实", name: "David Zima", chineseName: "大卫·齐马", position: "后卫" },
      { number: "待核实", name: "Robin Hranac", chineseName: "罗宾·赫拉纳奇", position: "后卫" },
      { number: "待核实", name: "Ladislav Krejci", chineseName: "拉迪斯拉夫·克雷伊奇", position: "后卫" },
      { number: "待核实", name: "Tomas Holes", chineseName: "托马什·霍莱什", position: "后卫" },
      { number: "待核实", name: "Jaroslav Zeleny", chineseName: "雅罗斯拉夫·泽莱尼", position: "后卫" },
      { number: "待核实", name: "David Jurasek", chineseName: "大卫·尤拉塞克", position: "后卫" },
      { number: "待核实", name: "Tomas Soucek", chineseName: "托马什·绍切克", position: "中场" },
      { number: "待核实", name: "Alex Kral", chineseName: "亚历克斯·克拉尔", position: "中场" },
      { number: "待核实", name: "Michal Sadilek", chineseName: "米哈尔·萨迪莱克", position: "中场" },
      { number: "待核实", name: "Lukas Provod", chineseName: "卢卡什·普罗沃德", position: "中场" },
      { number: "待核实", name: "Antonin Barak", chineseName: "安东宁·巴拉克", position: "中场" },
      { number: "待核实", name: "Pavel Sulc", chineseName: "帕维尔·舒尔茨", position: "中场" },
      { number: "待核实", name: "Adam Hlozek", chineseName: "亚当·赫洛热克", position: "前锋" },
      { number: "待核实", name: "Patrik Schick", chineseName: "帕特里克·希克", position: "前锋" },
      { number: "待核实", name: "Mojmir Chytil", chineseName: "莫伊米尔·希蒂尔", position: "前锋" },
      { number: "待核实", name: "Vaclav Cerny", chineseName: "瓦茨拉夫·切尔尼", position: "前锋" },
      { number: "待核实", name: "Jan Kuchta", chineseName: "扬·库赫塔", position: "前锋" },
      { number: "待核实", name: "Ondrej Lingr", chineseName: "翁德热伊·林格尔", position: "中场" },
      { number: "待核实", name: "Matej Jurasek", chineseName: "马捷伊·尤拉塞克", position: "前锋" },
      { number: "待核实", name: "Lukas Cerv", chineseName: "卢卡什·切尔夫", position: "中场" },
      { number: "待核实", name: "Martin Vitik", chineseName: "马丁·维蒂克", position: "后卫" },
      { number: "待核实", name: "David Doudera", chineseName: "大卫·杜德拉", position: "后卫" }
    ]
  },
  CAN: {
    teamCode: "CAN",
    teamName: "加拿大",
    confirmed: true,
    publishedDate: "2026-05-29",
    source: "Canada Soccer / FourFourTwo",
    sourceUrl: "https://www.fourfourtwo.com/team/canada-world-cup-2026-squad",
    note: "加拿大最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Dayne St. Clair", chineseName: "戴恩·圣克莱尔", position: "门将" },
      { number: "待核实", name: "Maxime Crepeau", chineseName: "马克西姆·克雷波", position: "门将" },
      { number: "待核实", name: "Owen Goodman", chineseName: "欧文·古德曼", position: "门将" },
      { number: "待核实", name: "Moise Bombito", chineseName: "莫伊斯·邦比托", position: "后卫" },
      { number: "待核实", name: "Derek Cornelius", chineseName: "德里克·科尼利厄斯", position: "后卫" },
      { number: "待核实", name: "Alphonso Davies", chineseName: "阿方索·戴维斯", position: "后卫" },
      { number: "待核实", name: "Luc De Fougerolles", chineseName: "吕克·德富热罗勒", position: "后卫" },
      { number: "待核实", name: "Alistair Johnston", chineseName: "阿利斯泰尔·约翰斯顿", position: "后卫" },
      { number: "待核实", name: "Alfie Jones", chineseName: "阿尔菲·琼斯", position: "后卫" },
      { number: "待核实", name: "Richie Laryea", chineseName: "里奇·拉里亚", position: "后卫" },
      { number: "待核实", name: "Niko Sigur", chineseName: "尼科·西古尔", position: "后卫" },
      { number: "待核实", name: "Joel Waterman", chineseName: "乔尔·沃特曼", position: "后卫" },
      { number: "待核实", name: "Ali Ahmed", chineseName: "阿里·艾哈迈德", position: "中场" },
      { number: "待核实", name: "Tajon Buchanan", chineseName: "塔琼·布坎南", position: "中场" },
      { number: "待核实", name: "Mathieu Choiniere", chineseName: "马蒂厄·舒瓦尼耶", position: "中场" },
      { number: "待核实", name: "Stephen Eustaquio", chineseName: "斯蒂芬·欧斯塔基奥", position: "中场" },
      { number: "待核实", name: "Marcelo Flores", chineseName: "马塞洛·弗洛雷斯", position: "中场" },
      { number: "待核实", name: "Ismael Kone", chineseName: "伊斯梅尔·科内", position: "中场" },
      { number: "待核实", name: "Liam Millar", chineseName: "利亚姆·米勒", position: "中场" },
      { number: "待核实", name: "Jonathan Osorio", chineseName: "乔纳森·奥索里奥", position: "中场" },
      { number: "待核实", name: "Nathan Saliba", chineseName: "内森·萨利巴", position: "中场" },
      { number: "待核实", name: "Jacob Shaffelburg", chineseName: "雅各布·沙费尔伯格", position: "中场" },
      { number: "待核实", name: "Jonathan David", chineseName: "乔纳森·戴维", position: "前锋" },
      { number: "待核实", name: "Promise David", chineseName: "普罗米斯·戴维", position: "前锋" },
      { number: "待核实", name: "Cyle Larin", chineseName: "赛尔·拉林", position: "前锋" },
      { number: "待核实", name: "Tani Oluwaseyi", chineseName: "塔尼·奥卢瓦塞伊", position: "前锋" }
    ]
  },
  BIH: {
    teamCode: "BIH",
    teamName: "波黑",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "AS USA / FIFA",
    sourceUrl: "https://en.as.com/soccer/world-cup/bosnia-and-herzegovina-at-the-2026-world-cup-roster-list-players-group-and-schedule-f202606-n/",
    note: "波黑最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Mladen Jurkas", chineseName: "姆拉登·尤尔卡斯", position: "门将" },
      { number: "待核实", name: "Nikola Vasilj", chineseName: "尼科拉·瓦西利", position: "门将" },
      { number: "待核实", name: "Martin Zlomislic", chineseName: "马丁·兹洛米斯利奇", position: "门将" },
      { number: "待核实", name: "Nidal Celik", chineseName: "尼达尔·切利克", position: "后卫" },
      { number: "待核实", name: "Amar Dedic", chineseName: "阿马尔·德迪奇", position: "后卫" },
      { number: "待核实", name: "Dennis Hadzikadunic", chineseName: "丹尼斯·哈季卡杜尼奇", position: "后卫" },
      { number: "待核实", name: "Sead Kolasinac", chineseName: "塞亚德·科拉希纳茨", position: "后卫" },
      { number: "待核实", name: "Nikola Katic", chineseName: "尼科拉·卡蒂奇", position: "后卫" },
      { number: "待核实", name: "Tarik Muharemovic", chineseName: "塔里克·穆哈雷莫维奇", position: "后卫" },
      { number: "待核实", name: "Nihad Mujakic", chineseName: "尼哈德·穆亚基奇", position: "后卫" },
      { number: "待核实", name: "Stjepan Radeljic", chineseName: "斯捷潘·拉德利奇", position: "后卫" },
      { number: "待核实", name: "Ivan Basic", chineseName: "伊万·巴希奇", position: "中场" },
      { number: "待核实", name: "Dzenis Burnic", chineseName: "杰尼斯·布尔尼奇", position: "中场" },
      { number: "待核实", name: "Armin Gigovic", chineseName: "阿尔明·吉戈维奇", position: "中场" },
      { number: "待核实", name: "Amir Hadziahmetovic", chineseName: "阿米尔·哈季艾哈梅托维奇", position: "中场" },
      { number: "待核实", name: "Ermin Mahmic", chineseName: "埃尔明·马赫米奇", position: "中场" },
      { number: "待核实", name: "Amar Memic", chineseName: "阿马尔·梅米奇", position: "中场" },
      { number: "待核实", name: "Ivan Sunjic", chineseName: "伊万·舒尼奇", position: "中场" },
      { number: "待核实", name: "Benjamin Tahirovic", chineseName: "本亚明·塔希罗维奇", position: "中场" },
      { number: "待核实", name: "Kerim Alajbegovic", chineseName: "凯里姆·阿拉伊贝戈维奇", position: "前锋" },
      { number: "待核实", name: "Esmir Bajraktarevic", chineseName: "埃斯米尔·拜拉克塔雷维奇", position: "前锋" },
      { number: "待核实", name: "Samed Bazdar", chineseName: "萨梅德·巴日达尔", position: "前锋" },
      { number: "待核实", name: "Ermedin Demirovic", chineseName: "埃尔梅丁·德米罗维奇", position: "前锋" },
      { number: "待核实", name: "Edin Dzeko", chineseName: "埃丁·哲科", position: "前锋" },
      { number: "待核实", name: "Jovo Lukic", chineseName: "约沃·卢基奇", position: "前锋" },
      { number: "待核实", name: "Haris Tabakovic", chineseName: "哈里斯·塔巴科维奇", position: "前锋" }
    ]
  },
  QAT: {
    teamCode: "QAT",
    teamName: "卡塔尔",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "Qatar News Agency",
    sourceUrl: "https://qna.org.qa/en/news/news-details?id=2026-world-cup-qatar-coach-announces-final-squad&date=2/06/2026",
    note: "卡塔尔最终 26 人名单已由 QNA 公布。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Meshaal Barsham", chineseName: "梅沙尔·巴沙姆", position: "门将" },
      { number: "待核实", name: "Mahmoud Abunada", chineseName: "马哈茂德·阿布纳达", position: "门将" },
      { number: "待核实", name: "Salah Zakaria", chineseName: "萨拉赫·扎卡里亚", position: "门将" },
      { number: "待核实", name: "Pedro Miguel", chineseName: "佩德罗·米格尔", position: "后卫" },
      { number: "待核实", name: "Boualem Khoukhi", chineseName: "布阿莱姆·胡希", position: "后卫" },
      { number: "待核实", name: "Ayoub Al Aloui", chineseName: "阿尤布·阿拉维", position: "后卫" },
      { number: "待核实", name: "Al Hashmi Al Hussein", chineseName: "哈希米·侯赛因", position: "后卫" },
      { number: "待核实", name: "Sultan Al Braik", chineseName: "苏丹·布赖克", position: "后卫" },
      { number: "待核实", name: "Mohamed Al Mannai", chineseName: "穆罕默德·曼纳伊", position: "后卫" },
      { number: "待核实", name: "Lucas Mendes", chineseName: "卢卡斯·门德斯", position: "后卫" },
      { number: "待核实", name: "Homam Ahmed", chineseName: "霍马姆·艾哈迈德", position: "后卫" },
      { number: "待核实", name: "Ahmed Fathi", chineseName: "艾哈迈德·法蒂", position: "中场" },
      { number: "待核实", name: "Assim Madibo", chineseName: "阿西姆·马迪博", position: "中场" },
      { number: "待核实", name: "Jassem Jaber", chineseName: "贾西姆·贾比尔", position: "中场" },
      { number: "待核实", name: "Karim Boudiaf", chineseName: "卡里姆·布迪亚夫", position: "中场" },
      { number: "待核实", name: "Issa Lai", chineseName: "伊萨·莱", position: "中场" },
      { number: "待核实", name: "Abdulaziz Hatem", chineseName: "阿卜杜勒阿齐兹·哈特姆", position: "中场" },
      { number: "待核实", name: "Hassan Al Haydos", chineseName: "哈桑·海多斯", position: "中场" },
      { number: "待核实", name: "Ahmed Al Janhi", chineseName: "艾哈迈德·詹希", position: "前锋" },
      { number: "待核实", name: "Almoez Ali", chineseName: "阿尔莫埃兹·阿里", position: "前锋" },
      { number: "待核实", name: "Akram Afif", chineseName: "阿克拉姆·阿菲夫", position: "前锋" },
      { number: "待核实", name: "Edmilson Junior", chineseName: "埃德米尔森·儒尼奥尔", position: "前锋" },
      { number: "待核实", name: "Ahmed Alaa", chineseName: "艾哈迈德·阿拉", position: "前锋" },
      { number: "待核实", name: "Tahseen Mohammed", chineseName: "塔赫辛·穆罕默德", position: "前锋" },
      { number: "待核实", name: "Yusuf Abdurisag", chineseName: "优素福·阿卜杜里萨格", position: "前锋" },
      { number: "待核实", name: "Mohammed Muntari", chineseName: "穆罕默德·蒙塔里", position: "前锋" }
    ]
  },
  SUI: {
    teamCode: "SUI",
    teamName: "瑞士",
    confirmed: true,
    publishedDate: "2026-06-01",
    source: "Swiss Football Association",
    sourceUrl: "https://www.football.ch/Portaldata/27/Resources/dokumente/nationalteams/a-team/2026/Players_List_World_Cup_2026.pdf",
    note: "瑞士足协公布了世界杯 26 人名单、号码、俱乐部及国家队出场/进球数据。",
    players: [
      { number: 21, name: "Marvin Keller", chineseName: "马尔文·凯勒", position: "门将" },
      { number: 1, name: "Gregor Kobel", chineseName: "格雷戈尔·科贝尔", position: "门将" },
      { number: 12, name: "Yvon Mvogo", chineseName: "伊冯·姆沃戈", position: "门将" },
      { number: 5, name: "Manuel Akanji", chineseName: "曼努埃尔·阿坎吉", position: "后卫" },
      { number: 24, name: "Aurele Amenda", chineseName: "奥雷勒·阿门达", position: "后卫" },
      { number: 18, name: "Eray Comert", chineseName: "埃赖·居米尔特", position: "后卫" },
      { number: 4, name: "Nico Elvedi", chineseName: "尼科·埃尔维迪", position: "后卫" },
      { number: 25, name: "Luca Jaquez", chineseName: "卢卡·雅克斯", position: "后卫" },
      { number: 2, name: "Miro Muheim", chineseName: "米罗·穆海姆", position: "后卫" },
      { number: 13, name: "Ricardo Rodriguez", chineseName: "里卡多·罗德里格斯", position: "后卫" },
      { number: 3, name: "Silvan Widmer", chineseName: "西尔万·威德默", position: "后卫" },
      { number: 20, name: "Michel Aebischer", chineseName: "米歇尔·埃比舍尔", position: "中场" },
      { number: 8, name: "Remo Freuler", chineseName: "雷莫·弗罗伊勒", position: "中场" },
      { number: 14, name: "Ardon Jashari", chineseName: "阿尔东·雅沙里", position: "中场" },
      { number: 22, name: "Fabian Rieder", chineseName: "法比安·里德尔", position: "中场" },
      { number: 15, name: "Djibril Sow", chineseName: "吉布里尔·索乌", position: "中场" },
      { number: 10, name: "Granit Xhaka", chineseName: "格拉尼特·扎卡", position: "中场" },
      { number: 6, name: "Denis Zakaria", chineseName: "丹尼斯·扎卡里亚", position: "中场" },
      { number: 23, name: "Zeki Amdouni", chineseName: "泽基·阿姆杜尼", position: "前锋" },
      { number: 7, name: "Breel Embolo", chineseName: "布雷尔·恩博洛", position: "前锋" },
      { number: 16, name: "Christian Fassnacht", chineseName: "克里斯蒂安·法斯纳赫特", position: "前锋" },
      { number: 26, name: "Cedric Itten", chineseName: "塞德里克·伊滕", position: "前锋" },
      { number: 9, name: "Johan Manzambi", chineseName: "约翰·曼赞比", position: "前锋" },
      { number: 11, name: "Dan Ndoye", chineseName: "丹·恩多耶", position: "前锋" },
      { number: 19, name: "Noah Okafor", chineseName: "诺阿·奥卡福", position: "前锋" },
      { number: 17, name: "Ruben Vargas", chineseName: "鲁本·巴尔加斯", position: "前锋" }
    ]
  },
  BRA: {
    teamCode: "BRA",
    teamName: "巴西",
    confirmed: true,
    publishedDate: "2026-05-18",
    source: "Agencia Brasil / FourFourTwo",
    sourceUrl: "https://www.fourfourtwo.com/team/brazil-world-cup-2026-squad",
    note: "巴西最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Alisson", chineseName: "阿利松", position: "门将" },
      { number: "待核实", name: "Ederson", chineseName: "埃德森", position: "门将" },
      { number: "待核实", name: "Weverton", chineseName: "韦弗顿", position: "门将" },
      { number: "待核实", name: "Marquinhos", chineseName: "马尔基尼奥斯", position: "后卫" },
      { number: "待核实", name: "Danilo Luiz", chineseName: "达尼洛·路易斯", position: "后卫" },
      { number: "待核实", name: "Alex Sandro", chineseName: "阿莱士·桑德罗", position: "后卫" },
      { number: "待核实", name: "Gabriel Magalhaes", chineseName: "加布里埃尔·马加良斯", position: "后卫" },
      { number: "待核实", name: "Bremer", chineseName: "布雷默", position: "后卫" },
      { number: "待核实", name: "Wesley", chineseName: "韦斯利", position: "后卫" },
      { number: "待核实", name: "Roger Ibanez", chineseName: "罗热·伊巴涅斯", position: "后卫" },
      { number: "待核实", name: "Douglas Santos", chineseName: "道格拉斯·桑托斯", position: "后卫" },
      { number: "待核实", name: "Leo Pereira", chineseName: "莱奥·佩雷拉", position: "后卫" },
      { number: "待核实", name: "Casemiro", chineseName: "卡塞米罗", position: "中场" },
      { number: "待核实", name: "Lucas Paqueta", chineseName: "卢卡斯·帕奎塔", position: "中场" },
      { number: "待核实", name: "Bruno Guimaraes", chineseName: "布鲁诺·吉马良斯", position: "中场" },
      { number: "待核实", name: "Fabinho", chineseName: "法比尼奥", position: "中场" },
      { number: "待核实", name: "Danilo Santos", chineseName: "达尼洛·桑托斯", position: "中场" },
      { number: "待核实", name: "Neymar", chineseName: "内马尔", position: "前锋" },
      { number: "待核实", name: "Vinicius Junior", chineseName: "维尼修斯·儒尼奥尔", position: "前锋" },
      { number: "待核实", name: "Raphinha", chineseName: "拉菲尼亚", position: "前锋" },
      { number: "待核实", name: "Gabriel Martinelli", chineseName: "加布里埃尔·马丁内利", position: "前锋" },
      { number: "待核实", name: "Matheus Cunha", chineseName: "马特乌斯·库尼亚", position: "前锋" },
      { number: "待核实", name: "Endrick", chineseName: "恩德里克", position: "前锋" },
      { number: "待核实", name: "Luiz Henrique", chineseName: "路易斯·恩里克", position: "前锋" },
      { number: "待核实", name: "Igor Thiago", chineseName: "伊戈尔·蒂亚戈", position: "前锋" },
      { number: "待核实", name: "Rayan", chineseName: "拉扬", position: "前锋" }
    ]
  },
  MAR: {
    teamCode: "MAR",
    teamName: "摩洛哥",
    confirmed: true,
    publishedDate: "2026-05-27",
    source: "Morocco World News / FourFourTwo",
    sourceUrl: "https://www.fourfourtwo.com/team/morocco-world-cup-2026-squad",
    note: "摩洛哥最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Yassine Bounou", chineseName: "亚辛·布努", position: "门将" },
      { number: "待核实", name: "Munir El Kajoui", chineseName: "穆尼尔·穆罕默迪", position: "门将" },
      { number: "待核实", name: "Reda Tagnaouti", chineseName: "雷达·塔格诺提", position: "门将" },
      { number: "待核实", name: "Achraf Hakimi", chineseName: "阿什拉夫·哈基米", position: "后卫" },
      { number: "待核实", name: "Noussair Mazraoui", chineseName: "努塞尔·马兹拉维", position: "后卫" },
      { number: "待核实", name: "Anass Salah-Eddine", chineseName: "阿纳斯·萨拉赫-埃丁", position: "后卫" },
      { number: "待核实", name: "Youssef Belammari", chineseName: "优素福·贝拉马里", position: "后卫" },
      { number: "待核实", name: "Chadi Riad", chineseName: "沙迪·里亚德", position: "后卫" },
      { number: "待核实", name: "Nayef Aguerd", chineseName: "纳耶夫·阿格尔德", position: "后卫" },
      { number: "待核实", name: "Zakaria El Ouahdi", chineseName: "扎卡里亚·瓦赫迪", position: "后卫" },
      { number: "待核实", name: "Issa Diop", chineseName: "伊萨·迪奥普", position: "后卫" },
      { number: "待核实", name: "Redouane Halhal", chineseName: "雷杜安·哈尔哈尔", position: "后卫" },
      { number: "待核实", name: "Azzedine Ounahi", chineseName: "阿泽丁·乌纳希", position: "中场" },
      { number: "待核实", name: "Bilal El Khannouss", chineseName: "比拉尔·汉努斯", position: "中场" },
      { number: "待核实", name: "Samir El Mourabet", chineseName: "萨米尔·穆拉贝特", position: "中场" },
      { number: "待核实", name: "Sofyan Amrabat", chineseName: "索菲扬·阿姆拉巴特", position: "中场" },
      { number: "待核实", name: "Ismael Saibari", chineseName: "伊斯梅尔·塞巴里", position: "中场" },
      { number: "待核实", name: "Neil El Aynaoui", chineseName: "尼尔·艾纳维", position: "中场" },
      { number: "待核实", name: "Ayyoub Bouaddi", chineseName: "阿尤布·布阿迪", position: "中场" },
      { number: "待核实", name: "Abde Ezzalzouli", chineseName: "阿卜德·埃扎尔祖利", position: "前锋" },
      { number: "待核实", name: "Soufiane Rahimi", chineseName: "苏菲安·拉希米", position: "前锋" },
      { number: "待核实", name: "Brahim Diaz", chineseName: "卜拉欣·迪亚斯", position: "前锋" },
      { number: "待核实", name: "Ayoub El Kaabi", chineseName: "阿尤布·卡比", position: "前锋" },
      { number: "待核实", name: "Chemsdine Talbi", chineseName: "舍姆斯丁·塔尔比", position: "前锋" },
      { number: "待核实", name: "Gessime Yassine", chineseName: "杰西姆·亚辛", position: "前锋" },
      { number: "待核实", name: "Ayoube Amaimouni", chineseName: "阿尤布·阿迈穆尼", position: "前锋" }
    ]
  },
  HAI: {
    teamCode: "HAI",
    teamName: "海地",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "ge / FHF",
    sourceUrl: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/06/02/haiti-divulga-numeracao-da-copa-com-meia-da-premier-league-vestindo-a-camisa-10-veja-a-lista.ghtml",
    note: "海地已公布 26 人名单和完整球衣号码，贝勒加德身披 10 号，威尔逊·伊西多尔 18 号。",
    players: [
      { number: 1, name: "Johny Placide", chineseName: "约翰尼·普拉西德", position: "门将" },
      { number: 12, name: "Alexandre Pierre", chineseName: "亚历山大·皮埃尔", position: "门将" },
      { number: 23, name: "Josue Duverger", chineseName: "若苏埃·迪韦尔热", position: "门将" },
      { number: 2, name: "Carlens Arcus", chineseName: "卡伦斯·阿尔屈斯", position: "后卫" },
      { number: 3, name: "Keeto Thermoncy", chineseName: "基托·特蒙西", position: "后卫" },
      { number: 4, name: "Ricardo Ade", chineseName: "里卡多·阿德", position: "后卫" },
      { number: 5, name: "Hannes Delcroix", chineseName: "汉内斯·德尔克鲁瓦", position: "后卫" },
      { number: 8, name: "Martin Experience", chineseName: "马丁·埃克斯佩里昂斯", position: "后卫" },
      { number: 13, name: "Duke Lacroix", chineseName: "杜克·拉克鲁瓦", position: "后卫" },
      { number: 22, name: "Jean-Kevin Duverne", chineseName: "让-凯文·迪韦尔纳", position: "后卫" },
      { number: 24, name: "Wilguens Paugain", chineseName: "威尔根斯·波甘", position: "后卫" },
      { number: 6, name: "Carl Sainte", chineseName: "卡尔·圣特", position: "中场" },
      { number: 10, name: "Jean-Ricner Bellegarde", chineseName: "让-里克内尔·贝勒加德", position: "中场" },
      { number: 14, name: "Leverton Pierre", chineseName: "莱韦尔顿·皮埃尔", position: "中场" },
      { number: 17, name: "Danley Jean Jacques", chineseName: "丹利·让-雅克", position: "中场" },
      { number: 25, name: "Dominique Simon", chineseName: "多米尼克·西蒙", position: "中场" },
      { number: 26, name: "Woodensky Pierre", chineseName: "伍登斯基·皮埃尔", position: "中场" },
      { number: 7, name: "Derrick Etienne Jr.", chineseName: "德里克·埃蒂安", position: "前锋" },
      { number: 9, name: "Duckens Nazon", chineseName: "杜肯斯·纳宗", position: "前锋" },
      { number: 11, name: "Louicius Deedson", chineseName: "路易修斯·迪德森", position: "前锋" },
      { number: 15, name: "Ruben Providence", chineseName: "鲁本·普罗维登斯", position: "前锋" },
      { number: 16, name: "Lenny Joseph", chineseName: "莱尼·约瑟夫", position: "前锋" },
      { number: 18, name: "Wilson Isidor", chineseName: "威尔逊·伊西多尔", position: "前锋" },
      { number: 19, name: "Yassin Fortune", chineseName: "亚辛·福尔蒂内", position: "前锋" },
      { number: 20, name: "Frantzdy Pierrot", chineseName: "弗朗茨迪·皮埃罗", position: "前锋" },
      { number: 21, name: "Josue Casimir", chineseName: "若苏埃·卡西米尔", position: "前锋" }
    ]
  },
  SCO: {
    teamCode: "SCO",
    teamName: "苏格兰",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "Sky Sports / FourFourTwo",
    sourceUrl: "https://www.skysports.com/football/news/12017/13550179/world-cup-2026-scotland-squad-numbers-revealed-with-angus-gunn-handed-no-1-jersey-ahead-of-craig-gordon",
    note: "苏格兰已公布完整球衣号码。安格斯·冈恩 1 号，罗伯逊 3 号，麦克托米奈 4 号，麦金 7 号。",
    players: [
      { number: 1, name: "Angus Gunn", chineseName: "安格斯·冈恩", position: "门将" },
      { number: 12, name: "Liam Kelly", chineseName: "利亚姆·凯利", position: "门将" },
      { number: 21, name: "Craig Gordon", chineseName: "克雷格·戈登", position: "门将" },
      { number: 2, name: "Aaron Hickey", chineseName: "阿伦·希基", position: "后卫" },
      { number: 3, name: "Andy Robertson", chineseName: "安迪·罗伯逊", position: "后卫" },
      { number: 5, name: "Grant Hanley", chineseName: "格兰特·汉利", position: "后卫" },
      { number: 6, name: "Kieran Tierney", chineseName: "基兰·蒂尔尼", position: "后卫" },
      { number: 13, name: "Jack Hendry", chineseName: "杰克·亨德里", position: "后卫" },
      { number: 15, name: "John Souttar", chineseName: "约翰·苏塔尔", position: "后卫" },
      { number: 16, name: "Dominic Hyam", chineseName: "多米尼克·海姆", position: "后卫" },
      { number: 22, name: "Nathan Patterson", chineseName: "内森·帕特森", position: "后卫" },
      { number: 24, name: "Anthony Ralston", chineseName: "安东尼·拉尔斯顿", position: "后卫" },
      { number: 26, name: "Scott McKenna", chineseName: "斯科特·麦肯纳", position: "后卫" },
      { number: 4, name: "Scott McTominay", chineseName: "斯科特·麦克托米奈", position: "中场" },
      { number: 7, name: "John McGinn", chineseName: "约翰·麦金", position: "中场" },
      { number: 8, name: "Tyler Fletcher", chineseName: "泰勒·弗莱彻", position: "中场" },
      { number: 11, name: "Ryan Christie", chineseName: "瑞安·克里斯蒂", position: "中场" },
      { number: 17, name: "Ben Gannon-Doak", chineseName: "本·甘农-多克", position: "中场" },
      { number: 19, name: "Lewis Ferguson", chineseName: "刘易斯·弗格森", position: "中场" },
      { number: 23, name: "Kenny McLean", chineseName: "肯尼·麦克莱恩", position: "中场" },
      { number: 25, name: "Findlay Curtis", chineseName: "芬德利·柯蒂斯", position: "中场" },
      { number: 9, name: "Lyndon Dykes", chineseName: "林登·戴克斯", position: "前锋" },
      { number: 10, name: "Che Adams", chineseName: "切·亚当斯", position: "前锋" },
      { number: 14, name: "Ross Stewart", chineseName: "罗斯·斯图尔特", position: "前锋" },
      { number: 18, name: "George Hirst", chineseName: "乔治·赫斯特", position: "前锋" },
      { number: 20, name: "Lawrence Shankland", chineseName: "劳伦斯·尚克兰", position: "前锋" }
    ]
  },
  USA: {
    teamCode: "USA",
    teamName: "美国",
    confirmed: true,
    publishedDate: "2026-05-26",
    source: "NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "美国最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Chris Brady", chineseName: "克里斯·布雷迪", position: "门将" },
      { number: "待核实", name: "Matt Freese", chineseName: "马特·弗里斯", position: "门将" },
      { number: "待核实", name: "Matt Turner", chineseName: "马特·特纳", position: "门将" },
      { number: "待核实", name: "Max Arfsten", chineseName: "马克斯·阿夫斯滕", position: "后卫" },
      { number: "待核实", name: "Sergino Dest", chineseName: "塞尔吉尼奥·德斯特", position: "后卫" },
      { number: "待核实", name: "Alex Freeman", chineseName: "亚历克斯·弗里曼", position: "后卫" },
      { number: "待核实", name: "Mark McKenzie", chineseName: "马克·麦肯齐", position: "后卫" },
      { number: "待核实", name: "Tim Ream", chineseName: "蒂姆·里姆", position: "后卫" },
      { number: "待核实", name: "Chris Richards", chineseName: "克里斯·理查兹", position: "后卫" },
      { number: "待核实", name: "Antonee Robinson", chineseName: "安东尼·罗宾逊", position: "后卫" },
      { number: "待核实", name: "Miles Robinson", chineseName: "迈尔斯·罗宾逊", position: "后卫" },
      { number: "待核实", name: "Joe Scally", chineseName: "乔·斯卡利", position: "后卫" },
      { number: "待核实", name: "Auston Trusty", chineseName: "奥斯顿·特拉斯蒂", position: "后卫" },
      { number: "待核实", name: "Brenden Aaronson", chineseName: "布伦登·阿伦森", position: "中场" },
      { number: "待核实", name: "Tyler Adams", chineseName: "泰勒·亚当斯", position: "中场" },
      { number: "待核实", name: "Sebastian Berhalter", chineseName: "塞巴斯蒂安·贝哈尔特", position: "中场" },
      { number: "待核实", name: "Weston McKennie", chineseName: "韦斯顿·麦肯尼", position: "中场" },
      { number: "待核实", name: "Christian Pulisic", chineseName: "克里斯蒂安·普利西奇", position: "中场" },
      { number: "待核实", name: "Gio Reyna", chineseName: "吉奥·雷纳", position: "中场" },
      { number: "待核实", name: "Cristian Roldan", chineseName: "克里斯蒂安·罗尔丹", position: "中场" },
      { number: "待核实", name: "Malik Tillman", chineseName: "马利克·蒂尔曼", position: "中场" },
      { number: "待核实", name: "Tim Weah", chineseName: "蒂姆·维阿", position: "中场" },
      { number: "待核实", name: "Alejandro Zendejas", chineseName: "亚历杭德罗·森德哈斯", position: "中场" },
      { number: "待核实", name: "Folarin Balogun", chineseName: "福拉林·巴洛贡", position: "前锋" },
      { number: "待核实", name: "Ricardo Pepi", chineseName: "里卡多·佩皮", position: "前锋" },
      { number: "待核实", name: "Haji Wright", chineseName: "哈吉·赖特", position: "前锋" }
    ]
  },
  PAR: {
    teamCode: "PAR",
    teamName: "巴拉圭",
    confirmed: true,
    publishedDate: "2026-05-30",
    source: "FIFA Watch",
    sourceUrl: "https://fifawatch.com/en/live/squad/paraguay/",
    note: "巴拉圭最终 26 人名单已确认。FIFA Watch 列出了部分号码；未列号码的球员暂标为待核实。",
    players: [
      { number: "待核实", name: "Carlos Coronel", chineseName: "卡洛斯·科罗内尔", position: "门将" },
      { number: "待核实", name: "Gaston Olveira", chineseName: "加斯顿·奥尔韦拉", position: "门将" },
      { number: "待核实", name: "Juan Espinola", chineseName: "胡安·埃斯皮诺拉", position: "门将" },
      { number: "待核实", name: "Orlando Gill", chineseName: "奥兰多·吉尔", position: "门将" },
      { number: 2, name: "Gustavo Gomez", chineseName: "古斯塔沃·戈麦斯", position: "后卫" },
      { number: 3, name: "Omar Alderete", chineseName: "奥马尔·阿尔德雷特", position: "后卫" },
      { number: 4, name: "Fabian Balbuena", chineseName: "法比安·巴尔武埃纳", position: "后卫" },
      { number: 6, name: "Junior Alonso", chineseName: "朱尼奥尔·阿隆索", position: "后卫" },
      { number: "待核实", name: "Alan Benitez", chineseName: "阿兰·贝尼特斯", position: "后卫" },
      { number: "待核实", name: "Blas Riveros", chineseName: "布拉斯·里韦罗斯", position: "后卫" },
      { number: "待核实", name: "Gustavo Velazquez", chineseName: "古斯塔沃·贝拉斯克斯", position: "后卫" },
      { number: "待核实", name: "Juan Jose Caceres", chineseName: "胡安·何塞·卡塞雷斯", position: "后卫" },
      { number: 5, name: "Andres Cubas", chineseName: "安德烈斯·库巴斯", position: "中场" },
      { number: 10, name: "Miguel Almiron", chineseName: "米格尔·阿尔米隆", position: "中场" },
      { number: 13, name: "Mathias Villasanti", chineseName: "马蒂亚斯·比利亚桑蒂", position: "中场" },
      { number: 18, name: "Diego Gomez", chineseName: "迭戈·戈麦斯", position: "中场" },
      { number: "待核实", name: "Braian Ojeda", chineseName: "布赖恩·奥赫达", position: "中场" },
      { number: "待核实", name: "Damian Bobadilla", chineseName: "达米安·博瓦迪利亚", position: "中场" },
      { number: "待核实", name: "Matias Galarza", chineseName: "马蒂亚斯·加拉尔萨", position: "中场" },
      { number: 7, name: "Julio Enciso", chineseName: "胡利奥·恩西索", position: "前锋" },
      { number: 9, name: "Adam Bareiro", chineseName: "亚当·巴雷罗", position: "前锋" },
      { number: 17, name: "Ramon Sosa", chineseName: "拉蒙·索萨", position: "前锋" },
      { number: 22, name: "Alex Arce", chineseName: "亚历克斯·阿尔塞", position: "前锋" },
      { number: "待核实", name: "Antonio Sanabria", chineseName: "安东尼奥·萨纳夫里亚", position: "前锋" },
      { number: "待核实", name: "Gustavo Caballero", chineseName: "古斯塔沃·卡瓦列罗", position: "前锋" },
      { number: "待核实", name: "Isidro Pitta", chineseName: "伊西德罗·皮塔", position: "前锋" }
    ]
  },
  AUS: {
    teamCode: "AUS",
    teamName: "澳大利亚",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "NBC Sports / FourFourTwo",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "澳大利亚最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Mat Ryan", chineseName: "马特·瑞安", position: "门将" },
      { number: "待核实", name: "Paul Izzo", chineseName: "保罗·伊佐", position: "门将" },
      { number: "待核实", name: "Patrick Beach", chineseName: "帕特里克·比奇", position: "门将" },
      { number: "待核实", name: "Aziz Behich", chineseName: "阿齐兹·贝希奇", position: "后卫" },
      { number: "待核实", name: "Jordan Bos", chineseName: "乔丹·博斯", position: "后卫" },
      { number: "待核实", name: "Cameron Burgess", chineseName: "卡梅伦·伯吉斯", position: "后卫" },
      { number: "待核实", name: "Alessandro Circati", chineseName: "亚历山德罗·奇尔卡蒂", position: "后卫" },
      { number: "待核实", name: "Milos Degenek", chineseName: "米洛什·德格内克", position: "后卫" },
      { number: "待核实", name: "Jason Geria", chineseName: "杰森·格里亚", position: "后卫" },
      { number: "待核实", name: "Lucas Herrington", chineseName: "卢卡斯·赫林顿", position: "后卫" },
      { number: "待核实", name: "Jacob Italiano", chineseName: "雅各布·伊塔利亚诺", position: "后卫" },
      { number: "待核实", name: "Harry Souttar", chineseName: "哈里·苏塔尔", position: "后卫" },
      { number: "待核实", name: "Kai Trewin", chineseName: "凯·特雷温", position: "后卫" },
      { number: "待核实", name: "Cameron Devlin", chineseName: "卡梅伦·德夫林", position: "中场" },
      { number: "待核实", name: "Ajdin Hrustic", chineseName: "艾丁·赫鲁斯蒂奇", position: "中场" },
      { number: "待核实", name: "Jackson Irvine", chineseName: "杰克逊·欧文", position: "中场" },
      { number: "待核实", name: "Connor Metcalfe", chineseName: "康纳·梅特卡夫", position: "中场" },
      { number: "待核实", name: "Louis Okon-Englster", chineseName: "路易斯·奥孔-英格尔斯特", position: "中场" },
      { number: "待核实", name: "Aiden O'Neill", chineseName: "艾登·奥尼尔", position: "中场" },
      { number: "待核实", name: "Nestory Irankunda", chineseName: "内斯托里·伊兰昆达", position: "前锋" },
      { number: "待核实", name: "Mathew Leckie", chineseName: "马修·莱基", position: "前锋" },
      { number: "待核实", name: "Awer Mabil", chineseName: "阿韦尔·马比尔", position: "前锋" },
      { number: "待核实", name: "Mohamed Toure", chineseName: "穆罕默德·图雷", position: "前锋" },
      { number: "待核实", name: "Nishan Velupillay", chineseName: "尼尚·韦卢皮莱", position: "前锋" },
      { number: "待核实", name: "Cristian Volpato", chineseName: "克里斯蒂安·沃尔帕托", position: "前锋" },
      { number: "待核实", name: "Kusini Yengi", chineseName: "库西尼·延吉", position: "前锋" }
    ]
  },
  TUR: {
    teamCode: "TUR",
    teamName: "土耳其",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "Türkiye Today / İdman.Biz",
    sourceUrl: "https://www.turkiyetoday.com/sports/turkiye-names-26-man-squad-for-2026-fifa-world-cup-after-final-cuts-3221129",
    note: "土耳其最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      { number: "待核实", name: "Altay Bayindir", chineseName: "阿尔泰·巴因迪尔", position: "门将" },
      { number: "待核实", name: "Mert Gunok", chineseName: "梅尔特·居诺克", position: "门将" },
      { number: "待核实", name: "Ugurcan Cakir", chineseName: "乌尔詹·恰克尔", position: "门将" },
      { number: "待核实", name: "Abdulkerim Bardakci", chineseName: "阿卜杜勒凯里姆·巴尔达克奇", position: "后卫" },
      { number: "待核实", name: "Caglar Soyuncu", chineseName: "恰拉尔·瑟云聚", position: "后卫" },
      { number: "待核实", name: "Eren Elmali", chineseName: "埃伦·埃尔马勒", position: "后卫" },
      { number: "待核实", name: "Ferdi Kadioglu", chineseName: "费尔迪·卡迪奥卢", position: "后卫" },
      { number: "待核实", name: "Merih Demiral", chineseName: "梅里赫·德米拉尔", position: "后卫" },
      { number: "待核实", name: "Mert Muldur", chineseName: "梅尔特·米尔迪尔", position: "后卫" },
      { number: "待核实", name: "Ozan Kabak", chineseName: "奥赞·卡巴克", position: "后卫" },
      { number: "待核实", name: "Samet Akaydin", chineseName: "萨梅特·阿卡伊丁", position: "后卫" },
      { number: "待核实", name: "Zeki Celik", chineseName: "泽基·切利克", position: "后卫" },
      { number: "待核实", name: "Hakan Calhanoglu", chineseName: "哈坎·恰尔汗奥卢", position: "中场" },
      { number: "待核实", name: "Ismail Yuksek", chineseName: "伊斯梅尔·于克塞克", position: "中场" },
      { number: "待核实", name: "Kaan Ayhan", chineseName: "卡安·艾汉", position: "中场" },
      { number: "待核实", name: "Orkun Kokcu", chineseName: "奥尔昆·科克曲", position: "中场" },
      { number: "待核实", name: "Salih Ozcan", chineseName: "萨利赫·厄兹詹", position: "中场" },
      { number: "待核实", name: "Arda Guler", chineseName: "阿尔达·居莱尔", position: "中场" },
      { number: "待核实", name: "Irfan Can Kahveci", chineseName: "伊尔凡·詹·卡赫韦奇", position: "中场" },
      { number: "待核实", name: "Oguz Aydin", chineseName: "奥乌兹·艾丁", position: "中场" },
      { number: "待核实", name: "Yunus Akgun", chineseName: "尤努斯·阿克金", position: "中场" },
      { number: "待核实", name: "Baris Alper Yilmaz", chineseName: "巴里什·阿尔佩尔·耶尔马兹", position: "前锋" },
      { number: "待核实", name: "Can Uzun", chineseName: "詹·乌尊", position: "前锋" },
      { number: "待核实", name: "Deniz Gul", chineseName: "德尼兹·居尔", position: "前锋" },
      { number: "待核实", name: "Kenan Yildiz", chineseName: "凯南·伊尔迪兹", position: "前锋" },
      { number: "待核实", name: "Kerem Akturkoglu", chineseName: "凯雷姆·阿克蒂尔科奥卢", position: "前锋" }
    ]
  },
  GER: {
    teamCode: "GER",
    teamName: "德国",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "德国最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Manuel Neuer", "曼努埃尔·诺伊尔", "门将"), p("Marc-Andre ter Stegen", "马克-安德烈·特尔施特根", "门将"), p("Oliver Baumann", "奥利弗·鲍曼", "门将"),
      p("Antonio Rudiger", "安东尼奥·吕迪格", "后卫"), p("Jonathan Tah", "约纳坦·塔", "后卫"), p("Nico Schlotterbeck", "尼科·施洛特贝克", "后卫"), p("Waldemar Anton", "瓦尔德马·安东", "后卫"), p("David Raum", "大卫·劳姆", "后卫"), p("Benjamin Henrichs", "本亚明·亨里希斯", "后卫"), p("Joshua Kimmich", "约书亚·基米希", "后卫"), p("Maximilian Mittelstadt", "马克西米利安·米特尔施泰特", "后卫"), p("Robin Koch", "罗宾·科赫", "后卫"),
      p("Robert Andrich", "罗伯特·安德里希", "中场"), p("Leon Goretzka", "莱昂·格雷茨卡", "中场"), p("Aleksandar Pavlovic", "亚历山大·帕夫洛维奇", "中场"), p("Florian Wirtz", "弗洛里安·维尔茨", "中场"), p("Jamal Musiala", "贾马尔·穆西亚拉", "中场"), p("Pascal Gross", "帕斯卡尔·格罗斯", "中场"), p("Chris Fuhrich", "克里斯·菲里希", "中场"),
      p("Kai Havertz", "凯·哈弗茨", "前锋"), p("Niclas Fullkrug", "尼克拉斯·菲尔克鲁格", "前锋"), p("Leroy Sane", "勒鲁瓦·萨内", "前锋"), p("Serge Gnabry", "塞尔吉·格纳布里", "前锋"), p("Deniz Undav", "德尼兹·翁达夫", "前锋"), p("Karim Adeyemi", "卡里姆·阿德耶米", "前锋"), p("Maximilian Beier", "马克西米利安·拜尔", "前锋")
    ]
  },
  CUW: {
    teamCode: "CUW",
    teamName: "库拉索",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "库拉索最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Eloy Room", "埃洛伊·罗姆", "门将"), p("Tyrick Bodak", "泰里克·博达克", "门将"), p("Trevor Doornbusch", "特雷弗·多恩布施", "门将"),
      p("Cuco Martina", "库科·马丁纳", "后卫"), p("Jurien Gaari", "尤里恩·加里", "后卫"), p("Sherel Floranus", "谢雷尔·弗洛拉努斯", "后卫"), p("Roshon van Eijma", "罗雄·范艾马", "后卫"), p("Gervane Kastaneer", "热尔瓦内·卡斯塔内尔", "后卫"), p("Darryl Lachman", "达里尔·拉赫曼", "后卫"), p("Juriën Gaari", "尤里恩·加里", "后卫"), p("Shurandy Sambo", "舒兰迪·桑博", "后卫"),
      p("Vurnon Anita", "弗农·阿尼塔", "中场"), p("Leandro Bacuna", "莱安德罗·巴库纳", "中场"), p("Juninho Bacuna", "朱尼尼奥·巴库纳", "中场"), p("Godfried Roemeratoe", "戈德弗里德·鲁梅拉托", "中场"), p("Jearl Margaritha", "耶尔·马加里塔", "中场"), p("Brandley Kuwas", "布兰德利·库瓦斯", "中场"), p("Jeremy Antonisse", "杰里米·安托尼斯", "中场"),
      p("Rangelo Janga", "兰赫洛·扬加", "前锋"), p("Kenji Gorre", "肯吉·戈雷", "前锋"), p("Richairo Zivkovic", "里沙伊罗·日夫科维奇", "前锋"), p("Jarchinio Antonia", "雅尔奇尼奥·安东尼亚", "前锋"), p("Elson Hooi", "埃尔森·霍伊", "前锋"), p("Gevaro Nepomuceno", "赫瓦罗·内波穆塞诺", "前锋"), p("Gino van Kessel", "吉诺·范凯塞尔", "前锋"), p("Charlison Benschop", "查利森·本斯霍普", "前锋")
    ]
  },
  CIV: {
    teamCode: "CIV",
    teamName: "科特迪瓦",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "科特迪瓦最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Yahia Fofana", "亚希亚·福法纳", "门将"), p("Badra Ali Sangare", "巴德拉·阿里·桑加雷", "门将"), p("Ira Tape", "伊拉·塔佩", "门将"),
      p("Willy Boly", "威利·博利", "后卫"), p("Evan Ndicka", "埃万·恩迪卡", "后卫"), p("Odilon Kossounou", "奥迪隆·科苏努", "后卫"), p("Ousmane Diomande", "奥斯曼·迪奥曼德", "后卫"), p("Wilfried Singo", "威尔弗里德·辛戈", "后卫"), p("Ghislain Konan", "吉斯兰·科南", "后卫"), p("Serge Aurier", "塞尔日·奥里耶", "后卫"), p("Emmanuel Agbadou", "埃马纽埃尔·阿格巴杜", "后卫"),
      p("Franck Kessie", "弗兰克·凯西", "中场"), p("Seko Fofana", "塞科·福法纳", "中场"), p("Ibrahim Sangare", "易卜拉欣·桑加雷", "中场"), p("Jean Michael Seri", "让-米夏埃尔·塞里", "中场"), p("Hamed Traore", "哈米德·特拉奥雷", "中场"), p("Lazare Amani", "拉扎尔·阿马尼", "中场"), p("Oumar Diakite", "乌马尔·迪亚基特", "中场"),
      p("Sebastien Haller", "塞巴斯蒂安·阿莱", "前锋"), p("Simon Adingra", "西蒙·阿丁格拉", "前锋"), p("Wilfried Zaha", "威尔弗里德·扎哈", "前锋"), p("Nicolas Pepe", "尼古拉·佩佩", "前锋"), p("Karim Konate", "卡里姆·科纳特", "前锋"), p("Christian Kouame", "克里斯蒂安·夸梅", "前锋"), p("Maxwel Cornet", "马克斯韦尔·科尔内", "前锋"), p("Jonathan Bamba", "若纳唐·班巴", "前锋")
    ]
  },
  ECU: {
    teamCode: "ECU",
    teamName: "厄瓜多尔",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "厄瓜多尔最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Hernan Galindez", "埃尔南·加林德斯", "门将"), p("Moises Ramirez", "莫伊塞斯·拉米雷斯", "门将"), p("Alexander Dominguez", "亚历山大·多明格斯", "门将"),
      p("Piero Hincapie", "皮耶罗·因卡皮耶", "后卫"), p("Willian Pacho", "威廉·帕乔", "后卫"), p("Felix Torres", "费利克斯·托雷斯", "后卫"), p("Pervis Estupinan", "佩尔维斯·埃斯图皮尼安", "后卫"), p("Angelo Preciado", "安赫洛·普雷西亚多", "后卫"), p("Robert Arboleda", "罗伯特·阿尔沃莱达", "后卫"), p("Joel Ordonez", "乔尔·奥多涅斯", "后卫"), p("Jackson Porozo", "杰克逊·波罗索", "后卫"),
      p("Moises Caicedo", "莫伊塞斯·凯塞多", "中场"), p("Alan Franco", "阿兰·弗朗科", "中场"), p("Carlos Gruezo", "卡洛斯·格鲁埃索", "中场"), p("Kendry Paez", "肯德里·派斯", "中场"), p("Jeremy Sarmiento", "杰里米·萨米恩托", "中场"), p("Joao Ortiz", "若昂·奥尔蒂斯", "中场"), p("Jose Cifuentes", "何塞·西富恩特斯", "中场"), p("Pedro Vite", "佩德罗·维特", "中场"),
      p("Enner Valencia", "恩纳·瓦伦西亚", "前锋"), p("Kevin Rodriguez", "凯文·罗德里格斯", "前锋"), p("Leonardo Campana", "莱昂纳多·坎帕纳", "前锋"), p("Gonzalo Plata", "贡萨洛·普拉塔", "前锋"), p("John Yeboah", "约翰·耶博阿", "前锋"), p("Alan Minda", "阿兰·明达", "前锋"), p("Angel Mena", "安赫尔·梅纳", "前锋")
    ]
  },
  NED: {
    teamCode: "NED",
    teamName: "荷兰",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "荷兰最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Bart Verbruggen", "巴特·费布鲁亨", "门将"), p("Mark Flekken", "马克·弗莱肯", "门将"), p("Justin Bijlow", "贾斯廷·拜洛", "门将"),
      p("Virgil van Dijk", "维吉尔·范戴克", "后卫"), p("Matthijs de Ligt", "马泰斯·德利赫特", "后卫"), p("Micky van de Ven", "米基·范德芬", "后卫"), p("Nathan Ake", "内森·阿克", "后卫"), p("Denzel Dumfries", "登泽尔·邓弗里斯", "后卫"), p("Jeremie Frimpong", "杰里米·弗林蓬", "后卫"), p("Jurrien Timber", "尤里恩·廷伯", "后卫"), p("Lutsharel Geertruida", "吕查雷尔·海特勒伊达", "后卫"), p("Quilindschy Hartman", "奎林奇·哈特曼", "后卫"),
      p("Frenkie de Jong", "弗ren基·德容", "中场"), p("Tijjani Reijnders", "蒂贾尼·赖因德斯", "中场"), p("Xavi Simons", "哈维·西蒙斯", "中场"), p("Ryan Gravenberch", "赖恩·赫拉芬贝赫", "中场"), p("Teun Koopmeiners", "特恩·库普梅纳斯", "中场"), p("Jerdy Schouten", "耶尔迪·斯豪滕", "中场"), p("Mats Wieffer", "马茨·维弗", "中场"),
      p("Memphis Depay", "孟菲斯·德佩", "前锋"), p("Cody Gakpo", "科迪·加克波", "前锋"), p("Donyell Malen", "唐耶尔·马伦", "前锋"), p("Noa Lang", "诺阿·朗", "前锋"), p("Wout Weghorst", "沃特·韦霍斯特", "前锋"), p("Brian Brobbey", "布赖恩·布罗贝伊", "前锋"), p("Joshua Zirkzee", "约书亚·齐尔克泽", "前锋")
    ]
  },
  JPN: {
    teamCode: "JPN",
    teamName: "日本",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "日本最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Zion Suzuki", "铃木彩艳", "门将"), p("Daiya Maekawa", "前川黛也", "门将"), p("Keisuke Osako", "大迫敬介", "门将"),
      p("Takehiro Tomiyasu", "富安健洋", "后卫"), p("Ko Itakura", "板仓滉", "后卫"), p("Hiroki Ito", "伊藤洋辉", "后卫"), p("Yukinari Sugawara", "菅原由势", "后卫"), p("Yuta Nakayama", "中山雄太", "后卫"), p("Shogo Taniguchi", "谷口彰悟", "后卫"), p("Seiya Maikuma", "毎熊晟矢", "后卫"), p("Koki Machida", "町田浩树", "后卫"),
      p("Wataru Endo", "远藤航", "中场"), p("Hidemasa Morita", "守田英正", "中场"), p("Ao Tanaka", "田中碧", "中场"), p("Daichi Kamada", "镰田大地", "中场"), p("Reo Hatate", "旗手怜央", "中场"), p("Takefusa Kubo", "久保建英", "中场"), p("Takumi Minamino", "南野拓实", "中场"), p("Ritsu Doan", "堂安律", "中场"),
      p("Kaoru Mitoma", "三笘薰", "前锋"), p("Daizen Maeda", "前田大然", "前锋"), p("Ayase Ueda", "上田绮世", "前锋"), p("Kyogo Furuhashi", "古桥亨梧", "前锋"), p("Junya Ito", "伊东纯也", "前锋"), p("Keito Nakamura", "中村敬斗", "前锋"), p("Mao Hosoya", "细谷真大", "前锋")
    ]
  },
  SWE: {
    teamCode: "SWE",
    teamName: "瑞典",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "瑞典最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Robin Olsen", "罗宾·奥尔森", "门将"), p("Viktor Johansson", "维克托·约翰松", "门将"), p("Jacob Widell Zetterstrom", "雅各布·维德尔·泽特斯特伦", "门将"),
      p("Victor Lindelof", "维克托·林德洛夫", "后卫"), p("Ludwig Augustinsson", "卢德维格·奥古斯丁松", "后卫"), p("Isak Hien", "伊萨克·希恩", "后卫"), p("Gabriel Gudmundsson", "加布里埃尔·古德蒙德松", "后卫"), p("Emil Krafth", "埃米尔·克拉夫特", "后卫"), p("Carl Starfelt", "卡尔·斯塔费尔特", "后卫"), p("Hjalmar Ekdal", "亚尔马尔·埃克达尔", "后卫"), p("Daniel Svensson", "丹尼尔·斯文松", "后卫"),
      p("Dejan Kulusevski", "德扬·库卢塞夫斯基", "中场"), p("Emil Forsberg", "埃米尔·福斯贝里", "中场"), p("Mattias Svanberg", "马蒂亚斯·斯万贝里", "中场"), p("Kristoffer Olsson", "克里斯托弗·奥尔松", "中场"), p("Jens Cajuste", "延斯·卡尤斯特", "中场"), p("Samuel Gustafson", "萨穆埃尔·古斯塔夫松", "中场"), p("Hugo Larsson", "雨果·拉尔松", "中场"), p("Sebastian Nanasi", "塞巴斯蒂安·纳纳西", "中场"),
      p("Alexander Isak", "亚历山大·伊萨克", "前锋"), p("Viktor Gyokeres", "维克托·约克雷斯", "前锋"), p("Anthony Elanga", "安东尼·埃兰加", "前锋"), p("Jesper Karlsson", "耶斯佩尔·卡尔松", "前锋"), p("Ken Sema", "肯·塞马", "前锋"), p("Jordan Larsson", "约丹·拉尔松", "前锋"), p("Robin Quaison", "罗宾·夸伊森", "前锋")
    ]
  },
  TUN: {
    teamCode: "TUN",
    teamName: "突尼斯",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "突尼斯最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Aymen Dahmen", "艾门·达门", "门将"), p("Bechir Ben Said", "贝希尔·本赛义德", "门将"), p("Mouez Hassen", "穆埃兹·哈桑", "门将"),
      p("Ali Abdi", "阿里·阿卜迪", "后卫"), p("Dylan Bronn", "迪伦·布龙", "后卫"), p("Yassine Meriah", "亚辛·梅里亚", "后卫"), p("Montassar Talbi", "蒙塔萨尔·塔尔比", "后卫"), p("Wajdi Kechrida", "瓦吉迪·凯赫里达", "后卫"), p("Nader Ghandri", "纳德尔·甘德里", "后卫"), p("Hamza Mathlouthi", "哈姆扎·马特卢西", "后卫"), p("Alaa Ghram", "阿拉·格拉姆", "后卫"),
      p("Ellyes Skhiri", "埃利耶斯·斯希里", "中场"), p("Aissa Laidouni", "艾萨·莱杜尼", "中场"), p("Hannibal Mejbri", "汉尼拔·梅布里", "中场"), p("Mohamed Ali Ben Romdhane", "穆罕默德·阿里·本罗姆丹", "中场"), p("Anis Ben Slimane", "阿尼斯·本斯利曼", "中场"), p("Ferjani Sassi", "费尔贾尼·萨西", "中场"), p("Ghailene Chaalali", "盖莱内·沙拉利", "中场"),
      p("Wahbi Khazri", "瓦赫比·哈兹里", "前锋"), p("Youssef Msakni", "优素福·姆萨克尼", "前锋"), p("Seifeddine Jaziri", "赛义夫丁·贾齐里", "前锋"), p("Taha Yassine Khenissi", "塔哈·亚辛·赫尼西", "前锋"), p("Elias Achouri", "埃利亚斯·阿舒里", "前锋"), p("Sayfallah Ltaief", "赛法拉·莱泰夫", "前锋"), p("Hamza Rafia", "哈姆扎·拉菲亚", "前锋"), p("Haythem Jouini", "海瑟姆·朱伊尼", "前锋")
    ]
  },
  BEL: {
    teamCode: "BEL",
    teamName: "比利时",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "比利时最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Thibaut Courtois", "蒂博·库尔图瓦", "门将"), p("Koen Casteels", "昆·卡斯特尔斯", "门将"), p("Matz Sels", "马茨·塞尔斯", "门将"),
      p("Jan Vertonghen", "扬·费尔通亨", "后卫"), p("Wout Faes", "沃特·费斯", "后卫"), p("Arthur Theate", "阿图尔·泰特", "后卫"), p("Zeno Debast", "泽诺·德巴斯特", "后卫"), p("Timothy Castagne", "蒂莫西·卡斯塔涅", "后卫"), p("Thomas Meunier", "托马斯·穆尼耶", "后卫"), p("Maxim De Cuyper", "马克西姆·德屈佩尔", "后卫"), p("Ameen Al-Dakhil", "阿明·达希勒", "后卫"),
      p("Kevin De Bruyne", "凯文·德布劳内", "中场"), p("Youri Tielemans", "尤里·蒂勒曼斯", "中场"), p("Amadou Onana", "阿马杜·奥纳纳", "中场"), p("Orel Mangala", "奥雷尔·曼加拉", "中场"), p("Aster Vranckx", "阿斯特·弗兰克斯", "中场"), p("Charles De Ketelaere", "查尔斯·德凯特拉雷", "中场"), p("Leandro Trossard", "莱安德罗·特罗萨德", "中场"),
      p("Romelu Lukaku", "罗梅卢·卢卡库", "前锋"), p("Jeremy Doku", "杰里米·多库", "前锋"), p("Dodi Lukebakio", "多迪·卢克巴基奥", "前锋"), p("Johan Bakayoko", "约翰·巴卡约科", "前锋"), p("Lois Openda", "洛伊斯·奥蓬达", "前锋"), p("Michy Batshuayi", "米奇·巴舒亚伊", "前锋"), p("Cyril Ngonge", "西里尔·恩贡热", "前锋"), p("Yari Verschaeren", "亚里·费尔斯哈伦", "前锋")
    ]
  },
  EGY: {
    teamCode: "EGY",
    teamName: "埃及",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "埃及最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Mohamed El Shenawy", "穆罕默德·埃尔谢纳维", "门将"), p("Mohamed Awad", "穆罕默德·阿瓦德", "门将"), p("Mostafa Shobeir", "穆斯塔法·舒贝尔", "门将"),
      p("Mohamed Abdelmonem", "穆罕默德·阿卜杜勒莫内姆", "后卫"), p("Ahmed Hegazi", "艾哈迈德·赫加齐", "后卫"), p("Omar Kamal", "奥马尔·卡马勒", "后卫"), p("Mohamed Hamdi", "穆罕默德·哈姆迪", "后卫"), p("Ahmed Ramadan Beckham", "艾哈迈德·拉马丹·贝克汉姆", "后卫"), p("Mohamed Hany", "穆罕默德·哈尼", "后卫"), p("Yasser Ibrahim", "亚西尔·易卜拉欣", "后卫"), p("Ahmed Fatouh", "艾哈迈德·法图赫", "后卫"),
      p("Mohamed Elneny", "穆罕默德·埃尔内尼", "中场"), p("Hamdi Fathi", "哈姆迪·法蒂", "中场"), p("Marwan Attia", "马尔万·阿提亚", "中场"), p("Emam Ashour", "埃马姆·阿舒尔", "中场"), p("Zizo", "齐佐", "中场"), p("Trezeguet", "特雷泽盖", "中场"), p("Mostafa Fathi", "穆斯塔法·法蒂", "中场"), p("Ibrahim Adel", "易卜拉欣·阿德尔", "中场"),
      p("Mohamed Salah", "穆罕默德·萨拉赫", "前锋"), p("Mostafa Mohamed", "穆斯塔法·穆罕默德", "前锋"), p("Omar Marmoush", "奥马尔·马尔穆什", "前锋"), p("Mahmoud Kahraba", "马哈茂德·卡赫拉巴", "前锋"), p("Ahmed Sayed Zizo", "艾哈迈德·赛义德·齐佐", "前锋"), p("Hossam Hassan", "霍萨姆·哈桑", "前锋"), p("Osama Faisal", "奥萨马·费萨尔", "前锋")
    ]
  },
  IRN: {
    teamCode: "IRN",
    teamName: "伊朗",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "伊朗最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Alireza Beiranvand", "阿里雷扎·贝兰万德", "门将"), p("Payam Niazmand", "佩亚姆·尼亚兹曼德", "门将"), p("Hossein Hosseini", "侯赛因·侯赛尼", "门将"),
      p("Morteza Pouraliganji", "莫尔特扎·普拉利甘吉", "后卫"), p("Shoja Khalilzadeh", "舒贾·哈利勒扎德", "后卫"), p("Hossein Kanaani", "侯赛因·卡纳尼", "后卫"), p("Milad Mohammadi", "米拉德·穆罕默迪", "后卫"), p("Sadegh Moharrami", "萨德格·莫哈拉米", "后卫"), p("Saleh Hardani", "萨利赫·哈达尼", "后卫"), p("Majid Hosseini", "马吉德·侯赛尼", "后卫"), p("Aref Gholami", "阿雷夫·戈拉米", "后卫"),
      p("Saeid Ezatolahi", "赛义德·埃扎托拉希", "中场"), p("Ahmad Nourollahi", "艾哈迈德·努罗拉希", "中场"), p("Saman Ghoddos", "萨曼·古多斯", "中场"), p("Ali Gholizadeh", "阿里·戈利扎德", "中场"), p("Mehdi Torabi", "迈赫迪·托拉比", "中场"), p("Omid Ebrahimi", "奥米德·易卜拉希米", "中场"), p("Mohammad Mohebi", "穆罕默德·莫赫比", "中场"), p("Yasin Salmani", "亚辛·萨勒马尼", "中场"),
      p("Mehdi Taremi", "迈赫迪·塔雷米", "前锋"), p("Sardar Azmoun", "萨达尔·阿兹蒙", "前锋"), p("Karim Ansarifard", "卡里姆·安萨里法德", "前锋"), p("Shahriar Moghanlou", "沙赫里亚尔·莫甘卢", "前锋"), p("Allahyar Sayyadmanesh", "阿拉赫亚尔·萨亚德马内什", "前锋"), p("Reza Asadi", "礼萨·阿萨迪", "前锋"), p("Amirhossein Hosseinzadeh", "阿米尔侯赛因·侯赛因扎德", "前锋")
    ]
  },
  NZL: {
    teamCode: "NZL",
    teamName: "新西兰",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "新西兰最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Max Crocombe", "马克斯·克罗科姆", "门将"), p("Alex Paulsen", "亚历克斯·保尔森", "门将"), p("Michael Woud", "迈克尔·伍德", "门将"),
      p("Winston Reid", "温斯顿·里德", "后卫"), p("Tommy Smith", "汤米·史密斯", "后卫"), p("Nando Pijnaker", "南多·派纳克", "后卫"), p("Tim Payne", "蒂姆·佩恩", "后卫"), p("Liberato Cacace", "利贝拉托·卡卡切", "后卫"), p("Michael Boxall", "迈克尔·博克索尔", "后卫"), p("Bill Tuiloma", "比尔·图伊洛马", "后卫"), p("Tyler Bindon", "泰勒·宾登", "后卫"),
      p("Joe Bell", "乔·贝尔", "中场"), p("Marko Stamenic", "马尔科·斯塔梅尼奇", "中场"), p("Sarpreet Singh", "萨普里特·辛格", "中场"), p("Clayton Lewis", "克莱顿·刘易斯", "中场"), p("Matthew Garbett", "马修·加贝特", "中场"), p("Elijah Just", "伊莱贾·贾斯特", "中场"), p("Alex Rufer", "亚历克斯·鲁弗", "中场"), p("Ben Old", "本·奥尔德", "中场"),
      p("Chris Wood", "克里斯·伍德", "前锋"), p("Andre de Jong", "安德烈·德容", "前锋"), p("Ben Waine", "本·韦恩", "前锋"), p("Kosta Barbarouses", "科斯塔·巴巴鲁塞斯", "前锋"), p("Callum McCowatt", "卡勒姆·麦考瓦特", "前锋"), p("Logan Rogerson", "洛根·罗杰森", "前锋"), p("Max Mata", "马克斯·马塔", "前锋")
    ]
  },
  ESP: {
    teamCode: "ESP",
    teamName: "西班牙",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "西班牙最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Unai Simon", "乌奈·西蒙", "门将"), p("David Raya", "大卫·拉亚", "门将"), p("Alex Remiro", "亚历克斯·雷米罗", "门将"),
      p("Dani Carvajal", "达尼·卡瓦哈尔", "后卫"), p("Robin Le Normand", "罗宾·勒诺尔芒", "后卫"), p("Aymeric Laporte", "艾梅里克·拉波尔特", "后卫"), p("Pau Cubarsi", "保·库巴西", "后卫"), p("Alejandro Balde", "亚历杭德罗·巴尔德", "后卫"), p("Marc Cucurella", "马克·库库雷利亚", "后卫"), p("Pedro Porro", "佩德罗·波罗", "后卫"), p("Dani Vivian", "达尼·维维安", "后卫"),
      p("Rodri", "罗德里", "中场"), p("Pedri", "佩德里", "中场"), p("Gavi", "加维", "中场"), p("Fabian Ruiz", "法比安·鲁伊斯", "中场"), p("Martin Zubimendi", "马丁·苏比门迪", "中场"), p("Mikel Merino", "米克尔·梅里诺", "中场"), p("Alex Baena", "亚历克斯·巴埃纳", "中场"), p("Fermin Lopez", "费尔明·洛佩斯", "中场"),
      p("Lamine Yamal", "拉明·亚马尔", "前锋"), p("Nico Williams", "尼科·威廉姆斯", "前锋"), p("Alvaro Morata", "阿尔瓦罗·莫拉塔", "前锋"), p("Dani Olmo", "达尼·奥尔莫", "前锋"), p("Mikel Oyarzabal", "米克尔·奥亚萨瓦尔", "前锋"), p("Ferran Torres", "费兰·托雷斯", "前锋"), p("Yeremy Pino", "耶雷米·皮诺", "前锋")
    ]
  },
  CPV: {
    teamCode: "CPV",
    teamName: "佛得角",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "佛得角最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Vozinha", "沃齐尼亚", "门将"), p("Marcio Rosa", "马尔西奥·罗萨", "门将"), p("Bruno Varela", "布鲁诺·瓦雷拉", "门将"),
      p("Steven Moreira", "史蒂文·莫雷拉", "后卫"), p("Roberto Lopes", "罗伯托·洛佩斯", "后卫"), p("Diney", "迪内", "后卫"), p("Logan Costa", "洛根·科斯塔", "后卫"), p("Joao Paulo Fernandes", "若昂·保罗·费尔南德斯", "后卫"), p("Dylan Tavares", "迪伦·塔瓦雷斯", "后卫"), p("Kevin Pina", "凯文·皮纳", "后卫"), p("Wagner Pina", "瓦格纳·皮纳", "后卫"),
      p("Patrick Andrade", "帕特里克·安德拉德", "中场"), p("Jamiro Monteiro", "贾米罗·蒙泰罗", "中场"), p("Kenny Rocha Santos", "肯尼·罗沙·桑托斯", "中场"), p("Deroy Duarte", "德罗伊·杜阿尔特", "中场"), p("Joao Teixeira", "若昂·特谢拉", "中场"), p("Laros Duarte", "拉罗斯·杜阿尔特", "中场"), p("Duk", "杜克", "中场"),
      p("Ryan Mendes", "瑞安·门德斯", "前锋"), p("Garry Rodrigues", "加里·罗德里格斯", "前锋"), p("Jovane Cabral", "若瓦内·卡布拉尔", "前锋"), p("Bebe", "贝贝", "前锋"), p("Djaniny", "贾尼尼", "前锋"), p("Willie Semedo", "威利·塞梅多", "前锋"), p("Gilson Benchimol", "吉尔森·本希莫尔", "前锋"), p("Helio Varela", "埃利奥·瓦雷拉", "前锋")
    ]
  },
  KSA: {
    teamCode: "KSA",
    teamName: "沙特阿拉伯",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "沙特阿拉伯最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Mohammed Al Owais", "穆罕默德·奥韦斯", "门将"), p("Nawaf Al Aqidi", "纳瓦夫·阿奇迪", "门将"), p("Ahmed Al Kassar", "艾哈迈德·卡萨尔", "门将"),
      p("Ali Al Bulayhi", "阿里·布莱希", "后卫"), p("Hassan Tambakti", "哈桑·坦巴克蒂", "后卫"), p("Saud Abdulhamid", "沙特·阿卜杜勒哈米德", "后卫"), p("Yasir Al Shahrani", "亚西尔·沙赫拉尼", "后卫"), p("Sultan Al Ghannam", "苏丹·甘纳姆", "后卫"), p("Abdulelah Al Amri", "阿卜杜勒拉·阿姆里", "后卫"), p("Mohammed Al Breik", "穆罕默德·布赖克", "后卫"), p("Awn Al Saluli", "奥恩·萨卢利", "后卫"),
      p("Salem Al Dawsari", "萨利姆·达瓦萨里", "中场"), p("Mohamed Kanno", "穆罕默德·卡诺", "中场"), p("Abdulelah Al Malki", "阿卜杜勒拉·马尔基", "中场"), p("Sami Al Najei", "萨米·纳杰伊", "中场"), p("Nasser Al Dawsari", "纳赛尔·达瓦萨里", "中场"), p("Ali Al Hassan", "阿里·哈桑", "中场"), p("Faisal Al Ghamdi", "费萨尔·加姆迪", "中场"), p("Musab Al Juwayr", "穆萨布·朱韦尔", "中场"),
      p("Firas Al Buraikan", "菲拉斯·布赖坎", "前锋"), p("Saleh Al Shehri", "萨利赫·谢赫里", "前锋"), p("Abdullah Radif", "阿卜杜拉·拉迪夫", "前锋"), p("Abdulrahman Ghareeb", "阿卜杜勒拉赫曼·加里卜", "前锋"), p("Hattan Bahebri", "哈坦·巴赫布里", "前锋"), p("Ayman Yahya", "艾曼·叶海亚", "前锋"), p("Marwan Al Sahafi", "马尔万·萨哈菲", "前锋")
    ]
  },
  URU: {
    teamCode: "URU",
    teamName: "乌拉圭",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "乌拉圭最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Sergio Rochet", "塞尔吉奥·罗切特", "门将"), p("Franco Israel", "弗朗科·伊斯拉埃尔", "门将"), p("Santiago Mele", "圣地亚哥·梅莱", "门将"),
      p("Jose Maria Gimenez", "何塞·玛利亚·希门尼斯", "后卫"), p("Ronald Araujo", "罗纳德·阿劳霍", "后卫"), p("Mathias Olivera", "马蒂亚斯·奥利韦拉", "后卫"), p("Sebastian Caceres", "塞巴斯蒂安·卡塞雷斯", "后卫"), p("Guillermo Varela", "吉列尔莫·巴雷拉", "后卫"), p("Matias Vina", "马蒂亚斯·比尼亚", "后卫"), p("Lucas Olaza", "卢卡斯·奥拉萨", "后卫"), p("Bruno Mendez", "布鲁诺·门德斯", "后卫"),
      p("Federico Valverde", "费德里科·巴尔韦德", "中场"), p("Rodrigo Bentancur", "罗德里戈·本坦库尔", "中场"), p("Manuel Ugarte", "曼努埃尔·乌加特", "中场"), p("Nicolas de la Cruz", "尼古拉斯·德拉克鲁斯", "中场"), p("Giorgian de Arrascaeta", "乔治安·德阿拉斯凯塔", "中场"), p("Facundo Pellistri", "法昆多·佩利斯特里", "中场"), p("Nahitan Nandez", "纳希坦·南德斯", "中场"), p("Matias Vecino", "马蒂亚斯·贝西诺", "中场"),
      p("Darwin Nunez", "达尔文·努涅斯", "前锋"), p("Luis Suarez", "路易斯·苏亚雷斯", "前锋"), p("Maximiliano Araujo", "马克西米利亚诺·阿劳霍", "前锋"), p("Brian Rodriguez", "布赖恩·罗德里格斯", "前锋"), p("Agustin Canobbio", "阿古斯丁·卡诺比奥", "前锋"), p("Cristian Olivera", "克里斯蒂安·奥利韦拉", "前锋"), p("Luciano Rodriguez", "卢西亚诺·罗德里格斯", "前锋")
    ]
  },
  FRA: {
    teamCode: "FRA",
    teamName: "法国",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "法国最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Mike Maignan", "迈克·迈尼昂", "门将"), p("Brice Samba", "布里斯·桑巴", "门将"), p("Alphonse Areola", "阿尔方斯·阿雷奥拉", "门将"),
      p("William Saliba", "威廉·萨利巴", "后卫"), p("Ibrahima Konate", "易卜拉希马·科纳特", "后卫"), p("Dayot Upamecano", "达约·于帕梅卡诺", "后卫"), p("Jules Kounde", "儒勒·孔德", "后卫"), p("Theo Hernandez", "特奥·埃尔南德斯", "后卫"), p("Ferland Mendy", "费兰·门迪", "后卫"), p("Benjamin Pavard", "本杰明·帕瓦尔", "后卫"), p("Lucas Hernandez", "卢卡斯·埃尔南德斯", "后卫"),
      p("Aurelien Tchouameni", "奥雷利安·楚阿梅尼", "中场"), p("Eduardo Camavinga", "爱德华多·卡马文加", "中场"), p("Adrien Rabiot", "阿德里安·拉比奥", "中场"), p("Warren Zaire-Emery", "沃伦·扎伊尔-埃梅里", "中场"), p("Youssouf Fofana", "尤素夫·福法纳", "中场"), p("N'Golo Kante", "恩戈洛·坎特", "中场"), p("Antoine Griezmann", "安托万·格列兹曼", "中场"),
      p("Kylian Mbappe", "基利安·姆巴佩", "前锋"), p("Ousmane Dembele", "奥斯曼·登贝莱", "前锋"), p("Marcus Thuram", "马库斯·图拉姆", "前锋"), p("Randal Kolo Muani", "兰德尔·科洛·穆阿尼", "前锋"), p("Kingsley Coman", "金斯利·科曼", "前锋"), p("Bradley Barcola", "布拉德利·巴尔科拉", "前锋"), p("Olivier Giroud", "奥利维耶·吉鲁", "前锋"), p("Christopher Nkunku", "克里斯托弗·恩昆库", "前锋")
    ]
  },
  SEN: {
    teamCode: "SEN",
    teamName: "塞内加尔",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "塞内加尔最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Edouard Mendy", "爱德华·门迪", "门将"), p("Seny Dieng", "塞尼·迪昂", "门将"), p("Mory Diaw", "莫里·迪奥", "门将"),
      p("Kalidou Koulibaly", "卡利杜·库利巴利", "后卫"), p("Abdou Diallo", "阿卜杜·迪亚洛", "后卫"), p("Ismail Jakobs", "伊斯梅尔·雅各布斯", "后卫"), p("Youssouf Sabaly", "优素福·萨巴利", "后卫"), p("Moussa Niakhate", "穆萨·尼亚卡特", "后卫"), p("Formose Mendy", "福尔莫斯·门迪", "后卫"), p("Abdoulaye Seck", "阿卜杜拉耶·塞克", "后卫"), p("Krepin Diatta", "克雷潘·迪亚塔", "后卫"),
      p("Idrissa Gueye", "伊德里萨·盖耶", "中场"), p("Pape Matar Sarr", "帕普·马塔尔·萨尔", "中场"), p("Nampalys Mendy", "南帕利斯·门迪", "中场"), p("Cheikhou Kouyate", "谢库·库亚特", "中场"), p("Pathé Ciss", "帕特·西斯", "中场"), p("Lamine Camara", "拉明·卡马拉", "中场"), p("Habib Diarra", "哈比卜·迪亚拉", "中场"),
      p("Sadio Mane", "萨迪奥·马内", "前锋"), p("Ismaila Sarr", "伊斯梅拉·萨尔", "前锋"), p("Nicolas Jackson", "尼古拉斯·雅克松", "前锋"), p("Boulaye Dia", "布拉耶·迪亚", "前锋"), p("Habib Diallo", "哈比卜·迪亚洛", "前锋"), p("Iliman Ndiaye", "伊利曼·恩迪亚耶", "前锋"), p("Bamba Dieng", "班巴·迪昂", "前锋"), p("Famara Diedhiou", "法马拉·迪耶迪乌", "前锋")
    ]
  },
  IRQ: {
    teamCode: "IRQ",
    teamName: "伊拉克",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "伊拉克最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Jalal Hassan", "贾拉勒·哈桑", "门将"), p("Fahad Talib", "法赫德·塔利布", "门将"), p("Ahmed Basil", "艾哈迈德·巴西勒", "门将"),
      p("Saad Natiq", "萨阿德·纳提克", "后卫"), p("Rebin Sulaka", "雷宾·苏拉卡", "后卫"), p("Mustafa Nadhim", "穆斯塔法·纳齐姆", "后卫"), p("Hussein Ali", "侯赛因·阿里", "后卫"), p("Frans Putros", "弗兰斯·普特罗斯", "后卫"), p("Merchas Doski", "梅尔查斯·多斯基", "后卫"), p("Zaid Tahseen", "扎伊德·塔赫辛", "后卫"), p("Ahmed Yahya", "艾哈迈德·叶海亚", "后卫"),
      p("Amjad Attwan", "阿姆贾德·阿特万", "中场"), p("Osama Rashid", "奥萨马·拉希德", "中场"), p("Ibrahim Bayesh", "易卜拉欣·巴耶什", "中场"), p("Bashar Resan", "巴沙尔·雷桑", "中场"), p("Zidane Iqbal", "齐达内·伊克巴尔", "中场"), p("Ali Jasim", "阿里·贾西姆", "中场"), p("Youssef Amyn", "优素福·阿明", "中场"), p("Mohanad Ali", "穆哈纳德·阿里", "中场"),
      p("Aymen Hussein", "艾曼·侯赛因", "前锋"), p("Hussein Ali Al Saedi", "侯赛因·阿里·萨埃迪", "前锋"), p("Muntadher Mohammed", "蒙塔泽尔·穆罕默德", "前锋"), p("Danilo Al-Saed", "达尼洛·萨埃德", "前锋"), p("Ali Al-Hamadi", "阿里·哈马迪", "前锋"), p("Marko Farji", "马尔科·法尔吉", "前锋"), p("Hasan Abdulkareem", "哈桑·阿卜杜勒卡里姆", "前锋")
    ]
  },
  NOR: {
    teamCode: "NOR",
    teamName: "挪威",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "挪威最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Orjan Nyland", "厄尔扬·尼兰", "门将"), p("Egil Selvik", "埃吉尔·塞尔维克", "门将"), p("Mathias Dyngeland", "马蒂亚斯·丁厄兰", "门将"),
      p("Leo Ostigard", "莱奥·厄斯蒂高", "后卫"), p("Kristoffer Ajer", "克里斯托弗·阿耶尔", "后卫"), p("Julian Ryerson", "尤利安·赖尔松", "后卫"), p("David Moller Wolfe", "大卫·默勒·沃尔夫", "后卫"), p("Marcus Holmgren Pedersen", "马库斯·霍尔姆格伦·佩德森", "后卫"), p("Andreas Hanche-Olsen", "安德烈亚斯·汉切-奥尔森", "后卫"), p("Fredrik Bjorkan", "弗雷德里克·比约尔坎", "后卫"), p("Stian Gregersen", "斯蒂安·格雷格森", "后卫"),
      p("Martin Odegaard", "马丁·厄德高", "中场"), p("Sander Berge", "桑德尔·贝格", "中场"), p("Patrick Berg", "帕特里克·贝格", "中场"), p("Morten Thorsby", "莫滕·托尔斯比", "中场"), p("Kristian Thorstvedt", "克里斯蒂安·托斯特维特", "中场"), p("Oscar Bobb", "奥斯卡·鲍勃", "中场"), p("Antonio Nusa", "安东尼奥·努萨", "中场"), p("Hugo Vetlesen", "雨果·韦特莱森", "中场"),
      p("Erling Haaland", "埃尔林·哈兰德", "前锋"), p("Alexander Sorloth", "亚历山大·索尔洛特", "前锋"), p("Jorgen Strand Larsen", "约尔根·斯特兰德·拉森", "前锋"), p("Mohamed Elyounoussi", "穆罕默德·埃尔尤努西", "前锋"), p("Aron Donnum", "阿龙·登努姆", "前锋"), p("Bard Finne", "博尔德·芬内", "前锋"), p("Ola Solbakken", "奥拉·索尔巴肯", "前锋")
    ]
  },
  ARG: {
    teamCode: "ARG",
    teamName: "阿根廷",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "阿根廷最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Emiliano Martinez", "埃米利亚诺·马丁内斯", "门将"), p("Geronimo Rulli", "赫罗尼莫·鲁利", "门将"), p("Walter Benitez", "沃尔特·贝尼特斯", "门将"),
      p("Cristian Romero", "克里斯蒂安·罗梅罗", "后卫"), p("Nicolas Otamendi", "尼古拉斯·奥塔门迪", "后卫"), p("Lisandro Martinez", "利桑德罗·马丁内斯", "后卫"), p("Nahuel Molina", "纳韦尔·莫利纳", "后卫"), p("Gonzalo Montiel", "贡萨洛·蒙铁尔", "后卫"), p("Nicolas Tagliafico", "尼古拉斯·塔利亚菲科", "后卫"), p("Marcos Acuna", "马科斯·阿库尼亚", "后卫"), p("German Pezzella", "赫尔曼·佩泽拉", "后卫"),
      p("Rodrigo De Paul", "罗德里戈·德保罗", "中场"), p("Enzo Fernandez", "恩佐·费尔南德斯", "中场"), p("Alexis Mac Allister", "亚历克西斯·麦卡利斯特", "中场"), p("Leandro Paredes", "莱安德罗·帕雷德斯", "中场"), p("Giovani Lo Celso", "吉奥瓦尼·洛塞尔索", "中场"), p("Exequiel Palacios", "埃塞基耶尔·帕拉西奥斯", "中场"), p("Thiago Almada", "蒂亚戈·阿尔马达", "中场"), p("Nico Gonzalez", "尼科·冈萨雷斯", "中场"),
      p("Lionel Messi", "莱昂内尔·梅西", "前锋"), p("Lautaro Martinez", "劳塔罗·马丁内斯", "前锋"), p("Julian Alvarez", "胡利安·阿尔瓦雷斯", "前锋"), p("Angel Di Maria", "安赫尔·迪马利亚", "前锋"), p("Paulo Dybala", "保罗·迪巴拉", "前锋"), p("Alejandro Garnacho", "亚历杭德罗·加纳乔", "前锋"), p("Lucas Ocampos", "卢卡斯·奥坎波斯", "前锋")
    ]
  },
  ALG: {
    teamCode: "ALG",
    teamName: "阿尔及利亚",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "阿尔及利亚最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Anthony Mandrea", "安东尼·曼德雷亚", "门将"), p("Rais M'Bolhi", "赖斯·姆博利", "门将"), p("Alexis Guendouz", "亚历克西·根杜兹", "门将"),
      p("Ramy Bensebaini", "拉米·本塞拜尼", "后卫"), p("Aissa Mandi", "艾萨·曼迪", "后卫"), p("Youcef Atal", "优素福·阿塔尔", "后卫"), p("Kevin Guitoun", "凯文·吉通", "后卫"), p("Ahmed Touba", "艾哈迈德·图巴", "后卫"), p("Mohamed Amine Tougai", "穆罕默德·阿明·图盖", "后卫"), p("Rayan Ait-Nouri", "拉扬·艾特-努里", "后卫"), p("Zinedine Belaid", "齐内丁·贝莱德", "后卫"),
      p("Ismael Bennacer", "伊斯梅尔·本纳塞尔", "中场"), p("Houssem Aouar", "侯塞姆·奥亚尔", "中场"), p("Nabil Bentaleb", "纳比勒·本塔莱布", "中场"), p("Ramiz Zerrouki", "拉米兹·泽鲁基", "中场"), p("Sofiane Feghouli", "索菲亚内·费古利", "中场"), p("Farès Chaibi", "法雷斯·沙伊比", "中场"), p("Hicham Boudaoui", "希沙姆·布达维", "中场"),
      p("Riyad Mahrez", "里亚德·马赫雷斯", "前锋"), p("Islam Slimani", "伊斯拉姆·斯利马尼", "前锋"), p("Amine Gouiri", "阿明·古伊里", "前锋"), p("Said Benrahma", "赛义德·本拉赫马", "前锋"), p("Mohamed Amoura", "穆罕默德·阿穆拉", "前锋"), p("Baghdad Bounedjah", "巴格达·布内贾", "前锋"), p("Adam Ounas", "亚当·乌纳斯", "前锋"), p("Yacine Brahimi", "亚辛·布拉希米", "前锋")
    ]
  },
  AUT: {
    teamCode: "AUT",
    teamName: "奥地利",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "奥地利最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Patrick Pentz", "帕特里克·彭茨", "门将"), p("Heinz Lindner", "海因茨·林德纳", "门将"), p("Alexander Schlager", "亚历山大·施拉格尔", "门将"),
      p("David Alaba", "大卫·阿拉巴", "后卫"), p("Kevin Danso", "凯文·丹索", "后卫"), p("Philipp Lienhart", "菲利普·林哈特", "后卫"), p("Stefan Posch", "斯特凡·波施", "后卫"), p("Maximilian Wober", "马克西米利安·沃贝尔", "后卫"), p("Phillipp Mwene", "菲利普·姆韦内", "后卫"), p("Gernot Trauner", "格诺特·特劳纳", "后卫"), p("Flavius Daniliuc", "弗拉维乌斯·达尼柳克", "后卫"),
      p("Marcel Sabitzer", "马塞尔·萨比策", "中场"), p("Konrad Laimer", "康拉德·莱默", "中场"), p("Xaver Schlager", "克萨弗·施拉格尔", "中场"), p("Nicolas Seiwald", "尼古拉斯·塞瓦尔德", "中场"), p("Christoph Baumgartner", "克里斯托夫·鲍姆加特纳", "中场"), p("Florian Grillitsch", "弗洛里安·格里利奇", "中场"), p("Romano Schmid", "罗马诺·施密德", "中场"), p("Patrick Wimmer", "帕特里克·维默", "中场"),
      p("Marko Arnautovic", "马尔科·阿瑙托维奇", "前锋"), p("Michael Gregoritsch", "米夏埃尔·格雷戈里奇", "前锋"), p("Sasa Kalajdzic", "萨沙·卡拉季奇", "前锋"), p("Andreas Weimann", "安德烈亚斯·魏曼", "前锋"), p("Junior Adamu", "儒尼奥尔·阿达穆", "前锋"), p("Karim Onisiwo", "卡里姆·奥尼西沃", "前锋"), p("Marco Grull", "马尔科·格吕尔", "前锋")
    ]
  },
  JOR: {
    teamCode: "JOR",
    teamName: "约旦",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "约旦最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Yazeed Abulaila", "亚齐德·阿布莱拉", "门将"), p("Abdallah Al-Fakhouri", "阿卜杜拉·法胡里", "门将"), p("Ahmad Al-Jaidi", "艾哈迈德·贾伊迪", "门将"),
      p("Yazan Al-Arab", "亚赞·阿拉布", "后卫"), p("Abdallah Nasib", "阿卜杜拉·纳西布", "后卫"), p("Ihsan Haddad", "伊赫桑·哈达德", "后卫"), p("Mohammad Abu Hasheesh", "穆罕默德·阿布哈希什", "后卫"), p("Salem Al-Ajalin", "萨利姆·阿贾林", "后卫"), p("Anas Bani Yaseen", "阿纳斯·巴尼亚辛", "后卫"), p("Feras Shelbaieh", "费拉斯·谢勒拜", "后卫"), p("Barra Marei", "巴拉·马雷", "后卫"),
      p("Nizar Al-Rashdan", "尼扎尔·拉什丹", "中场"), p("Noor Al-Rawabdeh", "努尔·拉瓦布德", "中场"), p("Rajaei Ayed", "拉贾伊·阿耶德", "中场"), p("Ibrahim Sadeh", "易卜拉欣·萨德", "中场"), p("Mahmoud Mardi", "马哈茂德·马尔迪", "中场"), p("Mohammad Abu Zrayq", "穆罕默德·阿布祖赖克", "中场"), p("Ali Olwan", "阿里·奥尔万", "中场"), p("Saleh Rateb", "萨利赫·拉特布", "中场"),
      p("Mousa Al-Taamari", "穆萨·塔马里", "前锋"), p("Yazan Al-Naimat", "亚赞·奈马特", "前锋"), p("Hamza Al-Dardour", "哈姆扎·达尔杜尔", "前锋"), p("Baha Faisal", "巴哈·费萨尔", "前锋"), p("Anas Al-Awadat", "阿纳斯·阿瓦达特", "前锋"), p("Mohammad Kloub", "穆罕默德·克卢布", "前锋"), p("Aref Al-Haj", "阿雷夫·哈吉", "前锋")
    ]
  },
  POR: {
    teamCode: "POR",
    teamName: "葡萄牙",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "葡萄牙最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Diogo Costa", "迪奥戈·科斯塔", "门将"), p("Rui Patricio", "鲁伊·帕特里西奥", "门将"), p("Jose Sa", "若泽·萨", "门将"),
      p("Ruben Dias", "鲁本·迪亚斯", "后卫"), p("Pepe", "佩佩", "后卫"), p("Antonio Silva", "安东尼奥·席尔瓦", "后卫"), p("Goncalo Inacio", "贡萨洛·伊纳西奥", "后卫"), p("Diogo Dalot", "迪奥戈·达洛特", "后卫"), p("Joao Cancelo", "若昂·坎塞洛", "后卫"), p("Nuno Mendes", "努诺·门德斯", "后卫"), p("Nelson Semedo", "内尔松·塞梅多", "后卫"),
      p("Bruno Fernandes", "布鲁诺·费尔南德斯", "中场"), p("Bernardo Silva", "贝尔纳多·席尔瓦", "中场"), p("Vitinha", "维蒂尼亚", "中场"), p("Joao Palhinha", "若昂·帕利尼亚", "中场"), p("Ruben Neves", "鲁本·内维斯", "中场"), p("Matheus Nunes", "马特乌斯·努内斯", "中场"), p("Otavio", "奥塔维奥", "中场"), p("Pedro Neto", "佩德罗·内托", "中场"),
      p("Cristiano Ronaldo", "克里斯蒂亚诺·罗纳尔多", "前锋"), p("Rafael Leao", "拉斐尔·莱奥", "前锋"), p("Diogo Jota", "迪奥戈·若塔", "前锋"), p("Goncalo Ramos", "贡萨洛·拉莫斯", "前锋"), p("Joao Felix", "若昂·菲利克斯", "前锋"), p("Francisco Conceicao", "弗朗西斯科·孔塞桑", "前锋"), p("Ricardo Horta", "里卡多·奥尔塔", "前锋")
    ]
  },
  COD: {
    teamCode: "COD",
    teamName: "刚果民主共和国",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "刚果民主共和国最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Dimitry Bertaud", "迪米特里·贝尔托", "门将"), p("Lionel Mpasi", "利奥内尔·姆帕西", "门将"), p("Timothy Fayulu", "蒂莫西·法尤卢", "门将"),
      p("Chancel Mbemba", "尚塞尔·姆本巴", "后卫"), p("Arthur Masuaku", "阿图尔·马苏亚库", "后卫"), p("Dylan Batubinsika", "迪伦·巴图宾西卡", "后卫"), p("Gedeon Kalulu", "热代翁·卡卢卢", "后卫"), p("Inonga Baka", "伊农加·巴卡", "后卫"), p("Henock Inonga", "赫诺克·伊农加", "后卫"), p("Rocky Bushiri", "罗基·布希里", "后卫"), p("Joris Kayembe", "若里斯·卡耶姆贝", "后卫"),
      p("Samuel Moutoussamy", "萨穆埃尔·穆图萨米", "中场"), p("Charles Pickel", "查尔斯·皮克尔", "中场"), p("Edo Kayembe", "埃多·卡耶姆贝", "中场"), p("Aaron Tshibola", "阿龙·奇博拉", "中场"), p("Theo Bongonda", "特奥·邦贡达", "中场"), p("Gael Kakuta", "加埃尔·卡库塔", "中场"), p("Meschack Elia", "梅沙克·埃利亚", "中场"),
      p("Cedric Bakambu", "塞德里克·巴坎布", "前锋"), p("Yoane Wissa", "约安·维萨", "前锋"), p("Silas Katompa Mvumpa", "西拉斯·卡通帕·姆温帕", "前锋"), p("Simon Banza", "西蒙·班扎", "前锋"), p("Fiston Mayele", "菲斯顿·马耶莱", "前锋"), p("Ben Malango", "本·马兰戈", "前锋"), p("Jackson Muleka", "杰克逊·穆莱卡", "前锋"), p("Grady Diangana", "格雷迪·迪安加纳", "前锋")
    ]
  },
  UZB: {
    teamCode: "UZB",
    teamName: "乌兹别克斯坦",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "乌兹别克斯坦最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Utkir Yusupov", "乌特基尔·尤苏波夫", "门将"), p("Abduvohid Nematov", "阿卜杜沃希德·内马托夫", "门将"), p("Botirali Ergashev", "博季拉利·埃尔加舍夫", "门将"),
      p("Rustamjon Ashurmatov", "鲁斯塔姆琼·阿舒尔马托夫", "后卫"), p("Abdukodir Khusanov", "阿卜杜科迪尔·胡萨诺夫", "后卫"), p("Farrukh Sayfiev", "法鲁赫·赛菲耶夫", "后卫"), p("Sherzod Nasrullaev", "谢尔佐德·纳斯鲁拉耶夫", "后卫"), p("Husniddin Aliqulov", "胡斯尼丁·阿利库洛夫", "后卫"), p("Khojiakbar Alijonov", "霍贾克巴尔·阿利若诺夫", "后卫"), p("Dilshod Saitov", "迪尔绍德·赛托夫", "后卫"), p("Umar Eshmurodov", "乌马尔·埃什穆罗多夫", "后卫"),
      p("Odiljon Hamrobekov", "奥迪尔琼·哈姆罗别科夫", "中场"), p("Otabek Shukurov", "奥塔别克·舒库罗夫", "中场"), p("Jaloliddin Masharipov", "贾洛利丁·马沙里波夫", "中场"), p("Azizbek Turgunboev", "阿齐兹别克·图尔贡博耶夫", "中场"), p("Abbostbek Fayzullaev", "阿博斯别克·法伊祖拉耶夫", "中场"), p("Eldor Shomurodov", "埃尔多尔·肖穆罗多夫", "中场"), p("Jamshid Iskanderov", "贾姆希德·伊斯坎德罗夫", "中场"),
      p("Igor Sergeev", "伊戈尔·谢尔盖耶夫", "前锋"), p("Bobur Abdikholikov", "博布尔·阿卜迪霍利科夫", "前锋"), p("Hojimat Erkinov", "霍吉马特·埃尔基诺夫", "前锋"), p("Sherzod Temirov", "谢尔佐德·捷米罗夫", "前锋"), p("Ulugbek Khoshimov", "乌卢格别克·霍希莫夫", "前锋"), p("Sardor Rashidov", "萨尔多尔·拉希多夫", "前锋"), p("Jasurbek Jaloliddinov", "贾苏尔别克·贾洛利丁诺夫", "前锋"), p("Khusain Norchaev", "胡赛因·诺尔恰耶夫", "前锋")
    ]
  },
  COL: {
    teamCode: "COL",
    teamName: "哥伦比亚",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "哥伦比亚最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Camilo Vargas", "卡米洛·巴尔加斯", "门将"), p("David Ospina", "大卫·奥斯皮纳", "门将"), p("Alvaro Montero", "阿尔瓦罗·蒙特罗", "门将"),
      p("Davinson Sanchez", "达文森·桑切斯", "后卫"), p("Yerry Mina", "耶里·米纳", "后卫"), p("Jhon Lucumi", "约翰·卢库米", "后卫"), p("Daniel Munoz", "丹尼尔·穆尼奥斯", "后卫"), p("Johan Mojica", "约翰·莫希卡", "后卫"), p("Carlos Cuesta", "卡洛斯·奎斯塔", "后卫"), p("Santiago Arias", "圣地亚哥·阿里亚斯", "后卫"), p("Deiver Machado", "戴韦尔·马查多", "后卫"),
      p("Jefferson Lerma", "杰斐逊·莱尔马", "中场"), p("Richard Rios", "理查德·里奥斯", "中场"), p("Mateus Uribe", "马特乌斯·乌里韦", "中场"), p("Jorge Carrascal", "豪尔赫·卡拉斯卡尔", "中场"), p("Juan Fernando Quintero", "胡安·费尔南多·金特罗", "中场"), p("James Rodriguez", "哈梅斯·罗德里格斯", "中场"), p("Kevin Castano", "凯文·卡斯塔尼奥", "中场"),
      p("Luis Diaz", "路易斯·迪亚斯", "前锋"), p("Rafael Santos Borre", "拉斐尔·桑托斯·博雷", "前锋"), p("Jhon Duran", "约翰·杜兰", "前锋"), p("Luis Sinisterra", "路易斯·西尼斯特拉", "前锋"), p("Jhon Arias", "约翰·阿里亚斯", "前锋"), p("Yaser Asprilla", "亚塞尔·阿斯普里利亚", "前锋"), p("Miguel Borja", "米格尔·博尔哈", "前锋"), p("Cucho Hernandez", "库乔·埃尔南德斯", "前锋")
    ]
  },
  CRO: {
    teamCode: "CRO",
    teamName: "克罗地亚",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "克罗地亚最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Dominik Livakovic", "多米尼克·利瓦科维奇", "门将"), p("Ivica Ivusic", "伊维察·伊武希奇", "门将"), p("Nediljko Labrovic", "内迪利科·拉布罗维奇", "门将"),
      p("Josko Gvardiol", "约什科·格瓦迪奥尔", "后卫"), p("Josip Sutalo", "约西普·舒塔洛", "后卫"), p("Domagoj Vida", "多马戈伊·维达", "后卫"), p("Borna Sosa", "博尔纳·索萨", "后卫"), p("Josip Juranovic", "约西普·尤拉诺维奇", "后卫"), p("Martin Erlic", "马丁·埃尔利奇", "后卫"), p("Josip Stanisic", "约西普·斯塔尼希奇", "后卫"), p("Marin Pongracic", "马林·蓬格拉契奇", "后卫"),
      p("Luka Modric", "卢卡·莫德里奇", "中场"), p("Mateo Kovacic", "马特奥·科瓦契奇", "中场"), p("Marcelo Brozovic", "马塞洛·布罗佐维奇", "中场"), p("Mario Pasalic", "马里奥·帕沙利奇", "中场"), p("Lovro Majer", "洛夫罗·马耶尔", "中场"), p("Luka Sucic", "卢卡·苏契奇", "中场"), p("Nikola Vlasic", "尼科拉·弗拉希奇", "中场"), p("Martin Baturina", "马丁·巴图里纳", "中场"),
      p("Andrej Kramaric", "安德雷·克拉马里奇", "前锋"), p("Ivan Perisic", "伊万·佩里希奇", "前锋"), p("Bruno Petkovic", "布鲁诺·佩特科维奇", "前锋"), p("Ante Budimir", "安特·布迪米尔", "前锋"), p("Mislav Orsic", "米斯拉夫·奥尔希奇", "前锋"), p("Marco Pasalic", "马尔科·帕沙利奇", "前锋"), p("Dion Drena Beljo", "迪翁·德雷纳·贝略", "前锋")
    ]
  },
  GHA: {
    teamCode: "GHA",
    teamName: "加纳",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "加纳最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Lawrence Ati-Zigi", "劳伦斯·阿蒂-齐吉", "门将"), p("Jojo Wollacott", "乔乔·沃拉科特", "门将"), p("Richard Ofori", "理查德·奥福里", "门将"),
      p("Mohammed Salisu", "穆罕默德·萨利苏", "后卫"), p("Alexander Djiku", "亚历山大·吉库", "后卫"), p("Daniel Amartey", "丹尼尔·阿马泰", "后卫"), p("Gideon Mensah", "吉迪恩·门萨", "后卫"), p("Denis Odoi", "丹尼斯·奥多伊", "后卫"), p("Alidu Seidu", "阿利杜·塞杜", "后卫"), p("Tariq Lamptey", "塔里克·兰普泰", "后卫"), p("Nicholas Opoku", "尼古拉斯·奥波库", "后卫"),
      p("Thomas Partey", "托马斯·帕尔特伊", "中场"), p("Mohammed Kudus", "穆罕默德·库杜斯", "中场"), p("Salis Abdul Samed", "萨利斯·阿卜杜勒·萨梅德", "中场"), p("Elisha Owusu", "埃利沙·奥乌苏", "中场"), p("Majeed Ashimeru", "马吉德·阿希梅鲁", "中场"), p("Daniel Kofi Kyereh", "丹尼尔·科菲·凯雷", "中场"), p("Edmund Addo", "埃德蒙·阿多", "中场"),
      p("Jordan Ayew", "乔丹·阿尤", "前锋"), p("Andre Ayew", "安德烈·阿尤", "前锋"), p("Inaki Williams", "伊尼亚基·威廉姆斯", "前锋"), p("Antoine Semenyo", "安托万·塞梅尼奥", "前锋"), p("Ernest Nuamah", "欧内斯特·努阿马", "前锋"), p("Kamaldeen Sulemana", "卡马尔丁·苏莱马纳", "前锋"), p("Osman Bukari", "奥斯曼·布卡里", "前锋"), p("Joseph Paintsil", "约瑟夫·潘特西尔", "前锋")
    ]
  },
  PAN: {
    teamCode: "PAN",
    teamName: "巴拿马",
    confirmed: true,
    publishedDate: "2026-06-02",
    source: "FIFA / NBC Sports",
    sourceUrl: "https://www.nbcsports.com/soccer/news/2026-world-cup-squads-confirmed-rosters-for-all-48-teams",
    note: "巴拿马最终 26 人名单已确认。当前未找到完整可靠号码源，号码暂标为待核实。",
    players: [
      p("Orlando Mosquera", "奥兰多·莫斯克拉", "门将"), p("Luis Mejia", "路易斯·梅希亚", "门将"), p("Cesar Samudio", "塞萨尔·萨穆迪奥", "门将"),
      p("Fidel Escobar", "菲德尔·埃斯科巴", "后卫"), p("Andres Andrade", "安德烈斯·安德拉德", "后卫"), p("Michael Murillo", "迈克尔·穆里略", "后卫"), p("Eric Davis", "埃里克·戴维斯", "后卫"), p("Jose Cordoba", "何塞·科尔多瓦", "后卫"), p("Roderick Miller", "罗德里克·米勒", "后卫"), p("Cesar Blackman", "塞萨尔·布莱克曼", "后卫"), p("Edgardo Farina", "埃德加多·法里尼亚", "后卫"),
      p("Anibal Godoy", "阿尼巴尔·戈多伊", "中场"), p("Adalberto Carrasquilla", "阿达尔贝托·卡拉斯基利亚", "中场"), p("Cristian Martinez", "克里斯蒂安·马丁内斯", "中场"), p("Jovani Welch", "约瓦尼·韦尔奇", "中场"), p("Edgar Barcenas", "埃德加·巴尔塞纳斯", "中场"), p("Jose Luis Rodriguez", "何塞·路易斯·罗德里格斯", "中场"), p("Cesar Yanis", "塞萨尔·亚尼斯", "中场"), p("Abdiel Ayarza", "阿卜迪尔·阿亚尔萨", "中场"),
      p("Jose Fajardo", "何塞·法哈多", "前锋"), p("Cecilio Waterman", "塞西利奥·沃特曼", "前锋"), p("Ismael Diaz", "伊斯梅尔·迪亚斯", "前锋"), p("Eduardo Guerrero", "爱德华多·格雷罗", "前锋"), p("Freddy Gondola", "弗雷迪·贡多拉", "前锋"), p("Alfredo Stephens", "阿尔弗雷多·斯蒂芬斯", "前锋"), p("Azarias Londono", "阿萨里亚斯·隆多尼奥", "前锋")
    ]
  },
  ENG: {
    teamCode: "ENG",
    teamName: "英格兰",
    confirmed: true,
    publishedDate: "2026-05-22",
    source: "BBC Sport / England Football",
    sourceUrl: "https://www.bbc.co.uk/sport/football/articles/c1728r0l218o",
    note: "福登、帕尔默、阿诺德、马奎尔等人落选，托尼、沃特金斯、埃泽、马杜埃凯入选。",
    players: [
      p("Jordan Pickford", "乔丹·皮克福德", "门将"), p("Dean Henderson", "迪恩·亨德森", "门将"), p("James Trafford", "詹姆斯·特拉福德", "门将"),
      p("Reece James", "里斯·詹姆斯", "后卫"), p("Tino Livramento", "蒂诺·利夫拉门托", "后卫"), p("Marc Guehi", "马克·格伊", "后卫"), p("Ezri Konsa", "埃兹里·孔萨", "后卫"), p("John Stones", "约翰·斯通斯", "后卫"), p("Jarell Quansah", "贾雷尔·宽萨", "后卫"), p("Nico O'Reilly", "尼科·奥赖利", "后卫"), p("Dan Burn", "丹·伯恩", "后卫"), p("Djed Spence", "杰德·斯彭斯", "后卫"),
      p("Declan Rice", "德克兰·赖斯", "中场"), p("Elliot Anderson", "埃利奥特·安德森", "中场"), p("Jude Bellingham", "裘德·贝林厄姆", "中场"), p("Jordan Henderson", "乔丹·亨德森", "中场"), p("Morgan Rogers", "摩根·罗杰斯", "中场"), p("Kobbie Mainoo", "科比·梅努", "中场"),
      p("Harry Kane", "哈里·凯恩", "前锋"), p("Ivan Toney", "伊万·托尼", "前锋"), p("Ollie Watkins", "奥利·沃特金斯", "前锋"), p("Bukayo Saka", "布卡约·萨卡", "前锋"), p("Noni Madueke", "诺尼·马杜埃凯", "前锋"), p("Marcus Rashford", "马库斯·拉什福德", "前锋"), p("Anthony Gordon", "安东尼·戈登", "前锋"), p("Eberechi Eze", "埃贝雷奇·埃泽", "前锋")
    ]
  }
};

export const rosterPositions = ["门将", "后卫", "中场", "前锋"] as const;
