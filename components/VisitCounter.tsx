"use client";

import { useEffect, useState } from "react";

type VisitStats = {
  total: number;
  today: number;
};

declare global {
  interface Window {
    __fifa26VisitTracked?: boolean;
  }
}

const fallbackStats: VisitStats = {
  total: 2026,
  today: 30
};

const numberFormatter = new Intl.NumberFormat("zh-CN");

export default function VisitCounter() {
  const [stats, setStats] = useState<VisitStats>(fallbackStats);

  useEffect(() => {
    if (window.__fifa26VisitTracked) {
      return;
    }

    window.__fifa26VisitTracked = true;

    fetch("/api/visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Visit stats request failed.");
        }

        return response.json() as Promise<VisitStats>;
      })
      .then(setStats)
      .catch(() => {
        window.__fifa26VisitTracked = false;
        setStats(fallbackStats);
      });
  }, []);

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs shadow-lg shadow-slate-950/20 backdrop-blur-md"
      aria-label="访问统计"
    >
      <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.85)]" aria-hidden="true" />
      <span className="font-bold text-slate-400">总访问</span>
      <strong className="font-mono font-black text-slate-100">{numberFormatter.format(stats.total)}</strong>
      <span className="mx-1 h-4 w-px bg-slate-700" aria-hidden="true" />
      <span className="font-bold text-slate-400">今日</span>
      <strong className="font-mono font-black text-cyan-100">{numberFormatter.format(stats.today)}</strong>
    </span>
  );
}
