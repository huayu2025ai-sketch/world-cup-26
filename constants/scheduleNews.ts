export type MatchNewsImpact = "injury" | "suspension" | "form" | "tactical" | "weather";

export type MatchNewsItem = {
  type: MatchNewsImpact;
  title: string;
  summary: string;
  affectedTeam: string;
  affectedPlayer?: string;
  severity: "high" | "medium" | "low";
  date: string;        // 情报发布日期 YYYY-MM-DD
  channel: string;     // 来源媒体/渠道
  sourceUrl?: string;
};

export type MatchNews = {
  matchId: number;
  updatedAt: string;
  items: MatchNewsItem[];
};

export const matchNewsMap: Record<number, MatchNews> = {
  // 墨西哥 vs 南非 (6/11)
  1: {
    matchId: 1,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "洛萨诺、马丁等主力未入选最终名单",
        summary:
          "伊尔文·洛萨诺因纪律问题和在圣迭戈FC出场时间有限被排除在名单外；亨利·马丁、路易斯·安赫尔·马拉贡、罗德里戈·韦斯卡斯因伤未入选最终26人名单。主教练阿吉雷的名单以墨西哥联赛为班底。",
        affectedTeam: "墨西哥",
        affectedPlayer: "伊尔文·洛萨诺 / 亨利·马丁",
        severity: "medium",
        date: "2026-06-07",
        channel: "ESPN / FourFourTwo",
      },
      {
        type: "injury",
        title: "南非莫迪巴带伤入选，两名新人有望首秀",
        summary:
          "左后卫奥布里·莫迪巴在马梅洛迪日落队的CAF冠军联赛决赛第二回合中受伤，但仍入选26人名单；两名新人首次入选国家队。",
        affectedTeam: "南非",
        affectedPlayer: "奥布里·莫迪巴",
        severity: "medium",
        date: "2026-06-07",
        channel: "CAF Online / 南非足协",
      },
    ],
  },

  // 加拿大 vs 波黑 (6/12)
  2: {
    matchId: 2,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "加拿大队长阿方索·戴维斯腿筋伤势，揭幕战成疑",
        summary:
          "阿方索·戴维斯自2025年3月在CONCACAF国家联赛决赛中撕裂ACL后一直未代表加拿大出场，上月又在拜仁比赛中腿筋受伤。6月1日对乌兹别克斯坦的热身赛他仅在场边跑圈，揭幕战出场可能性极低。",
        affectedTeam: "加拿大",
        affectedPlayer: "阿方索·戴维斯",
        severity: "high",
        date: "2026-06-08",
        channel: "ESPN / 163.com",
      },
      {
        type: "tactical",
        title: "波黑40岁哲科领衔，点球大战连克威尔士、意大利晋级",
        summary:
          "队长埃丁·哲科（40岁）仍是锋线核心；波黑在欧洲附加赛中连续通过点球击败威尔士和意大利，展现极强韧性。这是波黑自2014年以来首次参加世界杯。",
        affectedTeam: "波黑",
        affectedPlayer: "埃丁·哲科",
        severity: "medium",
        date: "2026-06-07",
        channel: "SI.com / Sports Illustrated",
      },
    ],
  },

  // 巴西 vs 摩洛哥 (6/13)
  3: {
    matchId: 3,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "内马尔二级小腿拉伤，首战复出存疑",
        summary:
          "内马尔报到后MRI确诊为二级小腿肌肉拉伤，缺席了对巴拿马和埃及的两场热身赛。6月8日复查显示恢复进展良好，安切洛蒂表示有望在6月13日对摩洛哥的首战复出；若未完全恢复，主要目标将是6月19日对海地的第二战。巴西足协确认不会替换内马尔。",
        affectedTeam: "巴西",
        affectedPlayer: "内马尔",
        severity: "high",
        date: "2026-06-09",
        channel: "GloboEsporte / CBF",
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
      },
      {
        type: "injury",
        title: "罗德里戈、米利唐已确认缺席世界杯",
        summary:
          "罗德里戈在3月遭遇十字韧带与半月板撕裂，埃德尔·米利唐因腿筋手术，两人均未进入26人名单。巴西边路和防线深度受损。",
        affectedTeam: "巴西",
        affectedPlayer: "罗德里戈 / 埃德尔·米利唐",
        severity: "high",
        date: "2026-06-07",
        channel: "ESPN / FourFourTwo",
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
      },
      {
        type: "tactical",
        title: "巴西热身赛2-1埃及，安切洛蒂试验三后卫",
        summary:
          "6月6日热身赛2-1击败埃及，卡洛·安切洛蒂试验了三后卫体系，马尔基尼奥斯-加布里埃尔-布雷默搭档。面对摩洛哥强硬防守，此阵型可能继续使用。",
        affectedTeam: "巴西",
        severity: "medium",
        date: "2026-06-08",
        channel: "FourFourTwo",
        sourceUrl: "https://www.fourfourtwo.com/team/brazil-world-cup-2026-squad",
      },
      {
        type: "injury",
        title: "摩洛哥边锋埃扎尔祖利将缺席数周",
        summary:
          "阿卜德·埃扎尔祖利在赛前训练中受伤，将缺席数周，确定无法出战对巴西的首场比赛。摩洛哥边路进攻将更多依赖阿什拉夫·哈基米和卜拉欣·迪亚斯。",
        affectedTeam: "摩洛哥",
        affectedPlayer: "阿卜德·埃扎尔祖利",
        severity: "medium",
        date: "2026-06-09",
        channel: "ESPN / 摩洛哥足协",
      },
    ],
  },

  // 美国 vs 巴拉圭 (6/13)
  4: {
    matchId: 4,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "美国约翰尼·卡多索脚踝重伤缺席，岑德哈斯入替",
        summary:
          "卡多索在欧冠半决赛中遭遇高级别右脚踝扭伤需要手术，将缺席世界杯。波切蒂诺选择用美洲的亚历杭德罗·岑德哈斯填补其位置，转而加强攻击线深度。",
        affectedTeam: "美国",
        affectedPlayer: "约翰尼·卡多索 / 亚历杭德罗·岑德哈斯",
        severity: "high",
        date: "2026-06-09",
        channel: "ESPN",
      },
      {
        type: "injury",
        title: "美国克里斯·理查兹脚踝韧带撕裂，但预计能赶上世界杯",
        summary:
          "水晶宫中卫理查兹撕裂了两条脚踝韧带，主帅奥利弗·格拉斯纳称他参加5月27日欧协联决赛是「五五开」。但消息人士告诉ESPN，理查兹预计将及时恢复，参加世界杯应无问题。",
        affectedTeam: "美国",
        affectedPlayer: "克里斯·理查兹",
        severity: "medium",
        date: "2026-06-09",
        channel: "ESPN",
      },
    ],
  },

  // 德国 vs 库拉索 (6/14)
  5: {
    matchId: 5,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "伦纳特·卡尔大腿肌肉撕裂伤退，韦德拉奥戈入替",
        summary:
          "18岁中场伦纳特·卡尔在训练中大腿肌肉撕裂，德国足协确认其退出，由RB莱比锡的20岁中场阿桑·韦德拉奥戈顶替。",
        affectedTeam: "德国",
        affectedPlayer: "伦纳特·卡尔 / 阿桑·韦德拉奥戈",
        severity: "medium",
        date: "2026-06-09",
        channel: "ESPN / DFB",
      },
      {
        type: "injury",
        title: "塞尔日·格纳布里、马克-安德烈·特尔施特根因伤缺席",
        summary:
          "格纳布里因内收肌撕裂赛季报销，特尔施特根大腿肌肉伤势未愈，两人均未入选26人名单。纳格尔斯曼召回了退役的诺伊尔担任一门。",
        affectedTeam: "德国",
        affectedPlayer: "塞尔日·格纳布里 / 马克-安德烈·特尔施特根",
        severity: "high",
        date: "2026-06-08",
        channel: "ESPN / talkSPORT",
      },
      {
        type: "tactical",
        title: "菲尔克鲁格落选，哈弗茨领衔锋线",
        summary:
          "纳格尔斯曼在5月21日公布的最终名单中放弃了2024欧洲杯的超级替补尼克拉斯·菲尔克鲁格，后者在AC米兰租借期间19场意甲仅1球。凯·哈弗茨将作为中锋领衔锋线，马克西米利安·拜尔和德尼兹·翁达夫提供板凳深度。",
        affectedTeam: "德国",
        affectedPlayer: "尼克拉斯·菲尔克鲁格",
        severity: "medium",
        date: "2026-06-07",
        channel: "worldcup26hub.com",
      },
    ],
  },

  // 荷兰 vs 日本 (6/14)
  6: {
    matchId: 6,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "尤里恩·廷伯腹股沟伤退出世界杯",
        summary:
          "廷伯在欧冠决赛后腹股沟伤势未愈，荷兰足协官方声明其无法以医学负责的方式参赛，由桑德兰的卢特沙雷尔·海特勒伊达顶替。",
        affectedTeam: "荷兰",
        affectedPlayer: "尤里恩·廷伯 / 卢特沙雷尔·海特勒伊达",
        severity: "high",
        date: "2026-06-09",
        channel: "ESPN / 荷兰足协",
      },
      {
        type: "injury",
        title: "三笘薫腿筋伤落选最终名单",
        summary:
          "布莱顿边锋三笘薫在赛季末段腿筋受伤，日本主帅森保一确认其无法在开赛前恢复，未进入26人名单。日本队边路突破能力受损。",
        affectedTeam: "日本",
        affectedPlayer: "三笘薫",
        severity: "high",
        date: "2026-06-09",
        channel: "ESPN",
      },
    ],
  },

  // 比利时 vs 埃及 (6/15)
  7: {
    matchId: 7,
    updatedAt: "2026-06-11",
    items: [
      {
        type: "injury",
        title: "卢卡库虽被指「体型走样」仍入选世界杯大名单",
        summary:
          "卢卡库因腿筋伤势缺席2025-26赛季后半段大部分比赛，那不勒斯时期被标注为「out of shape」。但比利时主帅鲁迪·加西亚仍将他选入26人名单，首战身体状态存疑。",
        affectedTeam: "比利时",
        affectedPlayer: "罗梅卢·卢卡库",
        severity: "medium",
        date: "2026-06-10",
        channel: "BBC Sport / AI Overview",
        sourceUrl: "https://www.bbc.com/sport/football",
      },
      {
        type: "injury",
        title: "比利时后卫泽诺·德巴斯特肌肉伤势，预计缺席首轮小组赛",
        summary:
          "泽诺·德巴斯特正在从肌肉伤势中恢复，预计将缺席比利时队的开局小组赛阶段比赛。",
        affectedTeam: "比利时",
        affectedPlayer: "泽诺·德巴斯特",
        severity: "medium",
        date: "2026-06-10",
        channel: "AI Overview / Instagram (Peche Football)",
      },
    ],
  },
};

export const hasMatchNews = (matchId: number): boolean => matchId in matchNewsMap;

export const getMatchNews = (matchId: number): MatchNews | undefined => matchNewsMap[matchId];

export const getHighSeverityCount = (matchId: number): number => {
  const news = matchNewsMap[matchId];
  if (!news) return 0;
  return news.items.filter((item) => item.severity === "high").length;
};
