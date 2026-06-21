import { scheduleMatches } from "@/constants/scheduleData";
import { worldCupGroups, type WorldCupGroup } from "@/constants/worldcupData";

type PointsTable = Record<string, number>;

const getRemainingGroupMatches = (groupId: string) =>
  scheduleMatches.filter(
    (match) =>
      match.stage === "分组赛" &&
      match.group === groupId &&
      typeof match.homeScore !== "number" &&
      typeof match.awayScore !== "number"
  );

const clonePoints = (points: PointsTable): PointsTable => ({ ...points });

const enumerateTables = (matches: ReturnType<typeof getRemainingGroupMatches>, points: PointsTable): PointsTable[] => {
  if (matches.length === 0) return [points];

  const [match, ...rest] = matches;
  const outcomes: PointsTable[] = [];

  const homeWin = clonePoints(points);
  homeWin[match.home] = (homeWin[match.home] ?? 0) + 3;
  outcomes.push(...enumerateTables(rest, homeWin));

  const draw = clonePoints(points);
  draw[match.home] = (draw[match.home] ?? 0) + 1;
  draw[match.away] = (draw[match.away] ?? 0) + 1;
  outcomes.push(...enumerateTables(rest, draw));

  const awayWin = clonePoints(points);
  awayWin[match.away] = (awayWin[match.away] ?? 0) + 3;
  outcomes.push(...enumerateTables(rest, awayWin));

  return outcomes;
};

const buildCurrentPoints = (group: WorldCupGroup) =>
  group.standings.reduce<PointsTable>((table, standing) => {
    table[standing.name] = standing.points;
    return table;
  }, {});

const hasClinchedTopTwo = (group: WorldCupGroup, teamName: string) => {
  const remainingMatches = getRemainingGroupMatches(group.id);

  if (remainingMatches.length === 0) {
    return group.standings.slice(0, 2).some((standing) => standing.name === teamName);
  }

  const outcomeTables = enumerateTables(remainingMatches, buildCurrentPoints(group));

  return outcomeTables.every((table) => {
    const teamPoints = table[teamName] ?? 0;
    const teamsAtOrAbove = group.standings.filter((standing) => standing.name !== teamName && (table[standing.name] ?? 0) >= teamPoints).length;

    return teamsAtOrAbove <= 1;
  });
};

export const qualifiedTeamCodesByGroup = new Map(
  worldCupGroups.map((group) => [
    group.id,
    new Set(
      group.teams
        .filter((team) => hasClinchedTopTwo(group, team.name))
        .map((team) => team.code)
    )
  ])
);

export const getQualifiedTeamCodes = (groupId: string) => qualifiedTeamCodesByGroup.get(groupId) ?? new Set<string>();
