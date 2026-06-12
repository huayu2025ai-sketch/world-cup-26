"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scheduleMatches, type ScheduleMatch } from "@/constants/scheduleData";

const navItems = [
  { href: "/", label: "分组" },
  { href: "/schedule", label: "赛程" },
  { href: "/predictions", label: "预测" },
  { href: "/export", label: "素材" },
  { href: "/stats", label: "数据" }
];

type TournamentStatus = {
  stage: ScheduleMatch["stage"];
  completedMatches: number;
  totalMatches: number;
  todayMatches: number;
  nextMatch?: ScheduleMatch;
  nextTimeLabel?: string;
};

const shanghaiDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

const shanghaiTimeFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

const getBeijingDateKey = (date: Date) => shanghaiDateFormatter.format(date);

const getMatchKickoff = (match: ScheduleMatch) => {
  const [monthDay, time] = match.beijingTime.split(" ");
  return new Date(`2026-${monthDay}T${time}:00+08:00`);
};

const hasResult = (match: ScheduleMatch) => match.homeScore !== undefined && match.awayScore !== undefined;

const getTournamentStatus = (): TournamentStatus => {
  const now = new Date();
  const todayKey = getBeijingDateKey(now);
  const completedMatches = scheduleMatches.filter(hasResult).length;
  const nextMatch = scheduleMatches.find((match) => getMatchKickoff(match).getTime() > now.getTime());
  const currentStage =
    nextMatch?.stage ?? [...scheduleMatches].reverse().find(hasResult)?.stage ?? scheduleMatches[0].stage;
  const todayMatches = scheduleMatches.filter((match) => getBeijingDateKey(getMatchKickoff(match)) === todayKey).length;

  return {
    stage: currentStage,
    completedMatches,
    totalMatches: scheduleMatches.length,
    todayMatches,
    nextMatch,
    nextTimeLabel: nextMatch ? shanghaiTimeFormatter.format(getMatchKickoff(nextMatch)) : undefined
  };
};

export default function Navbar() {
  const pathname = usePathname();
  const [tournamentStatus, setTournamentStatus] = useState<TournamentStatus>(() => getTournamentStatus());

  useEffect(() => {
    setTournamentStatus(getTournamentStatus());

    const timer = window.setInterval(() => {
      setTournamentStatus(getTournamentStatus());
    }, 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/70 bg-slate-900/85 backdrop-blur-xl">
      <nav className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="flex min-w-0 items-center justify-center lg:justify-start">
          <Link href="/" className="group flex items-center gap-3" aria-label="返回世界杯小组总览">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-lg shadow-glow">
              ⚽
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.28em] text-cyan-200">World Cup 26</span>
              <span className="block text-xs text-slate-400 group-hover:text-slate-200">48 队战术地图</span>
            </span>
          </Link>
        </div>

        <div className="mx-auto flex max-w-full items-center gap-2 rounded-lg border border-cyan-300/20 bg-slate-950/70 px-3 py-1.5 shadow-glow">
          <span className="hidden text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200 sm:inline">Beijing</span>
          <span className="whitespace-nowrap font-mono text-sm font-black tracking-[0.04em] text-cyan-200 drop-shadow-[0_0_8px_rgba(103,232,249,0.75)]">
            {tournamentStatus.stage}
          </span>
          <span className="text-slate-600">·</span>
          <span className="whitespace-nowrap font-mono text-xs font-black text-slate-200">
            {tournamentStatus.completedMatches}/{tournamentStatus.totalMatches}
          </span>
          <span className="hidden whitespace-nowrap text-xs font-bold text-slate-400 sm:inline">
            今日 {tournamentStatus.todayMatches} 场
          </span>
          {tournamentStatus.nextMatch && (
            <span className="hidden whitespace-nowrap text-xs font-bold text-slate-400 md:inline">
              下一场 {tournamentStatus.nextTimeLabel} {tournamentStatus.nextMatch.home} vs {tournamentStatus.nextMatch.away}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 p-1 lg:justify-self-end">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
                  isActive
                    ? "bg-cyan-300 text-slate-950 shadow-glow"
                    : "text-slate-300 hover:bg-slate-700/70 hover:text-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
