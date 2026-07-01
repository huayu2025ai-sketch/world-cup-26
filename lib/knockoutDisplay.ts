import { worldCupGroups } from "@/constants/worldcupData";
import { getQualifiedTeamCodes } from "@/lib/groupQualification";
import { scheduleMatches, type ScheduleMatch } from "@/constants/scheduleData";

const groupById = new Map(worldCupGroups.map((group) => [group.id, group]));
const matchById = new Map(scheduleMatches.map((match) => [match.id, match]));

const knockoutSourceMap: Record<number, { home: number; away: number }> = {
  89: { home: 73, away: 75 },
  90: { home: 74, away: 77 },
  91: { home: 76, away: 78 },
  92: { home: 79, away: 80 },
  93: { home: 83, away: 84 },
  94: { home: 81, away: 82 },
  95: { home: 86, away: 88 },
  96: { home: 85, away: 87 },
  97: { home: 89, away: 90 },
  98: { home: 93, away: 94 },
  99: { home: 91, away: 92 },
  100: { home: 95, away: 96 },
  101: { home: 97, away: 98 },
  102: { home: 99, away: 100 },
  103: { home: 101, away: 102 },
  104: { home: 101, away: 102 }
};

const sortStandings = <T extends { points: number; goalDiff: number; goalsFor: number }>(left: T, right: T) =>
  right.points - left.points || right.goalDiff - left.goalDiff || right.goalsFor - left.goalsFor;

const resolveGroupPlace = (slot: string) => {
  const match = slot.match(/^([A-L])组第([12])$/);
  if (!match) return slot;

  const group = groupById.get(match[1]);
  if (!group) return slot;

  const position = Number(match[2]) - 1;
  const standing = group.standings.slice().sort(sortStandings)[position];
  if (!standing) return slot;

  return getQualifiedTeamCodes(group.id).has(standing.code) ? standing.name : slot;
};

const resolveKnockoutPlace = (match: ScheduleMatch, side: "home" | "away") => {
  const slot = side === "home" ? match.home : match.away;
  const source = knockoutSourceMap[match.id]?.[side];

  if (!source) return slot;
  if (!slot.includes("胜者") && !slot.includes("负者")) return slot;

  const sourceMatch = matchById.get(source);
  if (!sourceMatch || typeof sourceMatch.homeScore !== "number" || typeof sourceMatch.awayScore !== "number") {
    return slot;
  }

  const isLoserSlot = slot.includes("负者");
  const winner = sourceMatch.homeScore > sourceMatch.awayScore ? sourceMatch.home : sourceMatch.away;
  const loser = sourceMatch.homeScore > sourceMatch.awayScore ? sourceMatch.away : sourceMatch.home;
  return isLoserSlot ? loser : winner;
};

export const getDisplayMatchTeamLabel = (match: ScheduleMatch, side: "home" | "away") => {
  const slot = side === "home" ? match.home : match.away;

  if (match.stage === "分组赛") {
    return resolveGroupPlace(slot);
  }

  return resolveKnockoutPlace(match, side);
};
