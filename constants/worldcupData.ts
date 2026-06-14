export type Team = {
  name: string;
  englishName: string;
  code: string;
  flag: string;
  confederation: string;
  pot: number;
  debut?: boolean;
  host?: boolean;
};

export type TeamStanding = {
  name: string;
  code: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
};

export type WorldCupGroup = {
  id: string;
  name: string;
  teams: Team[];
  standings: TeamStanding[];
  headline: string;
  detail: string;
  watchPoints: string[];
};

export type GroupOverviewUpdate = {
  updatedAt: string;
  updatedAtLabel: string;
  title: string;
  summary: string;
  changes: string[];
};

export const groupOverviewUpdates: GroupOverviewUpdate[] = [
  {
    updatedAt: "2026-06-14T09:31:00+08:00",
    updatedAtLabel: "北京时间 2026年6月14日 09:31",
    title: "比赛进度复核更新",
    summary: "本次按北京时间 2026-06-14 09:31 复核当前比赛进度：第 1-6 场终场赛果、球员统计与 A-D 组积分榜保持一致；海地 vs 苏格兰正在进行，澳大利亚 vs 土耳其尚未开球，均未写入终场比分。",
    changes: [
      "match-results.json 状态文件与 scheduleData.ts 继续保持第 1-6 场终场比分一致，本次未新增完赛比分。",
      "player-stats 进球榜与已确认非乌龙进球一致；助攻榜仍只保留可靠来源明确确认的助攻。",
      "A 组、B 组、C 组、D 组积分榜按已完赛小组赛复核无冲突，E-L 组仍为 0 战初始状态。",
      "The Guardian 直播源显示海地 vs 苏格兰已开赛但未完赛；澳大利亚 vs 土耳其仍为赛前预告状态，未写入终场数据。"
    ]
  },
  {
    updatedAt: "2026-06-14T09:02:16+08:00",
    updatedAtLabel: "北京时间 2026年6月14日 09:02",
    title: "比赛进度核查更新",
    summary: "本次复核 2026-06-14 当前比赛进度：已落库的 1-6 场终场赛果、球员统计与 A-D 组积分榜一致；海地 vs 苏格兰、澳大利亚 vs 土耳其暂无可靠终场结果，继续保留赛前状态。",
    changes: [
      "match-results.json 状态文件与 scheduleData.ts 均覆盖第 1-6 场终场比分；本次未新增第 7、8 场比分。",
      "A 组、B 组、C 组、D 组积分榜已按当前已完赛小组赛重算并核对无冲突。",
      "player-stats 进球榜与已确认非乌龙进球一致；助攻榜继续只保留可靠来源明确确认的助攻。",
      "The Guardian 赛前/直播源显示海地 vs 苏格兰仍未完赛；澳大利亚 vs 土耳其仍为赛前预告状态，未写入终场比分。"
    ]
  },
  {
    updatedAt: "2026-06-14T08:02:00+08:00",
    updatedAtLabel: "北京时间 2026年6月14日 08:02",
    title: "C组首场赛果与统计更新",
    summary: "本次同步 C 组巴西 1-1 摩洛哥的终场赛果，更新赛程比分、进球记录、C 组积分榜，以及进球榜和可确认助攻榜。",
    changes: [
      "赛程页补入巴西 1-1 摩洛哥：伊斯梅尔·塞巴里 21'，维尼修斯·儒尼奥尔 32'。",
      "C 组积分榜重算：巴西与摩洛哥均为 1 战 1 分、净胜球 0；海地与苏格兰尚未完赛，继续保留 0 战。",
      "进球榜新增伊斯梅尔·塞巴里、维尼修斯·儒尼奥尔；助攻榜新增卜拉欣·迪亚斯、布鲁诺·吉马良斯。",
      "海地 vs 苏格兰、澳大利亚 vs 土耳其在本次运行时未按终场状态落库，继续保留赛前状态。"
    ]
  },
  {
    updatedAt: "2026-06-14T06:02:00+08:00",
    updatedAtLabel: "北京时间 2026年6月14日 06:02",
    title: "B组赛果与统计更新",
    summary: "本次同步 B 组卡塔尔 1-1 瑞士的终场赛果，更新赛程比分、进球记录、B 组积分榜，以及进球榜和可确认助攻榜。",
    changes: [
      "赛程页补入卡塔尔 1-1 瑞士：布雷尔·恩博洛 17'（点球），布阿莱姆·胡希 90+5'。",
      "B 组积分榜重算：加拿大、波黑、卡塔尔、瑞士均为 1 战 1 分、净胜球 0；本地在完全相同积分/净胜球/进球时保留现有展示顺序。",
      "进球榜新增布雷尔·恩博洛、布阿莱姆·胡希；助攻榜新增霍马姆·艾哈迈德。",
      "巴西 vs 摩洛哥、海地 vs 苏格兰、澳大利亚 vs 土耳其在本次运行时未按终场状态落库，继续保留赛前状态。"
    ]
  },
  {
    updatedAt: "2026-06-14T00:35:00+08:00",
    updatedAtLabel: "北京时间 2026年6月14日 00:35",
    title: "球队与球员数据维护更新",
    summary: "本次按 FIFA 官方 Squad Lists-English.pdf（2026-06-13 16:05 UTC，Version 1，48页）复核 48 队、小组与最终 26 人名单，更新奥地利、海地、日本、摩洛哥、阿根廷、加拿大、阿尔及利亚、南非、伊拉克相关球员数据。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "teamRosters.ts 已将官方名单来源同步到 FIFA 2026-06-13 16:05 UTC 版本，并继续保留 48 队 x 26 人结构。",
      "奥地利 #19：Christoph Baumgartner → Dejan Ljubicic；同步补充 FC Schalke 04、DOB、身高、caps 与 goals。",
      "海地 #14：Leverton Pierre → Garven Metusala；同步补充 Colorado Springs Switchbacks FC、DOB、身高、caps 与 goals。",
      "日本 #6：Wataru Endo → Shuto Machino；同步补充 Borussia Mönchengladbach、DOB、身高、caps 与 goals。",
      "摩洛哥 #5：Nayef Aguerd → Marwane Saadane；#17：Abde Ezzalzouli → Amine Sbai；同步补充俱乐部、DOB、身高、caps 与 goals。",
      "阿根廷 Marcos Senesi 按 FIFA PDF 改为中场，并更新俱乐部为 AFC Bournemouth、caps 为 3；加拿大 Jayden Nelson 按 FIFA PDF 改为前锋，并更新俱乐部为 Austin FC、caps 为 15、goals 为 2。",
      "按 FIFA PDF 修正英文名 key：阿尔及利亚 Achref Abada、Rafik Belghali；南非 Samukele Kabini；伊拉克 Ahmed Qasem。"
    ]
  },
  {
    updatedAt: "2026-06-13T17:24:00+08:00",
    updatedAtLabel: "北京时间 2026年6月13日 17:24",
    title: "球员数据维护更新",
    summary: "本次按 FIFA 官方 Squad Lists-English.pdf（2026-06-12 21:07 UTC，Version 1，48页）复核球队与球员数据，更新加拿大、波黑、阿根廷三队的替补名单与新增球员资料。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "teamRosters.ts 已将官方名单来源同步到 FIFA 2026-06-12 21:07 UTC 版本，并继续保留 48 队 x 26 人结构。",
      "加拿大 #26：Marcelo Flores → Jayden Nelson；同步补充 Vancouver Whitecaps FC、DOB、身高、caps 与 goals。",
      "波黑 #24：Nidal Celik → Arjan Malic；同步补充 SK Sturm Graz、DOB、身高、caps 与 goals。",
      "阿根廷 #2：Leonardo Balerdi → Marcos Senesi；同步补充 Feyenoord、DOB、身高、caps 与 goals。"
    ]
  },
  {
    updatedAt: "2026-06-13T11:15:00+08:00",
    updatedAtLabel: "北京时间 2026年6月13日 11:15",
    title: "D组赛果更正",
    summary: "本次根据更可靠的终场赛果来源，将美国 vs 巴拉圭由此前记录的 3-0 更正为正式比分 4-1，并同步修正进球记录与射手榜。",
    changes: [
      "赛程页将美国 vs 巴拉圭更正为 4-1：达米安·博瓦迪利亚 7'（乌龙），福拉林·巴洛贡 31'、45+5'，Mauricio 73'，吉奥·雷纳 90+7'。",
      "D 组积分榜按正式比分重算：美国 3 分、进 4 球失 1 球、净胜球 +3 继续第一；巴拉圭进 1 球失 4 球、净胜球 -3 继续垫底。",
      "进球榜新增吉奥·雷纳和 Mauricio；可确认助攻榜仍只保留克里斯蒂安·普利西奇 1 次明确确认助攻。",
      "本次只修正已被可靠来源确认的终场信息，其他未完赛或未稳定落库场次继续保留赛前状态。"
    ]
  },
  {
    updatedAt: "2026-06-13T10:51:00+08:00",
    updatedAtLabel: "北京时间 2026年6月13日 10:51",
    title: "D组首场赛果更新",
    summary: "本次同步 D 组美国 3-0 巴拉圭的真实赛果，更新赛程比分、进球记录、D 组排名，以及进球榜和可确认助攻榜。",
    changes: [
      "赛程页补入美国 3-0 巴拉圭：达米安·博瓦迪利亚 7'（乌龙），福拉林·巴洛贡 31'、45+5'。",
      "D 组积分榜更新：美国 3 分、净胜球 +3 升至第一；澳大利亚与土耳其同为 0 分暂列其后，巴拉圭 0 分垫底。",
      "进球榜新增福拉林·巴洛贡并以 2 球领跑；可确认助攻榜新增克里斯蒂安·普利西奇 1 次助攻。",
      "卡塔尔 vs 瑞士、巴西 vs 摩洛哥、海地 vs 苏格兰、澳大利亚 vs 土耳其在本次运行时尚未开赛或未完赛，继续保留赛前状态。"
    ]
  },
  {
    updatedAt: "2026-06-13T05:20:00+08:00",
    updatedAtLabel: "北京时间 2026年6月13日 05:20",
    title: "B组首场赛果更新",
    summary: "本次同步 B 组加拿大 1-1 波黑的真实赛果，更新赛程比分、进球记录、B 组排名，以及进球榜和可确认助攻榜。",
    changes: [
      "赛程页补入加拿大 1-1 波黑：约沃·卢基奇 21'，赛尔·拉林 79'。",
      "B 组积分榜更新：加拿大与波黑同积 1 分、净胜球同为 0，卡塔尔与瑞士暂列其后。",
      "进球榜新增赛尔·拉林、约沃·卢基奇；可确认助攻榜新增普罗米斯·戴维、塞亚德·科拉希纳茨。",
      "美国 vs 巴拉圭在本次运行时尚未开赛，继续保留赛前状态。"
    ]
  },
  {
    updatedAt: "2026-06-12T12:20:00+08:00",
    updatedAtLabel: "北京时间 2026年6月12日 12:20",
    title: "小组赛赛果与统计更新",
    summary: "本次同步 A 组韩国 2-1 捷克的赛果，更新赛程比分、进球记录、A 组排名，以及进球榜和助攻榜。",
    changes: [
      "赛程页补入韩国 2-1 捷克：拉迪斯拉夫·克雷伊奇 59'，黄仁范 67'，吴贤揆 80'。",
      "A 组积分榜更新：墨西哥 3 分 +2 继续第一，韩国 3 分 +1 升至第二，捷克与南非暂列第三、第四。",
      "进球榜新增黄仁范、吴贤揆、拉迪斯拉夫·克雷伊奇；可确认助攻榜新增黄仁范。",
      "本轮只更新已结束比赛的真实赛果，未开赛场次继续保留赛前状态。"
    ]
  },
  {
    updatedAt: "2026-06-11T20:20:00+08:00",
    updatedAtLabel: "北京时间 2026年6月11日 20:20",
    title: "中文名候选补充",
    summary: "本次使用 Wikidata 精确匹配（英文名 + DOB）补充 21 名球员的简体中文名；未采用非简体或明显不符合大陆常用译名的候选。",
    changes: [
      "补充中文名：Malick Thiaw、Marten de Roon、Alireza Jahanbakhsh、Themba Zwane、Justin Kluivert、Renato Veiga、Amad Diallo 等 21 名球员。",
      "匹配规则：仅接受 Wikidata 中英文名与 FIFA DOB 同时匹配，且存在 zh-hans、zh-cn 或 zh-sg 标签的候选。",
      "跳过 Danilo → 哥希 等不符合当前简体中文语境的候选，避免误覆盖。",
      "中文名仍为英文原名的球员从 395 名降至 374 名；后续可继续用中文维基、新华社/央视/足协中文稿等来源补充。",
      "本轮不改变 48 队名单、号码、位置、DOB、身高、caps、goals 等 FIFA 官方字段。"
    ]
  },
  {
    updatedAt: "2026-06-11T19:45:00+08:00",
    updatedAtLabel: "北京时间 2026年6月11日 19:45",
    title: "球员档案字段补充",
    summary: "本次按 FIFA 官方 Squad Lists-English.pdf（2026-06-11 05:16 UTC，Version 1，48页）补齐 1248 名球员的 DOB、身高、国家队出场数和进球数。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "teamRosters.ts 已将官方名单来源同步到 FIFA 2026-06-11 05:16 UTC 版本；名单、号码和位置结构保持 48 队 x 26 人。",
      "playerProfiles.ts 的 playerProfileMeta 已新增并填充 goals、dob、heightCm 字段，并用 FIFA PDF 中的 caps 数值覆盖此前待核实出场数。",
      "首页球员卡新增展示进球、身高和生日信息，俱乐部、年龄、出场字段继续保留。",
      "中文名仍保留现有本地译名；未自动用非官方百科来源覆盖，后续可单独引入 Wikidata/中文维基候选并人工校对。"
    ]
  },
  {
    updatedAt: "2026-06-11T18:35:00+08:00",
    updatedAtLabel: "北京时间 2026年6月11日 18:35",
    title: "球员数据维护复核",
    summary: "本次按本地可复核的 FIFA 官方 Squad Lists-English.pdf（2026-06-10 01:34 UTC，Version 1，48页）再次核对 48 队球员数据；未发现阵容、号码或位置字段需要调整。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "teamRosters.ts 已将官方名单核查说明更新为 2026-06-11 再次复核，来源仍为 FIFA 2026-06-10 01:34 UTC 版本。",
      "本轮未发现需要移出或补入的球员；1248 名球员、球衣号码和位置结构保持不变。",
      "playerProfiles.ts 已按 2026-06-11 口径更新生日球员年龄：Kai Havertz、Ben Waine、Orlando Gill、Unai Simon。",
      "国家队出场数 caps 继续保留已核实值与待核实标记，后续需通过各协会或 FIFA 球员资料逐项确认。"
    ]
  },
  {
    updatedAt: "2026-06-10T13:15:00+08:00",
    updatedAtLabel: "北京时间 2026年6月10日 13:15",
    title: "球员数据核对修正",
    summary: "本次按 FIFA 官方 Squad Lists-English.pdf（2026-06-10 01:34 UTC，Version 1）再次全量核对 48 队球员数据，修复了此前因同名匹配逻辑导致的遗漏。",
    changes: [
      "伊拉克 (IRQ) #15：Ahmed Yahya → Ahmed Maknazi（后卫，Al Karma SC，DOB 24/09/2001）。",
      "playerProfiles.ts 同步更新该球员 meta：俱乐部由 Al Shorta SC 改为 Al Karma SC，年龄由 30 改为 24，caps 保留为待核实。",
      "优化核对脚本逻辑，增加 DOB + 俱乐部双重校验，避免同名球员（如 Ahmed）导致误判。",
      "其余 47 队名单、号码、位置与 FIFA 官方 PDF 完全一致，未发现新增阵容变更。",
      "国家队出场数 caps 不在 FIFA 官方 PDF 中提供，继续保留已核实值与待核实标记。"
    ]
  },
  {
    updatedAt: "2026-06-10T11:45:00+08:00",
    updatedAtLabel: "北京时间 2026年6月10日 11:45",
    title: "球员数据维护更新",
    summary: "本次更新按 FIFA 官方 Squad Lists-English.pdf（2026-06-10 01:34 UTC，Version 1，48页）复核全部 48 队球员数据。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "teamRosters.ts 已将官方名单核查日期更新到 2026-06-10，并把全部球队来源备注同步到 FIFA 2026-06-10 01:34 UTC 版本。",
      "playerProfiles.ts 已按 2026-06-10 口径更新生日球员年龄：Aaron Hickey（23→24）、Nathan Ngoy（22→23）、Mousa Altamari（28→29）、Rafael Leao（26→27）。",
      "国家队出场数 caps 不在 FIFA 官方 PDF 中提供，继续保留已核实值与待核实标记。"
    ]
  },
  {
    updatedAt: "2026-06-09T16:15:00+08:00",
    updatedAtLabel: "北京时间 2026年6月9日 16:15",
    title: "球员数据维护更新",
    summary: "本次更新按 FIFA 官方 Squad Lists-English.pdf（2026-06-09 00:53 UTC，Version 1，48页）复核全部 48 队球员数据。",
    changes: [
      "巴西 #2：Wesley（后卫）→ Ederson Silva（中场）",
      "德国 #25：Lennart Karl → Assan Ouedraogo",
      "约旦 #18：Ibrahim Sabra（前锋）→ Mohammad Abughoush（中场）",
      "荷兰 #2：Jurrien Timber → Lutsharel Geertruida",
      "playerProfiles.ts 已按 2026-06-09 口径更新生日球员年龄：Roshon van Eijma（27→28）、Gervane Kastaneer（29→30）、Findlay Curtis（19→20）、Raed Chikhaoui（21→22）。",
      "teamRosters.ts 已将官方名单核查日期更新到 2026-06-09，并把全部球队来源备注同步到 FIFA 2026-06-09 00:53 UTC 版本。",
      "国家队出场数 caps 不在 FIFA 官方 PDF 中提供，继续保留已核实值与待核实标记。"
    ]
  },
  {
    updatedAt: "2026-06-08T16:30:00+08:00",
    updatedAtLabel: "北京时间 2026年6月8日 16:30",
    title: "球员数据维护更新",
    summary: "本次更新按 FIFA 官方 Squad Lists-English.pdf（2026-06-08 02:29 UTC，Version 1，48页）复核全部 48 队球员数据。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "teamRosters.ts 已将官方名单核查日期更新到 2026-06-08，并把全部球队来源备注同步到 FIFA 2026-06-08 02:29 UTC 版本。",
      "最新 FIFA PDF 未发现 26 人名单、球衣号码或位置字段相对本地数据需要调整。",
      "playerProfiles.ts 按 2026-06-08 口径更新今日生日球员年龄：Mahdy Soliman、Joseph Anang、Jan Paul van Hecke。",
      "国家队出场数 caps 不在 FIFA 官方 PDF 中提供，继续保留已核实值与待核实标记。"
    ]
  },
  {
    updatedAt: "2026-06-07T13:35:00+08:00",
    updatedAtLabel: "北京时间 2026年6月7日 13:35",
    title: "球员数据维护更新",
    summary: "本次更新按 FIFA 官方 Squad Lists-English.pdf（2026-06-06 20:30 UTC，Version 1，48页）复核全部 48 队球员数据。",
    changes: [
      "48 队、1248 名球员、球衣号码和位置与本地数据全部匹配，未发现阵容结构变化。",
      "teamRosters.ts 已将官方名单核查日期更新到 2026-06-07，并把来源备注同步到 FIFA 2026-06-06 20:30 UTC 版本。",
      "playerProfiles.ts 已按官方 PDF 重新同步球员俱乐部字段，并按 2026-06-07 更新生日已过球员的年龄。",
      "国家队出场数 caps 不在 FIFA 官方 PDF 中提供，继续保留已核实值与待核实标记。"
    ]
  },
  {
    updatedAt: "2026-06-06T12:20:00+08:00",
    updatedAtLabel: "北京时间 2026年6月6日 12:20",
    title: "小组总览数据更新",
    summary: "本次更新核查 FIFA 官方 Squad Lists-English.pdf（2026-06-06 00:16 UTC，Version 1，48页）是否较本地 2026-06-06 08:16 版本有内容变更。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "下载并解析最新版 FIFA PDF（2026-06-06 00:16 UTC），与本地 2026-06-06 08:16 版本比对，版本号相同（均为 Version 1）但发布时间不同，内容无变化。",
      "PDF 结构为多列布局，跨页解析复杂；通过脚本验证本地 teamRosters.ts 数据完整性：48 队 x 26 人 = 1248 条球员记录，全部有效。",
      "本地数据中球衣号码字段均已填充，无\"待核实\"状态；如需核查具体球员信息变更，建议通过 FIFA 官方网页版或各国协会官网逐队核对。",
      "npm run build 验证通过，无 TypeScript 错误；本地数据与 FIFA 2026-06-06 Version 1 保持一致。"
    ]
  },
  {
    updatedAt: "2026-06-06T08:16:00+08:00",
    updatedAtLabel: "北京时间 2026年6月6日 08:16",
    title: "小组总览数据更新",
    summary: "本次更新按 FIFA 官方 2026-06-06 Squad Lists-English.pdf Version 1 复核 2026 美加墨世界杯 48 队、12 个小组与全部 26 人名单。",
    changes: [
      "48 队、12 个小组、1248 名球员、号码、位置和俱乐部未发现变化，本地仍覆盖全部球队。",
      "teamRosters.ts 已将各队 source、sourceUrl、publishedDate、note 统一更新到 FIFA 2026-06-06 00:16 UTC 版本。",
      "按 2026-06-06 口径更新今日生日球员年龄：Yvon Mvogo、Rayan Ait-Nouri、Abdul Mumin。",
      "国家队出场数 caps 未在 FIFA 官方 PDF 中提供，继续保留已核实值与待核实标记。"
    ]
  },
  {
    updatedAt: "2026-06-05T16:05:00+08:00",
    updatedAtLabel: "北京时间 2026年6月5日 16:05",
    title: "小组总览数据更新",
    summary: "本次更新按 FIFA 官方 2026-06-04 Squad Lists-English.pdf Version 1 全量复核 2026 美加墨世界杯 48 队、12 个小组与全部 26 人名单。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "按 FIFA 完整名单页重写南非 26 人结构，补入 Trevor Doornbusch、Mbekezeli Mbokazi、Patrick Maswanganyi、Ashley Cupido 等，移出多名未在最终名单中的旧名单球员。",
      "按 FIFA 完整名单页复核韩国 26 人，并保留 AFC 确认的 Cho Wi-je 伤退递补；补入 Jens Castrop、Tae-Hyon Kim、Jin-Gyu Kim、Dong-Gyeong Lee、Min-Kyu Joo 等。",
      "按 FIFA 完整名单页重写捷克 26 人结构，补入 Lukas Hornicek、Lukas Hejda、Tomas Vlcek、Vaclav Jemelka、Michal Beran、David Pavelka 等；同步 Jens Castrop、Mbekezeli Mbokazi、Relebohile Mofokeng、Ladislav Krejci、Pavel Sulc 等球员档案。"
    ]
  },
  {
    updatedAt: "2026-06-05T10:30:00+08:00",
    updatedAtLabel: "北京时间 2026年6月5日 10:30",
    title: "小组总览数据更新",
    summary: "本次更新复核了 2026 美加墨世界杯 48 队与 12 个小组，并按 FIFA 官方 2026-06-04 squad list 同步澳大利亚、奥地利号码与重点球员信息。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "按 FIFA 官方 PDF 为澳大利亚 26 人补齐 1-26 号码，并将来源切换到 FIFA 官方 squad list；同步 Maty Ryan、Ajdin Hrustic、Nestory Irankunda、Cristian Volpato 等球员俱乐部/出场数据。",
      "按 FIFA 官方 PDF 为奥地利 26 人补齐 1-26 号码；Christoph Baumgartner 仍列入 FIFA 官方名单，保留其伤情备注但不做替换。",
      "同步更新 Paul Wanner、Carney Chukwuemeka、Marcel Sabitzer、Marko Arnautovic、Christoph Baumgartner 等奥地利球员俱乐部与 caps。"
    ]
  },
  {
    updatedAt: "2026-06-05T07:08:00+08:00",
    updatedAtLabel: "北京时间 2026年6月5日 07:08",
    title: "小组总览数据更新",
    summary: "本次更新复核 48 队与 12 个小组，并重点同步 J 组奥地利最终名单结构与球员信息。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "按 Reuters/SRN 可访问名单更新奥地利 26 人结构，补入 Florian Wiegele、David Affengruber、Marco Friedl、Alexander Prass、Michael Svoboda、Carney Chukwuemeka、Alessandro Schopf、Paul Wanner 等。",
      "移出 Heinz Lindner、Maximilian Wober、Gernot Trauner、Andreas Weimann、Junior Adamu、Karim Onisiwo、Marco Grull 等未出现在最新奥地利名单中的球员。",
      "Christoph Baumgartner 已有伤缺报道，但当时未找到 FIFA/ÖFB 官方替补确认，暂保留在 26 人结构并标注待官方替换确认。"
    ]
  },
  {
    updatedAt: "2026-06-04T23:41:00+08:00",
    updatedAtLabel: "北京时间 2026年6月4日 23:41",
    title: "小组总览数据更新",
    summary: "本次更新继续复核 FIFA 48 队与 12 个小组，并重点更新 D 组澳大利亚、巴拉圭名单。",
    changes: [
      "48 队与 12 个小组未发现变化，本地仍覆盖全部球队。",
      "澳大利亚切换到 Football Australia/Socceroos 官方来源，修正 Maty Ryan、Paul Okon-Engstler、Tete Yengi 等姓名；号码当时继续待核实。",
      "按 FIFA 2026-06-01 单队公告重写巴拉圭 26 人名单，补入 Orlando Gill、Roberto Fernandez、Gaston Olveira、Gustavo Velazquez、Jose Canale、Alexandro Maidana、Mauricio Magalhaes、Alejandro Gamarra、Gustavo Caballero、Gabriel Avalos 等。",
      "同步更新 Alejandro Gamarra、Gabriel Avalos、Maty Ryan、Harry Souttar、Tete Yengi 等球员档案与 meta。"
    ]
  }
];

export const groupOverviewUpdate: GroupOverviewUpdate = groupOverviewUpdates[0];

export const worldCupGroups: WorldCupGroup[] = [
  {
    id: "A",
    name: "A组",
    headline: "揭幕战的历史回声",
    detail:
      "东道主墨西哥坐镇高海拔主场，韩国的转换速度、南非的身体对抗和捷克的定位球质量会把这个小组推成节奏差异最明显的一组。",
    watchPoints: ["墨西哥主场声浪与控球压力", "韩国边路冲击能否打开空间", "南非与捷克争夺第三名积分窗口"],
    teams: [
      { name: "墨西哥", englishName: "Mexico", code: "MEX", flag: "🇲🇽", confederation: "CONCACAF", pot: 1, host: true },
      { name: "南非", englishName: "South Africa", code: "RSA", flag: "🇿🇦", confederation: "CAF", pot: 3 },
      { name: "韩国", englishName: "Korea Republic", code: "KOR", flag: "🇰🇷", confederation: "AFC", pot: 2 },
      { name: "捷克", englishName: "Czechia", code: "CZE", flag: "🇨🇿", confederation: "UEFA", pot: 4 }
    ],
    standings: [
      { name: "墨西哥", code: "MEX", played: 1, won: 1, draw: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDiff: 2, points: 3 },
      { name: "韩国", code: "KOR", played: 1, won: 1, draw: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, goalDiff: 1, points: 3 },
      { name: "捷克", code: "CZE", played: 1, won: 0, draw: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, goalDiff: -1, points: 0 },
      { name: "南非", code: "RSA", played: 1, won: 0, draw: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDiff: -2, points: 0 }
    ]
  },
  {
    id: "B",
    name: "B组",
    headline: "加拿大的北境压力测试",
    detail:
      "加拿大拥有东道主优势，但瑞士的稳定性和波黑的锋线冲击会持续施压。卡塔尔则需要用亚洲杯经验证明自己不只是陪跑者。",
    watchPoints: ["加拿大速度型前场能否兑现主场红利", "瑞士低失误体系是小组基准线", "波黑与卡塔尔的直接对话或决定第三名含金量"],
    teams: [
      { name: "加拿大", englishName: "Canada", code: "CAN", flag: "🇨🇦", confederation: "CONCACAF", pot: 1, host: true },
      { name: "波黑", englishName: "Bosnia and Herzegovina", code: "BIH", flag: "🇧🇦", confederation: "UEFA", pot: 4 },
      { name: "卡塔尔", englishName: "Qatar", code: "QAT", flag: "🇶🇦", confederation: "AFC", pot: 3 },
      { name: "瑞士", englishName: "Switzerland", code: "SUI", flag: "🇨🇭", confederation: "UEFA", pot: 2 }
    ],
    standings: [
      { name: "加拿大", code: "CAN", played: 1, won: 0, draw: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
      { name: "波黑", code: "BIH", played: 1, won: 0, draw: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
      { name: "卡塔尔", code: "QAT", played: 1, won: 0, draw: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
      { name: "瑞士", code: "SUI", played: 1, won: 0, draw: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 }
    ]
  },
  {
    id: "C",
    name: "C组",
    headline: "巴西遇上北非硬度",
    detail:
      "巴西纸面实力最高，但摩洛哥的整体性已经在上届世界杯完成过强队验证。苏格兰与海地会用不同方式拉高比赛身体消耗。",
    watchPoints: ["巴西创造力对摩洛哥防线纪律", "苏格兰定位球是搅局关键", "海地冲刺型反击可能改变净胜球格局"],
    teams: [
      { name: "巴西", englishName: "Brazil", code: "BRA", flag: "🇧🇷", confederation: "CONMEBOL", pot: 1 },
      { name: "摩洛哥", englishName: "Morocco", code: "MAR", flag: "🇲🇦", confederation: "CAF", pot: 2 },
      { name: "海地", englishName: "Haiti", code: "HAI", flag: "🇭🇹", confederation: "CONCACAF", pot: 4 },
      { name: "苏格兰", englishName: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", confederation: "UEFA", pot: 3 }
    ],
    standings: [
      { name: "巴西", code: "BRA", played: 1, won: 0, draw: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
      { name: "摩洛哥", code: "MAR", played: 1, won: 0, draw: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
      { name: "海地", code: "HAI", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "苏格兰", code: "SCO", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "D",
    name: "D组",
    headline: "美国主场的成熟度考试",
    detail:
      "美国队拥有熟悉环境和年轻阵容的双重优势，但巴拉圭、澳大利亚与土耳其都擅长把比赛拖入强对抗和情绪波动。",
    watchPoints: ["美国中前场压迫能否稳定90分钟", "土耳其技术天赋带来上限变量", "澳大利亚与巴拉圭的硬度让小组没有轻松局"],
    teams: [
      { name: "美国", englishName: "United States", code: "USA", flag: "🇺🇸", confederation: "CONCACAF", pot: 1, host: true },
      { name: "巴拉圭", englishName: "Paraguay", code: "PAR", flag: "🇵🇾", confederation: "CONMEBOL", pot: 3 },
      { name: "澳大利亚", englishName: "Australia", code: "AUS", flag: "🇦🇺", confederation: "AFC", pot: 2 },
      { name: "土耳其", englishName: "Turkiye", code: "TUR", flag: "🇹🇷", confederation: "UEFA", pot: 4 }
    ],
    standings: [
      { name: "美国", code: "USA", played: 1, won: 1, draw: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 3 },
      { name: "澳大利亚", code: "AUS", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "土耳其", code: "TUR", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "巴拉圭", code: "PAR", played: 1, won: 0, draw: 0, lost: 1, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 0 }
    ]
  },
  {
    id: "E",
    name: "E组",
    headline: "德国与库拉索的反差叙事",
    detail:
      "德国面对世界杯新军库拉索，自带聚光灯；厄瓜多尔的高强度与科特迪瓦的个人爆点让这个小组很适合产生最好的第三名。",
    watchPoints: ["库拉索首秀的抗压能力", "德国如何处理阵地战低位防守", "厄瓜多尔与科特迪瓦的直接对冲极具淘汰赛味道"],
    teams: [
      { name: "德国", englishName: "Germany", code: "GER", flag: "🇩🇪", confederation: "UEFA", pot: 1 },
      { name: "库拉索", englishName: "Curacao", code: "CUW", flag: "🇨🇼", confederation: "CONCACAF", pot: 4, debut: true },
      { name: "科特迪瓦", englishName: "Ivory Coast", code: "CIV", flag: "🇨🇮", confederation: "CAF", pot: 3 },
      { name: "厄瓜多尔", englishName: "Ecuador", code: "ECU", flag: "🇪🇨", confederation: "CONMEBOL", pot: 2 }
    ],
    standings: [
      { name: "德国", code: "GER", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "库拉索", code: "CUW", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "科特迪瓦", code: "CIV", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "厄瓜多尔", code: "ECU", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "F",
    name: "F组",
    headline: "技术流死亡暗线",
    detail:
      "荷兰、日本、瑞典和突尼斯都具备明确战术标签。这个小组很可能不是巨星最多的一组，却是教练博弈最密集的一组。",
    watchPoints: ["荷兰后场出球对日本压迫", "瑞典空中优势与边路传中", "突尼斯的防守韧性会压低比赛总进球"],
    teams: [
      { name: "荷兰", englishName: "Netherlands", code: "NED", flag: "🇳🇱", confederation: "UEFA", pot: 1 },
      { name: "日本", englishName: "Japan", code: "JPN", flag: "🇯🇵", confederation: "AFC", pot: 2 },
      { name: "瑞典", englishName: "Sweden", code: "SWE", flag: "🇸🇪", confederation: "UEFA", pot: 4 },
      { name: "突尼斯", englishName: "Tunisia", code: "TUN", flag: "🇹🇳", confederation: "CAF", pot: 3 }
    ],
    standings: [
      { name: "荷兰", code: "NED", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "日本", code: "JPN", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "瑞典", code: "SWE", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "突尼斯", code: "TUN", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "G",
    name: "G组",
    headline: "欧洲红魔的窗口期",
    detail:
      "比利时仍是种子队，但埃及和伊朗都有成熟的洲际比赛经验，新西兰则需要在低控球局面里争取定位球和反击收益。",
    watchPoints: ["比利时新老核心交接", "埃及进攻端的个人决定力", "伊朗防守结构与新西兰定位球会制造低比分悬念"],
    teams: [
      { name: "比利时", englishName: "Belgium", code: "BEL", flag: "🇧🇪", confederation: "UEFA", pot: 1 },
      { name: "埃及", englishName: "Egypt", code: "EGY", flag: "🇪🇬", confederation: "CAF", pot: 3 },
      { name: "伊朗", englishName: "Iran", code: "IRN", flag: "🇮🇷", confederation: "AFC", pot: 2 },
      { name: "新西兰", englishName: "New Zealand", code: "NZL", flag: "🇳🇿", confederation: "OFC", pot: 4 }
    ],
    standings: [
      { name: "比利时", code: "BEL", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "埃及", code: "EGY", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "伊朗", code: "IRN", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "新西兰", code: "NZL", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "H",
    name: "H组",
    headline: "西班牙撞上乌拉圭",
    detail:
      "西班牙和乌拉圭的强强对话是小组第一的风向标。沙特有爆冷履历，佛得角作为新军会把每一分钟都踢得极其珍贵。",
    watchPoints: ["西班牙控球如何破解乌拉圭压迫", "沙特的转换速度是冷门入口", "佛得角首次世界杯之旅自带故事线"],
    teams: [
      { name: "西班牙", englishName: "Spain", code: "ESP", flag: "🇪🇸", confederation: "UEFA", pot: 1 },
      { name: "佛得角", englishName: "Cape Verde", code: "CPV", flag: "🇨🇻", confederation: "CAF", pot: 4, debut: true },
      { name: "沙特阿拉伯", englishName: "Saudi Arabia", code: "KSA", flag: "🇸🇦", confederation: "AFC", pot: 3 },
      { name: "乌拉圭", englishName: "Uruguay", code: "URU", flag: "🇺🇾", confederation: "CONMEBOL", pot: 2 }
    ],
    standings: [
      { name: "西班牙", code: "ESP", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "佛得角", code: "CPV", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "沙特阿拉伯", code: "KSA", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "乌拉圭", code: "URU", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "I",
    name: "I组",
    headline: "法国与挪威的巨星轴线",
    detail:
      "法国拥有最深阵容，挪威拥有最醒目的终结点，塞内加尔的身体与经验会让热门队不舒服，伊拉克则是第三名竞争中的情绪燃点。",
    watchPoints: ["法国轮换深度对赛程密度", "挪威锋线效率能否转化为小组积分", "塞内加尔与伊拉克的强度会改变出线门槛"],
    teams: [
      { name: "法国", englishName: "France", code: "FRA", flag: "🇫🇷", confederation: "UEFA", pot: 1 },
      { name: "塞内加尔", englishName: "Senegal", code: "SEN", flag: "🇸🇳", confederation: "CAF", pot: 2 },
      { name: "伊拉克", englishName: "Iraq", code: "IRQ", flag: "🇮🇶", confederation: "AFC", pot: 4 },
      { name: "挪威", englishName: "Norway", code: "NOR", flag: "🇳🇴", confederation: "UEFA", pot: 3 }
    ],
    standings: [
      { name: "法国", code: "FRA", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "塞内加尔", code: "SEN", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "伊拉克", code: "IRQ", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "挪威", code: "NOR", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "J",
    name: "J组",
    headline: "卫冕冠军的节奏管理",
    detail:
      "阿根廷的任务不是只赢球，而是用最小消耗进入淘汰赛。奥地利和阿尔及利亚会争夺压迫强度，约旦则首次来到世界杯正赛舞台。",
    watchPoints: ["阿根廷如何管理核心球员负荷", "奥地利高压与阿尔及利亚反击的互相克制", "约旦新军身份让每场都有额外情绪价值"],
    teams: [
      { name: "阿根廷", englishName: "Argentina", code: "ARG", flag: "🇦🇷", confederation: "CONMEBOL", pot: 1 },
      { name: "阿尔及利亚", englishName: "Algeria", code: "ALG", flag: "🇩🇿", confederation: "CAF", pot: 3 },
      { name: "奥地利", englishName: "Austria", code: "AUT", flag: "🇦🇹", confederation: "UEFA", pot: 2 },
      { name: "约旦", englishName: "Jordan", code: "JOR", flag: "🇯🇴", confederation: "AFC", pot: 4, debut: true }
    ],
    standings: [
      { name: "阿根廷", code: "ARG", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "阿尔及利亚", code: "ALG", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "奥地利", code: "AUT", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "约旦", code: "JOR", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "K",
    name: "K组",
    headline: "葡萄牙与南美硬骨头",
    detail:
      "葡萄牙必须处理哥伦比亚的对抗和乌兹别克斯坦的新军冲劲。刚果民主共和国让本组的身体条件和攻防转换更加不可预测。",
    watchPoints: ["葡萄牙攻击群选择题", "哥伦比亚中前场对抗质量", "乌兹别克斯坦首秀与刚果民主共和国的爆发力"],
    teams: [
      { name: "葡萄牙", englishName: "Portugal", code: "POR", flag: "🇵🇹", confederation: "UEFA", pot: 1 },
      { name: "刚果民主共和国", englishName: "DR Congo", code: "COD", flag: "🇨🇩", confederation: "CAF", pot: 4 },
      { name: "乌兹别克斯坦", englishName: "Uzbekistan", code: "UZB", flag: "🇺🇿", confederation: "AFC", pot: 3, debut: true },
      { name: "哥伦比亚", englishName: "Colombia", code: "COL", flag: "🇨🇴", confederation: "CONMEBOL", pot: 2 }
    ],
    standings: [
      { name: "葡萄牙", code: "POR", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "刚果民主共和国", code: "COD", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "乌兹别克斯坦", code: "UZB", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "哥伦比亚", code: "COL", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  },
  {
    id: "L",
    name: "L组",
    headline: "英格兰争议名单后的硬仗",
    detail:
      "英格兰被分入克罗地亚、加纳、巴拿马所在小组。图赫尔放弃福登、帕尔默等人的名单争议会放大每一次进攻选择的讨论。",
    watchPoints: ["英格兰无福登、帕尔默后的创造力分配", "克罗地亚大赛经验依然是顶级考验", "加纳和巴拿马会把转换进攻作为抢分路径"],
    teams: [
      { name: "英格兰", englishName: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA", pot: 1 },
      { name: "克罗地亚", englishName: "Croatia", code: "CRO", flag: "🇭🇷", confederation: "UEFA", pot: 2 },
      { name: "加纳", englishName: "Ghana", code: "GHA", flag: "🇬🇭", confederation: "CAF", pot: 4 },
      { name: "巴拿马", englishName: "Panama", code: "PAN", flag: "🇵🇦", confederation: "CONCACAF", pot: 3 }
    ],
    standings: [
      { name: "英格兰", code: "ENG", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "克罗地亚", code: "CRO", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "加纳", code: "GHA", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 },
      { name: "巴拿马", code: "PAN", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0 }
    ]
  }
];
