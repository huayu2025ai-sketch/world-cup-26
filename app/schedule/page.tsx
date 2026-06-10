"use client";

import { useMemo, useState } from "react";
import { scheduleMatches, scheduleStages, type ScheduleMatch } from "@/constants/scheduleData";
import { hasMatchNews, getMatchNews, getHighSeverityCount, type MatchNewsItem } from "@/constants/scheduleNews";

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(`${value}T12:00:00`));
};

const groupByDate = (matches: ScheduleMatch[]) => {
  return matches.reduce<Record<string, ScheduleMatch[]>>((acc, match) => {
    if (!acc[match.date]) {
      acc[match.date] = [];
    }
    acc[match.date].push(match);
    return acc;
  }, {});
};

export default function SchedulePage() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<(typeof scheduleStages)[number]>("全部");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [newsMatchId, setNewsMatchId] = useState<number | null>(null);

  const selectedNews = newsMatchId ? getMatchNews(newsMatchId) : undefined;

  const filteredMatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return scheduleMatches.filter((match) => {
      const stageMatched = stage === "全部" || match.stage === stage;
      const text = [
        match.id,
        match.stage,
        match.group ? `${match.group}组 Group ${match.group}` : "",
        match.date,
        match.etTime,
        match.beijingTime,
        match.home,
        match.away,
        match.venue,
        match.city
      ]
        .join(" ")
        .toLowerCase();

      return stageMatched && (!normalizedQuery || text.includes(normalizedQuery));
    });
  }, [query, stage]);

  const groupedMatches = useMemo(() => groupByDate(filteredMatches), [filteredMatches]);
  const dateKeys = Object.keys(groupedMatches).sort();
  const groupStageCount = scheduleMatches.filter((match) => match.stage === "分组赛").length;
  const knockoutCount = scheduleMatches.length - groupStageCount;

  return (
    <main className="mx-auto max-w-7xl px-3 pb-8 pt-4 sm:px-5 lg:px-6">
      <section className="grid gap-3 py-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.36em] text-cyan-200">Match Calendar</p>
          <h1 className="mt-1.5 max-w-none text-2xl font-black leading-tight text-slate-100 sm:text-3xl lg:text-4xl xl:whitespace-nowrap">
            2026 世界杯比赛时间表
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-300">
            基于当前硬编码小组生成的本地赛程视图，支持按阶段、球队、组别、城市和球场快速筛选。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 text-center backdrop-blur-md">
            <p className="text-lg font-black text-cyan-200">{scheduleMatches.length}</p>
            <p className="mt-0.5 text-xs text-slate-400">总场次</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 text-center backdrop-blur-md">
            <p className="text-lg font-black text-cyan-200">{groupStageCount}</p>
            <p className="mt-0.5 text-xs text-slate-400">分组赛</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 text-center backdrop-blur-md">
            <p className="text-lg font-black text-cyan-200">{knockoutCount}</p>
            <p className="mt-0.5 text-xs text-slate-400">淘汰赛</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-black text-slate-100">搜索比赛条件</p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {filteredMatches.length} 场匹配
              {stage !== "全部" ? ` · ${stage}` : ""}
              {query ? ` · ${query}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterOpen((current) => !current)}
            aria-expanded={isFilterOpen}
            aria-controls="schedule-filters"
            className="rounded-full border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-xs font-black text-cyan-100 transition hover:border-cyan-300/60 hover:text-cyan-50"
          >
            {isFilterOpen ? "收起" : "展开"}
          </button>
        </div>

        {isFilterOpen && (
          <div id="schedule-filters" className="mt-2.5 grid gap-2.5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <label htmlFor="schedule-search" className="sr-only">
                搜索比赛
              </label>
              <div className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 focus-within:border-cyan-300/70">
                <span className="text-slate-500" aria-hidden="true">
                  ⌕
                </span>
                <input
                  id="schedule-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="输入 英格兰、E组、Dallas、MetLife 或 2026-06-11"
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {scheduleStages.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStage(item)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-black transition ${
                    stage === item
                      ? "border-cyan-300 bg-cyan-300 text-slate-950"
                      : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-cyan-300/60 hover:text-slate-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mt-3 space-y-2.5">
        {dateKeys.map((date) => (
          <article key={date} className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 px-3 py-2">
              <div>
                <h2 className="text-base font-black text-amber-200 sm:text-[17px]">{formatDate(date)}</h2>
              </div>
              <span className="rounded-full border border-slate-600 bg-slate-900/70 px-2.5 py-0.5 text-[11px] font-black text-cyan-100">
                {groupedMatches[date].length} 场
              </span>
            </div>

            <div className="grid gap-1.5 p-2">
              {groupedMatches[date].map((match) => {
                const matchHasNews = hasMatchNews(match.id);
                const highSeverityCount = getHighSeverityCount(match.id);
                return (
                <div
                  key={match.id}
                  className={`relative grid gap-1.5 rounded-md border p-2 shadow-sm shadow-slate-950/20 md:grid-cols-[66px_1fr_118px] md:items-center md:gap-2.5 ${
                    highSeverityCount > 0
                      ? "border-rose-300/30 bg-rose-300/[0.04]"
                      : matchHasNews
                        ? "border-cyan-300/20 bg-cyan-300/[0.03]"
                        : "border-slate-700/80 bg-slate-900/55"
                  }`}
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">M{match.id}</p>
                    <p className="text-xs font-black text-cyan-100">{match.stage}</p>
                    {match.group && <p className="text-[10px] font-bold text-slate-300">{match.group}组</p>}
                  </div>

                  <div>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <p className="truncate text-right text-sm font-black text-slate-50">{match.home}</p>
                      <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-black text-cyan-100">
                        VS
                      </span>
                      <p className="truncate text-sm font-black text-slate-50">{match.away}</p>
                    </div>
                    <p className="mt-1 truncate text-center text-[11px] font-medium text-slate-300">
                      {match.venue} · {match.city}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 md:grid-cols-1 md:gap-1">
                    <div className="rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">ET</p>
                      <p className="text-xs font-black text-slate-100">{match.etTime}</p>
                    </div>
                    <div className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">北京时间</p>
                      <p className="text-xs font-black text-cyan-50">{match.beijingTime}</p>
                    </div>
                  </div>

                  {matchHasNews && (
                    <button
                      type="button"
                      onClick={() => setNewsMatchId(match.id)}
                      className={`absolute -right-0.5 -top-0.5 flex items-center gap-1 rounded-bl-lg rounded-tr-md border px-2 py-0.5 text-[10px] font-black transition hover:scale-105 ${
                        highSeverityCount > 0
                          ? "border-rose-300/50 bg-rose-300/15 text-rose-100"
                          : "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                      }`}
                    >
                      {highSeverityCount > 0 && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-300" aria-hidden="true" />
                      )}
                      赛前情报
                      {highSeverityCount > 0 && ` · ${highSeverityCount} 关键`}
                    </button>
                  )}
                </div>
              );
              })}
            </div>
          </article>
        ))}
      </section>

      {filteredMatches.length === 0 && (
        <div className="mt-10 rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center backdrop-blur-md">
          <p className="text-lg font-black text-slate-100">没有匹配的比赛</p>
          <p className="mt-2 text-sm text-slate-400">试试球队、组别、日期、城市或球场名称。</p>
        </div>
      )}

      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/78 px-4 py-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          onClick={() => setNewsMatchId(null)}
        >
          <div
            className="w-full max-w-lg rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-200">
                  赛前情报
                </p>
                <h2 id="news-modal-title" className="mt-2 text-xl font-black text-slate-100">
                  {(() => {
                    const m = scheduleMatches.find((x) => x.id === selectedNews.matchId);
                    return m ? `${m.home} VS ${m.away}` : `比赛 M${selectedNews.matchId}`;
                  })()}
                </h2>
                <time className="mt-1 block text-xs text-slate-500">
                  更新于 {selectedNews.updatedAt}
                </time>
              </div>
              <button
                type="button"
                onClick={() => setNewsMatchId(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-rose-300/60 hover:text-rose-100"
                aria-label="关闭赛前情报弹窗"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {selectedNews.items.map((item: MatchNewsItem, index: number) => (
                <div
                  key={index}
                  className={`rounded-lg border p-3 ${
                    item.severity === "high"
                      ? "border-rose-300/25 bg-rose-300/[0.06]"
                      : item.severity === "medium"
                        ? "border-amber-300/20 bg-amber-300/[0.04]"
                        : "border-slate-700 bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-black ${
                        item.severity === "high"
                          ? "bg-rose-300/15 text-rose-200"
                          : item.severity === "medium"
                            ? "bg-amber-300/15 text-amber-200"
                            : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {item.severity === "high" ? "高影响" : item.severity === "medium" ? "中影响" : "低影响"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {item.type === "injury" && "🚑 伤病"}
                      {item.type === "suspension" && "🟥 停赛"}
                      {item.type === "form" && "🔥 状态"}
                      {item.type === "tactical" && "⚔️ 战术"}
                      {item.type === "weather" && "🌦️ 天气"}
                    </span>
                    <span className="text-[10px] font-bold text-cyan-200">{item.affectedTeam}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-100">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.summary}</p>
                  {item.affectedPlayer && (
                    <p className="mt-2 text-xs text-slate-400">
                      涉及球员：{item.affectedPlayer}
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-slate-500">
                    来源：{item.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
