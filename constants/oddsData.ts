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
    consensusAmericanOdds: 438,
    consensusDecimalOdds: 5.38,
    marketImpliedProbability: 0.1858,
    modelProbability: 0.257,
    sourceNote: "多源冠军预测共识第 1"
  },
  {
    rank: 2,
    team: "法国",
    englishName: "France",
    code: "FRA",
    flag: "🇫🇷",
    consensusAmericanOdds: 544,
    consensusDecimalOdds: 6.44,
    marketImpliedProbability: 0.1552,
    modelProbability: 0.189,
    sourceNote: "多源冠军预测共识第 2"
  },
  {
    rank: 3,
    team: "英格兰",
    englishName: "England",
    code: "ENG",
    flag: "\u{1F3F4}\u{E0065}\u{E006E}\u{E0067}\u{E006C}\u{E0061}\u{E006E}\u{E0064}\u{E007F}",
    consensusAmericanOdds: 597,
    consensusDecimalOdds: 6.97,
    marketImpliedProbability: 0.1435,
    modelProbability: 0.05,
    sourceNote: "多源冠军预测共识第 3"
  },
  {
    rank: 4,
    team: "巴西",
    englishName: "Brazil",
    code: "BRA",
    flag: "🇧🇷",
    consensusAmericanOdds: 813,
    consensusDecimalOdds: 9.13,
    marketImpliedProbability: 0.1096,
    modelProbability: 0.076,
    sourceNote: "多源冠军预测共识第 4"
  },
  {
    rank: 5,
    team: "阿根廷",
    englishName: "Argentina",
    code: "ARG",
    flag: "🇦🇷",
    consensusAmericanOdds: 825,
    consensusDecimalOdds: 9.25,
    marketImpliedProbability: 0.1081,
    modelProbability: 0.143,
    sourceNote: "多源冠军预测共识第 5"
  }
];

export const matchOddsById: Record<number, MatchBookmakerOdds[]> = {
  1: [
    { bookmaker: "pinnacle", odds: { home: 1.43, draw: 4.6, away: 8.2 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.42, draw: 4.34, away: 8.4 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.42, draw: 4.34, away: 8.4 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.44, draw: 4.2, away: 7.5 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.44, draw: 4.3, away: 8 }, capturedAt: "2026-06-08" }
  ],
  2: [
    { bookmaker: "pinnacle", odds: { home: 1.8, draw: 3.55, away: 4.5 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.8, draw: 3.7, away: 4.38 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.8, draw: 3.7, away: 4.38 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.8, draw: 3.7, away: 4.5 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.8, draw: 3.6, away: 4.5 }, capturedAt: "2026-06-08" }
  ],
  3: [
    { bookmaker: "pinnacle", odds: { home: 1.61, draw: 3.85, away: 5.6 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.61, draw: 3.82, away: 5.85 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.61, draw: 3.82, away: 5.85 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.62, draw: 3.8, away: 5.75 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.62, draw: 3.85, away: 5.6 }, capturedAt: "2026-06-08" }
  ],
  4: [
    { bookmaker: "pinnacle", odds: { home: 1.99, draw: 3.35, away: 3.85 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 2, draw: 3.42, away: 3.84 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 2, draw: 3.42, away: 3.84 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.95, draw: 3.4, away: 4 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.97, draw: 3.4, away: 3.95 }, capturedAt: "2026-06-08" }
  ],
  5: [
    { bookmaker: "pinnacle", odds: { home: 1.02, draw: 22, away: 40 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.03, draw: 15, away: 54 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.03, draw: 15, away: 54 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.03, draw: 19, away: 41 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.03, draw: 16, away: 45 }, capturedAt: "2026-06-08" }
  ],
  6: [
    { bookmaker: "pinnacle", odds: { home: 2, draw: 3.55, away: 3.6 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.91, draw: 3.66, away: 3.9 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.91, draw: 3.66, away: 3.9 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.95, draw: 3.8, away: 3.5 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.99, draw: 3.6, away: 3.65 }, capturedAt: "2026-06-08" }
  ],
  7: [
    { bookmaker: "pinnacle", odds: { home: 1.66, draw: 3.9, away: 5 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.68, draw: 3.78, away: 5.15 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.68, draw: 3.78, away: 5.15 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.65, draw: 3.8, away: 5 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.67, draw: 3.9, away: 5 }, capturedAt: "2026-06-08" }
  ],
  8: [
    { bookmaker: "pinnacle", odds: { home: 1.09, draw: 10, away: 24 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.09, draw: 10, away: 26 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.09, draw: 10, away: 26 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.09, draw: 9.5, away: 23 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.09, draw: 10, away: 25 }, capturedAt: "2026-06-08" }
  ],
  9: [
    { bookmaker: "pinnacle", odds: { home: 1.48, draw: 4.6, away: 7 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.46, draw: 4.38, away: 7.2 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.46, draw: 4.38, away: 7.2 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.45, draw: 4.5, away: 6.25 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.45, draw: 4.5, away: 7 }, capturedAt: "2026-06-08" }
  ],
  10: [
    { bookmaker: "pinnacle", odds: { home: 1.41, draw: 4.8, away: 8.4 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.4, draw: 4.44, away: 8.9 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.4, draw: 4.44, away: 8.9 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.4, draw: 4.75, away: 7 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.4, draw: 4.5, away: 8.4 }, capturedAt: "2026-06-08" }
  ],
  11: [
    { bookmaker: "pinnacle", odds: { home: 1.27, draw: 6, away: 11 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.28, draw: 5.55, away: 11 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.28, draw: 5.55, away: 11 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.25, draw: 6, away: 9.5 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.28, draw: 5.8, away: 10 }, capturedAt: "2026-06-08" }
  ],
  12: [
    { bookmaker: "pinnacle", odds: { home: 1.75, draw: 3.8, away: 4.9 }, capturedAt: "2026-06-08" },
    { bookmaker: "betfair", odds: { home: 1.73, draw: 3.78, away: 4.74 }, capturedAt: "2026-06-08" },
    { bookmaker: "bet365", odds: { home: 1.73, draw: 3.78, away: 4.74 }, capturedAt: "2026-06-08" },
    { bookmaker: "sbobet", odds: { home: 1.73, draw: 3.7, away: 4.75 }, capturedAt: "2026-06-08" },
    { bookmaker: "draftkings", odds: { home: 1.72, draw: 3.75, away: 4.8 }, capturedAt: "2026-06-08" }
  ]
};
