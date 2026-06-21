"use client";

import { useMemo, useState } from "react";
import GroupCard from "@/components/GroupCard";
import VisitCounter from "@/components/VisitCounter";
import { playerProfileMeta, playerProfiles, type PlayerProfile } from "@/constants/playerProfiles";
import { officialSquadsNotice, rosterPositions, teamRosters, type RosterPlayer } from "@/constants/teamRosters";
import { groupOverviewUpdate, groupOverviewUpdates, worldCupGroups, type WorldCupGroup } from "@/constants/worldcupData";
import { getQualifiedTeamCodes } from "@/lib/groupQualification";

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

const clubCountryLabels: Record<string, string> = {
  ALG: "阿尔及利亚",
  ARG: "阿根廷",
  ARM: "亚美尼亚",
  AUS: "澳大利亚",
  AUT: "奥地利",
  AZE: "阿塞拜疆",
  BEL: "比利时",
  BIH: "波黑",
  BRA: "巴西",
  BUL: "保加利亚",
  CAN: "加拿大",
  CHI: "智利",
  CHN: "中国",
  COL: "哥伦比亚",
  CRC: "哥斯达黎加",
  CRO: "克罗地亚",
  CYP: "塞浦路斯",
  CZE: "捷克",
  DEN: "丹麦",
  ECU: "厄瓜多尔",
  EGY: "埃及",
  ENG: "英格兰",
  ESP: "西班牙",
  FIN: "芬兰",
  FRA: "法国",
  GER: "德国",
  GHA: "加纳",
  GRE: "希腊",
  HAI: "海地",
  HON: "洪都拉斯",
  HUN: "匈牙利",
  IDN: "印度尼西亚",
  IRL: "爱尔兰",
  IRN: "伊朗",
  IRQ: "伊拉克",
  ISR: "以色列",
  ITA: "意大利",
  JOR: "约旦",
  JPN: "日本",
  KAZ: "哈萨克斯坦",
  KOR: "韩国",
  KSA: "沙特阿拉伯",
  MAR: "摩洛哥",
  MAS: "马来西亚",
  MEX: "墨西哥",
  NED: "荷兰",
  NOR: "挪威",
  NZL: "新西兰",
  PAN: "巴拿马",
  PAR: "巴拉圭",
  POL: "波兰",
  POR: "葡萄牙",
  QAT: "卡塔尔",
  ROU: "罗马尼亚",
  RSA: "南非",
  RUS: "俄罗斯",
  SCO: "苏格兰",
  SRB: "塞尔维亚",
  SUI: "瑞士",
  SVK: "斯洛伐克",
  SVN: "斯洛文尼亚",
  SWE: "瑞典",
  THA: "泰国",
  TUN: "突尼斯",
  TUR: "土耳其",
  UAE: "阿联酋",
  URU: "乌拉圭",
  USA: "美国",
  UZB: "乌兹别克斯坦",
  VEN: "委内瑞拉",
  WAL: "威尔士"
};

const clubChineseNames: Record<string, string> = {
  "1. FC Union Berlin": "柏林联合",
  "1. FSV Mainz 05": "美因茨05",
  "AC Milan": "AC米兰",
  "AC Sparta Praha": "布拉格斯巴达",
  "ACF Fiorentina": "佛罗伦萨",
  "AEK Athens": "雅典AEK",
  "AFC Ajax": "阿贾克斯",
  "AFC Bournemouth": "伯恩茅斯",
  "AIK Stockholm": "AIK索尔纳",
  "AJ Auxerre": "欧塞尔",
  "AS Monaco": "摩纳哥",
  "AS Roma": "罗马",
  "AS Saint-Etienne": "圣埃蒂安",
  "AZ Alkmaar": "阿尔克马尔",
  "Al Ahli FC": "吉达国民",
  "Al Ahly FC": "开罗国民",
  "Al Ain FC": "阿尔艾因",
  "Al Duhail SC": "杜海勒",
  "Al Ettifaq FC": "达曼协作",
  "Al Gharafa SC": "加拉法",
  "Al Hilal SC": "利雅得新月",
  "Al Ittihad": "吉达联合",
  "Al Nassr FC": "利雅得胜利",
  "Al Qadsiah FC": "卡迪西亚",
  "Al Rayyan SC": "赖扬",
  "Al Sadd SC": "萨德",
  "Al Shabab FC": "利雅得青年",
  "Al Wakrah SC": "沃克拉",
  "Arsenal FC": "阿森纳",
  "Aston Villa FC": "阿斯顿维拉",
  "Atalanta Bergamo": "亚特兰大",
  "Athletic Club": "毕尔巴鄂竞技",
  "Athletico Paranaense": "巴拉纳竞技",
  "Atlanta United FC": "亚特兰大联",
  "Atlético De Madrid": "马德里竞技",
  "Atlético Mineiro": "米内罗竞技",
  "Atlético Nacional": "国民竞技",
  "BSC Young Boys": "伯尔尼年轻人",
  "Bayer 04 Leverkusen": "勒沃库森",
  "Bayer Leverkusen": "勒沃库森",
  "Beşiktaş JK": "贝西克塔斯",
  "Birmingham City FC": "伯明翰城",
  "Bologna FC": "博洛尼亚",
  "Borussia Dortmund": "多特蒙德",
  "Borussia Mönchengladbach": "门兴格拉德巴赫",
  "Botafogo": "博塔弗戈",
  "Brentford FC": "布伦特福德",
  "Brighton & Hove Albion FC": "布莱顿",
  "Burnley FC": "伯恩利",
  "CA Boca Juniors": "博卡青年",
  "CA River Plate": "河床",
  "CA San Lorenzo": "圣洛伦索",
  "CA Vélez Sarsfield": "萨斯菲尔德",
  "CD Guadalajara": "瓜达拉哈拉",
  "CD Universidad Católica": "天主教大学",
  "CF Cruz Azul": "蓝十字",
  "CF Monterrey": "蒙特雷",
  "CF Pachuca": "帕丘卡",
  "CR Flamengo": "弗拉门戈",
  "CR Vasco Da Gama": "瓦斯科达伽马",
  "Cagliari": "卡利亚里",
  "Celtic FC": "凯尔特人",
  "Cercle Brugge": "色格拉布鲁日",
  "Cerro Porteño": "波特诺山丘",
  "Chelsea FC": "切尔西",
  "Chicago Fire FC": "芝加哥火焰",
  "Club América": "墨西哥美洲",
  "Club Brugge": "布鲁日",
  "Club León": "莱昂",
  "Club Nacional": "民族",
  "Club Olimpia": "奥林匹亚",
  "Club Santos Laguna": "桑托斯拉古纳",
  "Club Tijuana": "蒂华纳",
  "Columbus Crew": "哥伦布机员",
  "Como": "科莫",
  "Coventry City FC": "考文垂",
  "Crystal Palace FC": "水晶宫",
  "Daejeon Hana Citizen FC": "大田韩亚市民",
  "Deportivo Saprissa": "萨普里萨",
  "Deportivo Toluca FC": "托卢卡",
  "Eintracht Frankfurt": "法兰克福",
  "Elche CF": "埃尔切",
  "Everton FC": "埃弗顿",
  "FC Astana": "阿斯塔纳",
  "FC Augsburg": "奥格斯堡",
  "FC Barcelona": "巴塞罗那",
  "FC Bayern München": "拜仁慕尼黑",
  "FC Dallas": "达拉斯",
  "FC Dynamo Moscow": "莫斯科迪纳摩",
  "FC Internazionale Milano": "国际米兰",
  "FC Juárez": "华雷斯",
  "FC Krasnodar": "克拉斯诺达尔",
  "FC København": "哥本哈根",
  "FC Lokomotiv Moscow": "莫斯科火车头",
  "FC Lorient": "洛里昂",
  "FC Midtjylland": "中日德兰",
  "FC Nantes": "南特",
  "FC Porto": "波尔图",
  "FC Red Bull Salzburg": "萨尔茨堡红牛",
  "FC Schalke 04": "沙尔克04",
  "FC Seoul": "首尔FC",
  "FC Spartak Moscow": "莫斯科斯巴达",
  "FC St. Pauli": "圣保利",
  "FC Tokyo": "东京FC",
  "FC Twente": "特温特",
  "FC Utrecht": "乌得勒支",
  "FC Viktoria Plzeň": "比尔森胜利",
  "FC Zenit St. Petersburg": "圣彼得堡泽尼特",
  "FK Austria Wien": "奥地利维也纳",
  "FK Bodø/Glimt": "博德闪耀",
  "FK Crvena Zvezda": "贝尔格莱德红星",
  "Fenerbahçe SK": "费内巴切",
  "Ferencvárosi TC": "费伦茨瓦罗斯",
  "Feyenoord Rotterdam": "费耶诺德",
  "Fluminense FC": "弗鲁米嫩塞",
  "Fortuna Düsseldorf": "杜塞尔多夫",
  "Fulham FC": "富勒姆",
  "GNK Dinamo Zagreb": "萨格勒布迪纳摩",
  "Galatasaray SK": "加拉塔萨雷",
  "Gangwon FC": "江原FC",
  "Genoa CFC": "热那亚",
  "Girona FC": "赫罗纳",
  "Granada CF": "格拉纳达",
  "Grêmio FBPA": "格雷米奥",
  "HNK Hajduk Split": "哈伊杜克",
  "Hamburger SV": "汉堡",
  "Hannover 96": "汉诺威96",
  "Hellas Verona FC": "维罗纳",
  "Hull City FC": "赫尔城",
  "Independiente Del Valle": "山谷独立",
  "Inter Miami CF": "迈阿密国际",
  "Ipswich Town FC": "伊普斯维奇",
  "Jeonbuk Hyundai Motors FC": "全北现代",
  "Juventus FC": "尤文图斯",
  "KAA Gent": "根特",
  "KRC Genk": "亨克",
  "Kaizer Chiefs FC": "凯泽酋长",
  "Kashima Antlers": "鹿岛鹿角",
  "Kasımpaşa SK": "卡斯帕萨",
  "Konyaspor": "科尼亚体育",
  "LAFC": "洛杉矶FC",
  "LASK Linz": "林茨",
  "LDU Quito": "基多大学",
  "Le Havre AC": "勒阿弗尔",
  "Leeds United FC": "利兹联",
  "Leicester City FC": "莱斯特城",
  "Levante UD": "莱万特",
  "Lille OSC": "里尔",
  "Liverpool FC": "利物浦",
  "Maccabi Haifa FC": "海法马卡比",
  "Malmö FF": "马尔默",
  "Mamelodi Sundowns FC": "马梅洛迪日落",
  "Manchester City FC": "曼城",
  "Manchester United FC": "曼联",
  "Mazatlán FC": "马萨特兰",
  "Melbourne City FC": "墨尔本城",
  "Melbourne Victory FC": "墨尔本胜利",
  "Middlesbrough FC": "米德尔斯堡",
  "Millwall FC": "米尔沃尔",
  "Minnesota United FC": "明尼苏达联",
  "Molde FK": "莫尔德",
  "Montpellier HSC": "蒙彼利埃",
  "Motherwell FC": "马瑟韦尔",
  "NEC Nijmegen": "奈梅亨",
  "Nasaf Qarshi FC": "纳萨夫",
  "New England Revolution": "新英格兰革命",
  "New York City FC": "纽约城",
  "Newcastle United FC": "纽卡斯尔联",
  "Norwich City FC": "诺维奇城",
  "Nottingham Forest FC": "诺丁汉森林",
  "OGC Nice": "尼斯",
  "Olympiacos FC": "奥林匹亚科斯",
  "Olympique Lyonnais": "里昂",
  "Olympique Marseille": "马赛",
  "Orlando City SC": "奥兰多城",
  "Orlando Pirates FC": "奥兰多海盗",
  "PAOK Saloniki": "塞萨洛尼基PAOK",
  "PEC Zwolle": "兹沃勒",
  "PSV Eindhoven": "埃因霍温",
  "Pakhtakor Tashkent FK": "塔什干棉农",
  "Panathinaikos FC": "帕纳辛奈科斯",
  "Paris FC": "巴黎FC",
  "Paris Saint-Germain": "巴黎圣日耳曼",
  "Parma": "帕尔马",
  "Persepolis FC": "波斯波利斯",
  "Philadelphia Union": "费城联合",
  "Pisa SC": "比萨",
  "Portland Timbers": "波特兰伐木者",
  "Pumas UNAM": "美洲狮",
  "Pyramids FC": "金字塔",
  "RB Leipzig": "RB莱比锡",
  "RC Celta Vigo": "塞尔塔",
  "RC Lens": "朗斯",
  "RC Strasbourg": "斯特拉斯堡",
  "RCD Espanyol": "西班牙人",
  "RCD Mallorca": "马略卡",
  "RSC Anderlecht": "安德莱赫特",
  "Raja Casablanca": "拉贾卡萨布兰卡",
  "Rangers FC": "流浪者",
  "Rayo Vallecano": "巴列卡诺",
  "Real Betis": "皇家贝蒂斯",
  "Real Madrid C. F.": "皇家马德里",
  "Real Oviedo": "皇家奥维耶多",
  "Real Salt Lake": "皇家盐湖城",
  "Real Sociedad": "皇家社会",
  "Red Bull Bragantino": "布拉干蒂诺红牛",
  "Royal Antwerp FC": "安特卫普",
  "Royale Union Saint-Gilloise": "圣吉罗斯联合",
  "SC Braga": "布拉加",
  "SC Corinthians": "科林蒂安",
  "SC Freiburg": "弗赖堡",
  "SC Internacional": "巴西国际",
  "SE Palmeiras": "帕尔梅拉斯",
  "SK Slavia Praha": "布拉格斯拉维亚",
  "SL Benfica": "本菲卡",
  "SSC Napoli": "那不勒斯",
  "SV Werder Bremen": "云达不莱梅",
  "Samsunspor": "萨姆松体育",
  "San Diego FC": "圣迭戈FC",
  "Sanfrecce Hiroshima": "广岛三箭",
  "Santos FC": "桑托斯",
  "Seattle Sounders FC": "西雅图海湾人",
  "Servette FC": "塞尔维特",
  "Sevilla FC": "塞维利亚",
  "Shabab Al Ahli Club": "迪拜青年国民",
  "Sheffield United FC": "谢菲尔德联",
  "Southampton FC": "南安普顿",
  "Sporting CP": "葡萄牙体育",
  "Stade Reims": "兰斯",
  "Stade Rennais FC": "雷恩",
  "Standard Liège": "标准列日",
  "Stoke City FC": "斯托克城",
  "Sunderland AFC": "桑德兰",
  "Swansea City AFC": "斯旺西城",
  "Sydney FC": "悉尼FC",
  "São Paulo FC": "圣保罗",
  "TSG Hoffenheim": "霍芬海姆",
  "Tigres UANL": "老虎大学",
  "Torino FC": "都灵",
  "Toronto FC": "多伦多FC",
  "Tottenham Hotspur FC": "托特纳姆热刺",
  "Toulouse FC": "图卢兹",
  "Trabzonspor": "特拉布宗体育",
  "UC Sampdoria": "桑普多利亚",
  "US Sassuolo": "萨索洛",
  "Udinese": "乌迪内斯",
  "Ulsan HD": "蔚山HD",
  "Valencia CF": "瓦伦西亚",
  "Vancouver Whitecaps FC": "温哥华白浪",
  "Venezia FC": "威尼斯",
  "VfB Stuttgart": "斯图加特",
  "VfL Wolfsburg": "沃尔夫斯堡",
  "Villarreal CF": "比利亚雷亚尔",
  "Vitória SC": "吉马良斯",
  "Watford FC": "沃特福德",
  "Wellington Phoenix FC": "惠灵顿凤凰",
  "West Ham United FC": "西汉姆联",
  "Wolverhampton Wanderers FC": "狼队",
  "Wrexham AFC": "雷克瑟姆",
  "Zamalek SC": "扎马雷克",
  "Zhejiang FC": "浙江FC"
};

const formatClubName = (club: string) => {
  if (club === "待核实") {
    return club;
  }

  const match = club.match(/^(.*) \(([A-Z]{3})\)$/);
  if (!match) {
    return clubChineseNames[club] ?? club;
  }

  const [, clubName, countryCode] = match;
  const translatedClub = clubChineseNames[clubName];
  const countryLabel = clubCountryLabels[countryCode] ?? countryCode;

  if (translatedClub) {
    return `${translatedClub}（${countryLabel}）`;
  }

  return `${countryLabel}俱乐部`;
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
    ? playerProfileMeta[selectedPlayer.name] ?? {
        club: "待核实",
        age: "待核实",
        caps: "待核实",
        goals: "待核实",
        dob: "待核实",
        heightCm: "待核实"
      }
    : undefined;
  const recentUpdateHistory = groupOverviewUpdates.slice(0, 5);
  const selectedUpdate = recentUpdateHistory[selectedUpdateIndex] ?? groupOverviewUpdate;
  const canShowPreviousUpdate = selectedUpdateIndex < recentUpdateHistory.length - 1;
  const canShowNextUpdate = selectedUpdateIndex > 0;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="py-6">
        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <h1 className="max-w-none text-2xl font-black leading-tight text-slate-100 sm:text-3xl lg:text-4xl xl:whitespace-nowrap">
            2026 世界杯 48 队小组全景
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
          <GroupCard key={group.id} group={group} qualifiedTeamCodes={getQualifiedTeamCodes(group.id)} onSelect={openGroup} />
        ))}
      </section>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        `已晋级` 仅标记已根据当前积分和剩余赛程数学上锁定 32 强席位的球队。
      </p>

      {filteredGroups.length === 0 && (
        <div className="mt-10 rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center backdrop-blur-md">
          <p className="text-lg font-black text-slate-100">没有匹配的小组</p>
          <p className="mt-2 text-sm text-slate-400">试试中文队名、英文队名、三字母代码或 A-L 组别。</p>
        </div>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
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

      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/78 px-4 py-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="group-modal-title"
          onClick={closeGroup}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 p-4 shadow-2xl shadow-black/50 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">Group {selectedGroup.id}</p>
                <h2 id="group-modal-title" className="mt-1.5 text-xl font-black text-slate-100 sm:text-2xl">
                  {selectedGroup.name} · {selectedGroup.headline}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeGroup}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-rose-300/60 hover:text-rose-100"
                aria-label="关闭弹窗"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-300">{selectedGroup.detail}</p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {selectedGroup.teams.map((team) => (
                <button
                  key={team.code}
                  type="button"
                  onClick={() => {
                    setSelectedTeamCode(team.code);
                    setSelectedPlayerName(null);
                  }}
                  className={`rounded-lg border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300/70 ${
                    selectedTeam?.code === team.code
                      ? "border-cyan-300/70 bg-cyan-300/10"
                      : "border-slate-700 bg-slate-800/50 hover:border-cyan-300/45 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" aria-hidden="true">
                      {team.flag}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="font-black text-slate-100">{team.name}</p>
                        {getQualifiedTeamCodes(selectedGroup.id).has(team.code) && (
                          <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-black text-emerald-200">
                            已晋级
                          </span>
                        )}
                      </div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {team.code} · {team.confederation}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em]">
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-400">Pot {team.pot}</span>
                    {team.host && <span className="rounded-full bg-cyan-300/10 px-2 py-0.5 text-cyan-100">Host</span>}
                    {team.debut && <span className="rounded-full bg-rose-300/10 px-2 py-0.5 text-rose-100">Debut</span>}
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-400">阵容</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedTeam && (
              <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2.5">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.26em] text-cyan-200">Squad</p>
                    <h3 className="mt-1 text-lg font-black text-slate-100">
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
                    <p className="mt-2 text-sm leading-5 text-slate-300">{selectedRoster.note}</p>
                    <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_280px]">
                      <div className="grid gap-2.5 md:grid-cols-2">
                        {rosterPositions.map((position) => {
                          const players = selectedRoster.players.filter((player) => player.position === position);

                          return (
                            <div key={position} className="rounded-lg border border-slate-700 bg-slate-900/60 p-2.5">
                              <div className="flex items-center justify-between">
                                <h4 className="font-black text-cyan-100">{position}</h4>
                                <span className="text-xs font-bold text-slate-500">{players.length} 人</span>
                              </div>
                              <ul className="mt-2 grid gap-1 text-sm text-slate-300">
                                {players.map((player) => (
                                  <li key={player.name}>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedPlayerName(player.name)}
                                      className={`w-full rounded-md px-2 py-1 text-left transition ${
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

                      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3 lg:sticky lg:top-4 lg:self-start">
                        {selectedPlayer ? (
                          <>
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">
                              Player Profile
                            </p>
                            <h4 className="mt-1.5 text-lg font-black text-slate-100">{selectedPlayer.chineseName}</h4>
                            <p className="mt-1 text-sm text-slate-400">{selectedPlayer.name}</p>
                            {selectedPlayerMeta && (
                              <div className="mt-3 grid grid-cols-3 gap-2">
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">号码</p>
                                  <p className="mt-1 truncate text-xs font-black text-slate-100">
                                    #{selectedRosterPlayer?.number ?? "待核实"}
                                  </p>
                                </div>
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">年龄</p>
                                  <p className="mt-1 text-xs font-black text-slate-100">{selectedPlayerMeta.age}</p>
                                </div>
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">出场</p>
                                  <p className="mt-1 text-xs font-black text-slate-100">{selectedPlayerMeta.caps}</p>
                                </div>
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">进球</p>
                                  <p className="mt-1 text-xs font-black text-slate-100">{selectedPlayerMeta.goals}</p>
                                </div>
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">身高</p>
                                  <p className="mt-1 text-xs font-black text-slate-100">
                                    {selectedPlayerMeta.heightCm === "待核实" ? "待核实" : `${selectedPlayerMeta.heightCm}cm`}
                                  </p>
                                </div>
                                <div className="rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">生日</p>
                                  <p className="mt-1 text-xs font-black text-slate-100">{selectedPlayerMeta.dob}</p>
                                </div>
                                <div className="col-span-3 rounded-md border border-slate-700 bg-slate-950/60 p-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">俱乐部</p>
                                  <p className="mt-1 break-words text-xs font-black leading-5 text-slate-100">
                                    {formatClubName(selectedPlayerMeta.club)}
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="mt-3 flex flex-wrap gap-1.5">
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
                            <p className="mt-3 text-sm leading-5 text-slate-300">{selectedPlayer.bio}</p>
                            <div className="mt-3">
                              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">特点</p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
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
                      className="mt-3 inline-flex rounded-full border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100"
                    >
                      来源：{selectedRoster.source} · {selectedRoster.publishedDate}
                    </a>
                  </>
                ) : (
                  <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900/60 p-3">
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

            <div className="mt-4 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3">
              <h3 className="font-black text-cyan-100">晋级形势与核心看点</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-5 text-slate-300">
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
