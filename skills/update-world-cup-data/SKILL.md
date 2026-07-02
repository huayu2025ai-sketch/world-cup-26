---
name: update-world-cup-data
description: Update verified 2026 FIFA World Cup match results in a local codebase. Use when asked to automatically refresh World Cup scores, goal scorers, group standings, tournament statistics, update logs, or to build/commit/push those data changes while avoiding predictions and unconfirmed match data.
---

# Update World Cup Data

## Core Rule

Only write data for real completed matches. Do not add predicted scores, betting projections, live partial scores, expected lineups, or unconfirmed assists.

Prefer structured football data APIs when available. If no usable API is available, cross-check reliable sources such as FIFA official match centre, AP, Guardian, ESPN, major broadcaster match centres, and official federation reports. Treat search snippets as leads; open source pages when the exact scorer/minute/assist detail matters.

## Workflow

1. Inspect the repo state.
   - Run `git status --short`.
   - Read the existing data files before editing:
     - `constants/scheduleData.ts`
     - `constants/worldcupData.ts`
     - `constants/tournamentStats.ts`
   - Identify the last completed match already recorded and the next unscored scheduled matches.
   - Preserve unrelated user changes. Do not revert files outside the requested update.

2. Establish the time window.
   - Use the current local time and each match's `date` plus `localTime`.
   - Convert each local kickoff to the user's relevant timezone when explaining timing.
   - Only investigate matches that could reasonably have reached full time since the last update.
   - If a future match has not kicked off or cannot have finished, leave it untouched.

3. Gather and verify results.
   - Prefer structured API fields for final score, scorer, minute, own goal, penalty, and assist.
   - If using web sources, require at least one authoritative source for final score and one reliable source for scorer/minute details. Cross-check conflicting details before editing.
   - For assists, write only assists explicitly credited by a reliable source. If no reliable source confirms an assist, omit it from assists ranking.
   - Use Chinese player names already present in the repo when available. If a Chinese name is absent, use a consistent common Chinese transliteration only when confidence is high; otherwise keep the source player name.

4. Update `constants/scheduleData.ts`.
   - For each verified completed match, set `homeScore`, `awayScore`, and `goalScorers`.
   - Each goal scorer record must include `player`, `team`, `minute`, and `type` when applicable.
   - Use existing `type` values:
     - `goal`
     - `penalty`
     - `ownGoal`
   - Count own goals toward the opponent's score, not the own-goal player's team score.

5. Update `constants/worldcupData.ts`.
   - Recalculate affected group standings:
     - `played`
     - `won`
     - `draw`
     - `lost`
     - `goalsFor`
     - `goalsAgainst`
     - `goalDiff`
     - `points`
   - Sort each affected group by points, goal difference, then goals for. Preserve existing ordering only when teams remain tied on those criteria.
   - Prepend one `groupOverviewUpdates` entry describing this run, including which matches changed and which matches were intentionally left untouched.

6. Update `constants/tournamentStats.ts`.
   - Rebuild `goalsRanking` from all completed matches in `scheduleData.ts`.
   - Include every non-own-goal personal goal from completed matches.
   - Exclude own goals from player goals ranking.
   - Update assists only for source-confirmed assists.
   - Keep rank semantics consistent with the file's existing style.
   - Update `statsNotice` to describe the latest verified update.

## Validation

Before committing, verify these invariants manually or with a small one-off script:

- Each match score equals its `goalScorers` count after own-goal attribution.
- `points === won * 3 + draw` for every updated standing.
- `goalDiff === goalsFor - goalsAgainst` for every updated standing.
- Updated group totals are internally balanced: goals for equals goals against across the group.
- Goals ranking covers all completed-match non-own-goal scorers.
- Assists ranking contains only explicitly confirmed assists.

Run:

```bash
npm run build
```

If the build fails, fix the data or code issue before committing. If the failure is unrelated and cannot be resolved safely, report it and do not commit.

## Commit And Push

Commit only when all of the following are true:

- At least one newly completed match was verified and written.
- The changed files are limited to the requested data files unless the user asked otherwise.
- `npm run build` passes.

Then run:

```bash
git add constants/scheduleData.ts constants/worldcupData.ts constants/tournamentStats.ts
git commit -m "Update World Cup results and stats"
git push
```

If there are no newly completed matches or no trusted data source, do not commit. Report a short reason, including the latest recorded match and the next match timing when relevant.
