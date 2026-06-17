"use client";

import { useMemo, useState } from "react";
import {
  championFavorites,
  championFavoritesUpdatedAt,
  matchOddsById,
  oddsDataUpdatedAt,
  recommendedBookmakers,
  type BookmakerKey
} from "@/constants/oddsData";
import { scheduleMatches, type ScheduleMatch } from "@/constants/scheduleData";
import { formatPercent, getMatchPrediction, maxMarketSourceCount, type OutcomeKey } from "@/lib/oddsPrediction";

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

const predictionResultClass: Record<"correct" | "wrong", string> = {
  correct: "border-emerald-300/40 bg-emerald-300/15 text-emerald-100",
  wrong: "border-rose-300/40 bg-rose-300/15 text-rose-100"
};

const formatSignedIndex = (value: number) => (value > 0 ? `+${value}` : `${value}`);

const formatMonthDay = (date: string) => date.replace(/^\d{4}-/, "");

export default function PredictionsPage() {
  const [query, setQuery] = useState("");
  const [coverage, setCoverage] = useState<"有数据" | "全部">("有数据");
  const [championIndex, setChampionIndex] = useState(0);
  const [championDragStart, setChampionDragStart] = useState<number | null>(null);
  const [collapsedIds, setCollapsedIds] = useState<Set<number>>(new Set());

  const predictionRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return scheduleMatches
      .map((match) => {
        const odds = matchOddsById[match.id] ?? [];
        const prediction = getMatchPrediction(odds);

        return { match, odds, prediction };
      })
      .filter(({ match, prediction }) => {
        const text = [
          match.id,
          match.stage,
          match.group ? `${match.group}组 Group ${match.group}` : "",
          match.date,
          match.home,
          match.away,
          match.venue,
          match.city,
          prediction ? outcomeLabel(prediction.predictedOutcome, match) : ""
        ]
          .join(" ")
          .toLowerCase();

        const coverageMatched = coverage === "全部" || Boolean(prediction);

        return coverageMatched && (!normalizedQuery || text.includes(normalizedQuery));
      });
  }, [coverage, query]);

  const predictionCount = Object.keys(matchOddsById).length;

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
            最多 5 组市场数据胜平负预测
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            每场比赛按已采集的 1/X/2 市场数据分别计算隐含概率并校正，再对校正概率取平均；样本数不足时会自动降低置信度。
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
            <p className="text-xl font-black text-cyan-200">
              {accuracyStats.judged > 0 ? `${accuracyStats.correct}/${accuracyStats.judged}` : "--"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              预测战绩
              {accuracyStats.judged > 0 && (
                <span className="ml-1 text-cyan-200">{((accuracyStats.correct / accuracyStats.judged) * 100).toFixed(0)}%</span>
              )}
            </p>
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
                placeholder="输入 巴西、A组、球队胜、Dallas 或 2026-06-11"
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
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-3">
          {predictionRows.map(({ match, odds, prediction }) => {
            const actualOutcome = getActualOutcome(match);
            const predictionResult =
              prediction && actualOutcome ? (prediction.predictedOutcome === actualOutcome ? "correct" : "wrong") : null;
            const isCollapsed = collapsedIds.has(match.id);

            return (
            <article key={match.id} className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 backdrop-blur-md">
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
                  <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
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
                  <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200">Prediction</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <p className="text-lg font-black text-cyan-50">
                        {outcomeLabel(prediction.predictedOutcome, match)}
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
                      <span
                        className={`rounded-full border px-2 py-1 text-xs font-black ${
                          confidenceClass[prediction.confidence]
                        }`}
                      >
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
                              <p className="mt-0.5 text-[10px] text-slate-500">
                                {bookmakerByKey[item.bookmaker].marketRole}
                              </p>
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
              </>)}
            </article>
            );
          })}
        </div>

        <aside className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-md lg:sticky lg:top-24">
          <section className="mb-4 rounded-lg border border-cyan-300/20 bg-slate-950/45 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Title Forecast</p>
                <h2 className="mt-1 text-base font-black text-slate-100">冠军热门 Top 5</h2>
              </div>
              <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-black text-slate-400">
                {championIndex + 1}/5
              </span>
            </div>

            <article
              className="mt-3 touch-pan-y select-none rounded-lg border border-slate-700 bg-slate-900/70 p-3"
              onPointerDown={(event) => setChampionDragStart(event.clientX)}
              onPointerCancel={() => setChampionDragStart(null)}
              onPointerLeave={(event) => finishChampionDrag(event.clientX)}
              onPointerUp={(event) => finishChampionDrag(event.clientX)}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-950 text-3xl">
                  {currentChampion.code === "ENG" ? (
                    <span className="england-flag" role="img" aria-label="England flag" />
                  ) : (
                    currentChampion.flag
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-black text-slate-100">
                    #{currentChampion.rank} {currentChampion.team}
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    {currentChampion.englishName} · {currentChampion.code}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md border border-slate-700 bg-slate-950/55 p-2">
                  <p className="text-slate-500">美式指数</p>
                  <p className="mt-1 font-mono text-base font-black text-cyan-100">
                    {formatSignedIndex(currentChampion.consensusAmericanOdds)}
                  </p>
                </div>
                <div className="rounded-md border border-slate-700 bg-slate-950/55 p-2">
                  <p className="text-slate-500">欧洲指数</p>
                  <p className="mt-1 font-mono text-base font-black text-slate-100">
                    {currentChampion.consensusDecimalOdds.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-md border border-slate-700 bg-slate-950/55 p-2">
                  <p className="text-slate-500">隐含概率</p>
                  <p className="mt-1 font-mono text-base font-black text-slate-100">
                    {formatPercent(currentChampion.marketImpliedProbability)}
                  </p>
                </div>
                <div className="rounded-md border border-slate-700 bg-slate-950/55 p-2">
                  <p className="text-slate-500">模型概率</p>
                  <p className="mt-1 font-mono text-base font-black text-amber-100">
                    {formatPercent(currentChampion.modelProbability)}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-400">{currentChampion.sourceNote}</p>
            </article>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => goToChampion(-1)}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-black text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                aria-label="查看上一个冠军热门"
              >
                ←
              </button>
              <div className="flex gap-1.5" aria-label="冠军热门位置">
                {championFavorites.map((team, index) => (
                  <button
                    key={team.code}
                    type="button"
                    onClick={() => setChampionIndex(index)}
                    className={`h-2 rounded-full transition ${
                      championIndex === index ? "w-6 bg-cyan-300" : "w-2 bg-slate-600 hover:bg-slate-400"
                    }`}
                    aria-label={`查看${team.team}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goToChampion(1)}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-black text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                aria-label="查看下一个冠军热门"
              >
                →
              </button>
            </div>
          </section>

          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">Model Notes</p>
          <h2 className="mt-2 text-lg font-black text-slate-100">计算规则</h2>
          <div className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
            <p>1. 单个数据源隐含概率 = 1 / 十进制指数。</p>
            <p>2. 将 1/X/2 概率总和归一化到 100%，校正不同数据源的市场偏差。</p>
            <p>3. 对已采集来源的校正概率取平均，最高的一项作为预测结果。</p>
            <p>4. 置信度由最高概率、第二高概率差距和来源数量共同决定，样本不足或数据接近时会自动降级。</p>
          </div>
        </aside>
      </section>

      {predictionRows.length === 0 && (
        <div className="mt-10 rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center backdrop-blur-md">
          <p className="text-lg font-black text-slate-100">没有匹配的预测</p>
          <p className="mt-2 text-sm text-slate-400">试试球队、组别、日期，或切换到“全部”。</p>
        </div>
      )}
    </main>
  );
}
