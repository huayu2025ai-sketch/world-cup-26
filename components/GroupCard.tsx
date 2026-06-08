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

      <div className="mt-3 space-y-1">
        {group.teams.map((team, index) => (
          <div
            key={team.code}
            className="flex items-center justify-between rounded-md border border-slate-700/80 bg-slate-900/55 px-2.5 py-1"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="text-lg" aria-hidden="true">
                {team.flag}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-slate-100">{team.name}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{team.code}</p>
              </div>
            </div>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-800 text-[11px] font-black text-slate-400">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </button>
  );
}
