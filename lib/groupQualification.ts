import { scheduleMatches } from "@/constants/scheduleData";
import { worldCupGroups } from "@/constants/worldcupData";

type PointsTable = Record<string, number>;

const manualQualifiedTeamCodes = new Set([
  "MEX",
  "USA",
  "GER",
  "ARG",
  "FRA",
  "BRA",
  "SUI",
  "NED",
  "ESP",
  "BEL",
  "CAN",
  "MAR",
  "RSA",
  "CIV",
  "JPN",
  "AUS",
  "CPV",
  "NOR",
  "BIH",
  "ECU",
  "SWE",
  "PAR",
  "COL",
  "ENG",
  "CRO",
  "COD",
  "POR",
  "GHA",
  "EGY",
  "SEN",
]);
const sortStandings = <T extends { points: number; goalDiff: number; goalsFor: number }>(left: T, right: T) =>
  right.points - left.points || right.goalDiff - left.goalDiff || right.goalsFor - left.goalsFor;

const getRemainingMatches = () =>
  scheduleMatches.filter(
    (match) =>
      match.stage === "分组赛" &&
      typeof match.homeScore !== "number" &&
      typeof match.awayScore !== "number"
  );

const clonePoints = (points: PointsTable): PointsTable => ({ ...points });

const getQualifiedCodesForPoints = (points: PointsTable) => {
  const qualified = new Set<string>();

  for (const group of worldCupGroups) {
    const standings = group.standings
      .map((standing) => ({
        ...standing,
        points: standing.points + (points[standing.name] ?? 0),
      }))
      .sort(sortStandings);

    standings.slice(0, 2).forEach((standing) => qualified.add(standing.code));
  }

  const thirdPlaceCandidates = worldCupGroups
    .map((group) => {
      const standings = group.standings
        .map((standing) => ({
          ...standing,
          points: standing.points + (points[standing.name] ?? 0),
        }))
        .sort(sortStandings);

      return standings[2];
    })
    .filter(Boolean) as Array<{ name: string; code: string; points: number; goalDiff: number; goalsFor: number }>;

  thirdPlaceCandidates.sort(sortStandings);

  thirdPlaceCandidates.slice(0, 8).forEach((standing) => qualified.add(standing.code));

  return qualified;
};

const enumerateOutcomeQualifiedCodeSets = (
  matches: ReturnType<typeof getRemainingMatches>,
  points: PointsTable,
  index = 0,
  accumulator: Set<string>[] = [],
) => {
  if (index >= matches.length) {
    accumulator.push(getQualifiedCodesForPoints(points));
    return accumulator;
  }

  const match = matches[index];

  const homeWin = clonePoints(points);
  homeWin[match.home] = (homeWin[match.home] ?? 0) + 3;
  enumerateOutcomeQualifiedCodeSets(matches, homeWin, index + 1, accumulator);

  const draw = clonePoints(points);
  draw[match.home] = (draw[match.home] ?? 0) + 1;
  draw[match.away] = (draw[match.away] ?? 0) + 1;
  enumerateOutcomeQualifiedCodeSets(matches, draw, index + 1, accumulator);

  const awayWin = clonePoints(points);
  awayWin[match.away] = (awayWin[match.away] ?? 0) + 3;
  enumerateOutcomeQualifiedCodeSets(matches, awayWin, index + 1, accumulator);

  return accumulator;
};

const allRemainingMatches = getRemainingMatches();
const outcomeQualifiedCodeSets = enumerateOutcomeQualifiedCodeSets(allRemainingMatches, {});
const outcomeCount = outcomeQualifiedCodeSets.length;

const qualifiedOccurrenceCounts = new Map<string, number>();
outcomeQualifiedCodeSets.forEach((set) => {
  set.forEach((code) => {
    qualifiedOccurrenceCounts.set(code, (qualifiedOccurrenceCounts.get(code) ?? 0) + 1);
  });
});

const confirmedQualifiedCodes = new Set<string>(manualQualifiedTeamCodes);
const everQualifiedCodes = new Set<string>();

for (const group of worldCupGroups) {
  for (const team of group.teams) {
    const count = qualifiedOccurrenceCounts.get(team.code) ?? 0;
    if (count > 0) everQualifiedCodes.add(team.code);
  }
}

export const qualifiedTeamCodesByGroup = new Map(
  worldCupGroups.map((group) => [
    group.id,
    new Set(group.teams.filter((team) => confirmedQualifiedCodes.has(team.code)).map((team) => team.code)),
  ]),
);

export const eliminatedTeamCodesByGroup = new Map(
  worldCupGroups.map((group) => [
    group.id,
    new Set(group.teams.filter((team) => !everQualifiedCodes.has(team.code)).map((team) => team.code)),
  ]),
);

export const getQualifiedTeamCodes = (groupId: string) => qualifiedTeamCodesByGroup.get(groupId) ?? new Set<string>();

export const getEliminatedTeamCodes = (groupId: string) => eliminatedTeamCodesByGroup.get(groupId) ?? new Set<string>();
