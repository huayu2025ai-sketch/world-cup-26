"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { scheduleMatches, scheduleStages, type ScheduleMatch } from "@/constants/scheduleData";
import { getMatchNews, type MatchNewsItem } from "@/constants/scheduleNews";
import { getDisplayMatchTeamLabel } from "@/lib/knockoutDisplay";

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(`${value}T12:00:00`));
};

const getBeijingDateKey = (match: ScheduleMatch) => {
  const [monthDay] = match.beijingTime.split(" ");
  const [month, day] = monthDay.split("-");
  return `2026-${month}-${day}`;
};

const getBeijingTimestamp = (match: ScheduleMatch) => {
  const [monthDay, time] = match.beijingTime.split(" ");
  return new Date(`2026-${monthDay}T${time}:00+08:00`).getTime();
};

const sortByBeijingTime = (left: ScheduleMatch, right: ScheduleMatch) =>
  getBeijingTimestamp(left) - getBeijingTimestamp(right) || left.id - right.id;

const groupByDate = (matches: ScheduleMatch[]) => {
  const grouped = matches.reduce<Record<string, ScheduleMatch[]>>((acc, match) => {
    const dateKey = getBeijingDateKey(match);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(match);
    return acc;
  }, {});

  Object.values(grouped).forEach((items) => items.sort(sortByBeijingTime));
  return grouped;
};

const getNewsTimestamp = (date: string) => {
  return new Date(`${date}T23:59:59.999+08:00`).getTime();
};

const getRecentMatchNews = (match: ScheduleMatch, now: number, windowMs: number) => {
  const news = getMatchNews(match.id);
  if (!news) {
    return undefined;
  }

  const items = news.items.filter((item) => {
    const itemTime = getNewsTimestamp(item.date);
    return now - itemTime <= windowMs;
  });

  if (items.length === 0) {
    return undefined;
  }

  return { ...news, items };
};

const getNextUpcomingMatch = (matches: ScheduleMatch[], now: number) => {
  return matches.reduce<ScheduleMatch | undefined>((nextMatch, match) => {
    const matchTime = getBeijingTimestamp(match);

    if (matchTime < now) {
      return nextMatch;
    }

    if (!nextMatch || matchTime < getBeijingTimestamp(nextMatch)) {
      return match;
    }

    return nextMatch;
  }, undefined);
};

const typeLabel: Record<MatchNewsItem["type"], string> = {
  injury: "🚑 伤病",
  suspension: "🟥 停赛",
  form: "🔥 状态",
  tactical: "⚔️ 战术",
  weather: "🌦️ 天气",
};

const severityBadge = (severity: MatchNewsItem["severity"]) => {
  switch (severity) {
    case "high":
      return { text: "高影响", className: "bg-rose-300/15 text-rose-200" };
    case "medium":
      return { text: "中影响", className: "bg-amber-300/15 text-amber-200" };
    default:
      return { text: "低影响", className: "bg-slate-700 text-slate-400" };
  }
};

const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;

export default function SchedulePage() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<(typeof scheduleStages)[number]>("32强");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [newsIndexMap, setNewsIndexMap] = useState<Record<number, number>>({});
  const [now, setNow] = useState(() => Date.now());
  const matchRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const hasCenteredInitialMatch = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  const filteredMatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return scheduleMatches.filter((match) => {
      const stageMatched = stage === "全部" || match.stage === stage;
      const text = [
        match.id,
        match.stage,
        match.group ? `${match.group}组 Group ${match.group}` : "",
        match.date,
        getBeijingDateKey(match),
        match.localTime,
        match.beijingTime,
        match.home,
        match.away,
        getDisplayMatchTeamLabel(match, "home"),
        getDisplayMatchTeamLabel(match, "away"),
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

  useEffect(() => {
    if (hasCenteredInitialMatch.current) {
      return;
    }

    const nextMatch = getNextUpcomingMatch(scheduleMatches, Date.now());
    if (!nextMatch) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const target = matchRefs.current[nextMatch.id];
      if (!target) {
        return;
      }

      target.scrollIntoView({ block: "center", inline: "nearest" });
      hasCenteredInitialMatch.current = true;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const goPrevNews = (matchId: number) => {
    const news = getMatchNews(matchId);
    if (!news) return;
    setNewsIndexMap((prev) => {
      const current = prev[matchId] ?? 0;
      return { ...prev, [matchId]: current <= 0 ? news.items.length - 1 : current - 1 };
    });
  };

  const goNextNews = (matchId: number) => {
    const news = getMatchNews(matchId);
    if (!news) return;
    setNewsIndexMap((prev) => {
      const current = prev[matchId] ?? 0;
      return { ...prev, [matchId]: current >= news.items.length - 1 ? 0 : current + 1 };
    });
  };

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
                  placeholder="输入 英格兰、E组、Dallas、MetLife 或 2026-06-12"
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
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">北京时间</p>
              </div>
              <span className="rounded-full border border-slate-600 bg-slate-900/70 px-2.5 py-0.5 text-[11px] font-black text-cyan-100">
                {groupedMatches[date].length} 场
              </span>
            </div>

            <div className="grid gap-1.5 p-2">
              {groupedMatches[date].map((match) => {
                const matchHasStarted = match.homeScore !== undefined || match.awayScore !== undefined;
                const news = matchHasStarted ? undefined : getRecentMatchNews(match, now, NEWS_WINDOW_MS);
                const matchHasNews = Boolean(news);
                const highSeverityCount = news ? news.items.filter((item) => item.severity === "high").length : 0;
                const newsIndex = newsIndexMap[match.id] ?? 0;
                const currentItem = news?.items[newsIndex];
                const homeLabel = getDisplayMatchTeamLabel(match, "home");
                const awayLabel = getDisplayMatchTeamLabel(match, "away");

                return (
                <div
                  key={match.id}
                  ref={(node) => {
                    matchRefs.current[match.id] = node;
                  }}
                  className={`grid gap-1.5 rounded-md border p-2 shadow-sm shadow-slate-950/20 md:grid-cols-[66px_1fr_118px] md:items-start md:gap-2.5 ${
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

                  <div className="min-w-0">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <p className="truncate text-right text-sm font-black text-slate-50">{homeLabel}</p>
                      {match.homeScore !== undefined && match.awayScore !== undefined ? (
                        <span className="rounded-full border border-cyan-300/40 bg-cyan-300/15 px-2 py-0.5 text-[10px] font-black text-cyan-200">
                          {match.homeScore} - {match.awayScore}
                        </span>
                      ) : (
                        <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-black text-cyan-100">
                          VS
                        </span>
                      )}
                      <p className="truncate text-sm font-black text-slate-50">{awayLabel}</p>
                    </div>
                    <p className="mt-1 truncate text-center text-[11px] font-medium text-slate-300">
                      {match.venue} · {match.city}
                    </p>

                    {match.homeScore !== undefined && match.awayScore !== undefined ? (
                      <div className="mt-2 rounded-md border border-cyan-300/20 bg-cyan-300/[0.04] p-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-200">进球记录</p>
                        {match.goalScorers && match.goalScorers.length > 0 ? (
                          <div className="mt-1.5 grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                              {match.goalScorers
                                .filter((s) => s.team === match.home || s.team === homeLabel)
                                .map((scorer, idx) => (
                                  <div key={idx} className="flex items-center justify-end gap-2 text-xs">
                                    <span className="inline-block w-10 shrink-0 rounded bg-slate-800 px-1.5 py-0.5 text-center text-[10px] font-bold text-cyan-100">
                                      {scorer.minute}
                                    </span>
                                    {scorer.type === "penalty" && (
                                      <span className="shrink-0 text-[10px] text-amber-300">点</span>
                                    )}
                                    {scorer.type === "ownGoal" && (
                                      <span className="shrink-0 text-[10px] text-rose-300">乌</span>
                                    )}
                                    <span className="truncate font-bold text-slate-100">{scorer.player}</span>
                                  </div>
                                ))}
                            </div>
                            <div className="space-y-1">
                              {match.goalScorers
                                .filter((s) => s.team === match.away || s.team === awayLabel)
                                .map((scorer, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs">
                                    <span className="truncate font-bold text-slate-100">{scorer.player}</span>
                                    <span className="inline-block w-10 shrink-0 rounded bg-slate-800 px-1.5 py-0.5 text-center text-[10px] font-bold text-cyan-100">
                                      {scorer.minute}
                                    </span>
                                    {scorer.type === "penalty" && (
                                      <span className="shrink-0 text-[10px] text-amber-300">点</span>
                                    )}
                                    {scorer.type === "ownGoal" && (
                                      <span className="shrink-0 text-[10px] text-rose-300">乌</span>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <p className="mt-1 text-[11px] text-slate-400">暂无进球记录</p>
                        )}
                      </div>
                    ) : currentItem && (
                      <div className="mt-2 rounded-md border border-slate-700/80 bg-slate-950/50 p-2">
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`rounded px-1.5 py-0.5 text-[10px] font-black ${severityBadge(currentItem.severity).className}`}>
                              {severityBadge(currentItem.severity).text}
                            </span>
                            <span className="rounded bg-cyan-300/10 px-1.5 py-0.5 text-[10px] font-black text-cyan-100">
                              48h 赛前情报
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">{typeLabel[currentItem.type]}</span>
                            <span className="text-[10px] font-bold text-cyan-200">{currentItem.affectedTeam}</span>
                          </div>
                          <span className="shrink-0 text-[10px] text-slate-500">
                            {currentItem.date} · {currentItem.channel}
                          </span>
                        </div>
                        <p className="mt-1.5 truncate text-xs font-bold text-slate-200" title={currentItem.title}>
                          {currentItem.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-400">
                          {currentItem.summary}
                        </p>
                        {news && news.items.length > 1 && (
                          <div className="mt-2 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => goPrevNews(match.id)}
                              className="grid h-6 w-6 place-items-center rounded-full border border-slate-700 bg-slate-800 text-xs text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100"
                              aria-label="上一条情报"
                            >
                              ‹
                            </button>
                            <span className="text-[10px] font-bold text-slate-500">
                              {newsIndex + 1} / {news.items.length}
                            </span>
                            <button
                              type="button"
                              onClick={() => goNextNews(match.id)}
                              className="grid h-6 w-6 place-items-center rounded-full border border-slate-700 bg-slate-800 text-xs text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100"
                              aria-label="下一条情报"
                            >
                              ›
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">北京时间</p>
                    <p className="text-xs font-black text-cyan-50">{match.beijingTime}</p>
                  </div>
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
    </main>
  );
}
