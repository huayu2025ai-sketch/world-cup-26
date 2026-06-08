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
import { formatPercent, getMatchPrediction, type OutcomeKey } from "@/lib/oddsPrediction";

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
  home: "主胜",
  draw: "平",
  away: "客胜"
};

const confidenceClass: Record<"高" | "中" | "低", string> = {
  高: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
  中: "border-amber-300/30 bg-amber-300/12 text-amber-100",
  低: "border-rose-300/30 bg-rose-300/12 text-rose-100"
};

const formatSignedIndex = (value: number) => (value > 0 ? `+${value}` : `${value}`);

const formatMonthDay = (date: string) => date.replace(/^\d{4}-/, "");

export default function PredictionsPage() {
  const [query, setQuery] = useState("");
  const [coverage, setCoverage] = useState<"有数据" | "全部">("有数据");
  const [championIndex, setChampionIndex] = useState(0);
  const [championDragStart, setChampionDragStart] = useState<number | null>(null);

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
  const currentChampion = championFavorites[championIndex];

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
            5 组市场数据胜平负预测
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            每场比赛先按 5 组市场数据分别计算 1/X/2 隐含概率并校正，再对校正概率取平均，输出最高概率赛果和置信度。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xl font-black text-cyan-200">{predictionCount}</p>
            <p className="mt-1 text-xs text-slate-400">已录数据</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xl font-black text-cyan-200">{recommendedBookmakers.length}</p>
            <p className="mt-1 text-xs text-slate-400">数据源</p>
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
                placeholder="输入 巴西、A组、主胜、Dallas 或 2026-06-11"
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
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-3">
          {predictionRows.map(({ match, odds, prediction }) => (
            <article key={match.id} className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 backdrop-blur-md">
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
                    <p className="mt-1 text-lg font-black text-cyan-50">
                      {outcomeLabel(prediction.predictedOutcome, match)}
                    </p>
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
                    <p className="mt-1 text-xs leading-5 text-slate-500">录入 5 组 1/X/2 指数后自动生成预测。</p>
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

                  <div className="mt-3 overflow-x-auto rounded-lg border border-slate-700">
                    <table className="min-w-full divide-y divide-slate-700 text-left text-xs">
                      <thead className="bg-slate-950/60 text-slate-400">
                        <tr>
                          <th className="px-3 py-2 font-black">数据源</th>
                          <th className="px-3 py-2 font-black">指数 1/X/2</th>
                          <th className="px-3 py-2 font-black">校正概率 1/X/2</th>
                          <th className="px-3 py-2 font-black">市场偏差</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                        {prediction.bookmakerProbabilities.map((item) => (
                          <tr key={item.bookmaker}>
                            <td className="px-3 py-2">
                              <p className="font-black text-slate-100">{bookmakerByKey[item.bookmaker].name}</p>
                              <p className="mt-0.5 text-[11px] text-slate-500">
                                {bookmakerByKey[item.bookmaker].marketRole}
                              </p>
                            </td>
                            <td className="px-3 py-2 font-mono text-slate-200">
                              {item.odds.home.toFixed(2)} / {item.odds.draw.toFixed(2)} / {item.odds.away.toFixed(2)}
                            </td>
                            <td className="px-3 py-2 font-mono text-slate-200">
                              {formatPercent(item.noVig.home)} / {formatPercent(item.noVig.draw)} /{" "}
                              {formatPercent(item.noVig.away)}
                            </td>
                            <td className="px-3 py-2 font-mono text-slate-400">{formatPercent(item.overround)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </article>
          ))}
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
            <p>3. 对 5 组校正概率取平均，最高的一项作为预测结果。</p>
            <p>4. 置信度由最高概率和第二高概率差距决定，数据接近时会自动降为低。</p>
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
