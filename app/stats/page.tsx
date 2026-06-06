import { assistsRanking, goalsRanking, statsNotice, type PlayerStat } from "@/constants/tournamentStats";

type RankingTableProps = {
  title: string;
  label: string;
  rows: PlayerStat[];
};

function RankingTable({ title, label, rows }: RankingTableProps) {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 border-b border-slate-700 pb-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">Ranking</p>
          <h2 className="mt-1 text-xl font-black text-slate-100">{title}</h2>
        </div>
        <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-bold text-slate-400">
          {rows.length} 人
        </span>
      </div>

      {rows.length > 0 ? (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-xs uppercase tracking-[0.16em] text-slate-500">
                <th className="py-2 pr-3">排名</th>
                <th className="px-3 py-2">球员</th>
                <th className="px-3 py-2">球队</th>
                <th className="px-3 py-2 text-right">{label}</th>
                <th className="py-2 pl-3 text-right">出场</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.teamCode}-${row.player}`} className="border-b border-slate-700/60 last:border-0">
                  <td className="py-3 pr-3 font-black text-cyan-200">#{row.rank}</td>
                  <td className="px-3 py-3">
                    <p className="font-black text-slate-100">{row.chineseName}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{row.player}</p>
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-bold text-slate-300">{row.team}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{row.teamCode}</p>
                  </td>
                  <td className="px-3 py-3 text-right text-lg font-black text-slate-100">{row.value}</td>
                  <td className="py-3 pl-3 text-right font-bold text-slate-400">{row.matches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-6 text-center">
          <p className="font-black text-slate-100">{statsNotice.title}</p>
          {statsNotice.body && <p className="mt-2 text-sm leading-6 text-slate-400">{statsNotice.body}</p>}
        </div>
      )}
    </section>
  );
}

export default function StatsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="py-6">
        <p className="text-xs font-black uppercase tracking-[0.42em] text-cyan-200">Tournament Stats</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-100 sm:text-4xl">进球数与助攻排行表</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          这里展示 2026 世界杯赛事统计排行。比赛开始前不展示模拟数据，避免把预测误当成真实数据。
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <RankingTable title="进球榜" label="进球" rows={goalsRanking} />
        <RankingTable title="助攻榜" label="助攻" rows={assistsRanking} />
      </div>
    </main>
  );
}
