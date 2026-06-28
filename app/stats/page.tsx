import { assistsRanking, goalsRanking, statsNotice, type PlayerStat } from "@/constants/tournamentStats";
import { playerProfiles } from "@/constants/playerProfiles";

const englishNameByChineseName = Object.values(playerProfiles).reduce<Record<string, string>>((acc, profile) => {
  if (!acc[profile.chineseName]) {
    acc[profile.chineseName] = profile.name;
  }

  return acc;
}, {});

const getVisibleRankingRows = (rows: PlayerStat[]) => {
  const thresholdRank = rows[9]?.rank;

  if (thresholdRank === undefined) {
    return rows;
  }

  const thresholdValue = rows[9].value;

  return rows.filter((row) => row.rank <= thresholdRank || row.value === thresholdValue);
};

type RankingTableProps = {
  title: string;
  label: string;
  rows: PlayerStat[];
};

function RankingTable({ title, label, rows }: RankingTableProps) {
  const visibleRows = getVisibleRankingRows(rows);

  return (
    <section className="min-w-0 rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 border-b border-slate-700 pb-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">Ranking</p>
          <h2 className="mt-1 text-xl font-black text-slate-100">{title}</h2>
        </div>
        <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-bold text-slate-400">
          {visibleRows.length} 人
        </span>
      </div>

      {visibleRows.length > 0 ? (
        <div className="mt-3 max-w-full overflow-x-auto">
          <table className="w-full min-w-[520px] table-fixed text-left text-xs sm:text-sm">
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[42%]" />
              <col className="w-[18%]" />
              <col className="w-[14%]" />
              <col className="w-[16%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-700 text-[10px] uppercase tracking-[0.06em] text-slate-500 sm:text-xs sm:tracking-[0.16em]">
                <th className="py-2 pr-2 sm:pr-3">排名</th>
                <th className="px-2 py-2 sm:px-3">球员</th>
                <th className="px-2 py-2 sm:px-3">球队</th>
                <th className="px-1 py-2 text-right sm:px-3">{label}</th>
                <th className="py-2 pl-1 text-right sm:pl-3">场次</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={`${row.teamCode}-${row.player}`} className="border-b border-slate-700/60 last:border-0">
                  <td className="py-3 pr-2 font-black text-cyan-200 sm:pr-3">#{row.rank}</td>
                  <td className="min-w-0 px-2 py-3 align-top sm:px-3">
                    <p className="whitespace-normal break-words text-sm font-black leading-snug text-slate-100 sm:text-[15px]">
                      {row.chineseName}
                    </p>
                    <p className="mt-0.5 whitespace-normal break-words text-[10px] font-medium leading-snug text-slate-500 sm:text-xs">
                      {englishNameByChineseName[row.chineseName] ?? row.player}
                    </p>
                  </td>
                  <td className="min-w-0 px-2 py-3 align-top sm:px-3">
                    <p className="truncate font-bold text-slate-300">{row.team}</p>
                    <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-xs">{row.teamCode}</p>
                  </td>
                  <td className="px-1 py-3 text-right align-top text-base font-black text-slate-100 sm:px-3 sm:text-lg">
                    {row.value}
                  </td>
                  <td className="py-3 pl-1 text-right align-top font-bold text-slate-400 sm:pl-3">{row.matches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-6 text-center">
          <p className="font-black text-slate-100">比赛开始前不展示模拟数据</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">进球榜和助攻榜将在首场比赛结束后更新</p>
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

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <RankingTable title="进球榜" label="进球" rows={goalsRanking} />
        <RankingTable title="助攻榜" label="助攻" rows={assistsRanking} />
      </div>
    </main>
  );
}
