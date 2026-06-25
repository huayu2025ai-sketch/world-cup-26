import { worldCupGroups } from "@/constants/worldcupData";
import { getQualifiedTeamCodes } from "@/lib/groupQualification";
import type { ScheduleMatch } from "@/constants/scheduleData";

const groupById = new Map(worldCupGroups.map((group) => [group.id, group]));

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

export const getDisplayMatchTeamLabel = (match: ScheduleMatch, side: "home" | "away") => {
  const slot = side === "home" ? match.home : match.away;
  return resolveGroupPlace(slot);
};
