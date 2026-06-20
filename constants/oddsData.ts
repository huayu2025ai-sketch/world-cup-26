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

export const oddsDataUpdatedAt = "2026-06-20";

export const championFavoritesUpdatedAt = "2026-06-20";

export const championFavorites: ChampionFavorite[] = [
  {
    rank: 1,
    team: "法国",
    englishName: "France",
    code: "FRA",
    flag: "🇫🇷",
    consensusAmericanOdds: 390,
    consensusDecimalOdds: 4.9,
    marketImpliedProbability: 0.2041,
    modelProbability: 0.2041,
    sourceNote: "公开市场共识第 1"
  },
  {
    rank: 2,
    team: "西班牙",
    englishName: "Spain",
    code: "ESP",
    flag: "🇪🇸",
    consensusAmericanOdds: 550,
    consensusDecimalOdds: 6.5,
    marketImpliedProbability: 0.1538,
    modelProbability: 0.1538,
    sourceNote: "公开市场共识第 2"
  },
  {
    rank: 3,
    team: "英格兰",
    englishName: "England",
    code: "ENG",
    flag: "\u{1F3F4}\u{E0065}\u{E006E}\u{E0067}\u{E006C}\u{E0061}\u{E006E}\u{E0064}\u{E007F}",
    consensusAmericanOdds: 600,
    consensusDecimalOdds: 7,
    marketImpliedProbability: 0.1429,
    modelProbability: 0.1429,
    sourceNote: "公开市场共识第 3"
  },
  {
    rank: 4,
    team: "阿根廷",
    englishName: "Argentina",
    code: "ARG",
    flag: "🇦🇷",
    consensusAmericanOdds: 800,
    consensusDecimalOdds: 9,
    marketImpliedProbability: 0.1111,
    modelProbability: 0.1111,
    sourceNote: "公开市场共识第 4"
  },
  {
    rank: 5,
    team: "葡萄牙",
    englishName: "Portugal",
    code: "POR",
    flag: "🇵🇹",
    consensusAmericanOdds: 960,
    consensusDecimalOdds: 10.6,
    marketImpliedProbability: 0.0943,
    modelProbability: 0.0943,
    sourceNote: "公开市场共识第 5"
  }
];

export const matchOddsById: Record<number, MatchBookmakerOdds[]> = {
  5: [
    { bookmaker: "pinnacle", odds: { home: 13, draw: 7, away: 1.2 }, capturedAt: "2026-06-13" },
    { bookmaker: "betfair", odds: { home: 13, draw: 6.5, away: 1.2 }, capturedAt: "2026-06-13" },
    { bookmaker: "bet365", odds: { home: 14, draw: 6.5, away: 1.2 }, capturedAt: "2026-06-13" },
    { bookmaker: "sbobet", odds: { home: 13, draw: 6, away: 1.22 }, capturedAt: "2026-06-13" },
    { bookmaker: "draftkings", odds: { home: 13, draw: 6, away: 1.18 }, capturedAt: "2026-06-13" }
  ],
  6: [
    { bookmaker: "pinnacle", odds: { home: 1.67, draw: 3.75, away: 5.5 }, capturedAt: "2026-06-13" },
    { bookmaker: "betfair", odds: { home: 1.67, draw: 3.5, away: 5 }, capturedAt: "2026-06-13" },
    { bookmaker: "bet365", odds: { home: 1.67, draw: 3.6, away: 5.5 }, capturedAt: "2026-06-13" },
    { bookmaker: "sbobet", odds: { home: 1.67, draw: 3.6, away: 5.5 }, capturedAt: "2026-06-13" },
    { bookmaker: "draftkings", odds: { home: 1.65, draw: 3.4, away: 5 }, capturedAt: "2026-06-13" }
  ],
  7: [
    { bookmaker: "pinnacle", odds: { home: 5.5, draw: 4.5, away: 1.53 }, capturedAt: "2026-06-13" },
    { bookmaker: "betfair", odds: { home: 6, draw: 4.2, away: 1.5 }, capturedAt: "2026-06-13" },
    { bookmaker: "bet365", odds: { home: 5.5, draw: 4.35, away: 1.53 }, capturedAt: "2026-06-13" },
    { bookmaker: "sbobet", odds: { home: 6, draw: 4.33, away: 1.5 }, capturedAt: "2026-06-13" },
    { bookmaker: "draftkings", odds: { home: 5.75, draw: 4, away: 1.44 }, capturedAt: "2026-06-13" }
  ],
  8: [
    { bookmaker: "pinnacle", odds: { home: 5, draw: 3.7, away: 1.7 }, capturedAt: "2026-06-13" },
    { bookmaker: "betfair", odds: { home: 5, draw: 3.5, away: 1.7 }, capturedAt: "2026-06-13" },
    { bookmaker: "bet365", odds: { home: 5, draw: 3.75, away: 1.7 }, capturedAt: "2026-06-13" },
    { bookmaker: "sbobet", odds: { home: 5, draw: 3.75, away: 1.67 }, capturedAt: "2026-06-13" },
    { bookmaker: "draftkings", odds: { home: 4.8, draw: 3.5, away: 1.67 }, capturedAt: "2026-06-13" }
  ],
  9: [
    { bookmaker: "pinnacle", odds: { home: 1.04, draw: 17, away: 29 }, capturedAt: "2026-06-14" },
    { bookmaker: "betfair", odds: { home: 1.05, draw: 17, away: 36 }, capturedAt: "2026-06-14" },
    { bookmaker: "bet365", odds: { home: 1.03, draw: 15, away: 56 }, capturedAt: "2026-06-14" },
    { bookmaker: "sbobet", odds: { home: 1.04, draw: 15, away: 34 }, capturedAt: "2026-06-14" },
    { bookmaker: "draftkings", odds: { home: 1.04, draw: 15, away: 41 }, capturedAt: "2026-06-14" }
  ],
  10: [
    { bookmaker: "pinnacle", odds: { home: 2, draw: 3.5, away: 3.75 }, capturedAt: "2026-06-14" },
    { bookmaker: "betfair", odds: { home: 1.95, draw: 3.4, away: 3.75 }, capturedAt: "2026-06-14" },
    { bookmaker: "bet365", odds: { home: 2, draw: 3.5, away: 3.6 }, capturedAt: "2026-06-14" },
    { bookmaker: "sbobet", odds: { home: 2, draw: 3.5, away: 3.6 }, capturedAt: "2026-06-14" },
    { bookmaker: "draftkings", odds: { home: 1.91, draw: 3.3, away: 3.7 }, capturedAt: "2026-06-14" }
  ],
  11: [
    { bookmaker: "pinnacle", odds: { home: 3.6, draw: 2.8, away: 2.38 }, capturedAt: "2026-06-14" },
    { bookmaker: "betfair", odds: { home: 3.4, draw: 2.9, away: 2.25 }, capturedAt: "2026-06-14" },
    { bookmaker: "bet365", odds: { home: 3.6, draw: 2.75, away: 2.4 }, capturedAt: "2026-06-14" },
    { bookmaker: "sbobet", odds: { home: 3.4, draw: 2.88, away: 2.38 }, capturedAt: "2026-06-14" },
    { bookmaker: "draftkings", odds: { home: 3.3, draw: 2.9, away: 2.25 }, capturedAt: "2026-06-14" }
  ],
  12: [
    { bookmaker: "pinnacle", odds: { home: 1.9, draw: 3.5, away: 4.2 }, capturedAt: "2026-06-14" },
    { bookmaker: "betfair", odds: { home: 1.85, draw: 3.3, away: 4.2 }, capturedAt: "2026-06-14" },
    { bookmaker: "bet365", odds: { home: 1.9, draw: 3.4, away: 4.25 }, capturedAt: "2026-06-14" },
    { bookmaker: "sbobet", odds: { home: 1.83, draw: 3.4, away: 4.33 }, capturedAt: "2026-06-14" },
    { bookmaker: "draftkings", odds: { home: 1.85, draw: 3.3, away: 4 }, capturedAt: "2026-06-14" }
  ],
  17: [
    { bookmaker: "pinnacle", odds: { home: 1.62, draw: 3.8, away: 5.8 }, capturedAt: "2026-06-17" }
  ],
  18: [
    { bookmaker: "pinnacle", odds: { home: 7.5, draw: 4.8, away: 1.42 }, capturedAt: "2026-06-17" }
  ],
  19: [
    { bookmaker: "pinnacle", odds: { home: 1.45, draw: 4.2, away: 8 }, capturedAt: "2026-06-17" }
  ],
  20: [
    { bookmaker: "pinnacle", odds: { home: 1.62, draw: 3.75, away: 5.8 }, capturedAt: "2026-06-17" }
  ],
  21: [
    { bookmaker: "pinnacle", odds: { home: 1.25, draw: 5.5, away: 13 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 1.25, draw: 5, away: 11 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 1.25, draw: 5.75, away: 13 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 1.25, draw: 5.5, away: 12 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 1.25, draw: 5, away: 11 }, capturedAt: "2026-06-17" }
  ],
  22: [
    { bookmaker: "pinnacle", odds: { home: 1.7, draw: 3.75, away: 5 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 1.67, draw: 3.6, away: 4.8 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 1.73, draw: 3.75, away: 5.25 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 1.73, draw: 3.6, away: 5 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 1.67, draw: 3.5, away: 4.8 }, capturedAt: "2026-06-17" }
  ],
  23: [
    { bookmaker: "pinnacle", odds: { home: 2.3, draw: 3.3, away: 3.2 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 2.25, draw: 3.2, away: 3.1 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 2.38, draw: 3.2, away: 3.2 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 2.25, draw: 3.4, away: 3 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 2.25, draw: 3.1, away: 3 }, capturedAt: "2026-06-17" }
  ],
  24: [
    { bookmaker: "pinnacle", odds: { home: 9, draw: 4.75, away: 1.38 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 8.5, draw: 4.5, away: 1.36 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 9, draw: 4.75, away: 1.37 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 9, draw: 4.5, away: 1.4 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 8.5, draw: 4.4, away: 1.33 }, capturedAt: "2026-06-17" }
  ],
  25: [
    { bookmaker: "pinnacle", odds: { home: 1.75, draw: 3.8, away: 4.5 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 1.75, draw: 3.6, away: 4.33 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 1.75, draw: 3.75, away: 4.6 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 1.62, draw: 3.6, away: 4.6 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 1.75, draw: 3.5, away: 4.2 }, capturedAt: "2026-06-17" }
  ],
  26: [
    { bookmaker: "pinnacle", odds: { home: 1.53, draw: 4.2, away: 6 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 1.53, draw: 4, away: 5.8 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 1.53, draw: 4.2, away: 6.5 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 1.57, draw: 4, away: 6 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 1.53, draw: 3.9, away: 5.5 }, capturedAt: "2026-06-17" }
  ],
  27: [
    { bookmaker: "pinnacle", odds: { home: 1.29, draw: 5.5, away: 10 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 1.29, draw: 5, away: 10 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 1.29, draw: 5.5, away: 10.5 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 1.29, draw: 5, away: 12 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 1.25, draw: 5, away: 10 }, capturedAt: "2026-06-17" }
  ],
  28: [
    { bookmaker: "pinnacle", odds: { home: 2, draw: 3.3, away: 3.9 }, capturedAt: "2026-06-17" },
    { bookmaker: "betfair", odds: { home: 1.95, draw: 3.1, away: 3.9 }, capturedAt: "2026-06-17" },
    { bookmaker: "bet365", odds: { home: 2.05, draw: 3.25, away: 4 }, capturedAt: "2026-06-17" },
    { bookmaker: "sbobet", odds: { home: 2, draw: 3.25, away: 4 }, capturedAt: "2026-06-17" },
    { bookmaker: "draftkings", odds: { home: 1.95, draw: 3.1, away: 3.8 }, capturedAt: "2026-06-17" }
  ],
  29: [
    { bookmaker: "pinnacle", odds: { home: 1.6, draw: 4.33, away: 5 }, capturedAt: "2026-06-20" },
    { bookmaker: "betfair", odds: { home: 1.6, draw: 4, away: 5 }, capturedAt: "2026-06-20" },
    { bookmaker: "bet365", odds: { home: 1.62, draw: 4.2, away: 5.5 }, capturedAt: "2026-06-20" },
    { bookmaker: "sbobet", odds: { home: 1.6, draw: 4, away: 5.5 }, capturedAt: "2026-06-20" },
    { bookmaker: "draftkings", odds: { home: 1.57, draw: 4, away: 5 }, capturedAt: "2026-06-20" }
  ],
  30: [
    { bookmaker: "pinnacle", odds: { home: 5.5, draw: 3.75, away: 1.65 }, capturedAt: "2026-06-20" },
    { bookmaker: "betfair", odds: { home: 5, draw: 3.4, away: 1.67 }, capturedAt: "2026-06-20" },
    { bookmaker: "bet365", odds: { home: 5.5, draw: 3.6, away: 1.73 }, capturedAt: "2026-06-20" },
    { bookmaker: "sbobet", odds: { home: 5.5, draw: 3.5, away: 1.67 }, capturedAt: "2026-06-20" },
    { bookmaker: "draftkings", odds: { home: 4.8, draw: 3.4, away: 1.67 }, capturedAt: "2026-06-20" }
  ],
  31: [
    { bookmaker: "pinnacle", odds: { home: 1.09, draw: 12, away: 21 }, capturedAt: "2026-06-20" },
    { bookmaker: "betfair", odds: { home: 1.1, draw: 10, away: 23 }, capturedAt: "2026-06-20" },
    { bookmaker: "bet365", odds: { home: 1.1, draw: 10.5, away: 26 }, capturedAt: "2026-06-20" },
    { bookmaker: "sbobet", odds: { home: 1.1, draw: 9.5, away: 26 }, capturedAt: "2026-06-20" },
    { bookmaker: "draftkings", odds: { home: 1.08, draw: 10, away: 21 }, capturedAt: "2026-06-20" }
  ],
  32: [
    { bookmaker: "pinnacle", odds: { home: 2.05, draw: 3.4, away: 3.75 }, capturedAt: "2026-06-20" },
    { bookmaker: "betfair", odds: { home: 2, draw: 3.25, away: 3.6 }, capturedAt: "2026-06-20" },
    { bookmaker: "bet365", odds: { home: 2.05, draw: 3.4, away: 3.75 }, capturedAt: "2026-06-20" },
    { bookmaker: "sbobet", odds: { home: 2.1, draw: 3.4, away: 3.5 }, capturedAt: "2026-06-20" },
    { bookmaker: "draftkings", odds: { home: 2, draw: 3.2, away: 3.5 }, capturedAt: "2026-06-20" }
  ]
};
