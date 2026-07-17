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
  localTime: string;
  beijingTime: string;
  home: string;
  away: string;
  venue: string;
  city: string;
  homeScore?: number;
  awayScore?: number;
  goalScorers?: GoalScorer[];
  shootoutScore?: {
    home: number;
    away: number;
  };
  knockoutWinner?: "home" | "away";
};

type ScheduleMatchInput = Omit<ScheduleMatch, "beijingTime">;

const venueTimeZoneMap: Record<string, string> = {
  "Estadio Azteca": "America/Mexico_City",
  "Estadio Akron": "America/Mexico_City",
  "Estadio BBVA": "America/Monterrey",
  "BMO Field": "America/Toronto",
  "BC Place": "America/Vancouver",
  "SoFi Stadium": "America/Los_Angeles",
  "Levi's Stadium": "America/Los_Angeles",
  "Lumen Field": "America/Los_Angeles",
  "Mercedes-Benz Stadium": "America/New_York",
  "NRG Stadium": "America/Chicago",
  "AT&T Stadium": "America/Chicago",
  "Lincoln Financial Field": "America/New_York",
  "Hard Rock Stadium": "America/New_York",
  "MetLife Stadium": "America/New_York",
  "Gillette Stadium": "America/New_York",
  "Arrowhead Stadium": "America/Chicago"
};

const getMatchTimeZone = (match: Pick<ScheduleMatchInput, "venue" | "city">) => {
  return venueTimeZoneMap[match.venue] ?? "America/New_York";
};

const getTimeZoneOffsetMinutes = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const zonedAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  return (zonedAsUtc - date.getTime()) / 60000;
};

const parseLocalDateTimeInTimeZone = (date: string, time: string, timeZone: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute);

  let utcMs = utcGuess;
  for (let iteration = 0; iteration < 3; iteration += 1) {
    const offsetMinutes = getTimeZoneOffsetMinutes(new Date(utcMs), timeZone);
    const nextUtcMs = utcGuess - offsetMinutes * 60 * 1000;

    if (nextUtcMs === utcMs) {
      break;
    }

    utcMs = nextUtcMs;
  }

  return new Date(utcMs);
};

const formatBeijingTimeFromLocal = (date: string, localTime: string, timeZone: string) => {
  const localDate = parseLocalDateTimeInTimeZone(date, localTime, timeZone);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(localDate);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.month}-${values.day} ${values.hour}:${values.minute}`;
};

const withBeijingTime = (match: ScheduleMatchInput): ScheduleMatch => ({
  ...match,
  localTime: match.localTime,
  beijingTime: formatBeijingTimeFromLocal(match.date, match.localTime, getMatchTimeZone(match))
});

const matchInputs: ScheduleMatchInput[] = [
  { id: 1, stage: "分组赛", group: "A", date: "2026-06-11", localTime: "15:00", home: "墨西哥", away: "南非", venue: "Estadio Azteca", city: "Mexico City", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "胡利安·基尼奥内斯", team: "墨西哥", minute: "9'", type: "goal" },
    { player: "劳尔·希门尼斯", team: "墨西哥", minute: "67'", type: "goal" },
  ] },
  { id: 2, stage: "分组赛", group: "A", date: "2026-06-11", localTime: "22:00", home: "韩国", away: "捷克", venue: "Estadio Akron", city: "Guadalajara", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "拉迪斯拉夫·克雷伊奇", team: "捷克", minute: "59'", type: "goal" },
    { player: "黄仁范", team: "韩国", minute: "67'", type: "goal" },
    { player: "吴贤揆", team: "韩国", minute: "80'", type: "goal" },
  ] },
  { id: 3, stage: "分组赛", group: "B", date: "2026-06-12", localTime: "15:00", home: "加拿大", away: "波黑", venue: "BMO Field", city: "Toronto", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "约沃·卢基奇", team: "波黑", minute: "21'", type: "goal" },
    { player: "赛尔·拉林", team: "加拿大", minute: "79'", type: "goal" },
  ] },
  { id: 4, stage: "分组赛", group: "D", date: "2026-06-12", localTime: "21:00", home: "美国", away: "巴拉圭", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 4, awayScore: 1, goalScorers: [
    { player: "达米安·博瓦迪利亚", team: "巴拉圭", minute: "7'", type: "ownGoal" },
    { player: "福拉林·巴洛贡", team: "美国", minute: "31'", type: "goal" },
    { player: "福拉林·巴洛贡", team: "美国", minute: "45+5'", type: "goal" },
    { player: "毛里西奥", team: "巴拉圭", minute: "73'", type: "goal" },
    { player: "吉奥·雷纳", team: "美国", minute: "90+7'", type: "goal" },
  ] },
  { id: 5, stage: "分组赛", group: "B", date: "2026-06-13", localTime: "15:00", home: "卡塔尔", away: "瑞士", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "布雷尔·恩博洛", team: "瑞士", minute: "17'", type: "penalty" },
    { player: "布阿莱姆·胡希", team: "卡塔尔", minute: "90+5'", type: "goal" },
  ] },
  { id: 6, stage: "分组赛", group: "C", date: "2026-06-13", localTime: "18:00", home: "巴西", away: "摩洛哥", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "伊斯梅尔·塞巴里", team: "摩洛哥", minute: "21'", type: "goal" },
    { player: "维尼修斯·儒尼奥尔", team: "巴西", minute: "32'", type: "goal" },
  ] },
  { id: 7, stage: "分组赛", group: "C", date: "2026-06-13", localTime: "21:00", home: "海地", away: "苏格兰", venue: "Gillette Stadium", city: "Boston", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "约翰·麦金", team: "苏格兰", minute: "28'", type: "goal" },
  ] },
  { id: 8, stage: "分组赛", group: "D", date: "2026-06-14", localTime: "00:00", home: "澳大利亚", away: "土耳其", venue: "BC Place", city: "Vancouver", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "内斯托里·伊兰昆达", team: "澳大利亚", minute: "27'", type: "goal" },
    { player: "康纳·梅特卡夫", team: "澳大利亚", minute: "75'", type: "goal" },
  ] },
  { id: 9, stage: "分组赛", group: "E", date: "2026-06-14", localTime: "13:00", home: "德国", away: "库拉索", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 7, awayScore: 1, goalScorers: [
    { player: "费利克斯·恩梅查", team: "德国", minute: "6'", type: "goal" },
    { player: "利瓦诺·科梅嫩西亚", team: "库拉索", minute: "21'", type: "goal" },
    { player: "尼科·施洛特贝克", team: "德国", minute: "38'", type: "goal" },
    { player: "凯·哈弗茨", team: "德国", minute: "45+5'", type: "penalty" },
    { player: "贾马尔·穆西亚拉", team: "德国", minute: "47'", type: "goal" },
    { player: "纳撒尼尔·布朗", team: "德国", minute: "68'", type: "goal" },
    { player: "德尼兹·翁达夫", team: "德国", minute: "78'", type: "goal" },
    { player: "凯·哈弗茨", team: "德国", minute: "88'", type: "goal" },
  ] },
  { id: 10, stage: "分组赛", group: "F", date: "2026-06-14", localTime: "16:00", home: "荷兰", away: "日本", venue: "AT&T Stadium", city: "Dallas", homeScore: 2, awayScore: 2, goalScorers: [
    { player: "维吉尔·范戴克", team: "荷兰", minute: "51'", type: "goal" },
    { player: "中村敬斗", team: "日本", minute: "57'", type: "goal" },
    { player: "克里森西奥·萨默维尔", team: "荷兰", minute: "64'", type: "goal" },
    { player: "镰田大地", team: "日本", minute: "89'", type: "goal" },
  ] },
  { id: 11, stage: "分组赛", group: "E", date: "2026-06-14", localTime: "19:00", home: "科特迪瓦", away: "厄瓜多尔", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "阿马德·迪亚洛", team: "科特迪瓦", minute: "90'", type: "goal" },
  ] },
  { id: 12, stage: "分组赛", group: "F", date: "2026-06-14", localTime: "22:00", home: "瑞典", away: "突尼斯", venue: "Estadio Akron", city: "Guadalajara", homeScore: 5, awayScore: 1, goalScorers: [
    { player: "亚辛·阿亚里", team: "瑞典", minute: "7'", type: "goal" },
    { player: "亚历山大·伊萨克", team: "瑞典", minute: "30'", type: "goal" },
    { player: "奥马尔·雷基克", team: "突尼斯", minute: "43'", type: "goal" },
    { player: "维克托·约克雷斯", team: "瑞典", minute: "60'", type: "goal" },
    { player: "马蒂亚斯·斯万贝里", team: "瑞典", minute: "86'", type: "goal" },
    { player: "亚辛·阿亚里", team: "瑞典", minute: "90+6'", type: "goal" },
  ] },
  { id: 13, stage: "分组赛", group: "H", date: "2026-06-15", localTime: "12:00", home: "西班牙", away: "佛得角", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 14, stage: "分组赛", group: "G", date: "2026-06-15", localTime: "15:00", home: "比利时", away: "埃及", venue: "NRG Stadium", city: "Houston", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "埃马姆·阿舒尔", team: "埃及", minute: "19'", type: "goal" },
    { player: "穆罕默德·哈尼", team: "埃及", minute: "66'", type: "ownGoal" },
  ] },
  { id: 15, stage: "分组赛", group: "H", date: "2026-06-15", localTime: "18:00", home: "沙特阿拉伯", away: "乌拉圭", venue: "AT&T Stadium", city: "Dallas", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "阿卜杜勒拉·阿拉姆里", team: "沙特阿拉伯", minute: "41'", type: "goal" },
    { player: "马克西·阿劳霍", team: "乌拉圭", minute: "80'", type: "goal" },
  ] },
  { id: 16, stage: "分组赛", group: "G", date: "2026-06-15", localTime: "21:00", home: "伊朗", away: "新西兰", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 2, awayScore: 2, goalScorers: [
    { player: "伊莱·贾斯特", team: "新西兰", minute: "7'", type: "goal" },
    { player: "拉明·雷扎伊安", team: "伊朗", minute: "32'", type: "goal" },
    { player: "伊莱·贾斯特", team: "新西兰", minute: "55'", type: "goal" },
    { player: "穆罕默德·莫赫比", team: "伊朗", minute: "64'", type: "goal" },
  ] },
  { id: 17, stage: "分组赛", group: "I", date: "2026-06-16", localTime: "15:00", home: "法国", away: "塞内加尔", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 3, awayScore: 1, goalScorers: [
    { player: "基利安·姆巴佩", team: "法国", minute: "66'", type: "goal" },
    { player: "布拉德利·巴尔科拉", team: "法国", minute: "82'", type: "goal" },
    { player: "易卜拉欣·姆巴耶", team: "塞内加尔", minute: "90+5'", type: "goal" },
    { player: "基利安·姆巴佩", team: "法国", minute: "90+6'", type: "goal" },
  ] },
  { id: 18, stage: "分组赛", group: "I", date: "2026-06-16", localTime: "18:00", home: "伊拉克", away: "挪威", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 1, awayScore: 3, goalScorers: [
    { player: "埃尔林·哈兰德", team: "挪威", minute: "29'", type: "goal" },
    { player: "艾曼·侯赛因", team: "伊拉克", minute: "39'", type: "goal" },
    { player: "埃尔林·哈兰德", team: "挪威", minute: "43'", type: "goal" },
    { player: "莱奥·厄斯蒂高", team: "挪威", minute: "76'", type: "goal" },
  ] },
  { id: 19, stage: "分组赛", group: "J", date: "2026-06-16", localTime: "21:00", home: "阿根廷", away: "阿尔及利亚", venue: "Lumen Field", city: "Seattle", homeScore: 3, awayScore: 0, goalScorers: [
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "17'", type: "goal" },
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "60'", type: "goal" },
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "76'", type: "goal" },
  ] },
  { id: 20, stage: "分组赛", group: "J", date: "2026-06-17", localTime: "00:00", home: "奥地利", away: "约旦", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "罗马诺·施密德", team: "奥地利", minute: "21'", type: "goal" },
    { player: "马尔科·阿瑙托维奇", team: "奥地利", minute: "58'", type: "goal" },
    { player: "穆萨·阿尔塔马里", team: "约旦", minute: "73'", type: "goal" },
  ] },
  { id: 21, stage: "分组赛", group: "K", date: "2026-06-17", localTime: "13:00", home: "葡萄牙", away: "刚果民主共和国", venue: "Hard Rock Stadium", city: "Miami", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "若昂·内维斯", team: "葡萄牙", minute: "6'", type: "goal" },
    { player: "约安·维萨", team: "刚果民主共和国", minute: "83'", type: "goal" },
  ] },
  { id: 22, stage: "分组赛", group: "L", date: "2026-06-17", localTime: "16:00", home: "英格兰", away: "克罗地亚", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "哈里·凯恩", team: "英格兰", minute: "42'", type: "penalty" },
    { player: "马丁·巴图里纳", team: "克罗地亚", minute: "56'", type: "goal" },
    { player: "佩塔尔·穆萨", team: "克罗地亚", minute: "69'", type: "goal" },
    { player: "裘德·贝林厄姆", team: "英格兰", minute: "71'", type: "goal" },
    { player: "马库斯·拉什福德", team: "英格兰", minute: "89'", type: "goal" },
  ] },
  { id: 23, stage: "分组赛", group: "L", date: "2026-06-17", localTime: "19:00", home: "加纳", away: "巴拿马", venue: "BMO Field", city: "Toronto", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "凯莱布·耶伦基", team: "加纳", minute: "72'", type: "goal" },
  ] },
  { id: 24, stage: "分组赛", group: "K", date: "2026-06-17", localTime: "22:00", home: "乌兹别克斯坦", away: "哥伦比亚", venue: "Estadio BBVA", city: "Monterrey", homeScore: 1, awayScore: 2, goalScorers: [
    { player: "丹尼尔·穆尼奥斯", team: "哥伦比亚", minute: "41'", type: "goal" },
    { player: "阿博斯别克·法伊祖拉耶夫", team: "乌兹别克斯坦", minute: "55'", type: "goal" },
    { player: "杰斐逊·莱尔马", team: "哥伦比亚", minute: "66'", type: "goal" },
  ] },
  { id: 25, stage: "分组赛", group: "A", date: "2026-06-18", localTime: "12:00", home: "捷克", away: "南非", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "米哈尔·萨迪莱克", team: "捷克", minute: "5'", type: "goal" },
    { player: "特博霍·莫科纳", team: "南非", minute: "83'", type: "penalty" },
  ] },
  { id: 26, stage: "分组赛", group: "B", date: "2026-06-18", localTime: "15:00", home: "瑞士", away: "波黑", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 4, awayScore: 1, goalScorers: [
    { player: "约翰·曼赞比", team: "瑞士", minute: "75'", type: "goal" },
    { player: "鲁本·巴尔加斯", team: "瑞士", minute: "85'", type: "goal" },
    { player: "约翰·曼赞比", team: "瑞士", minute: "90'", type: "goal" },
    { player: "埃尔明·马赫米奇", team: "波黑", minute: "90+3'", type: "goal" },
    { player: "格拉尼特·扎卡", team: "瑞士", minute: "90+6'", type: "penalty" },
  ] },
  { id: 27, stage: "分组赛", group: "B", date: "2026-06-18", localTime: "18:00", home: "加拿大", away: "卡塔尔", venue: "BC Place", city: "Vancouver", homeScore: 6, awayScore: 0, goalScorers: [
    { player: "赛尔·拉林", team: "加拿大", minute: "16'", type: "goal" },
    { player: "乔纳森·戴维", team: "加拿大", minute: "29'", type: "goal" },
    { player: "乔纳森·戴维", team: "加拿大", minute: "45+3'", type: "goal" },
    { player: "内森·萨利巴", team: "加拿大", minute: "64'", type: "goal" },
    { player: "穆罕默德·阿尔曼奈", team: "卡塔尔", minute: "75'", type: "ownGoal" },
    { player: "乔纳森·戴维", team: "加拿大", minute: "90+2'", type: "goal" },
  ] },
  { id: 28, stage: "分组赛", group: "A", date: "2026-06-18", localTime: "21:00", home: "墨西哥", away: "韩国", venue: "Estadio Akron", city: "Guadalajara", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "路易斯·罗莫", team: "墨西哥", minute: "50'", type: "goal" },
  ] },
  { id: 29, stage: "分组赛", group: "D", date: "2026-06-19", localTime: "15:00", home: "美国", away: "澳大利亚", venue: "Lumen Field", city: "Seattle", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "卡梅伦·伯吉斯", team: "澳大利亚", minute: "11'", type: "ownGoal" },
    { player: "亚历克斯·弗里曼", team: "美国", minute: "43'", type: "goal" },
  ] },
  { id: 30, stage: "分组赛", group: "C", date: "2026-06-19", localTime: "18:00", home: "苏格兰", away: "摩洛哥", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "伊斯梅尔·塞巴里", team: "摩洛哥", minute: "2'", type: "goal" },
  ] },
  { id: 31, stage: "分组赛", group: "C", date: "2026-06-19", localTime: "20:30", home: "巴西", away: "海地", venue: "Hard Rock Stadium", city: "Miami", homeScore: 3, awayScore: 0, goalScorers: [
    { player: "马特乌斯·库尼亚", team: "巴西", minute: "6'", type: "goal" },
    { player: "马特乌斯·库尼亚", team: "巴西", minute: "12'", type: "goal" },
    { player: "维尼修斯·儒尼奥尔", team: "巴西", minute: "45'", type: "goal" },
  ] },
  { id: 32, stage: "分组赛", group: "D", date: "2026-06-19", localTime: "23:00", home: "土耳其", away: "巴拉圭", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "马蒂亚斯·加拉尔萨", team: "巴拉圭", minute: "2'", type: "goal" },
  ] },
  { id: 33, stage: "分组赛", group: "F", date: "2026-06-20", localTime: "13:00", home: "荷兰", away: "瑞典", venue: "AT&T Stadium", city: "Dallas", homeScore: 5, awayScore: 1, goalScorers: [
    { player: "布赖恩·布罗贝", team: "荷兰", minute: "6'", type: "goal" },
    { player: "布赖恩·布罗贝", team: "荷兰", minute: "17'", type: "goal" },
    { player: "科迪·加克波", team: "荷兰", minute: "47'", type: "goal" },
    { player: "科迪·加克波", team: "荷兰", minute: "54'", type: "goal" },
    { player: "安东尼·埃兰加", team: "瑞典", minute: "59'", type: "goal" },
    { player: "克里森西奥·萨默维尔", team: "荷兰", minute: "89'", type: "goal" },
  ] },
  { id: 34, stage: "分组赛", group: "E", date: "2026-06-20", localTime: "16:00", home: "德国", away: "科特迪瓦", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "弗兰克·凯西", team: "科特迪瓦", minute: "30'", type: "goal" },
    { player: "德尼兹·翁达夫", team: "德国", minute: "68'", type: "goal" },
    { player: "德尼兹·翁达夫", team: "德国", minute: "90+4'", type: "goal" },
  ] },
  { id: 35, stage: "分组赛", group: "E", date: "2026-06-20", localTime: "20:00", home: "厄瓜多尔", away: "库拉索", venue: "Hard Rock Stadium", city: "Miami", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 36, stage: "分组赛", group: "F", date: "2026-06-21", localTime: "00:00", home: "突尼斯", away: "日本", venue: "Estadio BBVA", city: "Monterrey", homeScore: 0, awayScore: 4, goalScorers: [
    { player: "上田绮世", team: "日本", minute: "31'", type: "goal" },
    { player: "伊东纯也", team: "日本", minute: "63'", type: "goal" },
    { player: "上田绮世", team: "日本", minute: "78'", type: "goal" },
    { player: "镰田大地", team: "日本", minute: "90+2'", type: "goal" },
  ] },
  { id: 37, stage: "分组赛", group: "H", date: "2026-06-21", localTime: "12:00", home: "西班牙", away: "沙特阿拉伯", venue: "NRG Stadium", city: "Houston", homeScore: 4, awayScore: 0, goalScorers: [
    { player: "拉明·亚马尔", team: "西班牙", minute: "11'", type: "goal" },
    { player: "米克尔·奥亚萨瓦尔", team: "西班牙", minute: "21'", type: "goal" },
    { player: "米克尔·奥亚萨瓦尔", team: "西班牙", minute: "24'", type: "goal" },
    { player: "哈桑·坦巴克提", team: "沙特阿拉伯", minute: "49'", type: "ownGoal" },
  ] },
  { id: 38, stage: "分组赛", group: "G", date: "2026-06-21", localTime: "15:00", home: "比利时", away: "伊朗", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 39, stage: "分组赛", group: "H", date: "2026-06-21", localTime: "18:00", home: "乌拉圭", away: "佛得角", venue: "Gillette Stadium", city: "Boston", homeScore: 2, awayScore: 2, goalScorers: [
    { player: "凯文·皮纳", team: "佛得角", minute: "21'", type: "goal" },
    { player: "马克西·阿劳霍", team: "乌拉圭", minute: "44'", type: "goal" },
    { player: "阿古斯丁·卡诺比奥", team: "乌拉圭", minute: "45+6'", type: "goal" },
    { player: "赫利奥·瓦雷拉", team: "佛得角", minute: "61'", type: "goal" },
  ] },
  { id: 40, stage: "分组赛", group: "G", date: "2026-06-21", localTime: "21:00", home: "新西兰", away: "埃及", venue: "NRG Stadium", city: "Houston", homeScore: 1, awayScore: 3, goalScorers: [
    { player: "特雷泽盖", team: "埃及", minute: "15'", type: "goal" },
    { player: "齐佐", team: "埃及", minute: "59'", type: "goal" },
    { player: "穆罕默德·萨拉赫", team: "埃及", minute: "67'", type: "goal" },
    { player: "芬恩·瑟曼", team: "新西兰", minute: "82'", type: "goal" },
  ] },
  { id: 41, stage: "分组赛", group: "J", date: "2026-06-22", localTime: "13:00", home: "阿根廷", away: "奥地利", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "38'", type: "goal" },
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "90+5'", type: "goal" },
  ] },
  { id: 42, stage: "分组赛", group: "I", date: "2026-06-22", localTime: "17:00", home: "法国", away: "伊拉克", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 3, awayScore: 0, goalScorers: [
    { player: "基利安·姆巴佩", team: "法国", minute: "14'", type: "goal" },
    { player: "基利安·姆巴佩", team: "法国", minute: "54'", type: "goal" },
    { player: "奥斯曼·登贝莱", team: "法国", minute: "66'", type: "goal" },
  ] },
  { id: 43, stage: "分组赛", group: "I", date: "2026-06-22", localTime: "20:00", home: "挪威", away: "塞内加尔", venue: "Gillette Stadium", city: "Boston", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "马库斯·佩德森", team: "挪威", minute: "43'", type: "goal" },
    { player: "埃尔林·哈兰德", team: "挪威", minute: "48'", type: "goal" },
    { player: "伊斯梅拉·萨尔", team: "塞内加尔", minute: "53'", type: "goal" },
    { player: "埃尔林·哈兰德", team: "挪威", minute: "58'", type: "goal" },
    { player: "伊斯梅拉·萨尔", team: "塞内加尔", minute: "90+3'", type: "goal" },
  ] },
  { id: 44, stage: "分组赛", group: "J", date: "2026-06-22", localTime: "23:00", home: "约旦", away: "阿尔及利亚", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 1, awayScore: 2, goalScorers: [
    { player: "尼扎尔·拉什丹", team: "约旦", minute: "36'", type: "goal" },
    { player: "阿明·古伊里", team: "阿尔及利亚", minute: "69'", type: "goal" },
    { player: "纳迪尔·本布阿里", team: "阿尔及利亚", minute: "82'", type: "goal" },
  ] },
  { id: 45, stage: "分组赛", group: "K", date: "2026-06-23", localTime: "13:00", home: "葡萄牙", away: "乌兹别克斯坦", venue: "Hard Rock Stadium", city: "Miami", homeScore: 5, awayScore: 0, goalScorers: [
    { player: "克里斯蒂亚诺·罗纳尔多", team: "葡萄牙", minute: "6'", type: "goal" },
    { player: "努诺·门德斯", team: "葡萄牙", minute: "16'", type: "goal" },
    { player: "克里斯蒂亚诺·罗纳尔多", team: "葡萄牙", minute: "39'", type: "goal" },
    { player: "阿卜杜科迪尔·胡萨诺夫", team: "乌兹别克斯坦", minute: "60'", type: "ownGoal" },
    { player: "拉斐尔·莱奥", team: "葡萄牙", minute: "87'", type: "goal" },
  ] },
  { id: 46, stage: "分组赛", group: "L", date: "2026-06-23", localTime: "16:00", home: "英格兰", away: "加纳", venue: "Gillette Stadium", city: "Boston", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 47, stage: "分组赛", group: "L", date: "2026-06-23", localTime: "19:00", home: "巴拿马", away: "克罗地亚", venue: "BMO Field", city: "Toronto", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "安特·布迪米尔", team: "克罗地亚", minute: "54'", type: "goal" },
  ] },
  { id: 48, stage: "分组赛", group: "K", date: "2026-06-23", localTime: "22:00", home: "哥伦比亚", away: "刚果民主共和国", venue: "AT&T Stadium", city: "Dallas", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "丹尼尔·穆尼奥斯", team: "哥伦比亚", minute: "76'", type: "goal" },
  ] },
  { id: 49, stage: "分组赛", group: "B", date: "2026-06-24", localTime: "15:00", home: "瑞士", away: "加拿大", venue: "BC Place", city: "Vancouver", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "鲁本·巴尔加斯", team: "瑞士", minute: "46'", type: "goal" },
    { player: "约翰·曼赞比", team: "瑞士", minute: "57'", type: "goal" },
    { player: "普罗米斯·戴维", team: "加拿大", minute: "76'", type: "goal" },
  ] },
  { id: 50, stage: "分组赛", group: "B", date: "2026-06-24", localTime: "15:00", home: "波黑", away: "卡塔尔", venue: "Lumen Field", city: "Seattle", homeScore: 3, awayScore: 1, goalScorers: [
    { player: "凯里姆·阿拉伊贝戈维奇", team: "波黑", minute: "29'", type: "goal" },
    { player: "苏丹·阿尔布拉克", team: "卡塔尔", minute: "34'", type: "ownGoal" },
    { player: "哈桑·海多斯", team: "卡塔尔", minute: "42'", type: "goal" },
    { player: "埃尔明·马赫米奇", team: "波黑", minute: "80'", type: "goal" },
  ] },
  { id: 51, stage: "分组赛", group: "C", date: "2026-06-24", localTime: "18:00", home: "摩洛哥", away: "海地", venue: "NRG Stadium", city: "Houston", homeScore: 4, awayScore: 2, goalScorers: [
    { player: "莱尼·约瑟夫", team: "海地", minute: "10'", type: "goal" },
    { player: "阿什拉夫·哈基米", team: "摩洛哥", minute: "39'", type: "goal" },
    { player: "威尔逊·伊西多尔", team: "海地", minute: "43'", type: "goal" },
    { player: "伊斯梅尔·塞巴里", team: "摩洛哥", minute: "45+1'", type: "goal" },
    { player: "苏菲安·拉希米", team: "摩洛哥", minute: "78'", type: "goal" },
    { player: "杰西姆·亚辛", team: "摩洛哥", minute: "89'", type: "goal" },
  ] },
  { id: 52, stage: "分组赛", group: "C", date: "2026-06-24", localTime: "18:00", home: "苏格兰", away: "巴西", venue: "Hard Rock Stadium", city: "Miami", homeScore: 0, awayScore: 3, goalScorers: [
    { player: "维尼修斯·儒尼奥尔", team: "巴西", minute: "7'", type: "goal" },
    { player: "维尼修斯·儒尼奥尔", team: "巴西", minute: "45+3'", type: "goal" },
    { player: "马特乌斯·库尼亚", team: "巴西", minute: "60'", type: "goal" },
  ] },
  { id: 53, stage: "分组赛", group: "A", date: "2026-06-24", localTime: "21:00", home: "南非", away: "韩国", venue: "Estadio Akron", city: "Guadalajara", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "塔佩洛·马塞科", team: "南非", minute: "63'", type: "goal" },
  ] },
  { id: 54, stage: "分组赛", group: "A", date: "2026-06-24", localTime: "21:00", home: "捷克", away: "墨西哥", venue: "Estadio Azteca", city: "Mexico City", homeScore: 0, awayScore: 3, goalScorers: [
    { player: "马特奥·查韦斯", team: "墨西哥", minute: "54'", type: "goal" },
    { player: "胡利安·基尼奥内斯", team: "墨西哥", minute: "61'", type: "goal" },
    { player: "阿尔瓦罗·菲达尔戈", team: "墨西哥", minute: "90+4'", type: "goal" },
  ] },
  { id: 55, stage: "分组赛", group: "E", date: "2026-06-25", localTime: "16:00", home: "库拉索", away: "科特迪瓦", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 0, awayScore: 2, goalScorers: [
    { player: "尼古拉·佩佩", team: "科特迪瓦", minute: "7'", type: "goal" },
    { player: "尼古拉·佩佩", team: "科特迪瓦", minute: "64'", type: "goal" },
  ] },
  { id: 56, stage: "分组赛", group: "E", date: "2026-06-25", localTime: "16:00", home: "厄瓜多尔", away: "德国", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "勒罗伊·萨内", team: "德国", minute: "2'", type: "goal" },
    { player: "尼尔松·安古洛", team: "厄瓜多尔", minute: "9'", type: "goal" },
    { player: "贡萨洛·普拉塔", team: "厄瓜多尔", minute: "77'", type: "goal" },
  ] },
  { id: 57, stage: "分组赛", group: "F", date: "2026-06-25", localTime: "19:00", home: "突尼斯", away: "荷兰", venue: "AT&T Stadium", city: "Dallas", homeScore: 1, awayScore: 3, goalScorers: [
    { player: "埃利耶斯·斯希里", team: "突尼斯", minute: "3'", type: "ownGoal" },
    { player: "布赖恩·布罗贝伊", team: "荷兰", minute: "7'", type: "goal" },
    { player: "哈泽姆·马斯图里", team: "突尼斯", minute: "54'", type: "goal" },
    { player: "扬-保罗·范黑克", team: "荷兰", minute: "62'", type: "goal" },
  ] },
  { id: 58, stage: "分组赛", group: "F", date: "2026-06-25", localTime: "19:00", home: "日本", away: "瑞典", venue: "BC Place", city: "Vancouver", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "前田大然", team: "日本", minute: "56'", type: "goal" },
    { player: "安东尼·埃兰加", team: "瑞典", minute: "61'", type: "goal" },
  ] },
  { id: 59, stage: "分组赛", group: "D", date: "2026-06-25", localTime: "22:00", home: "土耳其", away: "美国", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "奥斯顿·特拉斯蒂", team: "美国", minute: "3'", type: "goal" },
    { player: "阿尔达·居莱尔", team: "土耳其", minute: "10'", type: "goal" },
    { player: "奥尔昆·科克曲", team: "土耳其", minute: "31'", type: "goal" },
    { player: "塞巴斯蒂安·贝哈尔特", team: "美国", minute: "49'", type: "goal" },
    { player: "卡安·艾汉", team: "土耳其", minute: "90+8'", type: "goal" },
  ] },
  { id: 60, stage: "分组赛", group: "D", date: "2026-06-25", localTime: "22:00", home: "巴拉圭", away: "澳大利亚", venue: "Levi's Stadium", city: "San Francisco Bay Area", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 61, stage: "分组赛", group: "I", date: "2026-06-26", localTime: "15:00", home: "挪威", away: "法国", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 1, awayScore: 4, goalScorers: [
    { player: "奥斯曼·登贝莱", team: "法国", minute: "7'", type: "goal" },
    { player: "奥斯曼·登贝莱", team: "法国", minute: "20'", type: "goal" },
    { player: "泰洛·阿斯加德", team: "挪威", minute: "21'", type: "goal" },
    { player: "奥斯曼·登贝莱", team: "法国", minute: "32'", type: "goal" },
    { player: "德西雷·杜埃", team: "法国", minute: "90+4'", type: "goal" },
  ] },
  { id: 62, stage: "分组赛", group: "I", date: "2026-06-26", localTime: "15:00", home: "塞内加尔", away: "伊拉克", venue: "Gillette Stadium", city: "Boston", homeScore: 5, awayScore: 0, goalScorers: [
    { player: "哈比卜·迪亚拉", team: "塞内加尔", minute: "4'", type: "goal" },
    { player: "拉明·卡马拉", team: "塞内加尔", minute: "57'", type: "goal" },
    { player: "伊斯梅拉·萨尔", team: "塞内加尔", minute: "59'", type: "goal" },
    { player: "帕佩·盖耶", team: "塞内加尔", minute: "71'", type: "goal" },
    { player: "伊利曼·恩迪亚耶", team: "塞内加尔", minute: "83'", type: "goal" },
  ] },
  { id: 63, stage: "分组赛", group: "H", date: "2026-06-26", localTime: "20:00", home: "佛得角", away: "沙特阿拉伯", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 64, stage: "分组赛", group: "H", date: "2026-06-26", localTime: "20:00", home: "乌拉圭", away: "西班牙", venue: "NRG Stadium", city: "Houston", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "亚历克斯·巴埃纳", team: "西班牙", minute: "44'", type: "goal" },
  ] },
  { id: 65, stage: "分组赛", group: "G", date: "2026-06-26", localTime: "23:00", home: "新西兰", away: "比利时", venue: "Lumen Field", city: "Seattle", homeScore: 1, awayScore: 5, goalScorers: [
    { player: "莱安德罗·特罗萨德", team: "比利时", minute: "28'", type: "goal" },
    { player: "莱安德罗·特罗萨德", team: "比利时", minute: "50'", type: "goal" },
    { player: "凯文·德布劳内", team: "比利时", minute: "67'", type: "goal" },
    { player: "伊莱贾·贾斯特", team: "新西兰", minute: "84'", type: "goal" },
    { player: "罗梅卢·卢卡库", team: "比利时", minute: "86'", type: "goal" },
    { player: "亚历克西斯·萨勒梅克斯", team: "比利时", minute: "90+4'", type: "goal" },
  ] },
  { id: 66, stage: "分组赛", group: "G", date: "2026-06-26", localTime: "23:00", home: "埃及", away: "伊朗", venue: "AT&T Stadium", city: "Dallas", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "马哈茂德·萨贝尔", team: "埃及", minute: "5'", type: "goal" },
    { player: "拉明·雷扎伊安", team: "伊朗", minute: "14'", type: "goal" },
  ] },
  { id: 67, stage: "分组赛", group: "L", date: "2026-06-27", localTime: "17:00", home: "巴拿马", away: "英格兰", venue: "MetLife Stadium", city: "New York New Jersey", homeScore: 0, awayScore: 2, goalScorers: [
    { player: "裘德·贝林厄姆", team: "英格兰", minute: "62'", type: "goal" },
    { player: "哈里·凯恩", team: "英格兰", minute: "67'", type: "goal" },
  ] },
  { id: 68, stage: "分组赛", group: "L", date: "2026-06-27", localTime: "17:00", home: "克罗地亚", away: "加纳", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "彼得·苏契奇", team: "克罗地亚", minute: "31'", type: "goal" },
    { player: "德里克·卢卡森", team: "加纳", minute: "73'", type: "goal" },
    { player: "尼科拉·弗拉希奇", team: "克罗地亚", minute: "83'", type: "goal" },
  ] },
  { id: 69, stage: "分组赛", group: "K", date: "2026-06-27", localTime: "19:30", home: "哥伦比亚", away: "葡萄牙", venue: "Hard Rock Stadium", city: "Miami", homeScore: 0, awayScore: 0, goalScorers: [] },
  { id: 70, stage: "分组赛", group: "K", date: "2026-06-27", localTime: "19:30", home: "刚果民主共和国", away: "乌兹别克斯坦", venue: "Estadio BBVA", city: "Monterrey", homeScore: 3, awayScore: 1, goalScorers: [
    { player: "埃尔多尔·肖穆罗多夫", team: "乌兹别克斯坦", minute: "10'", type: "goal" },
    { player: "约安·维萨", team: "刚果民主共和国", minute: "68'", type: "penalty" },
    { player: "菲斯顿·马耶莱", team: "刚果民主共和国", minute: "78'", type: "goal" },
    { player: "约安·维萨", team: "刚果民主共和国", minute: "90+1'", type: "goal" },
  ] },
  { id: 71, stage: "分组赛", group: "J", date: "2026-06-27", localTime: "22:00", home: "阿尔及利亚", away: "奥地利", venue: "Lumen Field", city: "Seattle", homeScore: 3, awayScore: 3, goalScorers: [
    { player: "马尔科·阿瑙托维奇", team: "奥地利", minute: "28'", type: "goal" },
    { player: "拉菲克·贝尔加利", team: "阿尔及利亚", minute: "45'", type: "goal" },
    { player: "马塞尔·萨比策", team: "奥地利", minute: "54'", type: "goal" },
    { player: "里亚德·马赫雷斯", team: "阿尔及利亚", minute: "60'", type: "goal" },
    { player: "里亚德·马赫雷斯", team: "阿尔及利亚", minute: "90+4'", type: "goal" },
    { player: "萨沙·卡拉季奇", team: "奥地利", minute: "90+5'", type: "goal" },
  ] },
  { id: 72, stage: "分组赛", group: "J", date: "2026-06-27", localTime: "22:00", home: "约旦", away: "阿根廷", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: 1, awayScore: 3, goalScorers: [
    { player: "吉奥瓦尼·洛塞尔索", team: "阿根廷", minute: "24'", type: "goal" },
    { player: "劳塔罗·马丁内斯", team: "阿根廷", minute: "33'", type: "penalty" },
    { player: "穆萨·阿尔塔马里", team: "约旦", minute: "63'", type: "goal" },
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "78'", type: "goal" },
  ] },

  { id: 73, stage: "32强", date: "2026-06-28", localTime: "15:00", home: "南非", away: "加拿大", venue: "SoFi Stadium", city: "Los Angeles", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "斯蒂芬·尤斯塔基奥", team: "加拿大", minute: "90+2'", type: "goal" },
  ] },
  { id: 74, stage: "32强", date: "2026-06-29", localTime: "16:30", home: "德国", away: "巴拉圭", venue: "Gillette Stadium", city: "Foxborough", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "胡利奥·恩西索", team: "巴拉圭", minute: "42'", type: "goal" },
    { player: "凯·哈弗茨", team: "德国", minute: "54'", type: "goal" },
  ], shootoutScore: { home: 3, away: 4 }, knockoutWinner: "away" },
  { id: 75, stage: "32强", date: "2026-06-29", localTime: "21:00", home: "荷兰", away: "摩洛哥", venue: "Estadio BBVA", city: "Guadalupe", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "科迪·加克波", team: "荷兰", minute: "72'", type: "goal" },
    { player: "伊萨·迪奥普", team: "摩洛哥", minute: "90+1'", type: "goal" },
  ], shootoutScore: { home: 2, away: 3 }, knockoutWinner: "away" },
  { id: 76, stage: "32强", date: "2026-06-29", localTime: "13:00", home: "巴西", away: "日本", venue: "NRG Stadium", city: "Houston", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "桑圣·桑诺", team: "日本", minute: "29'", type: "goal" },
    { player: "卡塞米罗", team: "巴西", minute: "55'", type: "goal" },
    { player: "加布里埃尔·马丁内利", team: "巴西", minute: "90+6'", type: "goal" },
  ] },
  { id: 77, stage: "32强", date: "2026-06-30", localTime: "17:00", home: "法国", away: "瑞典", venue: "MetLife Stadium", city: "East Rutherford", homeScore: 3, awayScore: 0, goalScorers: [
    { player: "基利安·姆巴佩", team: "法国", minute: "45'", type: "goal" },
    { player: "布拉德利·巴尔科拉", team: "法国", minute: "53'", type: "goal" },
    { player: "基利安·姆巴佩", team: "法国", minute: "74'", type: "goal" },
  ] },
  { id: 78, stage: "32强", date: "2026-06-30", localTime: "13:00", home: "科特迪瓦", away: "挪威", venue: "AT&T Stadium", city: "Arlington", homeScore: 1, awayScore: 2, goalScorers: [
    { player: "安东尼奥·努萨", team: "挪威", minute: "39'", type: "goal" },
    { player: "阿马德·迪亚洛", team: "科特迪瓦", minute: "74'", type: "goal" },
    { player: "埃尔林·哈兰德", team: "挪威", minute: "86'", type: "goal" },
  ] },
  { id: 79, stage: "32强", date: "2026-06-30", localTime: "19:00", home: "墨西哥", away: "厄瓜多尔", venue: "Estadio Azteca", city: "Mexico City", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "胡利安·基尼奥内斯", team: "墨西哥", minute: "22'", type: "goal" },
    { player: "劳尔·希门尼斯", team: "墨西哥", minute: "31'", type: "goal" }
  ] },
  { id: 80, stage: "32强", date: "2026-07-01", localTime: "12:00", home: "英格兰", away: "刚果民主共和国", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "布赖恩·西彭加", team: "刚果民主共和国", minute: "7'", type: "goal" },
    { player: "哈里·凯恩", team: "英格兰", minute: "75'", type: "goal" },
    { player: "哈里·凯恩", team: "英格兰", minute: "86'", type: "goal" }
  ] },
  { id: 81, stage: "32强", date: "2026-07-01", localTime: "20:00", home: "美国", away: "波黑", venue: "Levi's Stadium", city: "Santa Clara", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "福拉林·巴洛贡", team: "美国", minute: "45'", type: "goal" },
    { player: "马利克·蒂尔曼", team: "美国", minute: "82'", type: "goal" }
  ] },
  { id: 82, stage: "32强", date: "2026-07-01", localTime: "13:00", home: "比利时", away: "塞内加尔", venue: "Lumen Field", city: "Seattle", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "哈比卜·迪亚拉", team: "塞内加尔", minute: "25'", type: "goal" },
    { player: "伊斯梅拉·萨尔", team: "塞内加尔", minute: "51'", type: "goal" },
    { player: "罗梅卢·卢卡库", team: "比利时", minute: "86'", type: "goal" },
    { player: "尤里·蒂勒曼斯", team: "比利时", minute: "89'", type: "goal" },
    { player: "尤里·蒂勒曼斯", team: "比利时", minute: "120+5'", type: "penalty" }
  ] },
  { id: 83, stage: "32强", date: "2026-07-02", localTime: "19:00", home: "葡萄牙", away: "克罗地亚", venue: "BMO Field", city: "Toronto", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "伊万·佩里希奇", team: "克罗地亚", minute: "53'", type: "goal" },
    { player: "克里斯蒂亚诺·罗纳尔多", team: "葡萄牙", minute: "68'", type: "penalty" },
    { player: "贡萨洛·拉莫斯", team: "葡萄牙", minute: "90+4'", type: "goal" }
  ] },
  { id: 84, stage: "32强", date: "2026-07-02", localTime: "12:00", home: "西班牙", away: "奥地利", venue: "SoFi Stadium", city: "Inglewood", homeScore: 3, awayScore: 0, goalScorers: [
    { player: "米克尔·奥亚萨瓦尔", team: "西班牙", minute: "36'", type: "goal" },
    { player: "佩德罗·波罗", team: "西班牙", minute: "66'", type: "goal" },
    { player: "米克尔·奥亚萨瓦尔", team: "西班牙", minute: "89'", type: "goal" }
  ] },
  { id: 85, stage: "32强", date: "2026-07-02", localTime: "20:00", home: "瑞士", away: "阿尔及利亚", venue: "BC Place", city: "Vancouver", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "布雷尔·恩博洛", team: "瑞士", minute: "10'", type: "goal" },
    { player: "丹·恩多耶", team: "瑞士", minute: "46'", type: "goal" }
  ] },
  { id: 86, stage: "32强", date: "2026-07-03", localTime: "18:00", home: "阿根廷", away: "佛得角", venue: "Hard Rock Stadium", city: "Miami Gardens", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "28'", type: "goal" },
    { player: "德罗伊·杜阿尔特", team: "佛得角", minute: "59'", type: "goal" },
    { player: "利桑德罗·马丁内斯", team: "阿根廷", minute: "93'", type: "goal" },
    { player: "西德尼·洛佩斯·卡布拉尔", team: "佛得角", minute: "104'", type: "goal" },
    { player: "克里斯蒂安·罗梅罗", team: "阿根廷", minute: "111'", type: "goal" },
  ] },
  { id: 87, stage: "32强", date: "2026-07-03", localTime: "20:30", home: "哥伦比亚", away: "加纳", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "约翰·阿里亚斯", team: "哥伦比亚", minute: "14'", type: "goal" },
  ] },
  { id: 88, stage: "32强", date: "2026-07-03", localTime: "13:00", home: "澳大利亚", away: "埃及", venue: "AT&T Stadium", city: "Arlington", homeScore: 1, awayScore: 1, goalScorers: [
    { player: "埃马姆·阿舒尔", team: "埃及", minute: "13'", type: "goal" },
    { player: "穆罕默德·哈尼", team: "埃及", minute: "55'", type: "ownGoal" },
  ], shootoutScore: { home: 2, away: 4 }, knockoutWinner: "away" },
  { id: 89, stage: "16强", date: "2026-07-04", localTime: "13:00", home: "加拿大", away: "摩洛哥", venue: "NRG Stadium", city: "Houston", homeScore: 0, awayScore: 3, goalScorers: [
    { player: "阿泽丁·乌纳希", team: "摩洛哥", minute: "50'", type: "goal" },
    { player: "阿泽丁·乌纳希", team: "摩洛哥", minute: "82'", type: "goal" },
    { player: "苏菲安·拉希米", team: "摩洛哥", minute: "90+8'", type: "goal" },
  ] },
  { id: 90, stage: "16强", date: "2026-07-04", localTime: "17:00", home: "法国", away: "巴拉圭", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: 1, awayScore: 0, goalScorers: [
    { player: "基利安·姆巴佩", team: "法国", minute: "69'", type: "penalty" },
  ] },
  { id: 91, stage: "16强", date: "2026-07-05", localTime: "16:00", home: "巴西", away: "挪威", venue: "MetLife Stadium", city: "East Rutherford", homeScore: 1, awayScore: 2, goalScorers: [
    { player: "埃尔林·哈兰德", team: "挪威", minute: "79'", type: "goal" },
    { player: "埃尔林·哈兰德", team: "挪威", minute: "89'", type: "goal" },
    { player: "内马尔", team: "巴西", minute: "90+10'", type: "penalty" },
  ] },
  { id: 92, stage: "16强", date: "2026-07-05", localTime: "19:00", home: "英格兰", away: "墨西哥", venue: "Estadio Azteca", city: "Mexico City", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "裘德·贝林厄姆", team: "英格兰", minute: "36'", type: "goal" },
    { player: "裘德·贝林厄姆", team: "英格兰", minute: "38'", type: "goal" },
    { player: "胡利安·基尼奥内斯", team: "墨西哥", minute: "42'", type: "goal" },
    { player: "哈里·凯恩", team: "英格兰", minute: "60'", type: "penalty" },
    { player: "劳尔·希门尼斯", team: "墨西哥", minute: "69'", type: "penalty" },
  ] },
  { id: 93, stage: "16强", date: "2026-07-06", localTime: "15:00", home: "葡萄牙", away: "西班牙", venue: "AT&T Stadium", city: "Arlington", homeScore: 0, awayScore: 1, goalScorers: [
    { player: "米克尔·梅里诺", team: "西班牙", minute: "90+1'", type: "goal" },
  ] },
  { id: 94, stage: "16强", date: "2026-07-06", localTime: "20:00", home: "比利时", away: "美国", venue: "Lumen Field", city: "Seattle", homeScore: 4, awayScore: 1, goalScorers: [
    { player: "夏尔·德克特拉勒", team: "比利时", minute: "9'", type: "goal" },
    { player: "马利克·蒂尔曼", team: "美国", minute: "31'", type: "goal" },
    { player: "夏尔·德克特拉勒", team: "比利时", minute: "33'", type: "goal" },
    { player: "汉斯·范阿肯", team: "比利时", minute: "57'", type: "goal" },
    { player: "罗梅卢·卢卡库", team: "比利时", minute: "90+3'", type: "goal" }
  ] },
  { id: 95, stage: "16强", date: "2026-07-07", localTime: "12:00", home: "阿根廷", away: "埃及", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 3, awayScore: 2, goalScorers: [
    { player: "亚西尔·易卜拉欣", team: "埃及", minute: "15'", type: "goal" },
    { player: "穆斯塔法·齐科", team: "埃及", minute: "67'", type: "goal" },
    { player: "克里斯蒂安·罗梅罗", team: "阿根廷", minute: "79'", type: "goal" },
    { player: "莱昂内尔·梅西", team: "阿根廷", minute: "83'", type: "goal" },
    { player: "恩佐·费尔南德斯", team: "阿根廷", minute: "90+2'", type: "goal" }
  ] },
  { id: 96, stage: "16强", date: "2026-07-07", localTime: "16:00", home: "瑞士", away: "哥伦比亚", venue: "BC Place", city: "Vancouver", homeScore: 0, awayScore: 0, goalScorers: [], shootoutScore: { home: 4, away: 3 }, knockoutWinner: "home" },
  { id: 97, stage: "1/4决赛", date: "2026-07-09", localTime: "16:00", home: "摩洛哥", away: "法国", venue: "Gillette Stadium", city: "Foxborough", homeScore: 0, awayScore: 2, goalScorers: [
    { player: "基利安·姆巴佩", team: "法国", minute: "60'", type: "goal" },
    { player: "奥斯曼·登贝莱", team: "法国", minute: "66'", type: "goal" }
  ], knockoutWinner: "away" },
  { id: 98, stage: "1/4决赛", date: "2026-07-10", localTime: "15:00", home: "西班牙", away: "比利时", venue: "SoFi Stadium", city: "Inglewood", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "法比安·鲁伊斯", team: "西班牙", minute: "30'", type: "goal" },
    { player: "夏尔·德克特拉勒", team: "比利时", minute: "41'", type: "goal" },
    { player: "米克尔·梅里诺", team: "西班牙", minute: "88'", type: "goal" }
  ], knockoutWinner: "home" },
  { id: 99, stage: "1/4决赛", date: "2026-07-11", localTime: "17:00", home: "挪威", away: "英格兰", venue: "Hard Rock Stadium", city: "Miami Gardens", homeScore: 1, awayScore: 2, goalScorers: [
    { player: "安德烈亚斯·施耶尔德鲁普", team: "挪威", minute: "36'", type: "goal" },
    { player: "裘德·贝林厄姆", team: "英格兰", minute: "45+2'", type: "goal" },
    { player: "裘德·贝林厄姆", team: "英格兰", minute: "93'", type: "goal" }
  ], knockoutWinner: "away" },
  { id: 100, stage: "1/4决赛", date: "2026-07-11", localTime: "21:00", home: "阿根廷", away: "瑞士", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: 3, awayScore: 1, goalScorers: [
    { player: "亚历克西斯·麦卡利斯特", team: "阿根廷", minute: "10'", type: "goal" },
    { player: "丹·恩多耶", team: "瑞士", minute: "67'", type: "goal" },
    { player: "胡利安·阿尔瓦雷斯", team: "阿根廷", minute: "112'", type: "goal" },
    { player: "劳塔罗·马丁内斯", team: "阿根廷", minute: "120+1'", type: "goal" }
  ], knockoutWinner: "home" },
  { id: 101, stage: "半决赛", date: "2026-07-14", localTime: "15:00", home: "1/4决赛胜者", away: "1/4决赛胜者", venue: "AT&T Stadium", city: "Arlington", homeScore: 2, awayScore: 0, goalScorers: [
    { player: "米克尔·奥亚萨瓦尔", team: "西班牙", minute: "22'", type: "penalty" },
    { player: "佩德罗·波罗", team: "西班牙", minute: "58'", type: "goal" }
  ] },
  { id: 102, stage: "半决赛", date: "2026-07-15", localTime: "15:00", home: "1/4决赛胜者", away: "1/4决赛胜者", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: 2, awayScore: 1, goalScorers: [
    { player: "安东尼·戈登", team: "英格兰", minute: "55'", type: "goal" },
    { player: "恩佐·费尔南德斯", team: "阿根廷", minute: "85'", type: "goal" },
    { player: "劳塔罗·马丁内斯", team: "阿根廷", minute: "90+2'", type: "goal" }
  ] },
  { id: 103, stage: "季军赛", date: "2026-07-18", localTime: "17:00", home: "法国", away: "英格兰", venue: "Hard Rock Stadium", city: "Miami Gardens" },
  { id: 104, stage: "决赛", date: "2026-07-19", localTime: "15:00", home: "西班牙", away: "阿根廷", venue: "MetLife Stadium", city: "East Rutherford" }
];

export const scheduleMatches: ScheduleMatch[] = matchInputs.map(withBeijingTime);

export const scheduleStages = ["全部", "分组赛", "32强", "16强", "1/4决赛", "半决赛", "季军赛", "决赛"] as const;
