"use client";

import type { WorldCupGroup } from "@/constants/worldcupData";

type GroupCardProps = {
  group: WorldCupGroup;
  qualifiedTeamCodes: Set<string>;
  onSelect: (group: WorldCupGroup) => void;
};

export default function GroupCard({ group, qualifiedTeamCodes, onSelect }: GroupCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(group)}
      className="group flex h-full flex-col rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-left shadow-2xl shadow-slate-950/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">Group {group.id}</p>
          <h2 className="mt-1.5 text-lg font-black text-slate-100">{group.name}</h2>
        </div>
        <span className="rounded-full border border-slate-600 px-2.5 py-0.5 text-[11px] font-bold text-slate-300 group-hover:border-cyan-300/60 group-hover:text-cyan-100">
          详情
        </span>
      </div>

      <p className="mt-2.5 min-h-8 text-[13px] leading-4 text-slate-300">{group.headline}</p>

      <div className="mt-3 space-y-1.5">
        {group.standings
          .slice()
          .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor)
          .map((standing, sortedIndex) => {
            const team = group.teams.find((t) => t.code === standing.code);
            if (!team) return null;
            return (
              <div
                key={standing.code}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-md border border-slate-700/80 bg-slate-900/55 px-2.5 py-1.5 max-[420px]:grid-cols-1 max-[420px]:items-start max-[420px]:gap-1.5"
              >
                <div className="flex min-w-0 items-center gap-2.5 max-[420px]:items-start">
                  <span className="text-lg" aria-hidden="true">
                    {team.flag}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                      <p className="truncate text-[13px] font-bold leading-tight text-slate-100">{team.name}</p>
                      {qualifiedTeamCodes.has(standing.code) && (
                        <span className="shrink-0 rounded bg-emerald-500/20 px-1 py-0 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
                          已晋级
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {standing.code}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1.5 max-[420px]:justify-start max-[420px]:pl-7">
                  <span className="whitespace-nowrap text-[11px] text-slate-400">
                    {standing.played > 0 ? `进球${standing.goalsFor}/失球${standing.goalsAgainst}` : "-"}
                  </span>
                  <span className="grid h-6 w-[3.5rem] place-items-center rounded-full bg-slate-800 text-[10px] font-black text-cyan-300">
                    {standing.played > 0 ? `${standing.points}分` : "-"}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </button>
  );
}
