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
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
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
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
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
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
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
        sourceUrl: "https://www.espn.com.au/football/story/_/id/48572979",
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
};

export const hasMatchNews = (matchId: number): boolean => matchId in matchNewsMap;

export const getMatchNews = (matchId: number): MatchNews | undefined => matchNewsMap[matchId];

export const getHighSeverityCount = (matchId: number): number => {
  const news = matchNewsMap[matchId];
  if (!news) return 0;
  return news.items.filter((item) => item.severity === "high").length;
};
