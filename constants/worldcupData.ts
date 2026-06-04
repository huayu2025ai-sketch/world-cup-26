export type Team = {
  name: string;
  englishName: string;
  code: string;
  flag: string;
  confederation: string;
  pot: number;
  debut?: boolean;
  host?: boolean;
};

export type WorldCupGroup = {
  id: string;
  name: string;
  teams: Team[];
  headline: string;
  detail: string;
  watchPoints: string[];
};

export type GroupOverviewUpdate = {
  updatedAt: string;
  updatedAtLabel: string;
  title: string;
  summary: string;
  changes: string[];
};

export const groupOverviewUpdate: GroupOverviewUpdate = {
  updatedAt: "2026-06-05T00:18:00+08:00",
  updatedAtLabel: "2026年6月5日 00:18",
  title: "小组总览数据更新",
  summary: "本次更新复核了 2026 美加墨世界杯 48 队与 12 个小组，并重点同步 J 组奥地利最终名单变动与球员信息。",
  changes: [
    "按 Reuters/SRN 可访问名单更新奥地利 26 人结构，补入 Florian Wiegele、David Affengruber、Marco Friedl、Alexander Prass、Michael Svoboda、Carney Chukwuemeka、Alessandro Schopf、Paul Wanner 等。",
    "移出 Heinz Lindner、Maximilian Wober、Gernot Trauner、Andreas Weimann、Junior Adamu、Karim Onisiwo、Marco Grull 等未出现在最新奥地利名单中的球员。",
    "Christoph Baumgartner 已有伤缺报道，但未找到 FIFA/ÖFB 官方替补确认，暂保留在 26 人结构并标注待官方替换确认；奥地利号码继续待核实。",
    "同步更新 Paul Wanner、Carney Chukwuemeka、Marcel Sabitzer、Marko Arnautovic 等奥地利球员档案与 meta。"
  ]
};

export const worldCupGroups: WorldCupGroup[] = [
  {
    id: "A",
    name: "A组",
    headline: "揭幕战的历史回声",
    detail:
      "东道主墨西哥坐镇高海拔主场，韩国的转换速度、南非的身体对抗和捷克的定位球质量会把这个小组推成节奏差异最明显的一组。",
    watchPoints: ["墨西哥主场声浪与控球压力", "韩国边路冲击能否打开空间", "南非与捷克争夺第三名积分窗口"],
    teams: [
      { name: "墨西哥", englishName: "Mexico", code: "MEX", flag: "🇲🇽", confederation: "CONCACAF", pot: 1, host: true },
      { name: "南非", englishName: "South Africa", code: "RSA", flag: "🇿🇦", confederation: "CAF", pot: 3 },
      { name: "韩国", englishName: "Korea Republic", code: "KOR", flag: "🇰🇷", confederation: "AFC", pot: 2 },
      { name: "捷克", englishName: "Czechia", code: "CZE", flag: "🇨🇿", confederation: "UEFA", pot: 4 }
    ]
  },
  {
    id: "B",
    name: "B组",
    headline: "加拿大的北境压力测试",
    detail:
      "加拿大拥有东道主优势，但瑞士的稳定性和波黑的锋线冲击会持续施压。卡塔尔则需要用亚洲杯经验证明自己不只是陪跑者。",
    watchPoints: ["加拿大速度型前场能否兑现主场红利", "瑞士低失误体系是小组基准线", "波黑与卡塔尔的直接对话或决定第三名含金量"],
    teams: [
      { name: "加拿大", englishName: "Canada", code: "CAN", flag: "🇨🇦", confederation: "CONCACAF", pot: 1, host: true },
      { name: "波黑", englishName: "Bosnia and Herzegovina", code: "BIH", flag: "🇧🇦", confederation: "UEFA", pot: 4 },
      { name: "卡塔尔", englishName: "Qatar", code: "QAT", flag: "🇶🇦", confederation: "AFC", pot: 3 },
      { name: "瑞士", englishName: "Switzerland", code: "SUI", flag: "🇨🇭", confederation: "UEFA", pot: 2 }
    ]
  },
  {
    id: "C",
    name: "C组",
    headline: "巴西遇上北非硬度",
    detail:
      "巴西纸面实力最高，但摩洛哥的整体性已经在上届世界杯完成过强队验证。苏格兰与海地会用不同方式拉高比赛身体消耗。",
    watchPoints: ["巴西创造力对摩洛哥防线纪律", "苏格兰定位球是搅局关键", "海地冲刺型反击可能改变净胜球格局"],
    teams: [
      { name: "巴西", englishName: "Brazil", code: "BRA", flag: "🇧🇷", confederation: "CONMEBOL", pot: 1 },
      { name: "摩洛哥", englishName: "Morocco", code: "MAR", flag: "🇲🇦", confederation: "CAF", pot: 2 },
      { name: "海地", englishName: "Haiti", code: "HAI", flag: "🇭🇹", confederation: "CONCACAF", pot: 4 },
      { name: "苏格兰", englishName: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", confederation: "UEFA", pot: 3 }
    ]
  },
  {
    id: "D",
    name: "D组",
    headline: "美国主场的成熟度考试",
    detail:
      "美国队拥有熟悉环境和年轻阵容的双重优势，但巴拉圭、澳大利亚与土耳其都擅长把比赛拖入强对抗和情绪波动。",
    watchPoints: ["美国中前场压迫能否稳定90分钟", "土耳其技术天赋带来上限变量", "澳大利亚与巴拉圭的硬度让小组没有轻松局"],
    teams: [
      { name: "美国", englishName: "United States", code: "USA", flag: "🇺🇸", confederation: "CONCACAF", pot: 1, host: true },
      { name: "巴拉圭", englishName: "Paraguay", code: "PAR", flag: "🇵🇾", confederation: "CONMEBOL", pot: 3 },
      { name: "澳大利亚", englishName: "Australia", code: "AUS", flag: "🇦🇺", confederation: "AFC", pot: 2 },
      { name: "土耳其", englishName: "Turkiye", code: "TUR", flag: "🇹🇷", confederation: "UEFA", pot: 4 }
    ]
  },
  {
    id: "E",
    name: "E组",
    headline: "德国与库拉索的反差叙事",
    detail:
      "德国面对世界杯新军库拉索，自带聚光灯；厄瓜多尔的高强度与科特迪瓦的个人爆点让这个小组很适合产生最好的第三名。",
    watchPoints: ["库拉索首秀的抗压能力", "德国如何处理阵地战低位防守", "厄瓜多尔与科特迪瓦的直接对冲极具淘汰赛味道"],
    teams: [
      { name: "德国", englishName: "Germany", code: "GER", flag: "🇩🇪", confederation: "UEFA", pot: 1 },
      { name: "库拉索", englishName: "Curacao", code: "CUW", flag: "🇨🇼", confederation: "CONCACAF", pot: 4, debut: true },
      { name: "科特迪瓦", englishName: "Ivory Coast", code: "CIV", flag: "🇨🇮", confederation: "CAF", pot: 3 },
      { name: "厄瓜多尔", englishName: "Ecuador", code: "ECU", flag: "🇪🇨", confederation: "CONMEBOL", pot: 2 }
    ]
  },
  {
    id: "F",
    name: "F组",
    headline: "技术流死亡暗线",
    detail:
      "荷兰、日本、瑞典和突尼斯都具备明确战术标签。这个小组很可能不是巨星最多的一组，却是教练博弈最密集的一组。",
    watchPoints: ["荷兰后场出球对日本压迫", "瑞典空中优势与边路传中", "突尼斯的防守韧性会压低比赛总进球"],
    teams: [
      { name: "荷兰", englishName: "Netherlands", code: "NED", flag: "🇳🇱", confederation: "UEFA", pot: 1 },
      { name: "日本", englishName: "Japan", code: "JPN", flag: "🇯🇵", confederation: "AFC", pot: 2 },
      { name: "瑞典", englishName: "Sweden", code: "SWE", flag: "🇸🇪", confederation: "UEFA", pot: 4 },
      { name: "突尼斯", englishName: "Tunisia", code: "TUN", flag: "🇹🇳", confederation: "CAF", pot: 3 }
    ]
  },
  {
    id: "G",
    name: "G组",
    headline: "欧洲红魔的窗口期",
    detail:
      "比利时仍是种子队，但埃及和伊朗都有成熟的洲际比赛经验，新西兰则需要在低控球局面里争取定位球和反击收益。",
    watchPoints: ["比利时新老核心交接", "埃及进攻端的个人决定力", "伊朗防守结构与新西兰定位球会制造低比分悬念"],
    teams: [
      { name: "比利时", englishName: "Belgium", code: "BEL", flag: "🇧🇪", confederation: "UEFA", pot: 1 },
      { name: "埃及", englishName: "Egypt", code: "EGY", flag: "🇪🇬", confederation: "CAF", pot: 3 },
      { name: "伊朗", englishName: "Iran", code: "IRN", flag: "🇮🇷", confederation: "AFC", pot: 2 },
      { name: "新西兰", englishName: "New Zealand", code: "NZL", flag: "🇳🇿", confederation: "OFC", pot: 4 }
    ]
  },
  {
    id: "H",
    name: "H组",
    headline: "西班牙撞上乌拉圭",
    detail:
      "西班牙和乌拉圭的强强对话是小组第一的风向标。沙特有爆冷履历，佛得角作为新军会把每一分钟都踢得极其珍贵。",
    watchPoints: ["西班牙控球如何破解乌拉圭压迫", "沙特的转换速度是冷门入口", "佛得角首次世界杯之旅自带故事线"],
    teams: [
      { name: "西班牙", englishName: "Spain", code: "ESP", flag: "🇪🇸", confederation: "UEFA", pot: 1 },
      { name: "佛得角", englishName: "Cape Verde", code: "CPV", flag: "🇨🇻", confederation: "CAF", pot: 4, debut: true },
      { name: "沙特阿拉伯", englishName: "Saudi Arabia", code: "KSA", flag: "🇸🇦", confederation: "AFC", pot: 3 },
      { name: "乌拉圭", englishName: "Uruguay", code: "URU", flag: "🇺🇾", confederation: "CONMEBOL", pot: 2 }
    ]
  },
  {
    id: "I",
    name: "I组",
    headline: "法国与挪威的巨星轴线",
    detail:
      "法国拥有最深阵容，挪威拥有最醒目的终结点，塞内加尔的身体与经验会让热门队不舒服，伊拉克则是第三名竞争中的情绪燃点。",
    watchPoints: ["法国轮换深度对赛程密度", "挪威锋线效率能否转化为小组积分", "塞内加尔与伊拉克的强度会改变出线门槛"],
    teams: [
      { name: "法国", englishName: "France", code: "FRA", flag: "🇫🇷", confederation: "UEFA", pot: 1 },
      { name: "塞内加尔", englishName: "Senegal", code: "SEN", flag: "🇸🇳", confederation: "CAF", pot: 2 },
      { name: "伊拉克", englishName: "Iraq", code: "IRQ", flag: "🇮🇶", confederation: "AFC", pot: 4 },
      { name: "挪威", englishName: "Norway", code: "NOR", flag: "🇳🇴", confederation: "UEFA", pot: 3 }
    ]
  },
  {
    id: "J",
    name: "J组",
    headline: "卫冕冠军的节奏管理",
    detail:
      "阿根廷的任务不是只赢球，而是用最小消耗进入淘汰赛。奥地利和阿尔及利亚会争夺压迫强度，约旦则首次来到世界杯正赛舞台。",
    watchPoints: ["阿根廷如何管理核心球员负荷", "奥地利高压与阿尔及利亚反击的互相克制", "约旦新军身份让每场都有额外情绪价值"],
    teams: [
      { name: "阿根廷", englishName: "Argentina", code: "ARG", flag: "🇦🇷", confederation: "CONMEBOL", pot: 1 },
      { name: "阿尔及利亚", englishName: "Algeria", code: "ALG", flag: "🇩🇿", confederation: "CAF", pot: 3 },
      { name: "奥地利", englishName: "Austria", code: "AUT", flag: "🇦🇹", confederation: "UEFA", pot: 2 },
      { name: "约旦", englishName: "Jordan", code: "JOR", flag: "🇯🇴", confederation: "AFC", pot: 4, debut: true }
    ]
  },
  {
    id: "K",
    name: "K组",
    headline: "葡萄牙与南美硬骨头",
    detail:
      "葡萄牙必须处理哥伦比亚的对抗和乌兹别克斯坦的新军冲劲。刚果民主共和国让本组的身体条件和攻防转换更加不可预测。",
    watchPoints: ["葡萄牙攻击群选择题", "哥伦比亚中前场对抗质量", "乌兹别克斯坦首秀与刚果民主共和国的爆发力"],
    teams: [
      { name: "葡萄牙", englishName: "Portugal", code: "POR", flag: "🇵🇹", confederation: "UEFA", pot: 1 },
      { name: "刚果民主共和国", englishName: "DR Congo", code: "COD", flag: "🇨🇩", confederation: "CAF", pot: 4 },
      { name: "乌兹别克斯坦", englishName: "Uzbekistan", code: "UZB", flag: "🇺🇿", confederation: "AFC", pot: 3, debut: true },
      { name: "哥伦比亚", englishName: "Colombia", code: "COL", flag: "🇨🇴", confederation: "CONMEBOL", pot: 2 }
    ]
  },
  {
    id: "L",
    name: "L组",
    headline: "英格兰争议名单后的硬仗",
    detail:
      "英格兰被分入克罗地亚、加纳、巴拿马所在小组。图赫尔放弃福登、帕尔默等人的名单争议会放大每一次进攻选择的讨论。",
    watchPoints: ["英格兰无福登、帕尔默后的创造力分配", "克罗地亚大赛经验依然是顶级考验", "加纳和巴拿马会把转换进攻作为抢分路径"],
    teams: [
      { name: "英格兰", englishName: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA", pot: 1 },
      { name: "克罗地亚", englishName: "Croatia", code: "CRO", flag: "🇭🇷", confederation: "UEFA", pot: 2 },
      { name: "加纳", englishName: "Ghana", code: "GHA", flag: "🇬🇭", confederation: "CAF", pot: 4 },
      { name: "巴拿马", englishName: "Panama", code: "PAN", flag: "🇵🇦", confederation: "CONCACAF", pot: 3 }
    ]
  }
];
