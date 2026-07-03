"use client";

import { useMemo, useState } from "react";
import {
  championFavorites,
  championFavoritesUpdatedAt,
  matchOddsById,
  oddsDataUpdatedAt,
  recommendedBookmakers,
  type BookmakerKey,
  type MatchBookmakerOdds
} from "@/constants/oddsData";
import { scheduleMatches, scheduleStages, type ScheduleMatch } from "@/constants/scheduleData";
import { formatPercent, getMatchPrediction, maxMarketSourceCount, type MatchPrediction, type OutcomeKey } from "@/lib/oddsPrediction";

type PredictionRow = {
  match: ScheduleMatch;
  odds: MatchBookmakerOdds[];
  prediction: MatchPrediction | null;
};

const bookmakerByKey = recommendedBookmakers.reduce<Record<BookmakerKey, (typeof recommendedBookmakers)[number]>>(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<BookmakerKey, (typeof recommendedBookmakers)[number]>
);

const outcomeLabel = (outcome: OutcomeKey, match: ScheduleMatch) => {
  if (outcome === "home") {
    return `${match.home}胜`;
  }

  if (outcome === "away") {
    return `${match.away}胜`;
  }

  return "平局";
};

const outcomeShortLabel: Record<OutcomeKey, string> = {
  home: "左侧胜",
  draw: "平",
  away: "右侧胜"
};

const getActualOutcome = (match: ScheduleMatch): OutcomeKey | null => {
  if (match.homeScore === undefined || match.awayScore === undefined) {
    return null;
  }

  if (match.homeScore > match.awayScore) {
    return "home";
  }

  if (match.homeScore < match.awayScore) {
    return "away";
  }

  return "draw";
};

const confidenceClass: Record<"高" | "中" | "低", string> = {
  高: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
  中: "border-amber-300/30 bg-amber-300/12 text-amber-100",
  低: "border-rose-300/30 bg-rose-300/12 text-rose-100"
};

const formatSignedIndex = (value: number) => (value > 0 ? `+${value}` : `${value}`);

const formatMonthDay = (date: string) => date.replace(/^\d{4}-/, "");

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(`${value}T12:00:00`));

const getBeijingTimestamp = (match: ScheduleMatch) => {
  const [monthDay, time] = match.beijingTime.split(" ");
  return new Date(`2026-${monthDay}T${time}:00+08:00`).getTime();
};

const sortByBeijingTime = (left: PredictionRow, right: PredictionRow) =>
  getBeijingTimestamp(left.match) - getBeijingTimestamp(right.match) || left.match.id - right.match.id;

const groupRowsByDate = (rows: PredictionRow[]) => {
  const grouped = rows.reduce<Record<string, PredictionRow[]>>((acc, row) => {
    if (!acc[row.match.date]) {
      acc[row.match.date] = [];
    }

    acc[row.match.date].push(row);
    return acc;
  }, {});

  Object.values(grouped).forEach((items) => items.sort(sortByBeijingTime));
  return grouped;
};

const getPredictedAdvancer = (match: ScheduleMatch, prediction: MatchPrediction | null) => {
  if (!prediction) {
    return null;
  }

  if (prediction.predictedOutcome === "home") {
    return match.home;
  }

  if (prediction.predictedOutcome === "away") {
    return match.away;
  }

  return null;
};

const getPredictionJudgement = (match: ScheduleMatch, prediction: MatchPrediction | null) => {
  if (!prediction) {
    return "pending" as const;
  }

  const actualOutcome = getActualOutcome(match);
  if (actualOutcome === null) {
    return "pending" as const;
  }

  return prediction.predictedOutcome === actualOutcome ? "correct" : "wrong";
};

export default function PredictionsPage() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<(typeof scheduleStages)[number]>("32强");
  const [coverage, setCoverage] = useState<"有数据" | "全部">("有数据");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [championIndex, setChampionIndex] = useState(0);
  const [championDragStart, setChampionDragStart] = useState<number | null>(null);
  const [collapsedIds, setCollapsedIds] = useState<Set<number>>(new Set());

  const predictionRows = useMemo<PredictionRow[]>(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return scheduleMatches
      .map((match) => {
        const odds = matchOddsById[match.id] ?? [];
        const prediction = getMatchPrediction(odds);

        return { match, odds, prediction };
      })
      .filter(({ match, prediction }) => {
        const stageMatched = stage === "全部" || match.stage === stage;
        const text = [
          match.id,
          match.stage,
          match.group ? `${match.group}组 Group ${match.group}` : "",
          match.date,
          match.home,
          match.away,
          match.venue,
          match.city,
          prediction ? outcomeLabel(prediction.predictedOutcome, match) : "",
          prediction ? getPredictedAdvancer(match, prediction) ?? "" : ""
        ]
          .join(" ")
          .toLowerCase();

        const coverageMatched = coverage === "全部" || Boolean(prediction);

        return stageMatched && coverageMatched && (!normalizedQuery || text.includes(normalizedQuery));
      });
  }, [coverage, query, stage]);

  const groupedMatches = useMemo(() => groupRowsByDate(predictionRows), [predictionRows]);
  const dateKeys = Object.keys(groupedMatches).sort();

  const predictionCount = Object.keys(matchOddsById).length;
  const knockout32PredictionCount = scheduleMatches.filter(
    (match) => match.stage === "32强" && Boolean(matchOddsById[match.id]?.length)
  ).length;
  const knockout32PredictedAdvancers = scheduleMatches.filter((match) => {
    if (match.stage !== "32强") {
      return false;
    }

    const prediction = getMatchPrediction(matchOddsById[match.id] ?? []);
    return Boolean(prediction && getPredictedAdvancer(match, prediction));
  }).length;

  const accuracyStats = useMemo(() => {
    let judged = 0;
    let correct = 0;

    for (const match of scheduleMatches) {
      const odds = matchOddsById[match.id] ?? [];
      const prediction = getMatchPrediction(odds);
      if (!prediction) continue;

      const actualOutcome = getActualOutcome(match);
      if (actualOutcome === null) continue;

      judged++;
      if (prediction.predictedOutcome === actualOutcome) {
        correct++;
      }
    }

    return { judged, correct };
  }, []);

  const currentChampion = championFavorites[championIndex];

  const resultMatchIds = useMemo(
    () => predictionRows.filter(({ match }) => getActualOutcome(match) !== null).map(({ match }) => match.id),
    [predictionRows]
  );
  const firstPendingMatchId = useMemo(
    () => predictionRows.find(({ match }) => getActualOutcome(match) === null)?.match.id,
    [predictionRows]
  );

  const isAllResultsCollapsed =
    resultMatchIds.length > 0 && resultMatchIds.every((id) => collapsedIds.has(id));

  const toggleCollapse = (id: number) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const collapseAllResults = () => setCollapsedIds(new Set(resultMatchIds));
  const expandAllResults = () => setCollapsedIds(new Set());

  const goToChampion = (direction: -1 | 1) => {
    setChampionIndex((current) => (current + direction + championFavorites.length) % championFavorites.length);
  };

  const finishChampionDrag = (clientX: number) => {
    if (championDragStart === null) {
      return;
    }

    const distance = clientX - championDragStart;
    setChampionDragStart(null);

    if (Math.abs(distance) < 40) {
      return;
    }

    goToChampion(distance > 0 ? -1 : 1);
  };

  return (
    <main className="mx-auto max-w-7xl px-3 pb-10 pt-5 sm:px-5 lg:px-6">
      <section className="grid gap-4 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.36em] text-cyan-200">Probability Model</p>
          <h1 className="mt-2 text-2xl font-black leading-tight text-slate-100 sm:text-3xl lg:text-4xl">
            淘汰赛晋级预测
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            按阶段筛选比赛，默认打开 32 强晋级视图。32 强卡片会直接显示“谁进 16 强”，其余阶段继续保留胜平负预测与结果回溯。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xl font-black text-cyan-200">{predictionCount}</p>
            <p className="mt-1 text-xs text-slate-400">已录数据</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xl font-black text-cyan-200">{maxMarketSourceCount}</p>
            <p className="mt-1 text-xs text-slate-400">最多来源</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xl font-black text-cyan-200">{knockout32PredictedAdvancers}/16</p>
            <p className="mt-1 text-xs text-slate-400">32 强进 16 强</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xs font-black text-cyan-200">
              单场 {formatMonthDay(oddsDataUpdatedAt)}
              <br />
              冠军 {formatMonthDay(championFavoritesUpdatedAt)}
            </p>
            <p className="mt-1 text-xs text-slate-400">数据日期</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 backdrop-blur-md">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label htmlFor="prediction-search" className="text-xs font-bold text-slate-200">
              搜索预测
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 focus-within:border-cyan-300/70">
              <span className="text-slate-500" aria-hidden="true">
                ⌕
              </span>
              <input
                id="prediction-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="输入 英格兰、32强、Dallas 或 2026-07-03"
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["有数据", "全部"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCoverage(item)}
                className={`rounded-full border px-3 py-2 text-xs font-black transition ${
                  coverage === item
                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                    : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-cyan-300/60 hover:text-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
            {resultMatchIds.length > 0 && (
              <button
                type="button"
                onClick={isAllResultsCollapsed ? expandAllResults : collapseAllResults}
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-slate-100"
              >
                {isAllResultsCollapsed ? "展开已赛结果" : "收起已赛结果"}
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsFilterOpen((current) => !current)}
              aria-expanded={isFilterOpen}
              aria-controls="prediction-filters"
              className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-slate-100"
            >
              {isFilterOpen ? "收起筛选" : "展开筛选"}
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div id="prediction-filters" className="mt-3 grid gap-2.5">
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

            <p className="text-[11px] text-slate-400">
              {predictionRows.length} 场匹配
              {stage !== "全部" ? ` · ${stage}` : ""}
              {stage === "32强"
                ? ` · 赔率 ${knockout32PredictionCount}/16 · 已补全 ${knockout32PredictedAdvancers}/16 场晋级预测`
                : ""}
              {query ? ` · ${query}` : ""}
            </p>
          </div>
        )}
      </section>

      <section className="mt-4 space-y-3">
        {dateKeys.map((date) => (
          <article
            key={date}
            className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 px-3 py-2">
              <div>
                <h2 className="text-base font-black text-amber-200 sm:text-[17px]">{formatDate(date)}</h2>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">北京时间</p>
              </div>
              <span className="rounded-full border border-slate-600 bg-slate-900/70 px-2.5 py-0.5 text-[11px] font-black text-cyan-100">
                {groupedMatches[date].length} 场
              </span>
            </div>

            <div className="grid gap-2 p-2">
              {groupedMatches[date].map(({ match, odds, prediction }) => {
                const actualOutcome = getActualOutcome(match);
                const predictionResult =
                  prediction && actualOutcome
                    ? prediction.predictedOutcome === actualOutcome
                      ? "correct"
                      : "wrong"
                    : null;
                const isCollapsed = collapsedIds.has(match.id);
                const predictedAdvancer = getPredictedAdvancer(match, prediction);

                return (
                  <article
                    key={match.id}
                    id={match.id === firstPendingMatchId ? "pending-prediction" : undefined}
                    className="scroll-mt-28 rounded-md border border-slate-700 bg-slate-900/45 p-3 backdrop-blur-md"
                  >
                    {isCollapsed ? (
                      <div className="flex items-center gap-3">
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-slate-950/70 px-2 py-0.5 text-[10px] font-black text-slate-400">
                              M{match.id}
                            </span>
                            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-2 py-0.5 text-[10px] font-bold text-cyan-100">
                              {match.stage}
                              {match.group ? ` · ${match.group}组` : ""}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">{formatMonthDay(match.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="truncate text-sm font-black text-slate-100">{match.home}</span>
                            <span className="rounded-full border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-[10px] font-black text-slate-400">
                              VS
                            </span>
                            <span className="truncate text-sm font-black text-slate-100">{match.away}</span>
                            {actualOutcome !== null && (
                              <span className="ml-1 whitespace-nowrap font-mono text-xs font-black text-slate-200">
                                {match.homeScore}-{match.awayScore}
                              </span>
                            )}
                          </div>
                        </div>
                        {predictionResult && (
                          <span
                            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-black shadow-lg ${
                              predictionResult === "correct"
                                ? "border-emerald-300 bg-emerald-500 text-white shadow-emerald-500/35"
                                : "border-rose-300 bg-rose-500 text-white shadow-rose-500/35"
                            }`}
                          >
                            {predictionResult === "correct" ? "正确" : "错误"}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleCollapse(match.id)}
                          className="shrink-0 rounded-full border border-slate-700 bg-slate-900/60 px-2 py-1 text-[10px] font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-slate-100"
                        >
                          展开
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-slate-950/70 px-2.5 py-1 text-[11px] font-black text-slate-400">
                                M{match.id}
                              </span>
                              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] font-bold text-cyan-100">
                                {match.stage}
                                {match.group ? ` · ${match.group}组` : ""}
                              </span>
                              <span className="text-[11px] font-bold text-slate-500">{formatMonthDay(match.date)}</span>
                              {prediction && (
                                <span className="rounded-full border border-slate-700 bg-slate-950/60 px-2.5 py-1 text-[11px] font-bold text-slate-400">
                                  {prediction.sourceCount}/{prediction.maxSourceCount} 来源
                                </span>
                              )}
                              {actualOutcome !== null && (
                                <button
                                  type="button"
                                  onClick={() => toggleCollapse(match.id)}
                                  className="ml-auto rounded-full border border-slate-700 bg-slate-900/60 px-2 py-1 text-[10px] font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-slate-100"
                                >
                                  {isCollapsed ? "展开" : "收起"}
                                </button>
                              )}
                            </div>

                            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                              <p className="truncate text-right text-base font-black text-slate-100">{match.home}</p>
                              <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] font-black text-slate-400">
                                VS
                              </span>
                              <p className="truncate text-base font-black text-slate-100">{match.away}</p>
                            </div>
                            <p className="mt-1.5 truncate text-center text-[11px] text-slate-400">
                              {match.venue} · {match.city}
                            </p>
                          </div>

                          {prediction ? (
                            <div
                              className={`rounded-lg border p-3 ${
                                match.stage === "32强"
                                  ? "border-cyan-300/20 bg-cyan-300/10"
                                  : "border-cyan-300/20 bg-cyan-300/10"
                              }`}
                            >
                              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200">
                                {match.stage === "32强" ? "晋级预测" : "Prediction"}
                              </p>
                              <div className="mt-1 flex flex-wrap items-center gap-3">
                                <p className="text-lg font-black text-cyan-50">
                                  {match.stage === "32强"
                                    ? predictedAdvancer
                                      ? `${predictedAdvancer} 进 16 强`
                                      : "加时/点球待定"
                                    : outcomeLabel(prediction.predictedOutcome, match)}
                                </p>
                                {predictionResult && (
                                  <span
                                    className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black shadow-lg ${
                                      predictionResult === "correct"
                                        ? "border-emerald-300 bg-emerald-500 text-white shadow-emerald-500/35"
                                        : "border-rose-300 bg-rose-500 text-white shadow-rose-500/35"
                                    }`}
                                    title={predictionResult === "correct" ? "预测正确" : "预测错误"}
                                  >
                                    {predictionResult === "correct" ? "正确" : "错误"}
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-slate-950/55 px-2 py-1 text-xs font-black text-cyan-100">
                                  {formatPercent(prediction.predictedProbability)}
                                </span>
                                <span className={`rounded-full border px-2 py-1 text-xs font-black ${confidenceClass[prediction.confidence]}`}>
                                  {prediction.confidence}置信度
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-3">
                              <p className="text-sm font-black text-slate-300">待录入数据</p>
                              <p className="mt-1 text-xs leading-5 text-slate-500">录入至少 1 组 1/X/2 指数后自动生成预测。</p>
                            </div>
                          )}
                        </div>

                        {prediction && (
                          <>
                            <div className="mt-3 grid gap-2 sm:grid-cols-3">
                              {(["home", "draw", "away"] as OutcomeKey[]).map((key) => (
                                <div
                                  key={key}
                                  className={`rounded-md border p-2 ${
                                    prediction.predictedOutcome === key
                                      ? "border-cyan-300/40 bg-cyan-300/10"
                                      : "border-slate-700 bg-slate-950/40"
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs font-black text-slate-200">{outcomeShortLabel[key]}</p>
                                    <p className="font-mono text-sm font-black text-slate-100">
                                      {formatPercent(prediction.average[key])}
                                    </p>
                                  </div>
                                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                                    <div
                                      className="h-full rounded-full bg-cyan-300"
                                      style={{ width: `${Math.max(4, prediction.average[key] * 100)}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            <details className="group mt-3 rounded-lg border border-slate-700 bg-slate-950/35">
                              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-xs font-black text-slate-200 transition hover:bg-slate-900/60 [&::-webkit-details-marker]:hidden">
                                <span>数据源 / 指数 / 偏差（{prediction.sourceCount}/{prediction.maxSourceCount}）</span>
                                <span className="text-[11px] text-cyan-200 group-open:hidden">点击展开</span>
                                <span className="hidden text-[11px] text-cyan-200 group-open:inline">点击收起</span>
                              </summary>

                              <div className="grid gap-1.5 border-t border-slate-700 p-2 sm:hidden">
                                {prediction.bookmakerProbabilities.map((item) => (
                                  <div key={item.bookmaker} className="rounded-md border border-slate-700 bg-slate-900/55 p-2">
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <p className="text-xs font-black text-slate-100">{bookmakerByKey[item.bookmaker].name}</p>
                                        <p className="mt-0.5 text-[10px] text-slate-500">{bookmakerByKey[item.bookmaker].marketRole}</p>
                                      </div>
                                      <span className="rounded-full border border-slate-700 bg-slate-950/70 px-2 py-0.5 text-[10px] font-black text-slate-400">
                                        偏差 {formatPercent(item.overround)}
                                      </span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                                      <div className="rounded-md border border-slate-700 bg-slate-950/55 px-2 py-1">
                                        <p className="text-[10px] font-black text-slate-500">指数 1/X/2</p>
                                        <p className="mt-0.5 whitespace-nowrap font-mono text-[11px] font-black text-slate-100">
                                          {item.odds.home.toFixed(2)} / {item.odds.draw.toFixed(2)} / {item.odds.away.toFixed(2)}
                                        </p>
                                      </div>
                                      <div className="rounded-md border border-slate-700 bg-slate-950/55 px-2 py-1">
                                        <p className="text-[10px] font-black text-slate-500">校正概率</p>
                                        <p className="mt-0.5 whitespace-nowrap font-mono text-[11px] font-black text-cyan-100">
                                          {formatPercent(item.noVig.home)} / {formatPercent(item.noVig.draw)} /{" "}
                                          {formatPercent(item.noVig.away)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="hidden overflow-x-auto border-t border-slate-700 sm:block">
                                <table className="min-w-full divide-y divide-slate-700 text-left text-xs">
                                  <thead className="bg-slate-950/60 text-slate-400">
                                    <tr>
                                      <th className="whitespace-nowrap px-3 py-2 font-black">数据源</th>
                                      <th className="whitespace-nowrap px-3 py-2 font-black">指数 1/X/2</th>
                                      <th className="whitespace-nowrap px-3 py-2 font-black">校正概率 1/X/2</th>
                                      <th className="whitespace-nowrap px-3 py-2 font-black">市场偏差</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                                    {prediction.bookmakerProbabilities.map((item) => (
                                      <tr key={item.bookmaker}>
                                        <td className="whitespace-nowrap px-3 py-2">
                                          <p className="font-black text-slate-100">{bookmakerByKey[item.bookmaker].name}</p>
                                          <p className="mt-0.5 text-[11px] text-slate-500">
                                            {bookmakerByKey[item.bookmaker].marketRole}
                                          </p>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 font-mono text-slate-200">
                                          {item.odds.home.toFixed(2)} / {item.odds.draw.toFixed(2)} / {item.odds.away.toFixed(2)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 font-mono text-slate-200">
                                          {formatPercent(item.noVig.home)} / {formatPercent(item.noVig.draw)} /{" "}
                                          {formatPercent(item.noVig.away)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 font-mono text-slate-400">
                                          {formatPercent(item.overround)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </details>
                          </>
                        )}
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      {stage === "32强" && predictionRows.length > 0 && (
        <section className="mt-4 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] p-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">32 强晋级 16 强</p>
              <h2 className="mt-1 text-lg font-black text-slate-50">32 强晋级摘要</h2>
            </div>
            <p className="text-sm text-slate-300">按当前赔率模型，下面 16 场已经可以直接给出晋级方向。</p>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {scheduleMatches
              .filter((match) => match.stage === "32强")
              .map((match) => {
                const prediction = getMatchPrediction(matchOddsById[match.id] ?? []);
                const advancer = getPredictedAdvancer(match, prediction);
                const actualOutcome = getActualOutcome(match);
                const judgement = getPredictionJudgement(match, prediction);

                return (
                  <div key={match.id} className="rounded-lg border border-slate-700 bg-slate-950/45 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">M{match.id}</p>
                        <p className="mt-1 text-sm font-black text-slate-100">
                          {match.home} vs {match.away}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatMonthDay(match.date)} · {match.venue}
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-black ${
                          judgement === "correct"
                            ? "border-emerald-300/30 bg-emerald-300/12 text-emerald-100"
                            : judgement === "wrong"
                              ? "border-rose-300/30 bg-rose-300/12 text-rose-100"
                              : "border-slate-700 bg-slate-900/60 text-slate-400"
                        }`}
                        title={
                          judgement === "correct"
                            ? "预测正确"
                            : judgement === "wrong"
                              ? "预测错误"
                              : "比赛未结束"
                        }
                      >
                        {judgement === "correct" ? "正确" : judgement === "wrong" ? "错误" : "未赛"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-black text-cyan-100">
                      {advancer ? `${advancer} 进 16 强` : actualOutcome === null ? "待开赛" : "加时/点球待定"}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      )}

      <section className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-300">Champion Watch</p>
            <p className="mt-1 text-sm text-slate-400">冠军赔率榜用于辅助判断谁更可能走到最后。</p>
          </div>
          <div className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-[11px] font-black text-slate-300">
            预测战绩 {accuracyStats.judged > 0 ? `${accuracyStats.correct}/${accuracyStats.judged}` : "--"}
            {accuracyStats.judged > 0 && <span className="ml-2 text-cyan-200">{((accuracyStats.correct / accuracyStats.judged) * 100).toFixed(0)}%</span>}
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div
            className="rounded-xl border border-slate-700 bg-slate-950/65 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.35)]"
            onMouseUp={(event) => finishChampionDrag(event.clientX)}
            onTouchEnd={(event) => finishChampionDrag(event.changedTouches[0]?.clientX ?? 0)}
          >
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200">主推冠军</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-3xl">
                {currentChampion.flag}
              </div>
              <div className="min-w-0">
                <p className="text-xl font-black text-slate-50">{currentChampion.team}</p>
                <p className="text-xs text-slate-400">{currentChampion.englishName}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => goToChampion(-1)}
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-slate-100"
              >
                上一个
              </button>
              <span className="font-mono text-slate-500">#{currentChampion.rank}</span>
              <button
                type="button"
                onClick={() => goToChampion(1)}
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-slate-100"
              >
                下一个
              </button>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-300 to-orange-300"
                style={{ width: `${Math.max(12, Math.min(100, currentChampion.modelProbability * 100))}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">市场共识</p>
                <p className="mt-1 font-black text-slate-100">{formatPercent(currentChampion.marketImpliedProbability)}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">模型概率</p>
                <p className="mt-1 font-black text-cyan-100">{formatPercent(currentChampion.modelProbability)}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">{currentChampion.sourceNote}</p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {championFavorites.map((item, index) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setChampionIndex(index)}
                className={`rounded-xl border p-3 text-left transition ${
                  championIndex === index
                    ? "border-cyan-300/40 bg-cyan-300/12 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                    : "border-slate-700 bg-slate-950/45 hover:border-cyan-300/20 hover:bg-slate-950/70"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700 bg-slate-900/80 text-lg">
                      {item.flag}
                    </span>
                    <div>
                      <p className="text-sm font-black text-slate-100">
                        {item.rank}. {item.team}
                      </p>
                      <p className="text-[11px] text-slate-500">{item.englishName}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-cyan-100">{formatPercent(item.modelProbability)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{formatSignedIndex(item.consensusAmericanOdds)}</span>
                  <span>美赔</span>
                  <span>{item.consensusDecimalOdds.toFixed(1)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-cyan-300"
                    style={{ width: `${Math.max(5, item.modelProbability * 100)}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {predictionRows.length === 0 && (
        <div className="mt-10 rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center backdrop-blur-md">
          <p className="text-lg font-black text-slate-100">没有匹配的比赛</p>
          <p className="mt-2 text-sm text-slate-400">试试球队、阶段、日期、城市或球场名称。</p>
        </div>
      )}
    </main>
  );
}
