import type { BookmakerKey, MatchBookmakerOdds, ThreeWayOdds } from "@/constants/oddsData";

export type OutcomeKey = "home" | "draw" | "away";

export type OutcomeProbabilities = Record<OutcomeKey, number>;

export type BookmakerProbability = {
  bookmaker: BookmakerKey;
  odds: ThreeWayOdds;
  raw: OutcomeProbabilities;
  noVig: OutcomeProbabilities;
  overround: number;
};

export type MatchPrediction = {
  bookmakerProbabilities: BookmakerProbability[];
  sourceCount: number;
  maxSourceCount: number;
  average: OutcomeProbabilities;
  predictedOutcome: OutcomeKey;
  predictedProbability: number;
  marginToSecond: number;
  confidence: "高" | "中" | "低";
  averageOverround: number;
};

const outcomeKeys: OutcomeKey[] = ["home", "draw", "away"];

export const maxMarketSourceCount = 5;

export const formatPercent = (value: number, digits = 1) => `${(value * 100).toFixed(digits)}%`;

export const getRawProbabilities = (odds: ThreeWayOdds): OutcomeProbabilities => {
  return {
    home: 1 / odds.home,
    draw: 1 / odds.draw,
    away: 1 / odds.away
  };
};

export const removeVig = (raw: OutcomeProbabilities): OutcomeProbabilities => {
  const total = outcomeKeys.reduce((sum, key) => sum + raw[key], 0);

  return {
    home: raw.home / total,
    draw: raw.draw / total,
    away: raw.away / total
  };
};

const getConfidence = (
  topProbability: number,
  marginToSecond: number,
  sourceCount: number
): MatchPrediction["confidence"] => {
  if (sourceCount <= 1) {
    return "低";
  }

  if (topProbability >= 0.62 && marginToSecond >= 0.18) {
    return sourceCount >= 3 ? "高" : "中";
  }

  if (topProbability >= 0.46 && marginToSecond >= 0.08) {
    return "中";
  }

  return "低";
};

export const getMatchPrediction = (bookmakerOdds: MatchBookmakerOdds[]): MatchPrediction | null => {
  if (bookmakerOdds.length === 0) {
    return null;
  }

  const bookmakerProbabilities = bookmakerOdds.map<BookmakerProbability>((item) => {
    const raw = getRawProbabilities(item.odds);
    const rawTotal = outcomeKeys.reduce((sum, key) => sum + raw[key], 0);

    return {
      bookmaker: item.bookmaker,
      odds: item.odds,
      raw,
      noVig: removeVig(raw),
      overround: rawTotal - 1
    };
  });

  const average = outcomeKeys.reduce<OutcomeProbabilities>(
    (acc, key) => {
      acc[key] =
        bookmakerProbabilities.reduce((sum, item) => sum + item.noVig[key], 0) / bookmakerProbabilities.length;
      return acc;
    },
    { home: 0, draw: 0, away: 0 }
  );

  const ranked = [...outcomeKeys].sort((a, b) => average[b] - average[a]);
  const predictedOutcome = ranked[0];
  const predictedProbability = average[predictedOutcome];
  const marginToSecond = predictedProbability - average[ranked[1]];
  const averageOverround =
    bookmakerProbabilities.reduce((sum, item) => sum + item.overround, 0) / bookmakerProbabilities.length;

  return {
    bookmakerProbabilities,
    sourceCount: bookmakerProbabilities.length,
    maxSourceCount: maxMarketSourceCount,
    average,
    predictedOutcome,
    predictedProbability,
    marginToSecond,
    confidence: getConfidence(predictedProbability, marginToSecond, bookmakerProbabilities.length),
    averageOverround
  };
};
