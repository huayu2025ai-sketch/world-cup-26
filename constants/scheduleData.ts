export type GoalScorer = {
  player: string;
  team: string;
  minute: string;
  type?: "goal" | "penalty" | "ownGoal";
};

export type ScheduleMatch = {
  id: number;
  stage: "分组赛" | "32强" | "16强" | "1/4决赛" | "半决赛" | "季军赛" | "决赛";
  group?: string;
  date: string;
  etTime: string;
  beijingTime: string;
  home: string;
  away: string;
  venue: string;
  city: string;
  homeScore?: number;
  awayScore?: number;
  goalScorers?: GoalScorer[];
};

type ScheduleMatchInput = Omit<ScheduleMatch, "beijingTime">;

const formatBeijingTimeFromEt = (date: string, etTime: string) => {
  const etDate = new Date(`${date}T${etTime}:00-04:00`);

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(etDate)
    .replace("/", "-");
};

const withBeijingTime = (match: ScheduleMatchInput): ScheduleMatch => ({
  ...match,
  beijingTime: formatBeijingTimeFromEt(match.date, match.etTime)
});

const matchInputs: ScheduleMatchInput[] = [
  { id: 1, stage: "分组赛", group: "A", date: "2026-06-11", etTime: "15:00", home: "墨西哥", away: "南非", venue: "Estadio Azteca", city: "Mexico City", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "胡利安·基尼奥内斯", team: "墨西哥", minute: "9'", type: "goal" },
    { player: "劳尔·希门尼斯", team: "墨西哥", minute: "67'", type: "goal" },
  ] },
  { id: 2, stage: "分组赛", group: "A", date: "2026-06-11", etTime: "22:00", home: "韩国", away: "捷克", venue: "Estadio Akron", city: "Guadalajara", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "拉迪斯拉夫·克雷伊奇", team: "捷克", minute: "59'", type: "goal" },
    { player: "黄仁范", team: "韩国", minute: "67'", type: "goal" },
    { player: "吴贤揆", team: "韩国", minute: "80'", type: "goal" },
  ] },
  { id: 3, stage: "分组赛", group: "B", date: "2026-06-12", etTime: "15:00", home: "加拿大", away: "波黑", venue: "BMO Field", city: "Toronto", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "约沃·卢基奇", team: "波黑", minute: "21'", type: "goal" },
    { player: "赛尔·拉林", team: "加拿大", minute: "79'", type: "goal" },
  ] },
  { id: 4, stage: "分组赛", group: "D", date: "2026-06-12", etTime: "21:00", home: "美国", away: "巴拉圭", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 4, awayScore: 1, goalScorers: [
    { player: "达米安·博瓦迪利亚", team: "巴拉圭", minute: "7'", type: "ownGoal" },
    { player: "福拉林·巴洛贡", team: "美国", minute: "31'", type: "goal" },
    { player: "福拉林·巴洛贡", team: "美国", minute: "45+5'", type: "goal" },
    { player: "毛里西奥", team: "巴拉圭", minute: "73'", type: "goal" },
    { player: "吉奥·雷纳", team: "美国", minute: "90+7'", type: "goal" },
  ] },
  { id: 5, stage: "分组赛", group: "B", date: "2026-06-13", etTime: "15:00", home: "卡塔尔", away: "瑞士", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "布雷尔·恩博洛", team: "瑞士", minute: "17'", type: "penalty" },
    { player: "布阿莱姆·胡希", team: "卡塔尔", minute: "90+5'", type: "goal" },
  ] },
  { id: 6, stage: "分组赛", group: "C", date: "2026-06-13", etTime: "18:00", home: "巴西", away: "摩洛哥", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "伊斯梅尔·塞巴里", team: "摩洛哥", minute: "21'", type: "goal" },
    { player: "维尼修斯·儒尼奥尔", team: "巴西", minute: "32'", type: "goal" },
  ] },
  { id: 7, stage: "分组赛", group: "C", date: "2026-06-13", etTime: "21:00", home: "海地", away: "苏格兰", venue: "Gillette Stadium", city: "Boston", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "约翰·麦金", team: "苏格兰", minute: "28'", type: "goal" },
  ] },
  { id: 8, stage: "分组赛", group: "D", date: "2026-06-14", etTime: "00:00", home: "澳大利亚", away: "土耳其", venue: "BC Place", city: "Vancouver", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "内斯托里·伊兰昆达", team: "澳大利亚", minute: "27'", type: "goal" },
    { player: "康纳·梅特卡夫", team: "澳大利亚", minute: "75'", type: "goal" },
  ] },
  { id: 9, stage: "分组赛", group: "E", date: "2026-06-14", etTime: "13:00", home: "德国", away: "库拉索", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 7, awayScore: 1, goalScorers: [
    { player: "费利克斯·恩梅查", team: "德国", minute: "6'", type: "goal" },
    { player: "利瓦诺·科梅嫩西亚", team: "库拉索", minute: "21'", type: "goal" },
    { player: "尼科·施洛特贝克", team: "德国", minute: "38'", type: "goal" },
    { player: "凯·哈弗茨", team: "德国", minute: "45+5'", type: "penalty" },
    { player: "贾马尔·穆西亚拉", team: "德国", minute: "47'", type: "goal" },
    { player: "纳撒尼尔·布朗", team: "德国", minute: "68'", type: "goal" },
    { player: "德尼兹·翁达夫", team: "德国", minute: "78'", type: "goal" },
    { player: "凯·哈弗茨", team: "德国", minute: "88'", type: "goal" },
  ] },
  { id: 10, stage: "分组赛", group: "F", date: "2026-06-14", etTime: "16:00", home: "荷兰", away: "日本", venue: "AT&T Stadium", city: "Dallas", homeScore: 2, awayScore: 2, goalScorers: [
    { player: "维吉尔·范戴克", team: "荷兰", minute: "51'", type: "goal" },
    { player: "中村敬斗", team: "日本", minute: "57'", type: "goal" },
    { player: "克里森西奥·萨默维尔", team: "荷兰", minute: "64'", type: "goal" },
    { player: "镰田大地", team: "日本", minute: "89'", type: "goal" },
  ] },
  { id: 11, stage: "分组赛", group: "E", date: "2026-06-14", etTime: "19:00", home: "科特迪瓦", away: "厄瓜多尔", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "阿马德·迪亚洛", team: "科特迪瓦", minute: "90'", type: "goal" },
  ] },
  { id: 12, stage: "分组赛", group: "F", date: "2026-06-14", etTime: "22:00", home: "瑞典", away: "突尼斯", venue: "Estadio Akron", city: "Guadalajara", homeScore: 5, awayScore: 1, goalScorers: [
    { player: "亚辛·阿亚里", team: "瑞典", minute: "7'", type: "goal" },
    { player: "亚历山大·伊萨克", team: "瑞典", minute: "30'", type: "goal" },
    { player: "奥马尔·雷基克", team: "突尼斯", minute: "43'", type: "goal" },
    { player: "维克托·约克雷斯", team: "瑞典", minute: "60'", type: "goal" },
    { player: "马蒂亚斯·斯万贝里", team: "瑞典", minute: "86'", type: "goal" },
    { player: "亚辛·阿亚里", team: "瑞典", minute: "90+6'", type: "goal" },
  ] },
  { id: 13, stage: "分组赛", group: "H", date: "2026-06-15", etTime: "12:00", home: "西班牙", away: "佛得角", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 14, stage: "分组赛", group: "G", date: "2026-06-15", etTime: "15:00", home: "比利时", away: "埃及", venue: "NRG Stadium", city: "Houston", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "埃马姆·阿舒尔", team: "埃及", minute: "19'", type: "goal" },
    { player: "穆罕默德·哈尼", team: "埃及", minute: "66'", type: "ownGoal" },
  ] },
  { id: 15, stage: "分组赛", group: "H", date: "2026-06-15", etTime: "18:00", home: "沙特阿拉伯", away: "乌拉圭", venue: "AT&T Stadium", city: "Dallas", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "阿卜杜勒拉·阿拉姆里", team: "沙特阿拉伯", minute: "41'", type: "goal" },
    { player: "马克西·阿劳霍", team: "乌拉圭", minute: "80'", type: "goal" },
  ] },
  { id: 16, stage: "分组赛", group: "G", date: "2026-06-15", etTime: "21:00", home: "伊朗", away: "新西兰", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 2, awayScore: 2, goalScorers: [
    { player: "伊莱·贾斯特", team: "新西兰", minute: "7'", type: "goal" },
    { player: "拉明·雷扎伊安", team: "伊朗", minute: "32'", type: "goal" },
    { player: "伊莱·贾斯特", team: "新西兰", minute: "55'", type: "goal" },
    { player: "穆罕默德·莫赫比", team: "伊朗", minute: "64'", type: "goal" },
  ] },
  { id: 17, stage: "分组赛", group: "I", date: "2026-06-16", etTime: "15:00", home: "法国", away: "塞内加尔", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 3, awayScore: 1, goalScorers: [
    { player: "基利安·姆巴佩", team: "法国", minute: "66'", type: "goal" },
    { player: "布拉德利·巴尔科拉", team: "法国", minute: "82'", type: "goal" },
    { player: "易卜拉欣·姆巴耶", team: "塞内加尔", minute: "90+5'", type: "goal" },
    { player: "基利安·姆巴佩", team: "法国", minute: "90+6'", type: "goal" },
  ] },
  { id: 18, stage: "分组赛", group: "I", date: "2026-06-16", etTime: "18:00", home: "伊拉克", away: "挪威", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 1, awayScore: 3, goalScorers: [
    { player: "埃尔林·哈兰德", team: "挪威", minute: "29'", type: "goal" },
    { player: "艾曼·侯赛因", team: "伊拉克", minute: "39'", type: "goal" },
    { player: "埃尔林·哈兰德", team: "挪威", minute: "43'", type: "goal" },
    { player: "莱奥·厄斯蒂高", team: "挪威", minute: "76'", type: "goal" },
  ] },
  { id: 19, stage: "分组赛", group: "J", date: "2026-06-16", etTime: "21:00", home: "阿根廷", away: "阿尔及利亚", venue: "Lumen Field", city: "Seattle", homeScore: 3, awayScore: 0, goalScorers: [
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "17'", type: "goal" },
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "60'", type: "goal" },
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "76'", type: "goal" },
  ] },
  { id: 20, stage: "分组赛", group: "J", date: "2026-06-17", etTime: "00:00", home: "奥地利", away: "约旦", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "罗马诺·施密德", team: "奥地利", minute: "21'", type: "goal" },
    { player: "马尔科·阿瑙托维奇", team: "奥地利", minute: "58'", type: "goal" },
    { player: "穆萨·阿尔塔马里", team: "约旦", minute: "73'", type: "goal" },
  ] },
  { id: 21, stage: "分组赛", group: "K", date: "2026-06-17", etTime: "13:00", home: "葡萄牙", away: "刚果民主共和国", venue: "Hard Rock Stadium", city: "Miami", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "若昂·内维斯", team: "葡萄牙", minute: "6'", type: "goal" },
    { player: "约安·维萨", team: "刚果民主共和国", minute: "83'", type: "goal" },
  ] },
  { id: 22, stage: "分组赛", group: "L", date: "2026-06-17", etTime: "16:00", home: "英格兰", away: "克罗地亚", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "哈里·凯恩", team: "英格兰", minute: "42'", type: "penalty" },
    { player: "马丁·巴图里纳", team: "克罗地亚", minute: "56'", type: "goal" },
    { player: "佩塔尔·穆萨", team: "克罗地亚", minute: "69'", type: "goal" },
    { player: "裘德·贝林厄姆", team: "英格兰", minute: "71'", type: "goal" },
    { player: "马库斯·拉什福德", team: "英格兰", minute: "89'", type: "goal" },
  ] },
  { id: 23, stage: "分组赛", group: "L", date: "2026-06-17", etTime: "19:00", home: "加纳", away: "巴拿马", venue: "BMO Field", city: "Toronto", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "凯莱布·耶伦基", team: "加纳", minute: "72'", type: "goal" },
  ] },
  { id: 24, stage: "分组赛", group: "K", date: "2026-06-17", etTime: "22:00", home: "乌兹别克斯坦", away: "哥伦比亚", venue: "Estadio BBVA", city: "Monterrey", homeScore: 1, awayScore: 2, goalScorers: [
    { player: "丹尼尔·穆尼奥斯", team: "哥伦比亚", minute: "41'", type: "goal" },
    { player: "阿博斯别克·法伊祖拉耶夫", team: "乌兹别克斯坦", minute: "55'", type: "goal" },
    { player: "杰斐逊·莱尔马", team: "哥伦比亚", minute: "66'", type: "goal" },
  ] },
  { id: 25, stage: "分组赛", group: "A", date: "2026-06-18", etTime: "12:00", home: "捷克", away: "南非", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "米哈尔·萨迪莱克", team: "捷克", minute: "5'", type: "goal" },
    { player: "特博霍·莫科纳", team: "南非", minute: "83'", type: "penalty" },
  ] },
  { id: 26, stage: "分组赛", group: "B", date: "2026-06-18", etTime: "15:00", home: "瑞士", away: "波黑", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 4, awayScore: 1, goalScorers: [
    { player: "约翰·曼赞比", team: "瑞士", minute: "75'", type: "goal" },
    { player: "鲁本·巴尔加斯", team: "瑞士", minute: "85'", type: "goal" },
    { player: "约翰·曼赞比", team: "瑞士", minute: "90'", type: "goal" },
    { player: "埃尔明·马赫米奇", team: "波黑", minute: "90+3'", type: "goal" },
    { player: "格拉尼特·扎卡", team: "瑞士", minute: "90+6'", type: "penalty" },
  ] },
  { id: 27, stage: "分组赛", group: "B", date: "2026-06-18", etTime: "18:00", home: "加拿大", away: "卡塔尔", venue: "BC Place", city: "Vancouver", homeScore: 6, awayScore: 0, goalScorers: [
    { player: "赛尔·拉林", team: "加拿大", minute: "16'", type: "goal" },
    { player: "乔纳森·戴维", team: "加拿大", minute: "29'", type: "goal" },
    { player: "乔纳森·戴维", team: "加拿大", minute: "45+3'", type: "goal" },
    { player: "内森·萨利巴", team: "加拿大", minute: "64'", type: "goal" },
    { player: "穆罕默德·阿尔曼奈", team: "卡塔尔", minute: "75'", type: "ownGoal" },
    { player: "乔纳森·戴维", team: "加拿大", minute: "90+2'", type: "goal" },
  ] },
  { id: 28, stage: "分组赛", group: "A", date: "2026-06-18", etTime: "21:00", home: "墨西哥", away: "韩国", venue: "Estadio Akron", city: "Guadalajara", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "路易斯·罗莫", team: "墨西哥", minute: "50'", type: "goal" },
  ] },
  { id: 29, stage: "分组赛", group: "D", date: "2026-06-19", etTime: "15:00", home: "美国", away: "澳大利亚", venue: "Lumen Field", city: "Seattle", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "卡梅伦·伯吉斯", team: "澳大利亚", minute: "11'", type: "ownGoal" },
    { player: "亚历克斯·弗里曼", team: "美国", minute: "43'", type: "goal" },
  ] },
  { id: 30, stage: "分组赛", group: "C", date: "2026-06-19", etTime: "18:00", home: "苏格兰", away: "摩洛哥", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "伊斯梅尔·塞巴里", team: "摩洛哥", minute: "2'", type: "goal" },
  ] },
  { id: 31, stage: "分组赛", group: "C", date: "2026-06-19", etTime: "20:30", home: "巴西", away: "海地", venue: "Hard Rock Stadium", city: "Miami", homeScore: 3, awayScore: 0, goalScorers: [
    { player: "马特乌斯·库尼亚", team: "巴西", minute: "6'", type: "goal" },
    { player: "马特乌斯·库尼亚", team: "巴西", minute: "12'", type: "goal" },
    { player: "维尼修斯·儒尼奥尔", team: "巴西", minute: "45'", type: "goal" },
  ] },
  { id: 32, stage: "分组赛", group: "D", date: "2026-06-19", etTime: "23:00", home: "土耳其", away: "巴拉圭", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "马蒂亚斯·加拉尔萨", team: "巴拉圭", minute: "2'", type: "goal" },
  ] },
  { id: 33, stage: "分组赛", group: "F", date: "2026-06-20", etTime: "13:00", home: "荷兰", away: "瑞典", venue: "AT&T Stadium", city: "Dallas", homeScore: 5, awayScore: 1, goalScorers: [
    { player: "布赖恩·布罗贝", team: "荷兰", minute: "6'", type: "goal" },
    { player: "布赖恩·布罗贝", team: "荷兰", minute: "17'", type: "goal" },
    { player: "科迪·加克波", team: "荷兰", minute: "47'", type: "goal" },
    { player: "科迪·加克波", team: "荷兰", minute: "54'", type: "goal" },
    { player: "安东尼·埃兰加", team: "瑞典", minute: "59'", type: "goal" },
    { player: "克里森西奥·萨默维尔", team: "荷兰", minute: "89'", type: "goal" },
  ] },
  { id: 34, stage: "分组赛", group: "E", date: "2026-06-20", etTime: "16:00", home: "德国", away: "科特迪瓦", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "弗兰克·凯西", team: "科特迪瓦", minute: "30'", type: "goal" },
    { player: "德尼兹·翁达夫", team: "德国", minute: "68'", type: "goal" },
    { player: "德尼兹·翁达夫", team: "德国", minute: "90+4'", type: "goal" },
  ] },
  { id: 35, stage: "分组赛", group: "E", date: "2026-06-20", etTime: "20:00", home: "厄瓜多尔", away: "库拉索", venue: "Hard Rock Stadium", city: "Miami", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 36, stage: "分组赛", group: "F", date: "2026-06-21", etTime: "00:00", home: "突尼斯", away: "日本", venue: "Estadio BBVA", city: "Monterrey", homeScore: 0, awayScore: 4, goalScorers: [
    { player: "上田绮世", team: "日本", minute: "31'", type: "goal" },
    { player: "伊东纯也", team: "日本", minute: "63'", type: "goal" },
    { player: "上田绮世", team: "日本", minute: "78'", type: "goal" },
    { player: "镰田大地", team: "日本", minute: "90+2'", type: "goal" },
  ] },
  { id: 37, stage: "分组赛", group: "H", date: "2026-06-21", etTime: "12:00", home: "西班牙", away: "沙特阿拉伯", venue: "NRG Stadium", city: "Houston" },
  { id: 38, stage: "分组赛", group: "G", date: "2026-06-21", etTime: "15:00", home: "比利时", away: "伊朗", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: 39, stage: "分组赛", group: "H", date: "2026-06-21", etTime: "18:00", home: "乌拉圭", away: "佛得角", venue: "Gillette Stadium", city: "Boston" },
  { id: 40, stage: "分组赛", group: "G", date: "2026-06-21", etTime: "21:00", home: "新西兰", away: "埃及", venue: "NRG Stadium", city: "Houston" },
  { id: 41, stage: "分组赛", group: "J", date: "2026-06-22", etTime: "13:00", home: "阿根廷", away: "奥地利", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: 42, stage: "分组赛", group: "I", date: "2026-06-22", etTime: "17:00", home: "法国", away: "伊拉克", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: 43, stage: "分组赛", group: "I", date: "2026-06-22", etTime: "20:00", home: "挪威", away: "塞内加尔", venue: "Gillette Stadium", city: "Boston" },
  { id: 44, stage: "分组赛", group: "J", date: "2026-06-22", etTime: "23:00", home: "约旦", away: "阿尔及利亚", venue: "Levi's Stadium", city: "San Francisco Bay Area" },
  { id: 45, stage: "分组赛", group: "K", date: "2026-06-23", etTime: "13:00", home: "葡萄牙", away: "乌兹别克斯坦", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 46, stage: "分组赛", group: "L", date: "2026-06-23", etTime: "16:00", home: "英格兰", away: "加纳", venue: "Gillette Stadium", city: "Boston" },
  { id: 47, stage: "分组赛", group: "L", date: "2026-06-23", etTime: "19:00", home: "巴拿马", away: "克罗地亚", venue: "BMO Field", city: "Toronto" },
  { id: 48, stage: "分组赛", group: "K", date: "2026-06-23", etTime: "22:00", home: "哥伦比亚", away: "刚果民主共和国", venue: "AT&T Stadium", city: "Dallas" },
  { id: 49, stage: "分组赛", group: "B", date: "2026-06-24", etTime: "15:00", home: "瑞士", away: "加拿大", venue: "BC Place", city: "Vancouver" },
  { id: 50, stage: "分组赛", group: "B", date: "2026-06-24", etTime: "15:00", home: "波黑", away: "卡塔尔", venue: "Lumen Field", city: "Seattle" },
  { id: 51, stage: "分组赛", group: "C", date: "2026-06-24", etTime: "18:00", home: "摩洛哥", away: "海地", venue: "NRG Stadium", city: "Houston" },
  { id: 52, stage: "分组赛", group: "C", date: "2026-06-24", etTime: "18:00", home: "苏格兰", away: "巴西", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 53, stage: "分组赛", group: "A", date: "2026-06-24", etTime: "21:00", home: "南非", away: "韩国", venue: "Estadio Akron", city: "Guadalajara" },
  { id: 54, stage: "分组赛", group: "A", date: "2026-06-24", etTime: "21:00", home: "捷克", away: "墨西哥", venue: "Estadio Azteca", city: "Mexico City" },
  { id: 55, stage: "分组赛", group: "E", date: "2026-06-25", etTime: "16:00", home: "库拉索", away: "科特迪瓦", venue: "Lincoln Financial Field", city: "Philadelphia" },
  { id: 56, stage: "分组赛", group: "E", date: "2026-06-25", etTime: "16:00", home: "厄瓜多尔", away: "德国", venue: "MetLife Stadium", city: "New York New Jersey" },
  { id: 57, stage: "分组赛", group: "F", date: "2026-06-25", etTime: "19:00", home: "突尼斯", away: "荷兰", venue: "AT&T Stadium", city: "Dallas" },
  { id: 58, stage: "分组赛", group: "F", date: "2026-06-25", etTime: "19:00", home: "日本", away: "瑞典", venue: "BC Place", city: "Vancouver" },
  { id: 59, stage: "分组赛", group: "D", date: "2026-06-25", etTime: "22:00", home: "土耳其", away: "美国", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: 60, stage: "分组赛", group: "D", date: "2026-06-25", etTime: "22:00", home: "巴拉圭", away: "澳大利亚", venue: "Levi's Stadium", city: "San Francisco Bay Area" },
  { id: 61, stage: "分组赛", group: "I", date: "2026-06-26", etTime: "15:00", home: "挪威", away: "法国", venue: "MetLife Stadium", city: "New York New Jersey" },
  { id: 62, stage: "分组赛", group: "I", date: "2026-06-26", etTime: "15:00", home: "塞内加尔", away: "伊拉克", venue: "Gillette Stadium", city: "Boston" },
  { id: 63, stage: "分组赛", group: "H", date: "2026-06-26", etTime: "20:00", home: "佛得角", away: "沙特阿拉伯", venue: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 64, stage: "分组赛", group: "H", date: "2026-06-26", etTime: "20:00", home: "乌拉圭", away: "西班牙", venue: "NRG Stadium", city: "Houston" },
  { id: 65, stage: "分组赛", group: "G", date: "2026-06-26", etTime: "23:00", home: "新西兰", away: "比利时", venue: "Lumen Field", city: "Seattle" },
  { id: 66, stage: "分组赛", group: "G", date: "2026-06-26", etTime: "23:00", home: "埃及", away: "伊朗", venue: "AT&T Stadium", city: "Dallas" },
  { id: 67, stage: "分组赛", group: "L", date: "2026-06-27", etTime: "17:00", home: "巴拿马", away: "英格兰", venue: "MetLife Stadium", city: "New York New Jersey" },
  { id: 68, stage: "分组赛", group: "L", date: "2026-06-27", etTime: "17:00", home: "克罗地亚", away: "加纳", venue: "Lincoln Financial Field", city: "Philadelphia" },
  { id: 69, stage: "分组赛", group: "K", date: "2026-06-27", etTime: "19:30", home: "哥伦比亚", away: "葡萄牙", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 70, stage: "分组赛", group: "K", date: "2026-06-27", etTime: "19:30", home: "刚果民主共和国", away: "乌兹别克斯坦", venue: "Estadio BBVA", city: "Monterrey" },
  { id: 71, stage: "分组赛", group: "J", date: "2026-06-27", etTime: "22:00", home: "阿尔及利亚", away: "奥地利", venue: "Lumen Field", city: "Seattle" },
  { id: 72, stage: "分组赛", group: "J", date: "2026-06-27", etTime: "22:00", home: "约旦", away: "阿根廷", venue: "Arrowhead Stadium", city: "Kansas City" },

  { id: 73, stage: "32强", date: "2026-06-28", etTime: "15:00", home: "A组第2", away: "B组第2", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: 74, stage: "32强", date: "2026-06-29", etTime: "15:00", home: "A组第1", away: "最佳第三名", venue: "Estadio Azteca", city: "Mexico City" },
  { id: 75, stage: "32强", date: "2026-06-29", etTime: "18:00", home: "B组第1", away: "最佳第三名", venue: "BMO Field", city: "Toronto" },
  { id: 76, stage: "32强", date: "2026-06-30", etTime: "15:00", home: "C组第1", away: "F组第2", venue: "MetLife Stadium", city: "New York New Jersey" },
  { id: 77, stage: "32强", date: "2026-06-30", etTime: "18:00", home: "E组第1", away: "I组第2", venue: "AT&T Stadium", city: "Dallas" },
  { id: 78, stage: "32强", date: "2026-07-01", etTime: "15:00", home: "F组第1", away: "C组第2", venue: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 79, stage: "32强", date: "2026-07-01", etTime: "20:00", home: "D组第1", away: "最佳第三名", venue: "Levi's Stadium", city: "San Francisco Bay Area" },
  { id: 80, stage: "32强", date: "2026-07-02", etTime: "15:00", home: "G组第1", away: "最佳第三名", venue: "NRG Stadium", city: "Houston" },
  { id: 81, stage: "32强", date: "2026-07-02", etTime: "18:00", home: "H组第1", away: "J组第2", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: 82, stage: "32强", date: "2026-07-03", etTime: "15:00", home: "I组第1", away: "最佳第三名", venue: "Gillette Stadium", city: "Boston" },
  { id: 83, stage: "32强", date: "2026-07-03", etTime: "18:00", home: "J组第1", away: "H组第2", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 84, stage: "32强", date: "2026-07-03", etTime: "21:00", home: "K组第1", away: "最佳第三名", venue: "AT&T Stadium", city: "Dallas" },
  { id: 85, stage: "32强", date: "2026-07-04", etTime: "15:00", home: "L组第1", away: "K组第2", venue: "Estadio BBVA", city: "Monterrey" },
  { id: 86, stage: "32强", date: "2026-07-04", etTime: "18:00", home: "小组第2", away: "最佳第三名", venue: "Estadio Akron", city: "Guadalajara" },
  { id: 87, stage: "32强", date: "2026-07-05", etTime: "15:00", home: "小组第1", away: "最佳第三名", venue: "BC Place", city: "Vancouver" },
  { id: 88, stage: "32强", date: "2026-07-05", etTime: "18:00", home: "小组第1", away: "最佳第三名", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: 89, stage: "16强", date: "2026-07-06", etTime: "15:00", home: "32强胜者", away: "32强胜者", venue: "Lumen Field", city: "Seattle" },
  { id: 90, stage: "16强", date: "2026-07-06", etTime: "18:00", home: "32强胜者", away: "32强胜者", venue: "Lincoln Financial Field", city: "Philadelphia" },
  { id: 91, stage: "16强", date: "2026-07-07", etTime: "15:00", home: "32强胜者", away: "32强胜者", venue: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 92, stage: "16强", date: "2026-07-07", etTime: "18:00", home: "32强胜者", away: "32强胜者", venue: "BC Place", city: "Vancouver" },
  { id: 93, stage: "16强", date: "2026-07-08", etTime: "15:00", home: "32强胜者", away: "32强胜者", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 94, stage: "16强", date: "2026-07-08", etTime: "18:00", home: "32强胜者", away: "32强胜者", venue: "Gillette Stadium", city: "Boston" },
  { id: 95, stage: "16强", date: "2026-07-09", etTime: "15:00", home: "32强胜者", away: "32强胜者", venue: "AT&T Stadium", city: "Dallas" },
  { id: 96, stage: "16强", date: "2026-07-09", etTime: "18:00", home: "32强胜者", away: "32强胜者", venue: "MetLife Stadium", city: "New York New Jersey" },
  { id: 97, stage: "1/4决赛", date: "2026-07-10", etTime: "15:00", home: "16强胜者", away: "16强胜者", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: 98, stage: "1/4决赛", date: "2026-07-10", etTime: "18:00", home: "16强胜者", away: "16强胜者", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: 99, stage: "1/4决赛", date: "2026-07-11", etTime: "15:00", home: "16强胜者", away: "16强胜者", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 100, stage: "1/4决赛", date: "2026-07-11", etTime: "18:00", home: "16强胜者", away: "16强胜者", venue: "Estadio Azteca", city: "Mexico City" },
  { id: 101, stage: "半决赛", date: "2026-07-14", etTime: "20:00", home: "1/4决赛胜者", away: "1/4决赛胜者", venue: "AT&T Stadium", city: "Dallas" },
  { id: 102, stage: "半决赛", date: "2026-07-15", etTime: "20:00", home: "1/4决赛胜者", away: "1/4决赛胜者", venue: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 103, stage: "季军赛", date: "2026-07-18", etTime: "18:00", home: "半决赛负者", away: "半决赛负者", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 104, stage: "决赛", date: "2026-07-19", etTime: "15:00", home: "半决赛胜者", away: "半决赛胜者", venue: "MetLife Stadium", city: "New York New Jersey" }
];

export const scheduleMatches: ScheduleMatch[] = matchInputs.map(withBeijingTime);

export const scheduleStages = ["全部", "分组赛", "32强", "16强", "1/4决赛", "半决赛", "季军赛", "决赛"] as const;
