"use client";

import { useMemo, useState } from "react";
import { matchOddsById, oddsDataUpdatedAt, recommendedBookmakers, type BookmakerKey } from "@/constants/oddsData";
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

export default function PredictionsPage() {
  const [query, setQuery] = useState("");
  const [coverage, setCoverage] = useState<"有赔率" | "全部">("有赔率");

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
  const averageConfidence =
    predictionRows.filter((row) => row.prediction?.confidence === "高").length > 0
      ? "有高置信度场次"
      : "以中低置信度为主";

  return (
    <main className="mx-auto max-w-7xl px-3 pb-10 pt-5 sm:px-5 lg:px-6">
      <section className="grid gap-4 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.36em] text-cyan-200">Odds Model</p>
          <h1 className="mt-2 text-2xl font-black leading-tight text-slate-100 sm:text-3xl lg:text-4xl">
            5 家赔率源胜平负预测
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            每场比赛先按博彩公司分别计算 1/X/2 隐含概率并去水，再对 5 家去水概率取平均，输出最高概率赛果和置信度。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xl font-black text-cyan-200">{predictionCount}</p>
            <p className="mt-1 text-xs text-slate-400">已录赔率</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-xl font-black text-cyan-200">{recommendedBookmakers.length}</p>
            <p className="mt-1 text-xs text-slate-400">赔率源</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center backdrop-blur-md">
            <p className="text-sm font-black text-cyan-200">{oddsDataUpdatedAt}</p>
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
            {(["有赔率", "全部"] as const).map((item) => (
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
                    <span className="text-[11px] font-bold text-slate-500">{match.date}</span>
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
                    <p className="text-sm font-black text-slate-300">待录入赔率</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">录入 5 家 1/X/2 赔率后自动生成预测。</p>
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
                          <th className="px-3 py-2 font-black">公司</th>
                          <th className="px-3 py-2 font-black">赔率 1/X/2</th>
                          <th className="px-3 py-2 font-black">去水概率 1/X/2</th>
                          <th className="px-3 py-2 font-black">水钱</th>
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
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">Model Notes</p>
          <h2 className="mt-2 text-lg font-black text-slate-100">计算规则</h2>
          <div className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
            <p>1. 单家公司隐含概率 = 1 / 十进制赔率。</p>
            <p>2. 将 1/X/2 概率总和归一化到 100%，去掉博彩公司水钱。</p>
            <p>3. 对 5 家去水概率取平均，最高的一项作为预测结果。</p>
            <p>4. 置信度由最高概率和第二高概率差距决定，盘口接近时会自动降为低。</p>
          </div>

          <div className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/10 p-3">
            <p className="text-sm font-black text-amber-100">当前覆盖</p>
            <p className="mt-1 text-xs leading-5 text-amber-50/80">
              已录入揭幕阶段样例赔率；后续只需维护 `constants/oddsData.ts`，页面会自动覆盖更多场次。
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/50 p-3">
            <p className="text-sm font-black text-slate-100">筛选结果</p>
            <p className="mt-1 text-xs text-slate-400">
              当前显示 {predictionRows.length} 场，{averageConfidence}。
            </p>
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
