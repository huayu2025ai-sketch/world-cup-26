"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "分组" },
  { href: "/schedule", label: "赛程" },
  { href: "/predictions", label: "预测" },
  { href: "/export", label: "素材" },
  { href: "/stats", label: "数据" }
];

const worldCupKickoff = new Date("2026-06-12T03:00:00+08:00").getTime();

const getCountdown = () => {
  const remaining = Math.max(0, worldCupKickoff - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
};

const initialCountdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

export default function Navbar() {
  const pathname = usePathname();
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    setCountdown(getCountdown());

    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

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

        <div className="mx-auto flex items-center gap-1 rounded-lg border border-cyan-300/20 bg-slate-950/70 px-2 py-1 shadow-glow">
          <span className="hidden text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200 sm:inline">Kickoff</span>
          <span className="font-mono text-sm font-black tracking-[0.08em] text-cyan-200 drop-shadow-[0_0_8px_rgba(103,232,249,0.75)]">
            {String(countdown.days).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-bold text-slate-500">天</span>
          <span className="font-mono text-sm font-black tracking-[0.08em] text-cyan-200">
            {String(countdown.hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-bold text-slate-500">:</span>
          <span className="font-mono text-sm font-black tracking-[0.08em] text-cyan-200">
            {String(countdown.minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-bold text-slate-500">:</span>
          <span className="font-mono text-sm font-black tracking-[0.08em] text-cyan-200">
            {String(countdown.seconds).padStart(2, "0")}
          </span>
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
