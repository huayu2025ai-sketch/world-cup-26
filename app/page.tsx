"use client";

import { useMemo, useState } from "react";
import GroupCard from "@/components/GroupCard";
import { playerProfileMeta, playerProfiles } from "@/constants/playerProfiles";
import { officialSquadsNotice, rosterPositions, teamRosters } from "@/constants/teamRosters";
import { worldCupGroups, type WorldCupGroup } from "@/constants/worldcupData";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<WorldCupGroup | null>(null);
  const [selectedTeamCode, setSelectedTeamCode] = useState<string | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) {
      return worldCupGroups;
    }

    return worldCupGroups.filter((group) => {
      const groupTokens = [group.id, group.name, `group ${group.id}`, group.headline, group.detail]
        .join(" ")
        .toLowerCase();
      const teamTokens = group.teams
        .map((team) => `${team.name} ${team.englishName} ${team.code} ${team.confederation}`)
        .join(" ")
        .toLowerCase();

      return groupTokens.includes(normalizedQuery) || teamTokens.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const openGroup = (group: WorldCupGroup) => {
    setSelectedGroup(group);
    setSelectedTeamCode(group.teams[0]?.code ?? null);
    setSelectedPlayerName(null);
  };

  const closeGroup = () => {
    setSelectedGroup(null);
    setSelectedTeamCode(null);
    setSelectedPlayerName(null);
  };

  const selectedTeam = selectedGroup?.teams.find((team) => team.code === selectedTeamCode) ?? selectedGroup?.teams[0];
  const selectedRoster = selectedTeam ? teamRosters[selectedTeam.code] : undefined;
  const selectedPlayer =
    selectedPlayerName && selectedRoster?.players.some((player) => player.name === selectedPlayerName)
      ? playerProfiles[selectedPlayerName]
      : undefined;
  const selectedPlayerMeta = selectedPlayer ? playerProfileMeta[selectedPlayer.name] : undefined;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="py-6">
        <p className="text-xs font-black uppercase tracking-[0.42em] text-cyan-200">Canada · Mexico · USA</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <h1 className="max-w-none text-2xl font-black leading-tight text-slate-100 sm:text-3xl lg:text-4xl xl:whitespace-nowrap">
            2026 美加墨世界杯 48 队小组全景
          </h1>

          <div className="flex h-10 items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 px-4 backdrop-blur-md focus-within:border-cyan-300/70 lg:h-11">
          <span className="text-slate-500" aria-hidden="true">
            ⌕
          </span>
          <input
            id="team-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索球队或组别"
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            aria-label="搜索球队或组别"
          />
          </div>
        </div>
      </section>

      <section className="mt-2 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredGroups.map((group) => (
          <GroupCard key={group.id} group={group} onSelect={openGroup} />
        ))}
      </section>

      {filteredGroups.length === 0 && (
        <div className="mt-10 rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center backdrop-blur-md">
          <p className="text-lg font-black text-slate-100">没有匹配的小组</p>
          <p className="mt-2 text-sm text-slate-400">试试中文队名、英文队名、三字母代码或 A-L 组别。</p>
        </div>
      )}

      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/78 px-4 py-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="group-modal-title"
          onClick={closeGroup}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-200">Group {selectedGroup.id}</p>
                <h2 id="group-modal-title" className="mt-2 text-2xl font-black text-slate-100">
                  {selectedGroup.name} · {selectedGroup.headline}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeGroup}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-rose-300/60 hover:text-rose-100"
                aria-label="关闭弹窗"
              >
                ×
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">{selectedGroup.detail}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {selectedGroup.teams.map((team) => (
                <button
                  key={team.code}
                  type="button"
                  onClick={() => {
                    setSelectedTeamCode(team.code);
                    setSelectedPlayerName(null);
                  }}
                  className={`rounded-lg border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300/70 ${
                    selectedTeam?.code === team.code
                      ? "border-cyan-300/70 bg-cyan-300/10"
                      : "border-slate-700 bg-slate-800/50 hover:border-cyan-300/45 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">
                      {team.flag}
                    </span>
                    <div>
                      <p className="font-black text-slate-100">{team.name}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {team.code} · {team.confederation}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.16em]">
                    <span className="rounded-full bg-slate-900 px-2.5 py-1 text-slate-400">Pot {team.pot}</span>
                    {team.host && <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-cyan-100">Host</span>}
                    {team.debut && <span className="rounded-full bg-rose-300/10 px-2.5 py-1 text-rose-100">Debut</span>}
                    <span className="rounded-full bg-slate-900 px-2.5 py-1 text-slate-400">阵容</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedTeam && (
              <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">Squad</p>
                    <h3 className="mt-1 text-xl font-black text-slate-100">
                      {selectedTeam.flag} {selectedTeam.name} 阵容
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      selectedRoster?.players.length
                        ? "bg-cyan-300 text-slate-950"
                        : "border border-slate-700 bg-slate-900 text-slate-400"
                    }`}
                  >
                    {selectedRoster?.players.length ? "本地已录入" : "待录入"}
                  </span>
                </div>

                {selectedRoster?.players.length ? (
                  <>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{selectedRoster.note}</p>
                    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
                      <div className="grid gap-3 md:grid-cols-2">
                        {rosterPositions.map((position) => {
                          const players = selectedRoster.players.filter((player) => player.position === position);

                          return (
                            <div key={position} className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-black text-cyan-100">{position}</h4>
                                <span className="text-xs font-bold text-slate-500">{players.length} 人</span>
                              </div>
                              <ul className="mt-2 grid gap-1.5 text-sm text-slate-300">
                                {players.map((player) => (
                                  <li key={player.name}>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedPlayerName(player.name)}
                                      className={`w-full rounded-md px-2.5 py-1.5 text-left transition ${
                                        selectedPlayerName === player.name
                                          ? "bg-cyan-300 text-slate-950"
                                          : "bg-slate-950/60 hover:bg-slate-800"
                                      }`}
                                    >
                                      <span className="block font-bold">{player.chineseName}</span>
                                      <span
                                        className={`mt-0.5 block text-xs ${
                                          selectedPlayerName === player.name ? "text-slate-700" : "text-slate-500"
                                        }`}
                                      >
                                        {player.name}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 lg:sticky lg:top-4 lg:self-start">
                        {selectedPlayer ? (
                          <>
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">
                              Player Profile
                            </p>
                            <h4 className="mt-2 text-xl font-black text-slate-100">{selectedPlayer.chineseName}</h4>
                            <p className="mt-1 text-sm text-slate-400">{selectedPlayer.name}</p>
                            {selectedPlayerMeta && (
                              <div className="mt-4 grid grid-cols-3 gap-2">
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">俱乐部</p>
                                  <p className="mt-1 truncate text-xs font-black text-slate-100">{selectedPlayerMeta.club}</p>
                                </div>
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">年龄</p>
                                  <p className="mt-1 text-xs font-black text-slate-100">{selectedPlayerMeta.age}</p>
                                </div>
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">出场</p>
                                  <p className="mt-1 text-xs font-black text-slate-100">{selectedPlayerMeta.caps}</p>
                                </div>
                              </div>
                            )}
                            <div className="mt-4 flex flex-wrap gap-2">
                              <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-black text-cyan-100">
                                {selectedPlayer.position}
                              </span>
                              <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-black text-slate-300">
                                {selectedPlayer.role}
                              </span>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-slate-300">{selectedPlayer.bio}</p>
                            <div className="mt-4">
                              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">特点</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {selectedPlayer.strengths.map((strength) => (
                                  <span
                                    key={strength}
                                    className="rounded-full border border-slate-700 bg-slate-950/50 px-2.5 py-1 text-xs font-bold text-slate-300"
                                  >
                                    {strength}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full min-h-48 flex-col justify-center text-center">
                            <p className="text-lg font-black text-slate-100">点击球员查看信息</p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                              已录入中文名、英文名、角色定位、简介和技术特点。
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <a
                      href={selectedRoster.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-full border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100"
                    >
                      来源：{selectedRoster.source} · {selectedRoster.publishedDate}
                    </a>
                  </>
                ) : (
                  <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                    <p className="text-sm leading-6 text-slate-300">
                      {officialSquadsNotice.text} 当前应用尚未录入 {selectedTeam.name} 的完整 26 人名单，因此不展示未经核实的阵容。
                    </p>
                    <a
                      href={officialSquadsNotice.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-full border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100"
                    >
                      查看官方确认信息：{officialSquadsNotice.source} · {officialSquadsNotice.confirmedDate}
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
              <h3 className="font-black text-cyan-100">晋级形势与核心看点</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                {selectedGroup.watchPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 text-cyan-200">◆</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
