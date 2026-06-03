"use client";

import type { WorldCupGroup } from "@/constants/worldcupData";

type GroupCardProps = {
  group: WorldCupGroup;
  onSelect: (group: WorldCupGroup) => void;
};

export default function GroupCard({ group, onSelect }: GroupCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(group)}
      className="group flex h-full flex-col rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-left shadow-2xl shadow-slate-950/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-200">Group {group.id}</p>
          <h2 className="mt-2 text-xl font-black text-slate-100">{group.name}</h2>
        </div>
        <span className="rounded-full border border-slate-600 px-3 py-1 text-xs font-bold text-slate-300 group-hover:border-cyan-300/60 group-hover:text-cyan-100">
          详情
        </span>
      </div>

      <p className="mt-4 min-h-12 text-sm leading-6 text-slate-300">{group.headline}</p>

      <div className="mt-5 space-y-2">
        {group.teams.map((team, index) => (
          <div
            key={team.code}
            className="flex items-center justify-between rounded-md border border-slate-700/80 bg-slate-900/55 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-xl" aria-hidden="true">
                {team.flag}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-100">{team.name}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{team.code}</p>
              </div>
            </div>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-800 text-xs font-black text-slate-400">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </button>
  );
}
