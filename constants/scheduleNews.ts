export type MatchNewsImpact = "injury" | "suspension" | "form" | "tactical" | "weather";

export type MatchNewsItem = {
  type: MatchNewsImpact;
  title: string;
  summary: string;
  affectedTeam: string;
  affectedPlayer?: string;
  severity: "high" | "medium" | "low";
  source: string;
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
    updatedAt: "2026-06-10",
    items: [
      {
        type: "injury",
        title: "墨西哥洛萨诺、马丁等主力因伤病/纪律缺席",
        summary:
          "伊尔文·洛萨诺因纪律问题和在圣迭戈FC出场时间有限被排除在名单外；亨利·马丁、路易斯·安赫尔·马拉贡、罗德里戈·韦斯卡斯因伤缺席。阿吉雷的26人名单以墨西哥联赛为班底。",
        affectedTeam: "墨西哥",
        affectedPlayer: "伊尔文·洛萨诺 / 亨利·马丁",
        severity: "medium",
        source: "rg.org / FourFourTwo (2026-06-07)",
      },
      {
        type: "form",
        title: "40岁奥乔亚有望征战第六届世界杯",
        summary:
          "吉列尔莫·奥乔亚（40岁）入选最终名单，若出场将成为继梅西、C罗之后第三位参加六届世界杯的球员。他可能与年轻门将劳尔·兰赫尔竞争首发。",
        affectedTeam: "墨西哥",
        affectedPlayer: "吉列尔莫·奥乔亚",
        severity: "low",
        source: "rg.org (2026-06-07)",
      },
      {
        type: "injury",
        title: "南非莫迪巴带伤入选，两名新人有望首秀",
        summary:
          "左后卫奥布里·莫迪巴在马梅洛迪日落队的CAF冠军联赛决赛第二回合中受伤，但仍入选26人名单；两名新人首次入选国家队。",
        affectedTeam: "南非",
        affectedPlayer: "奥布里·莫迪巴",
        severity: "medium",
        source: "GhanaSoccernet / CAF Online (2026-05-27)",
      },
      {
        type: "tactical",
        title: "南非19/26球员来自国内联赛，布鲁斯世界杯后退役",
        summary:
          "南非阵容高度依赖国内两大豪门奥兰多海盗和马梅洛迪日落；74岁主帅雨果·布鲁斯已确认将在本届世界杯后退休。",
        affectedTeam: "南非",
        severity: "low",
        source: "新华社 / FourFourTwo (2026-05-27~28)",
      },
    ],
  },

  // 加拿大 vs 波黑 (6/12)
  2: {
    matchId: 2,
    updatedAt: "2026-06-10",
    items: [
      {
        type: "injury",
        title: "加拿大队长阿方索·戴维斯腿筋伤势，揭幕战成疑",
        summary:
          "阿方索·戴维斯自2025年3月在CONCACAF国家联赛决赛中撕裂ACL后一直未代表加拿大出场，上月又在拜仁比赛中腿筋受伤。6月1日对乌兹别克斯坦的热身赛他仅在场边跑圈，揭幕战出场可能性极低。",
        affectedTeam: "加拿大",
        affectedPlayer: "阿方索·戴维斯",
        severity: "high",
        source: "ESPN / 163.com (2026-06-01)",
      },
      {
        type: "form",
        title: "加拿大从伤病潮中恢复，阵容相对齐整",
        summary:
          "主教练杰西·马什表示，过去七到十天队内出现了大量积极进展，除戴维斯外其余位置已基本摆脱伤病阴影。",
        affectedTeam: "加拿大",
        severity: "low",
        source: "163.com / OneSoccer (2026-06-01)",
      },
      {
        type: "tactical",
        title: "波黑40岁哲科领衔，点球大战连克威尔士、意大利晋级",
        summary:
          "队长埃丁·哲科（40岁）仍是锋线核心；波黑在欧洲附加赛中连续通过点球击败威尔士和意大利，展现极强韧性。这是波黑自2014年以来首次参加世界杯。",
        affectedTeam: "波黑",
        affectedPlayer: "埃丁·哲科",
        severity: "medium",
        source: "SI.com / Sports Illustrated (2026-05-14)",
      },
    ],
  },

  // 巴西 vs 摩洛哥 (6/13)
  3: {
    matchId: 3,
    updatedAt: "2026-06-10",
    items: [
      {
        type: "injury",
        title: "内马尔右小腿伤势恐缺席首战",
        summary:
          "内马尔自5月17日起受右小腿伤势困扰，巴西国家队队医预计恢复期为三周，首战对阵摩洛哥出场成疑。即使复出，状态也难达百分百。",
        affectedTeam: "巴西",
        affectedPlayer: "内马尔",
        severity: "high",
        source: "ESPN / 巴西国家队官方声明 (2026-06-09)",
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
        source: "ESPN / FourFourTwo (2026-06-07~09)",
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
      },
      {
        type: "tactical",
        title: "巴西热身赛2-1埃及，安切洛蒂试验三后卫",
        summary:
          "6月6日热身赛2-1击败埃及，卡洛·安切洛蒂试验了三后卫体系，马尔基尼奥斯-加布里埃尔-布雷默搭档。面对摩洛哥强硬防守，此阵型可能继续使用。",
        affectedTeam: "巴西",
        severity: "medium",
        source: "FourFourTwo (2026-06-08)",
        sourceUrl: "https://www.fourfourtwo.com/team/brazil-world-cup-2026-squad",
      },
    ],
  },

  // 美国 vs 巴拉圭 (6/13)
  4: {
    matchId: 4,
    updatedAt: "2026-06-10",
    items: [
      {
        type: "injury",
        title: "美国约翰尼·卡多索脚踝重伤缺席，岑德哈斯入替",
        summary:
          "卡多索在欧冠半决赛中遭遇高级别右脚踝扭伤需要手术，将缺席世界杯。波切蒂诺选择用美洲的亚历杭德罗·岑德哈斯填补其位置，转而加强攻击线深度。",
        affectedTeam: "美国",
        affectedPlayer: "约翰尼·卡多索 / 亚历杭德罗·岑德哈斯",
        severity: "high",
        source: "ESPN (2026-06-09)",
      },
      {
        type: "injury",
        title: "美国克里斯·理查兹脚踝韧带撕裂，但预计能赶上世界杯",
        summary:
          "水晶宫中卫理查兹撕裂了两条脚踝韧带，主帅奥利弗·格拉斯纳称他参加5月27日欧协联决赛是「五五开」。但消息人士告诉ESPN，理查兹预计将及时恢复，参加世界杯应无问题。",
        affectedTeam: "美国",
        affectedPlayer: "克里斯·理查兹",
        severity: "medium",
        source: "ESPN (2026-06-09)",
      },
      {
        type: "form",
        title: "美国主场作战，普利西奇-亚当斯-巴洛贡中轴线完整",
        summary:
          "美国作为东道主之一，小组赛全部在本土进行。克里斯蒂安·普利西奇、泰勒·亚当斯、福拉林·巴洛贡等核心球员状态良好，主场优势是最大变量。",
        affectedTeam: "美国",
        severity: "low",
        source: "ESPN / BBC Sport (2026-06)",
      },
    ],
  },

  // 德国 vs 库拉索 (6/14)
  5: {
    matchId: 5,
    updatedAt: "2026-06-10",
    items: [
      {
        type: "injury",
        title: "伦纳特·卡尔大腿肌肉撕裂伤退，韦德拉奥戈入替",
        summary:
          "18岁中场伦纳特·卡尔在训练中大腿肌肉撕裂，德国足协确认其退出，由RB莱比锡的20岁中场阿桑·韦德拉奥戈顶替。",
        affectedTeam: "德国",
        affectedPlayer: "伦纳特·卡尔 / 阿桑·韦德拉奥戈",
        severity: "medium",
        source: "ESPN / DFB 官方声明 (2026-06-09)",
      },
      {
        type: "injury",
        title: "塞尔日·格纳布里、马克-安德烈·特尔施特根因伤缺席",
        summary:
          "格纳布里因内收肌撕裂赛季报销，特尔施特根大腿肌肉伤势未愈，两人均未入选26人名单。纳格尔斯曼召回了退役的诺伊尔担任一门。",
        affectedTeam: "德国",
        affectedPlayer: "塞尔日·格纳布里 / 马克-安德烈·特尔施特根",
        severity: "high",
        source: "ESPN / talkSPORT (2026-06-08)",
      },
      {
        type: "form",
        title: "德国近2场热身赛1胜1平，维尔茨-穆西亚拉组合渐入佳境",
        summary:
          "3月热身赛3-1意大利、2-2法国，弗洛里安·维尔茨和贾马尔·穆西亚拉的组合展现出强大创造力。面对库拉索预计将以进攻为主。",
        affectedTeam: "德国",
        severity: "low",
        source: "BBC Sport (2026-03)",
      },
    ],
  },

  // 荷兰 vs 日本 (6/14)
  6: {
    matchId: 6,
    updatedAt: "2026-06-10",
    items: [
      {
        type: "injury",
        title: "尤里恩·廷伯腹股沟伤退出世界杯",
        summary:
          "廷伯在欧冠决赛后腹股沟伤势未愈，荷兰足协官方声明其无法以医学负责的方式参赛，由桑德兰的卢特沙雷尔·海特勒伊达顶替。",
        affectedTeam: "荷兰",
        affectedPlayer: "尤里恩·廷伯 / 卢特沙雷尔·海特勒伊达",
        severity: "high",
        source: "ESPN / 荷兰足协官方声明 (2026-06-09)",
      },
      {
        type: "injury",
        title: "三笘薫腿筋伤落选最终名单",
        summary:
          "布莱顿边锋三笘薫在赛季末段腿筋受伤，日本主帅森保一确认其无法在开赛前恢复，未进入26人名单。日本队边路突破能力受损。",
        affectedTeam: "日本",
        affectedPlayer: "三笘薫",
        severity: "high",
        source: "ESPN (2026-06-09)",
      },
      {
        type: "form",
        title: "日本近3场热身赛全胜，状态正佳",
        summary:
          "日本在3月国际比赛日先后击败英格兰、乌拉圭和沙特，堂安律、久保建英和前田大然状态出色。",
        affectedTeam: "日本",
        severity: "low",
        source: "BBC Sport / 日媒 (2026-03)",
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
