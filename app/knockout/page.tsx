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
const finalMatch = knockoutMatches.find((match) => match.id === 104);

const championTeam =
  finalMatch && typeof finalMatch.homeScore === "number" && typeof finalMatch.awayScore === "number"
    ? finalMatch.knockoutWinner === "home"
      ? finalMatch.home
      : finalMatch.away
    : "待定";

const runnerUpTeam =
  finalMatch && typeof finalMatch.homeScore === "number" && typeof finalMatch.awayScore === "number"
    ? finalMatch.knockoutWinner === "home"
      ? finalMatch.away
      : finalMatch.home
    : "待定";

const finalScoreLabel =
  finalMatch && typeof finalMatch.homeScore === "number" && typeof finalMatch.awayScore === "number"
    ? `${finalMatch.homeScore}-${finalMatch.awayScore}`
    : "未结束";

function TrophyIllustration() {
  return (
    <svg viewBox="0 0 360 340" className="w-full max-w-[19rem]" aria-hidden="true">
      <defs>
        <linearGradient id="cupGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2b2" />
          <stop offset="34%" stopColor="#f7d56a" />
          <stop offset="68%" stopColor="#c98d1d" />
          <stop offset="100%" stopColor="#ffe89a" />
        </linearGradient>
        <linearGradient id="cupShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a1e08" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#120c03" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="cupGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="180" cy="288" rx="112" ry="20" fill="#020617" fillOpacity="0.45" />
      <circle cx="180" cy="130" r="110" fill="url(#cupGlow)" />

      <path
        d="M126 78c-34 0-58 22-58 55 0 34 24 61 62 61h7c-9 18-22 30-44 39l11 26c36-12 61-34 76-65h-20c-39 0-60-24-60-51 0-18 12-29 31-29h5V78h-10Z"
        fill="url(#cupGold)"
        stroke="#7c4b06"
        strokeWidth="3"
      />
      <path
        d="M234 78c34 0 58 22 58 55 0 34-24 61-62 61h-7c9 18 22 30 44 39l-11 26c-36-12-61-34-76-65h20c39 0 60-24 60-51 0-18-12-29-31-29h-5V78h10Z"
        fill="url(#cupGold)"
        stroke="#7c4b06"
        strokeWidth="3"
      />

      <path
        d="M148 62h64c14 0 24 10 24 24v8c0 26-18 50-56 50-38 0-56-24-56-50v-8c0-14 10-24 24-24Z"
        fill="url(#cupGold)"
        stroke="#7c4b06"
        strokeWidth="3"
      />
      <path
        d="M138 146h84c-4 18-20 33-42 33s-38-15-42-33Z"
        fill="url(#cupShadow)"
        opacity="0.35"
      />
      <rect x="165" y="166" width="30" height="48" rx="12" fill="url(#cupGold)" stroke="#7c4b06" strokeWidth="3" />
      <rect x="142" y="210" width="76" height="24" rx="10" fill="url(#cupGold)" stroke="#7c4b06" strokeWidth="3" />
      <rect x="122" y="236" width="116" height="26" rx="12" fill="url(#cupGold)" stroke="#7c4b06" strokeWidth="3" />
      <rect x="106" y="264" width="148" height="16" rx="8" fill="#b45309" stroke="#7c4b06" strokeWidth="3" />

      <path d="M145 100h70l-7 12h-56l-7-12Z" fill="#fff5c7" opacity="0.35" />
      <path d="M169 74h22v54h-22z" fill="#fff9dc" opacity="0.22" />
      <circle cx="180" cy="112" r="7" fill="#fff5c7" opacity="0.55" />
      <path d="M180 48l14 18-14 18-14-18 14-18Z" fill="#fff6c9" opacity="0.45" />
    </svg>
  );
}

export default function KnockoutPage() {
  return (
    <main className="mx-auto max-w-7xl px-3 pb-12 pt-4 sm:px-5 lg:px-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-amber-200/10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(34,211,238,0.14),transparent_25%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] px-4 py-5 shadow-[0_24px_90px_rgba(2,6,23,0.54)] backdrop-blur-xl sm:px-6 sm:py-6">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0)_28%,rgba(255,255,255,0.03)_72%,rgba(255,255,255,0)_100%)] opacity-60" />
        <div className="relative grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.36em] text-amber-200">
              Knockout Stage
            </p>
            <h1 className="mt-2 text-2xl font-black leading-tight text-slate-50 sm:text-3xl lg:text-4xl">
              32 强对战图与冠军归属
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              从 32 强到决赛的树状晋级路线图。最右侧收口处以大力神杯形式标出最终冠军，方便直接查看冠军归属。
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-950/55 p-4 shadow-[0_16px_40px_rgba(2,6,23,0.3)]">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">Final Result</p>
                <p className="mt-2 text-3xl font-black text-slate-50">{finalScoreLabel}</p>
                <p className="mt-2 text-sm font-semibold text-slate-300">西班牙 vs 阿根廷</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  决赛终场补入费兰·托雷斯 106 分钟制胜球，冠军随之锁定。
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 shadow-[0_16px_40px_rgba(120,53,15,0.18)]">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-100">Champion</p>
                <p className="mt-2 text-3xl font-black text-amber-100">{championTeam}</p>
                <p className="mt-2 text-sm font-semibold text-amber-50/80">世界冠军</p>
                <p className="mt-1 text-xs leading-5 text-amber-50/60">亚军：{runnerUpTeam}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-amber-200/20 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(2,6,23,0.96))] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.08),transparent_38%)]" />
            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.34em] text-amber-100/70">大力神杯</p>
                <h2 className="mt-1 text-xl font-black text-slate-50">冠军奖杯</h2>
              </div>
              <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-amber-100">
                Final
              </span>
            </div>

            <div className="relative z-10 mt-2 flex justify-center">
              <TrophyIllustration />
            </div>

            <div className="relative mt-1 rounded-[1.5rem] border border-amber-200/15 bg-slate-950/65 p-4 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">Champions</p>
              <p className="mt-2 text-3xl font-black text-amber-100">{championTeam}</p>
              <p className="mt-1 text-sm font-semibold text-slate-300">西班牙 1-0 阿根廷</p>
              <p className="mt-1 text-xs text-slate-400">费兰·托雷斯 106'</p>
            </div>
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
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
