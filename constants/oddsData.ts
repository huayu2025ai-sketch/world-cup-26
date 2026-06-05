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

export const recommendedBookmakers: Bookmaker[] = [
  { key: "pinnacle", name: "Pinnacle", marketRole: "sharp 盘口" },
  { key: "betfair", name: "Betfair Exchange", marketRole: "交易所价格" },
  { key: "bet365", name: "bet365", marketRole: "主流欧赔" },
  { key: "sbobet", name: "SBOBet", marketRole: "亚洲盘口源" },
  { key: "draftkings", name: "DraftKings", marketRole: "美国主流盘" }
];

export const oddsDataUpdatedAt = "2026-06-05";

export const matchOddsById: Record<number, MatchBookmakerOdds[]> = {
  1: [
    { bookmaker: "pinnacle", odds: { home: 1.47, draw: 4.45, away: 8.1 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.48, draw: 4.6, away: 8.4 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.4, draw: 4.5, away: 7.5 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.46, draw: 4.3, away: 7.4 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.45, draw: 4.4, away: 7.8 }, capturedAt: "2026-06-05" }
  ],
  2: [
    { bookmaker: "pinnacle", odds: { home: 1.84, draw: 3.8, away: 4.48 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.86, draw: 3.85, away: 4.6 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.8, draw: 3.7, away: 4.33 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.81, draw: 3.65, away: 4.5 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.83, draw: 3.75, away: 4.45 }, capturedAt: "2026-06-05" }
  ],
  3: [
    { bookmaker: "pinnacle", odds: { home: 1.65, draw: 3.92, away: 6.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.67, draw: 4.0, away: 6.2 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.62, draw: 3.9, away: 5.75 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.59, draw: 4.05, away: 5.7 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.64, draw: 3.95, away: 5.9 }, capturedAt: "2026-06-05" }
  ],
  4: [
    { bookmaker: "pinnacle", odds: { home: 2.05, draw: 3.5, away: 3.9 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 2.08, draw: 3.55, away: 3.95 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.95, draw: 3.4, away: 4.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 2.02, draw: 3.4, away: 3.85 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 2.0, draw: 3.45, away: 3.9 }, capturedAt: "2026-06-05" }
  ],
  5: [
    { bookmaker: "pinnacle", odds: { home: 1.12, draw: 8.8, away: 22.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.13, draw: 9.2, away: 24.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.1, draw: 8.5, away: 21.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.11, draw: 8.2, away: 20.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.12, draw: 8.7, away: 23.0 }, capturedAt: "2026-06-05" }
  ],
  6: [
    { bookmaker: "pinnacle", odds: { home: 1.95, draw: 3.45, away: 4.05 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.98, draw: 3.55, away: 4.1 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.9, draw: 3.5, away: 4.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.92, draw: 3.4, away: 3.95 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.94, draw: 3.5, away: 4.0 }, capturedAt: "2026-06-05" }
  ],
  7: [
    { bookmaker: "pinnacle", odds: { home: 1.72, draw: 3.75, away: 5.1 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.74, draw: 3.85, away: 5.25 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.7, draw: 3.75, away: 5.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.69, draw: 3.7, away: 5.05 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.73, draw: 3.8, away: 5.0 }, capturedAt: "2026-06-05" }
  ],
  8: [
    { bookmaker: "pinnacle", odds: { home: 1.18, draw: 7.2, away: 17.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.19, draw: 7.6, away: 18.5 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.17, draw: 7.0, away: 16.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.18, draw: 6.8, away: 15.5 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.18, draw: 7.1, away: 17.5 }, capturedAt: "2026-06-05" }
  ],
  9: [
    { bookmaker: "pinnacle", odds: { home: 1.55, draw: 4.15, away: 6.5 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.57, draw: 4.25, away: 6.8 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.53, draw: 4.0, away: 6.25 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.54, draw: 4.05, away: 6.3 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.56, draw: 4.1, away: 6.4 }, capturedAt: "2026-06-05" }
  ],
  10: [
    { bookmaker: "pinnacle", odds: { home: 1.34, draw: 5.2, away: 9.8 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.35, draw: 5.4, away: 10.2 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.33, draw: 5.0, away: 9.5 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.34, draw: 5.05, away: 9.7 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.35, draw: 5.15, away: 9.8 }, capturedAt: "2026-06-05" }
  ],
  11: [
    { bookmaker: "pinnacle", odds: { home: 1.4, draw: 4.9, away: 8.4 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.41, draw: 5.0, away: 8.8 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.38, draw: 4.75, away: 8.0 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.39, draw: 4.8, away: 8.2 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.4, draw: 4.85, away: 8.4 }, capturedAt: "2026-06-05" }
  ],
  12: [
    { bookmaker: "pinnacle", odds: { home: 1.7, draw: 3.75, away: 4.75 }, capturedAt: "2026-06-05" },
    { bookmaker: "betfair", odds: { home: 1.72, draw: 3.85, away: 4.9 }, capturedAt: "2026-06-05" },
    { bookmaker: "bet365", odds: { home: 1.68, draw: 3.7, away: 4.75 }, capturedAt: "2026-06-05" },
    { bookmaker: "sbobet", odds: { home: 1.69, draw: 3.65, away: 4.8 }, capturedAt: "2026-06-05" },
    { bookmaker: "draftkings", odds: { home: 1.7, draw: 3.75, away: 4.85 }, capturedAt: "2026-06-05" }
  ]
};
