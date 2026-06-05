"use client";

import { useMemo, useState } from "react";
import GroupCard from "@/components/GroupCard";
import { playerProfileMeta, playerProfiles, type PlayerProfile } from "@/constants/playerProfiles";
import { officialSquadsNotice, rosterPositions, teamRosters, type RosterPlayer } from "@/constants/teamRosters";
import { groupOverviewUpdate, groupOverviewUpdates, worldCupGroups, type WorldCupGroup } from "@/constants/worldcupData";

const profileTemplate: Record<RosterPlayer["position"], Pick<PlayerProfile, "role" | "bio" | "strengths">> = {
  门将: {
    role: "门将 / 阵容成员",
    bio: "该球员入选了 2026 世界杯最终名单。当前应用已录入基础身份信息，详细履历仍需继续核实补充。",
    strengths: ["门线反应", "禁区保护", "后场沟通"]
  },
  后卫: {
    role: "后卫 / 防线轮换",
    bio: "该球员入选了 2026 世界杯最终名单。当前应用已录入基础身份信息，详细履历仍需继续核实补充。",
    strengths: ["防守站位", "对抗", "防线协作"]
  },
  中场: {
    role: "中场 / 连接与覆盖",
    bio: "该球员入选了 2026 世界杯最终名单。当前应用已录入基础身份信息，详细履历仍需继续核实补充。",
    strengths: ["传接球", "跑动覆盖", "攻防转换"]
  },
  前锋: {
    role: "前锋 / 进攻选择",
    bio: "该球员入选了 2026 世界杯最终名单。当前应用已录入基础身份信息，详细履历仍需继续核实补充。",
    strengths: ["前场跑位", "终结", "冲击防线"]
  }
};

const buildBasicProfile = (player: RosterPlayer, teamName: string): PlayerProfile => {
  const template = profileTemplate[player.position];

  return {
    name: player.name,
    chineseName: player.chineseName,
    position: player.position,
    role: template.role,
    bio: `${player.chineseName}入选${teamName} 2026 世界杯最终名单。当前应用已录入其基础身份、位置和阵容信息；俱乐部、年龄、国家队出场等易变字段如未核实会显示为“待核实”。`,
    strengths: template.strengths
  };
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<WorldCupGroup | null>(null);
  const [selectedTeamCode, setSelectedTeamCode] = useState<string | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdateIndex, setSelectedUpdateIndex] = useState(0);

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
  const selectedRosterPlayer = selectedRoster?.players.find((player) => player.name === selectedPlayerName);
  const selectedPlayer =
    selectedPlayerName && selectedRosterPlayer
      ? playerProfiles[selectedPlayerName] ?? buildBasicProfile(selectedRosterPlayer, selectedTeam?.name ?? "该队")
      : undefined;
  const selectedPlayerMeta = selectedPlayer
    ? playerProfileMeta[selectedPlayer.name] ?? { club: "待核实", age: "待核实", caps: "待核实" }
    : undefined;
  const selectedUpdate = groupOverviewUpdates[selectedUpdateIndex] ?? groupOverviewUpdate;
  const canShowPreviousUpdate = selectedUpdateIndex < groupOverviewUpdates.length - 1;
  const canShowNextUpdate = selectedUpdateIndex > 0;

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

      <div className="mt-12 flex justify-center">
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
                onClick={() => setSelectedUpdateIndex((index) => Math.min(index + 1, groupOverviewUpdates.length - 1))}
                disabled={!canShowPreviousUpdate}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-700 bg-slate-800 text-lg font-black text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100 disabled:cursor-not-allowed disabled:border-slate-800 disabled:bg-slate-900 disabled:text-slate-700"
                aria-label="查看上一条更新记录"
              >
                ‹
              </button>
              <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                最近1天更新 {selectedUpdateIndex + 1} / {groupOverviewUpdates.length}
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
                                      <span className="flex items-center gap-2 font-bold">
                                        <span
                                          className={`rounded px-1.5 py-0.5 text-[10px] ${
                                            selectedPlayerName === player.name
                                              ? "bg-slate-950/15 text-slate-800"
                                              : "bg-slate-800 text-cyan-100"
                                          }`}
                                        >
                                          #{player.number ?? "待核实"}
                                        </span>
                                        <span>{player.chineseName}</span>
                                      </span>
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
                              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">号码</p>
                                  <p className="mt-1 truncate text-xs font-black text-slate-100">
                                    #{selectedRosterPlayer?.number ?? "待核实"}
                                  </p>
                                </div>
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
                              <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-black text-slate-400">
                                球员档案
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
