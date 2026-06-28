"use client";

import { useState } from "react";
import VisitCounter from "@/components/VisitCounter";
import { groupOverviewUpdate, groupOverviewUpdates } from "@/constants/worldcupData";

export default function UpdateHistoryPanel() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdateIndex, setSelectedUpdateIndex] = useState(0);

  const recentUpdateHistory = groupOverviewUpdates.slice(0, 5);
  const selectedUpdate = recentUpdateHistory[selectedUpdateIndex] ?? groupOverviewUpdate;
  const canShowPreviousUpdate = selectedUpdateIndex < recentUpdateHistory.length - 1;
  const canShowNextUpdate = selectedUpdateIndex > 0;

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectedUpdateIndex(0);
            setIsUpdateModalOpen(true);
          }}
          className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-bold text-slate-400 shadow-lg shadow-slate-950/20 backdrop-blur-md transition hover:border-cyan-300/60 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
          aria-haspopup="dialog"
        >
          最后数据更新时间：{groupOverviewUpdate.updatedAtLabel}
        </button>
        <VisitCounter />
      </div>

      {isUpdateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/78 px-4 py-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="update-modal-title"
          onClick={() => setIsUpdateModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-200">
                  Last Updated
                </p>
                <h2 id="update-modal-title" className="mt-2 text-2xl font-black text-slate-100">
                  {selectedUpdate.title}
                </h2>
                <time dateTime={selectedUpdate.updatedAt} className="mt-2 block text-sm text-slate-400">
                  {selectedUpdate.updatedAtLabel}
                </time>
              </div>
              <button
                type="button"
                onClick={() => setIsUpdateModalOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-rose-300/60 hover:text-rose-100"
                aria-label="关闭更新内容弹窗"
              >
                ×
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">{selectedUpdate.summary}</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {selectedUpdate.changes.map((change) => (
                <li key={change} className="flex gap-3 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-200" aria-hidden="true" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setSelectedUpdateIndex((index) => Math.min(index + 1, recentUpdateHistory.length - 1))}
                disabled={!canShowPreviousUpdate}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-700 bg-slate-800 text-lg font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100 disabled:cursor-not-allowed disabled:border-slate-800 disabled:bg-slate-900 disabled:text-slate-700"
                aria-label="查看上一条更新记录"
              >
                ‹
              </button>
              <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                最近5次更新 {selectedUpdateIndex + 1} / {recentUpdateHistory.length}
              </p>
              <button
                type="button"
                onClick={() => setSelectedUpdateIndex((index) => Math.max(index - 1, 0))}
                disabled={!canShowNextUpdate}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-700 bg-slate-800 text-lg font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100 disabled:cursor-not-allowed disabled:border-slate-800 disabled:bg-slate-900 disabled:text-slate-700"
                aria-label="查看下一条更新记录"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
