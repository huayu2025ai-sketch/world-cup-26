"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { scheduleMatches, type ScheduleMatch } from "@/constants/scheduleData";
import { worldCupGroups } from "@/constants/worldcupData";
import { getDisplayMatchTeamLabel } from "@/lib/knockoutDisplay";

type SvgLine = {
  id: number;
  d: string;
  completed: boolean;
  variant: "winner" | "loser";
  from: { x: number; y: number };
  to: { x: number; y: number };
  markers?: Array<{ x: number; y: number }>;
};

type RoundColumn = {
  stage: string;
  matchIds: number[];
};

type BracketMatchup = {
  target: number;
  sources: [number, number];
};

const COLUMNS: Array<RoundColumn & { title: string; isFinalColumn?: boolean }> = [
  { title: "32 强", stage: "32强", matchIds: [73, 75, 74, 77, 83, 84, 81, 82, 76, 78, 79, 80, 86, 88, 85, 87] },
  { title: "16 强", stage: "16强", matchIds: [89, 90, 93, 94, 91, 92, 95, 96] },
  { title: "1/4 决赛", stage: "1/4决赛", matchIds: [97, 98, 99, 100] },
  { title: "半决赛", stage: "半决赛", matchIds: [101, 102] },
  { title: "决赛 / 季军赛", stage: "终局", matchIds: [104, 103], isFinalColumn: true }
];

const ROUND32_TO_16_MATCHUPS: BracketMatchup[] = [
  { target: 89, sources: [73, 75] },
  { target: 90, sources: [74, 77] },
  { target: 93, sources: [83, 84] },
  { target: 94, sources: [81, 82] },
  { target: 91, sources: [76, 78] },
  { target: 92, sources: [79, 80] },
  { target: 95, sources: [86, 88] },
  { target: 96, sources: [85, 87] }
];

const ROUND16_TO_QF_MATCHUPS: BracketMatchup[] = [
  { target: 97, sources: [89, 90] },
  { target: 98, sources: [93, 94] },
  { target: 99, sources: [91, 92] },
  { target: 100, sources: [95, 96] }
];

const QF_TO_SEMI_MATCHUPS: BracketMatchup[] = [
  { target: 101, sources: [97, 98] },
  { target: 102, sources: [99, 100] }
];

const COLUMN_BODY_OFFSET = 32;
const FINAL_CARD_SHIFT = 28;

export default function KnockoutBracket() {
  const innerRef = useRef<HTMLDivElement>(null);
  const matchRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<SvgLine[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [cardTops, setCardTops] = useState<Record<number, number>>({});

  const matchMap = useMemo(() => {
    const map = new Map<number, ScheduleMatch>();
    for (const match of scheduleMatches) {
      map.set(match.id, match);
    }
    return map;
  }, []);

  const teamFlagMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const group of worldCupGroups) {
      for (const team of group.teams) {
        map.set(team.name, team.flag);
      }
    }
    return map;
  }, []);

  const getFlag = (name: string) => {
    if (teamFlagMap.has(name)) return teamFlagMap.get(name)!;
    if (name.includes("组") || name.includes("最佳") || name.includes("小组")) return "🏳️";
    if (name.includes("胜者")) return "🏆";
    if (name.includes("负者")) return "🥉";
    return "⚽";
  };

  const drawLines = () => {
    const inner = innerRef.current;
    if (!inner) return;

    const innerRect = inner.getBoundingClientRect();
    setSvgSize({ width: inner.scrollWidth, height: inner.scrollHeight });

    const newLines: SvgLine[] = [];

    const getCenter = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - innerRect.left,
        y: rect.top + rect.height / 2 - innerRect.top,
        right: rect.right - innerRect.left,
        left: rect.left - innerRect.left
      };
    };

    const connect = (
      fromId: number,
      toId: number,
      variant: SvgLine["variant"] = "winner",
      options?: { elbowRatio?: number; fromYOffset?: number; toYOffset?: number }
    ) => {
      const fromEl = matchRefs.current[fromId];
      const toEl = matchRefs.current[toId];
      if (!fromEl || !toEl) return;
      const fromMatch = matchMap.get(fromId);

      const from = getCenter(fromEl);
      const to = getCenter(toEl);
      const fromY = from.y + (options?.fromYOffset ?? 0);
      const toY = to.y + (options?.toYOffset ?? 0);
      const elbowX = from.right + (to.left - from.right) * (options?.elbowRatio ?? 0.5);
      const d = `M ${from.right} ${fromY} H ${elbowX} V ${toY} H ${to.left}`;
      newLines.push({
        id: fromId * 100 + toId,
        d,
        completed: Boolean(fromMatch && isFinished(fromMatch)),
        variant,
        from: { x: from.right, y: fromY },
        to: { x: to.left, y: toY }
      });
    };

    const connectMergedTerminal = () => {
      const sourceAEl = matchRefs.current[101];
      const sourceBEl = matchRefs.current[102];
      const finalEl = matchRefs.current[104];
      const thirdPlaceEl = matchRefs.current[103];
      if (!sourceAEl || !sourceBEl || !finalEl || !thirdPlaceEl) return;

      const sourceA = getCenter(sourceAEl);
      const sourceB = getCenter(sourceBEl);
      const final = getCenter(finalEl);
      const thirdPlace = getCenter(thirdPlaceEl);
      const sourceAY = sourceA.y;
      const sourceBY = sourceB.y;
      const finalY = final.y;
      const thirdPlaceY = thirdPlace.y;
      const busX = sourceA.right + (final.left - sourceA.right) * 0.46;
      const minY = Math.min(sourceAY, sourceBY, finalY, thirdPlaceY);
      const maxY = Math.max(sourceAY, sourceBY, finalY, thirdPlaceY);
      const d = [
        `M ${sourceA.right} ${sourceAY} H ${busX}`,
        `M ${sourceB.right} ${sourceBY} H ${busX}`,
        `M ${busX} ${minY} V ${maxY}`,
        `M ${busX} ${finalY} H ${final.left}`,
        `M ${busX} ${thirdPlaceY} H ${thirdPlace.left}`
      ].join(" ");
      const sourceAMatch = matchMap.get(101);
      const sourceBMatch = matchMap.get(102);

      newLines.push({
        id: 101102104103,
        d,
        completed: Boolean(
          sourceAMatch && sourceBMatch && isFinished(sourceAMatch) && isFinished(sourceBMatch)
        ),
        variant: "winner",
        from: { x: sourceA.right, y: sourceAY },
        to: { x: final.left, y: finalY },
        markers: [
          { x: sourceA.right, y: sourceAY },
          { x: sourceB.right, y: sourceBY },
          { x: final.left, y: finalY },
          { x: thirdPlace.left, y: thirdPlaceY }
        ]
      });
    };

    const roundChains: Array<[number, number]> = [
      ...ROUND32_TO_16_MATCHUPS.flatMap(({ sources, target }) =>
        sources.map((source) => [source, target] as [number, number])
      ),
      ...ROUND16_TO_QF_MATCHUPS.flatMap(({ sources, target }) =>
        sources.map((source) => [source, target] as [number, number])
      ),
      ...QF_TO_SEMI_MATCHUPS.flatMap(({ sources, target }) =>
        sources.map((source) => [source, target] as [number, number])
      ),
    ];

    for (const [fromId, toId] of roundChains) {
      if (!matchMap.has(toId)) continue;
      connect(fromId, toId);
    }

    connectMergedTerminal();

    setLines(newLines);
  };

  useLayoutEffect(() => {
    recomputeCardTops();

    const handleResize = () => {
      recomputeCardTops();
    };
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => {
      recomputeCardTops();
    });
    if (innerRef.current) {
      observer.observe(innerRef.current);
    }

    const raf1 = requestAnimationFrame(() => {
      recomputeCardTops();
    });
    const raf2 = requestAnimationFrame(() => {
      recomputeCardTops();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(drawLines);
    return () => cancelAnimationFrame(raf);
  }, [cardTops]);

  const isFinished = (match: ScheduleMatch) =>
    match.homeScore !== undefined && match.awayScore !== undefined;

  const getLineColors = (line: SvgLine) => {
    if (line.variant === "loser") {
      return {
        outer: line.completed ? "rgba(251,146,60,0.22)" : "rgba(148,163,184,0.18)",
        inner: line.completed ? "rgba(251,191,36,1)" : "rgba(148,163,184,0.92)",
        glow: "drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]"
      };
    }

    return {
      outer: line.completed ? "rgba(34,211,238,0.22)" : "rgba(148,163,184,0.18)",
      inner: line.completed ? "rgba(103,232,249,1)" : "rgba(148,163,184,0.92)",
      glow: "drop-shadow-[0_0_10px_rgba(34,211,238,0.55)]"
    };
  };

  const formatDateLabel = (beijingTime: string) => {
    const [monthDay] = beijingTime.split(" ");
    return monthDay.replace("-", "/");
  };

  const renderMatchCard = (
    match: ScheduleMatch,
    options?: { mobile?: boolean; top?: number; final?: boolean; round32?: boolean }
  ) => {
    const mobile = options?.mobile ?? false;
    const top = options?.top;
    const final = options?.final ?? false;
    const round32 = options?.round32 ?? false;
    const homeLabel = getDisplayMatchTeamLabel(match, "home");
    const awayLabel = getDisplayMatchTeamLabel(match, "away");

    return (
      <div
        key={match.id}
        ref={mobile ? undefined : (el) => {
          matchRefs.current[match.id] = el;
        }}
        className={`z-30 rounded-lg border shadow-lg shadow-slate-950/20 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(2,6,23,0.32)] ${
          mobile
            ? "w-full"
            : round32
              ? "relative w-[9.25rem] sm:w-[9.25rem]"
              : "absolute left-0 w-[9.25rem] sm:w-[9.25rem]"
        } ${
          match.stage === "决赛"
            ? "border-amber-400/40 bg-[linear-gradient(180deg,rgba(69,26,3,0.65),rgba(15,23,42,0.92))]"
            : match.stage === "季军赛"
              ? "border-orange-400/40 bg-[linear-gradient(180deg,rgba(67,20,7,0.55),rgba(15,23,42,0.92))]"
              : "border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.84))] hover:border-cyan-300/40"
        }`}
        style={
          mobile
            ? undefined
            : round32
              ? undefined
              : top !== undefined
              ? {
                  top: top - COLUMN_BODY_OFFSET,
                  left: final ? FINAL_CARD_SHIFT : 0
                }
              : { visibility: "hidden" }
        }
      >
        <div className="mb-1 flex items-center justify-between gap-1 text-[8px] font-bold text-slate-400 sm:text-[9px]">
          <span className="whitespace-nowrap rounded-full bg-cyan-300/10 px-1.5 py-0.5 text-cyan-100">
            北京时间 {match.beijingTime}
          </span>
        </div>

        <div className={mobile ? "space-y-1" : "space-y-0.5"}>
          <div className={`flex items-center justify-between gap-1 ${mobile ? "text-sm" : ""}`}>
            <div className="flex min-w-0 items-center gap-1">
              <span className={`${mobile ? "text-sm" : "text-[11px] sm:text-sm"}`} aria-hidden="true">
                {getFlag(homeLabel)}
              </span>
              <span className={`truncate font-bold leading-none text-slate-50 ${mobile ? "text-[11px]" : "text-[10px] sm:text-[11px]"}`}>
                {homeLabel}
              </span>
            </div>
            {isFinished(match) && (
              <span className="shrink-0 rounded-full bg-cyan-300/10 px-1.5 py-0.5 text-[9px] font-black text-cyan-200">
                {match.homeScore}
              </span>
            )}
          </div>

          <div className={`flex items-center justify-between gap-1 ${mobile ? "text-sm" : ""}`}>
            <div className="flex min-w-0 items-center gap-1">
              <span className={`${mobile ? "text-sm" : "text-[11px] sm:text-sm"}`} aria-hidden="true">
                {getFlag(awayLabel)}
              </span>
              <span className={`truncate font-bold leading-none text-slate-50 ${mobile ? "text-[11px]" : "text-[10px] sm:text-[11px]"}`}>
                {awayLabel}
              </span>
            </div>
            {isFinished(match) && (
              <span className="shrink-0 rounded-full bg-cyan-300/10 px-1.5 py-0.5 text-[9px] font-black text-cyan-200">
                {match.awayScore}
              </span>
            )}
          </div>
        </div>

        {!isFinished(match) && !mobile && (
          <div className="absolute -right-1 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-slate-950 bg-cyan-300/80 shadow-[0_0_10px_rgba(34,211,238,0.55)] sm:block" />
        )}
      </div>
    );
  };

  const recomputeCardTops = () => {
    const inner = innerRef.current;
    if (!inner) return;

    const innerRect = inner.getBoundingClientRect();
    const nextTops: Record<number, number> = {};

    const measureCard = (matchId: number) => {
      const el = matchRefs.current[matchId];
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        centerY: rect.top + rect.height / 2 - innerRect.top,
        height: rect.height
      };
    };

    const roundFinal = COLUMNS[4].matchIds;
    const centerByMatchId: Record<number, number> = {};

    const round32Metrics = COLUMNS[0].matchIds.map((matchId) => {
      const metric = measureCard(matchId);
      if (metric) {
        centerByMatchId[matchId] = metric.centerY;
      }
      return metric;
    });
    if (round32Metrics.some((metric) => !metric)) return;

    const cardHeight =
      round32Metrics.reduce((sum, metric) => sum + (metric?.height ?? 0), 0) / round32Metrics.length;

    const setBetweenPairs = (matchups: BracketMatchup[]) => {
      const targetCenters: number[] = [];
      for (const { sources, target } of matchups) {
        const [sourceA, sourceB] = sources;
        const centerA = centerByMatchId[sourceA];
        const centerB = centerByMatchId[sourceB];
        if (centerA === undefined || centerB === undefined) continue;
        const center = (centerA + centerB) / 2;
        centerByMatchId[target] = center;
        nextTops[target] = center - cardHeight / 2;
        targetCenters.push(center);
      }
      return targetCenters;
    };

    setBetweenPairs(ROUND32_TO_16_MATCHUPS);
    setBetweenPairs(ROUND16_TO_QF_MATCHUPS);
    const roundSemiCenters = setBetweenPairs(QF_TO_SEMI_MATCHUPS);

    if (roundSemiCenters[0] !== undefined && roundSemiCenters[1] !== undefined) {
      const mid = (roundSemiCenters[0] + roundSemiCenters[1]) / 2;
      const finalOffset = cardHeight * 0.92;
      nextTops[roundFinal[0]] = mid - finalOffset - cardHeight / 2;
      nextTops[roundFinal[1]] = mid + finalOffset - cardHeight / 2;
    }

    setCardTops((prev) => {
      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(nextTops);
      const changed =
        prevKeys.length !== nextKeys.length ||
        nextKeys.some((key) => prev[Number(key)] !== nextTops[Number(key)]);
      return changed ? nextTops : prev;
    });
  };

  return (
    <div className="relative">
      <div className="lg:hidden">
        <div className="space-y-4 rounded-2xl border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.62))] p-3 backdrop-blur-md">
          {COLUMNS.map((column) => (
            <section key={`${column.title}-${column.stage}-mobile`} className="rounded-2xl border border-slate-700/70 bg-slate-950/35 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                    column.isFinalColumn
                      ? "border-amber-400/40 bg-amber-400/15 text-amber-200"
                      : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                  }`}
                >
                  {column.title}
                </span>
                <span className="text-[11px] font-bold text-slate-500">{column.matchIds.length} 场</span>
              </div>
              <div className="grid gap-2">
                {column.matchIds.map((matchId) => {
                  const match = matchMap.get(matchId);
                  if (!match) return null;
                  return renderMatchCard(match, { mobile: true });
                })}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-500">
          手机端已切换为纵向浏览模式，按轮次依次查看比赛卡片。
        </p>
      </div>

      <div className="relative hidden overflow-hidden rounded-2xl border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.55))] backdrop-blur-md lg:block">
        <div ref={innerRef} className="relative w-full">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.06),transparent_36%)]" />
          <div className="relative grid grid-cols-[12rem_12rem_12rem_12rem_12rem] gap-1.5 p-2 sm:gap-1.5 sm:p-3">
            {COLUMNS.map((column) => (
              <div key={`${column.title}-${column.stage}`} className="relative h-full min-w-0">
                <div className="mb-2 text-center">
                  <span
                    className={`inline-block rounded-full border px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.16em] shadow-sm sm:px-2.5 sm:py-1 sm:text-[9px] ${
                      column.isFinalColumn
                        ? "border-amber-400/40 bg-amber-400/15 text-amber-200"
                        : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                    }`}
                  >
                    {column.title}
                  </span>
                </div>

                <div className={column.stage === "32强" ? "flex flex-col gap-1.5 pt-1" : "absolute inset-x-0 bottom-0 top-8"}>
                  {column.matchIds.map((matchId) => {
                    const match = matchMap.get(matchId);
                    if (!match) return null;
                    const top = column.stage === "32强" ? undefined : cardTops[match.id];
                    return renderMatchCard(match, {
                      round32: column.stage === "32强",
                      top,
                      final: match.stage === "决赛" || match.stage === "季军赛"
                    });
                  })}
                </div>
              </div>
            ))}
          </div>

          {svgSize.width > 0 && svgSize.height > 0 && (
            <svg
              className="pointer-events-none absolute left-0 top-0 z-20"
              width={svgSize.width}
              height={svgSize.height}
              aria-hidden="true"
            >
              <defs>
                <filter id="bracket-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 0.9 0"
                  />
                </filter>
              </defs>
              {lines.map((line) => (
                <g key={line.id} className="transition-all duration-500">
                  <path
                    d={line.d}
                    fill="none"
                    stroke={getLineColors(line).outer}
                    strokeWidth={line.completed ? 10 : 8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#bracket-glow)"
                  />
                  <path
                    d={line.d}
                    fill="none"
                    stroke={getLineColors(line).inner}
                    strokeWidth={line.completed ? 3.4 : 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={line.completed ? getLineColors(line).glow : ""}
                  />
                {(line.markers ?? [line.from, line.to]).map((marker, markerIndex) => (
                  <circle
                    key={`${line.id}-${markerIndex}`}
                    cx={marker.x}
                    cy={marker.y}
                    r={line.completed ? 3.2 : 2.8}
                    fill={line.completed ? "rgba(103,232,249,0.98)" : "rgba(148,163,184,0.92)"}
                    stroke="rgba(15,23,42,0.9)"
                    strokeWidth="1.2"
                  />
                ))}
                </g>
              ))}
            </svg>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-500">
        提示：已改为左到右推进布局，32 强在最左侧，晋级路线向右展开。
      </p>
    </div>
  );
}
