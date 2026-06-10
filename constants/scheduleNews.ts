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
        title: "墨西哥 Lozano、Martín 等主力因伤病/纪律缺席",
        summary:
          "Hirving Lozano 因纪律问题和在 San Diego FC 出场时间有限被排除在名单外；Henry Martín、Luis Ángel Malagón、Rodrigo Huescas 因伤缺席。Aguirre 的 26 人名单以 Liga MX 为班底。",
        affectedTeam: "墨西哥",
        affectedPlayer: "Hirving Lozano / Henry Martín",
        severity: "medium",
        source: "rg.org / FourFourTwo (2026-06-07)",
      },
      {
        type: "form",
        title: "40岁 Ochoa 有望征战第六届世界杯",
        summary:
          "Guillermo Ochoa（40岁）入选最终名单，若出场将成为继 Messi、Cristiano Ronaldo 之后第三位参加六届世界杯的球员。他可能与年轻门将 Raúl Rangel 竞争首发。",
        affectedTeam: "墨西哥",
        affectedPlayer: "Guillermo Ochoa",
        severity: "low",
        source: "rg.org (2026-06-07)",
      },
      {
        type: "injury",
        title: "南非 Modiba 带伤入选，两名新人有望首秀",
        summary:
          "左后卫 Aubrey Modiba 在 Mamelodi Sundowns 的 CAF 冠军联赛决赛第二回合中受伤，但仍入选 26 人名单；Olwethu Makhanya 和 Bradley Cross 两名新人首次入选国家队。",
        affectedTeam: "南非",
        affectedPlayer: "Aubrey Modiba",
        severity: "medium",
        source: "GhanaSoccernet / CAF Online (2026-05-27)",
      },
      {
        type: "tactical",
        title: "南非 19/26 球员来自国内联赛，Broos 世界杯后退役",
        summary:
          "南非阵容高度依赖国内两大豪门 Orlando Pirates 和 Mamelodi Sundowns；74 岁主帅 Hugo Broos 已确认将在本届世界杯后退休。",
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
        title: "加拿大队长 Davies 腿筋伤势，揭幕战成疑",
        summary:
          "Alphonso Davies 自 2025 年 3 月在 CONCACAF 国家联赛决赛中撕裂 ACL 后一直未代表加拿大出场，上月又在拜仁比赛中腿筋受伤。6 月 1 日对乌兹别克斯坦的热身赛他仅在场边跑圈，6 月 12 日揭幕战出场可能性极低。",
        affectedTeam: "加拿大",
        affectedPlayer: "Alphonso Davies",
        severity: "high",
        source: "ESPN / 163.com (2026-06-01)",
      },
      {
        type: "form",
        title: "加拿大从伤病潮中恢复，阵容相对齐整",
        summary:
          "主教练 Jesse Marsch 表示，过去七到十天队内出现了大量积极进展，除 Davies 外其余位置已基本摆脱伤病阴影。",
        affectedTeam: "加拿大",
        severity: "low",
        source: "163.com / OneSoccer (2026-06-01)",
      },
      {
        type: "tactical",
        title: "波黑 40 岁哲科领衔，点球大战连克威尔士、意大利晋级",
        summary:
          "队长 Edin Džeko（40岁）仍是锋线核心；波黑在欧洲附加赛中连续通过点球击败威尔士和意大利，展现极强韧性。这是波黑自 2014 年以来首次参加世界杯。",
        affectedTeam: "波黑",
        affectedPlayer: "Edin Džeko",
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
        title: "Neymar 右小腿伤势恐缺席首战",
        summary:
          "Neymar 自 5 月 17 日起受右小腿伤势困扰，巴西国家队队医预计恢复期为三周，首战对阵摩洛哥出场成疑。即使复出，状态也难达百分百。",
        affectedTeam: "巴西",
        affectedPlayer: "Neymar Jr",
        severity: "high",
        source: "ESPN / 巴西国家队官方声明 (2026-06-09)",
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
      },
      {
        type: "injury",
        title: "Rodrygo、Militão 已确认缺席世界杯",
        summary:
          "Rodrygo 在 3 月遭遇十字韧带与半月板撕裂，Militão 因腿筋手术，两人均未进入 26 人名单。巴西边路和防线深度受损。",
        affectedTeam: "巴西",
        affectedPlayer: "Rodrygo / Éder Militão",
        severity: "high",
        source: "ESPN / FourFourTwo (2026-06-07~09)",
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
      },
      {
        type: "tactical",
        title: "巴西热身赛 2-1 埃及，Ancelotti 试验三后卫",
        summary:
          "6 月 6 日热身赛 2-1 击败埃及，Ancelotti 试验了三后卫体系，Marquinhos-Gabriel-Bremer 搭档。面对摩洛哥强硬防守，此阵型可能继续使用。",
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
        title: "美国 Johnny Cardoso 脚踝重伤缺席，Zendejas 入替",
        summary:
          "Cardoso 在欧冠半决赛中遭遇高级别右脚踝扭伤需要手术，将缺席世界杯。Pochettino 选择用 Club América 的 Alejandro Zendejas 填补其位置，转而加强攻击线深度。",
        affectedTeam: "美国",
        affectedPlayer: "Johnny Cardoso / Alejandro Zendejas",
        severity: "high",
        source: "ESPN (2026-06-09)",
      },
      {
        type: "injury",
        title: "美国 Chris Richards 脚踝韧带撕裂，但预计能赶上世界杯",
        summary:
          "Crystal Palace 中卫 Richards 撕裂了两条脚踝韧带，Palace 主帅 Oliver Glasner 称他参加 5 月 27 日欧协联决赛是「五五开」。但消息人士告诉 ESPN，Richards 预计将及时恢复比赛状态，参加世界杯应该没有问题。",
        affectedTeam: "美国",
        affectedPlayer: "Chris Richards",
        severity: "medium",
        source: "ESPN (2026-06-09)",
      },
      {
        type: "form",
        title: "美国主场作战，Pulisic-Adams-Balogun 中轴线完整",
        summary:
          "美国作为东道主之一，小组赛全部在本土进行。Pulisic、Tyler Adams、Balogun 等核心球员状态良好，主场优势是最大变量。",
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
        title: "Lennart Karl 大腿肌肉撕裂伤退，Ouedraogo 入替",
        summary:
          "18 岁中场 Lennart Karl 在训练中大腿肌肉撕裂，德国足协确认其退出，由 RB Leipzig 的 20 岁中场 Assan Ouedraogo 顶替。",
        affectedTeam: "德国",
        affectedPlayer: "Lennart Karl / Assan Ouedraogo",
        severity: "medium",
        source: "ESPN / DFB 官方声明 (2026-06-09)",
      },
      {
        type: "injury",
        title: "Serge Gnabry、Marc-André ter Stegen 因伤缺席",
        summary:
          "Gnabry 因内收肌撕裂赛季报销，ter Stegen 大腿肌肉伤势未愈，两人均未入选 26 人名单。Nagelsmann 召回了退役的 Neuer 担任一门。",
        affectedTeam: "德国",
        affectedPlayer: "Serge Gnabry / Marc-André ter Stegen",
        severity: "high",
        source: "ESPN / talkSPORT (2026-06-08)",
      },
      {
        type: "form",
        title: "德国近 2 场热身赛 1 胜 1 平，Wirtz-Musiala 组合渐入佳境",
        summary:
          "3 月热身赛 3-1 意大利、2-2 法国，Wirtz 和 Musiala 的组合展现出强大创造力。面对库拉索预计将以进攻为主。",
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
        title: "Jurriën Timber 腹股沟伤退出世界杯",
        summary:
          "Timber 在欧冠决赛后腹股沟伤势未愈，荷兰足协官方声明其无法以医学负责的方式参赛，由 Sunderland 的 Lutsharel Geertruida 顶替。",
        affectedTeam: "荷兰",
        affectedPlayer: "Jurriën Timber",
        severity: "high",
        source: "ESPN / 荷兰足协官方声明 (2026-06-09)",
      },
      {
        type: "injury",
        title: "三笘薫 腿筋伤落选最终名单",
        summary:
          "Brighton 边锋三笘薫在赛季末段腿筋受伤，日本主帅森保一确认其无法在开赛前恢复，未进入 26 人名单。日本队边路突破能力受损。",
        affectedTeam: "日本",
        affectedPlayer: "Kaoru Mitoma",
        severity: "high",
        source: "ESPN (2026-06-09)",
      },
      {
        type: "form",
        title: "日本近 3 场热身赛全胜，状态正佳",
        summary:
          "日本在 3 月国际比赛日先后击败英格兰、乌拉圭和沙特，Doan、Kubo 和 Maeda 状态出色。",
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
