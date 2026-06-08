export type BookmakerKey = "pinnacle" | "betfair" | "bet365" | "sbobet" | "draftkings";

export type Bookmaker = {
  key: BookmakerKey;
  name: string;
  marketRole: string;
};

export type ThreeWayOdds = {
  home: number;
  draw: number;
  away: number;
};

export type MatchBookmakerOdds = {
  bookmaker: BookmakerKey;
  odds: ThreeWayOdds;
  capturedAt: string;
};

export type ChampionFavorite = {
  rank: number;
  team: string;
  englishName: string;
  code: string;
  flag: string;
  consensusAmericanOdds: number;
  consensusDecimalOdds: number;
  marketImpliedProbability: number;
  modelProbability: number;
  sourceNote: string;
};

export const recommendedBookmakers: Bookmaker[] = [
  { key: "pinnacle", name: "数据源 A", marketRole: "专业市场样本" },
  { key: "betfair", name: "数据源 B", marketRole: "交易市场样本" },
  { key: "bet365", name: "数据源 C", marketRole: "主流市场样本" },
  { key: "sbobet", name: "数据源 D", marketRole: "亚洲市场样本" },
  { key: "draftkings", name: "数据源 E", marketRole: "北美市场样本" }
];

export const oddsDataUpdatedAt = "2026-06-08";

export const championFavoritesUpdatedAt = "2026-06-08";

export const championFavorites: ChampionFavorite[] = [
  {
    rank: 1,
    team: "西班牙",
    englishName: "Spain",
    code: "ESP",
    flag: "🇪🇸",
    consensusAmericanOdds: 487,
    consensusDecimalOdds: 5.87,
    marketImpliedProbability: 0.1704,
    modelProbability: 0.257,
    sourceNote: "多源冠军预测共识第 1"
  },
  {
    rank: 2,
    team: "法国",
    englishName: "France",
    code: "FRA",
    flag: "🇫🇷",
    consensusAmericanOdds: 496,
    consensusDecimalOdds: 5.96,
    marketImpliedProbability: 0.1678,
    modelProbability: 0.189,
    sourceNote: "多源冠军预测共识第 2"
  },
  {
    rank: 3,
    team: "英格兰",
    englishName: "England",
    code: "ENG",
    flag: "\u{1F3F4}\u{E0065}\u{E006E}\u{E0067}\u{E006C}\u{E0061}\u{E006E}\u{E0064}\u{E007F}",
    consensusAmericanOdds: 698,
    consensusDecimalOdds: 7.98,
    marketImpliedProbability: 0.1253,
    modelProbability: 0.05,
    sourceNote: "多源冠军预测共识第 3"
  },
  {
    rank: 4,
    team: "巴西",
    englishName: "Brazil",
    code: "BRA",
    flag: "🇧🇷",
    consensusAmericanOdds: 919,
    consensusDecimalOdds: 10.19,
    marketImpliedProbability: 0.0981,
    modelProbability: 0.076,
    sourceNote: "多源冠军预测共识第 4"
  },
  {
    rank: 5,
    team: "阿根廷",
    englishName: "Argentina",
    code: "ARG",
    flag: "🇦🇷",
    consensusAmericanOdds: 925,
    consensusDecimalOdds: 10.25,
    marketImpliedProbability: 0.0976,
    modelProbability: 0.143,
    sourceNote: "多源冠军预测共识第 5"
  }
];

export const matchOddsById: Record<number, MatchBookmakerOdds[]> = {
  1: [
    { bookmaker: "pinnacle", odds: { home: 1.44, draw: 4.2, away: 7.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.4, draw: 4, away: 7.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.42, draw: 4.2, away: 7.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.4, draw: 4.2, away: 8.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.4, draw: 4, away: 7.5 }, capturedAt: "2026-06-07" }
  ],
  2: [
    { bookmaker: "pinnacle", odds: { home: 1.8, draw: 3.7, away: 4.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.75, draw: 3.5, away: 4.2 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.78, draw: 3.5, away: 4.4 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.8, draw: 3.5, away: 4.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.75, draw: 3.5, away: 4.2 }, capturedAt: "2026-06-07" }
  ],
  3: [
    { bookmaker: "pinnacle", odds: { home: 1.62, draw: 3.8, away: 5.75 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.55, draw: 3.9, away: 5 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.6, draw: 3.8, away: 5.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.62, draw: 3.75, away: 5.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.53, draw: 3.9, away: 5 }, capturedAt: "2026-06-07" }
  ],
  4: [
    { bookmaker: "pinnacle", odds: { home: 1.95, draw: 3.4, away: 4 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.95, draw: 3.25, away: 3.6 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.95, draw: 3.35, away: 3.9 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 2, draw: 3.3, away: 4 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.95, draw: 3.25, away: 3.6 }, capturedAt: "2026-06-07" }
  ],
  5: [
    { bookmaker: "pinnacle", odds: { home: 1.03, draw: 19, away: 41 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.04, draw: 13, away: 56 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.02, draw: 15, away: 67 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.04, draw: 15, away: 41 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.04, draw: 13, away: 56 }, capturedAt: "2026-06-07" }
  ],
  6: [
    { bookmaker: "pinnacle", odds: { home: 1.95, draw: 3.5, away: 3.8 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.91, draw: 3.7, away: 3.4 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.98, draw: 3.6, away: 3.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 2, draw: 3.6, away: 3.6 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.91, draw: 3.7, away: 3.4 }, capturedAt: "2026-06-07" }
  ],
  7: [
    { bookmaker: "pinnacle", odds: { home: 1.65, draw: 3.8, away: 5 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.67, draw: 3.6, away: 4.8 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.65, draw: 3.8, away: 5 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.67, draw: 3.75, away: 5 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.67, draw: 3.6, away: 4.8 }, capturedAt: "2026-06-07" }
  ],
  8: [
    { bookmaker: "pinnacle", odds: { home: 1.09, draw: 9.5, away: 23 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.1, draw: 9.5, away: 23 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.08, draw: 9, away: 26 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.1, draw: 9.5, away: 21 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.1, draw: 9.5, away: 23 }, capturedAt: "2026-06-07" }
  ],
  9: [
    { bookmaker: "pinnacle", odds: { home: 1.45, draw: 4.5, away: 6.25 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.44, draw: 4, away: 6.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.45, draw: 4.35, away: 6.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.44, draw: 4.33, away: 7.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.44, draw: 4, away: 6.5 }, capturedAt: "2026-06-07" }
  ],
  10: [
    { bookmaker: "pinnacle", odds: { home: 1.4, draw: 4.75, away: 7 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.4, draw: 4, away: 8 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.37, draw: 4.5, away: 8 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.36, draw: 4.5, away: 9 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.4, draw: 4, away: 8 }, capturedAt: "2026-06-07" }
  ],
  11: [
    { bookmaker: "pinnacle", odds: { home: 1.25, draw: 6, away: 9.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.25, draw: 5, away: 9.5 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.25, draw: 5.5, away: 11 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.25, draw: 5.5, away: 12 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.25, draw: 5, away: 9.5 }, capturedAt: "2026-06-07" }
  ],
  12: [
    { bookmaker: "pinnacle", odds: { home: 1.73, draw: 3.7, away: 4.75 }, capturedAt: "2026-06-07" },
    { bookmaker: "betfair", odds: { home: 1.7, draw: 3.5, away: 4.6 }, capturedAt: "2026-06-07" },
    { bookmaker: "bet365", odds: { home: 1.7, draw: 3.6, away: 4.75 }, capturedAt: "2026-06-07" },
    { bookmaker: "sbobet", odds: { home: 1.73, draw: 3.6, away: 5 }, capturedAt: "2026-06-07" },
    { bookmaker: "draftkings", odds: { home: 1.7, draw: 3.5, away: 4.6 }, capturedAt: "2026-06-07" }
  ]
};
