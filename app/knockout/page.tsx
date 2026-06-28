import type { Metadata } from "next";
import KnockoutBracket from "@/components/KnockoutBracket";
import UpdateHistoryPanel from "@/components/UpdateHistoryPanel";
import { scheduleMatches } from "@/constants/scheduleData";

export const metadata: Metadata = {
  title: "2026 世界杯淘汰赛对阵图",
  description: "2026 FIFA World Cup 32强以后淘汰赛树状对阵图，含赛程、比分与晋级路线。"
};

const knockoutMatches = scheduleMatches.filter((m) => m.stage !== "分组赛");
const finishedMatches = knockoutMatches.filter(
  (m) => m.homeScore !== undefined && m.awayScore !== undefined
);

export default function KnockoutPage() {
  return (
    <main className="mx-auto max-w-7xl px-3 pb-12 pt-4 sm:px-5 lg:px-6">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-300/10 bg-slate-950/35 px-4 py-5 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:px-6 sm:py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(251,191,36,0.12),transparent_28%)]" />
        <div className="relative grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.36em] text-cyan-200">
              Knockout Stage
            </p>
            <h1 className="mt-1.5 text-2xl font-black leading-tight text-slate-50 sm:text-3xl lg:text-4xl">
              32 强对战图
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              从 32 强到决赛的树状晋级路线图。当前已改成从左到右推进，32 强在最左侧，晋级路线向右展开。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-center backdrop-blur-md">
              <p className="text-2xl font-black text-cyan-200">{knockoutMatches.length}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">淘汰赛场次</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-center backdrop-blur-md">
              <p className="text-2xl font-black text-emerald-300">{finishedMatches.length}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">已完赛</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-center backdrop-blur-md">
              <p className="text-2xl font-black text-amber-300">
                {knockoutMatches.length - finishedMatches.length}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">待进行</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-3xl border border-slate-700/70 bg-slate-950/30 p-3 shadow-[0_24px_80px_rgba(2,6,23,0.34)] backdrop-blur-xl sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-300">Bracket View</p>
            <p className="mt-1 text-sm text-slate-400">
              已改为从左到右的单向 bracket 布局，终局卡片放在最右侧。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-cyan-200">
              胜者连线
            </span>
            <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-orange-200">
              败者分支
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-400">
              未开赛标记
            </span>
          </div>
        </div>

        <KnockoutBracket />
      </section>

      <UpdateHistoryPanel />
    </main>
  );
}
