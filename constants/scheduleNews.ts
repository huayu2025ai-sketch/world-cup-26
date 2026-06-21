export type MatchNewsImpact = "injury" | "suspension" | "form" | "tactical" | "weather";

export type MatchNewsItem = {
  type: MatchNewsImpact;
  title: string;
  summary: string;
  affectedTeam: string;
  affectedPlayer?: string;
  severity: "high" | "medium" | "low";
  date: string;        // 情报发布日期 YYYY-MM-DD
  channel: string;     // 来源媒体/渠道
  sourceUrl?: string;
};

export type MatchNews = {
  matchId: number;
  updatedAt: string;
  items: MatchNewsItem[];
};

export const matchNewsMap: Record<number, MatchNews> = {
  // 墨西哥 vs 南非 (6/11)
  1: {
    matchId: 1,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "form",
        title: "墨西哥揭幕战2-0取胜，主场氛围明显提振",
        summary:
          "墨西哥在阿兹特克球场揭幕战2-0击败南非，朱利安·奎尼奥内斯早早破门，劳尔·希门尼斯下半场扩大比分。主场声浪与开门红会继续影响A组后续走势。",
        affectedTeam: "墨西哥",
        affectedPlayer: "朱利安·奎尼奥内斯 / 劳尔·希门尼斯",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/mexico-south-africa-world-cup-2026",
      },
      {
        type: "form",
        title: "南非重返世界杯首战受挫",
        summary:
          "南非自2010年后首次回到世界杯正赛，首战面对东道主墨西哥未能拿分。球队需要在随后对韩国、捷克的比赛中提升进攻效率，否则A组出线压力会迅速放大。",
        affectedTeam: "南非",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian / New York Post",
        sourceUrl: "https://nypost.com/2026/06/11/sports/fifa-world-cup-kicks-off-in-mexico-city-with-opening-ceremony-big-on-stars-and-local-culture/",
      },
    ],
  },

  // 韩国 vs 捷克 (6/11)
  2: {
    matchId: 2,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "tactical",
        title: "韩国改打3-4-3，依赖孙兴慜和李刚仁个人推进",
        summary:
          "韩国首发排出3-4-3，金玟哉坐镇三中卫，薛英佑和李泰锡承担翼卫职责。球队无球时回落成5-2-3，中前场推进仍主要依赖孙兴慜、李刚仁和李在城的个人处理。",
        affectedTeam: "韩国",
        affectedPlayer: "孙兴慜 / 李刚仁 / 金玟哉",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/live/2026/jun/12/fifa-world-cup-2026-live-south-korea-v-czechia-updates-kor-vs-cze-group-a-match-score-latest",
      },
      {
        type: "form",
        title: "捷克点球附加赛晋级，希克锋线状态回升",
        summary:
          "捷克通过连续两轮附加赛点球大战进入世界杯，帕特里克·希克仍是最主要的进攻支点。赛前报道提到他在勒沃库森赛季末体能和状态均有改善，捷克进攻会围绕他与绍切克的中轴展开。",
        affectedTeam: "捷克",
        affectedPlayer: "帕特里克·希克 / 托马什·绍切克",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/live/2026/jun/12/fifa-world-cup-2026-live-south-korea-v-czechia-updates-kor-vs-cze-group-a-match-score-latest",
      },
    ],
  },

  // 加拿大 vs 波黑 (6/12)
  3: {
    matchId: 3,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "injury",
        title: "阿方索·戴维斯恢复中，加拿大首战大概率赶不上",
        summary:
          "马什赛前表示阿方索·戴维斯仍在从腿筋伤势中恢复，加拿大对波黑的主场揭幕战对他来说来得太早。加拿大左路推进和转换速度会受到直接影响。",
        affectedTeam: "加拿大",
        affectedPlayer: "阿方索·戴维斯",
        severity: "high",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/canada-world-cup-opening-game-jesse-marsch",
      },
      {
        type: "injury",
        title: "邦比托曾有缺席风险，但赛前发布会称可出战",
        summary:
          "加拿大后卫莫伊塞·邦比托此前被认为可能因伤无缘整届赛事；马什随后在赛前发布会确认邦比托和伊斯梅尔·科内均可出战，后防用人压力有所缓解。",
        affectedTeam: "加拿大",
        affectedPlayer: "莫伊塞·邦比托 / 伊斯梅尔·科内",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/jesse-masrch-canada-us-national-anthem-world-cup",
      },
      {
        type: "form",
        title: "加拿大近9场运动战仅2球，进攻效率是隐忧",
        summary:
          "加拿大赛前最大隐患不只在伤病，还包括运动战进球效率偏低。报道提到球队近9场比赛只有2个运动战进球，主帅马什强调保持积极，但首战若迟迟打不开局面，压力会很快堆到锋线。",
        affectedTeam: "加拿大",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/canada-world-cup-opening-game-jesse-marsch",
      },
    ],
  },

  // 巴西 vs 摩洛哥 (6/13)
  6: {
    matchId: 6,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "injury",
        title: "内马尔小腿伤恢复进展良好，但首战仍需观察",
        summary:
          "巴西足协通报称内马尔接受MRI复查后恢复进展良好，将继续按医疗组计划训练和康复。他没有参加周一合练，能否在对摩洛哥首战出场仍取决于临场评估。",
        affectedTeam: "巴西",
        affectedPlayer: "内马尔",
        severity: "high",
        date: "2026-06-09",
        channel: "Reuters / CBF / The Guardian",
        sourceUrl: "https://www.theguardian.com/football/live/2026/jun/09/world-cup-2026-news-olise-dazzles-in-france-friendly-neymar-recovering-well-england-latest-live",
      },
      {
        type: "form",
        title: "摩洛哥热度高，外界期待延续非洲突破",
        summary:
          "摩洛哥延续2022年世界杯四强后的高期待，国际媒体把他们列为本届最受关注的非洲球队之一。面对巴西的强强对话会直接检验其防守反击和大赛成熟度。",
        affectedTeam: "摩洛哥",
        severity: "medium",
        date: "2026-06-09",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/09/africa-10-contenders-teams-world-cup-2026-morocco-egypt-senegal-cote-d-ivoire",
      },
      {
        type: "tactical",
        title: "巴西热身赛2-1埃及，安切洛蒂试验三后卫",
        summary:
          "6月6日热身赛2-1击败埃及，卡洛·安切洛蒂试验了三后卫体系，马尔基尼奥斯-加布里埃尔-布雷默搭档。面对摩洛哥强硬防守，此阵型可能继续使用。",
        affectedTeam: "巴西",
        severity: "medium",
        date: "2026-06-08",
        channel: "FourFourTwo",
        sourceUrl: "https://www.fourfourtwo.com/team/brazil-world-cup-2026-squad",
      },
    ],
  },

  // 美国 vs 巴拉圭 (6/12)
  4: {
    matchId: 4,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "form",
        title: "美国26人均可出战，波切蒂诺强调放松和信任",
        summary:
          "美国队赛前确认26名球员均可供选择。波切蒂诺在揭幕战前淡化过度动员，强调放松、信任训练成果和团队连接，这意味着首战阵容不会受大面积伤病限制。",
        affectedTeam: "美国",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/usmnt-pochettino-press-conference-paraguay-world-cup",
      },
      {
        type: "tactical",
        title: "美国阵容防守配置偏重，巴洛贡近期状态被看好",
        summary:
          "美国本届阵容包含大量后卫和防守型中场，外界关注球队能否在控球和转换防守之间找到平衡。锋线方面，福拉林·巴洛贡赛前状态被认为出色，可能承担更多终结任务。",
        affectedTeam: "美国",
        affectedPlayer: "福拉林·巴洛贡",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/world-cup-group-d-usa-co-hosts-australia-turkey-paraguay-football",
      },
      {
        type: "tactical",
        title: "巴拉圭身体对抗和反击是美国首战主要考题",
        summary:
          "巴拉圭被描述为结构清晰、对抗强、擅长反击的球队，胡利奥·恩西索、古斯塔沃·戈麦斯和奥马尔·阿尔德雷特会构成前后场关键支点。美国若压上过深，身后空间会成为风险点。",
        affectedTeam: "巴拉圭",
        affectedPlayer: "胡利奥·恩西索 / 古斯塔沃·戈麦斯",
        severity: "medium",
        date: "2026-06-12",
        channel: "Stars and Stripes FC",
        sourceUrl: "https://www.starsandstripesfc.com/usmnt-news/44224/2026-world-cup-previewing-usa-vs-paraguay-all-gas-no-brakes",
      },
    ],
  },

  // 海地 vs 苏格兰 (6/13)
  7: {
    matchId: 7,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "injury",
        title: "麦克托米奈因胃部不适缺训，但苏格兰相信可赶上首战",
        summary:
          "斯科特·麦克托米奈因胃部不适缺席训练，队内消息认为更多是预防措施。作为苏格兰中场最重要的推进和得分点之一，他的身体状态会直接影响对海地的首战强度。",
        affectedTeam: "苏格兰",
        affectedPlayer: "斯科特·麦克托米奈",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/scott-mctominay-scotland-world-cup-opener-stomach-bug",
      },
      {
        type: "injury",
        title: "吉尔摩因膝伤无缘名单，弗莱彻补进中场轮换",
        summary:
          "比利·吉尔摩因对库拉索时遭遇的膝伤缺席世界杯，但仍随队前往波士顿支持球队。19岁的泰勒·弗莱彻因此进入名单，苏格兰中场轮换经验下降。",
        affectedTeam: "苏格兰",
        affectedPlayer: "比利·吉尔摩 / 泰勒·弗莱彻",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/scott-mctominay-scotland-world-cup-opener-stomach-bug",
      },
    ],
  },

  // 澳大利亚 vs 土耳其 (6/14)
  8: {
    matchId: 8,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "injury",
        title: "莫·图雷缺训引发锋线伤情警报",
        summary:
          "澳大利亚前锋莫·图雷在赛前训练中缺席，官方称预计次日回归，但他有肌肉伤病史。若图雷无法首发，澳大利亚正印中锋选择有限，特特·延吉将承受更大压力。",
        affectedTeam: "澳大利亚",
        affectedPlayer: "莫·图雷 / 特特·延吉",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/mo-toure-injury-scare-world-cup-socceroos-striker",
      },
      {
        type: "tactical",
        title: "土耳其进攻天赋充足，但中卫协同和定位球防守仍是短板",
        summary:
          "蒙特拉的土耳其以居莱尔、伊尔迪兹和恰尔汗奥卢为核心，常用4-2-3-1控制球权。赛前分析同时指出球队中卫组合默契、反击防守和定位球防守仍不稳定。",
        affectedTeam: "土耳其",
        affectedPlayer: "阿尔达·居莱尔 / 凯南·伊尔迪兹 / 哈坎·恰尔汗奥卢",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/blog/2026/jun/12/world-cup-group-d-matches-turkey-national-football-team-strengths-weaknesses",
      },
    ],
  },

  // 德国 vs 库拉索 (6/14)
  9: {
    matchId: 9,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "伦纳特·卡尔大腿肌肉撕裂伤退，韦德拉奥戈入替",
        summary:
          "18岁中场伦纳特·卡尔在训练中大腿肌肉撕裂，德国足协确认其退出，由RB莱比锡的20岁中场阿桑·韦德拉奥戈顶替。",
        affectedTeam: "德国",
        affectedPlayer: "伦纳特·卡尔 / 阿桑·韦德拉奥戈",
        severity: "medium",
        date: "2026-06-09",
        channel: "ESPN / DFB",
      },
      {
        type: "injury",
        title: "塞尔日·格纳布里、马克-安德烈·特尔施特根因伤缺席",
        summary:
          "格纳布里因内收肌撕裂赛季报销，特尔施特根大腿肌肉伤势未愈，两人均未入选26人名单。纳格尔斯曼召回了退役的诺伊尔担任一门。",
        affectedTeam: "德国",
        affectedPlayer: "塞尔日·格纳布里 / 马克-安德烈·特尔施特根",
        severity: "high",
        date: "2026-06-08",
        channel: "ESPN / talkSPORT",
      },
      {
        type: "tactical",
        title: "菲尔克鲁格落选，哈弗茨领衔锋线",
        summary:
          "纳格尔斯曼在5月21日公布的最终名单中放弃了2024欧洲杯的超级替补尼克拉斯·菲尔克鲁格，后者在AC米兰租借期间19场意甲仅1球。凯·哈弗茨将作为中锋领衔锋线，马克西米利安·拜尔和德尼兹·翁达夫提供板凳深度。",
        affectedTeam: "德国",
        affectedPlayer: "尼克拉斯·菲尔克鲁格",
        severity: "medium",
        date: "2026-06-07",
        channel: "worldcup26hub.com",
      },
    ],
  },

  // 荷兰 vs 日本 (6/14)
  10: {
    matchId: 10,
    updatedAt: "2026-06-09",
    items: [
      {
        type: "injury",
        title: "尤里恩·廷伯腹股沟伤退出世界杯",
        summary:
          "廷伯在欧冠决赛后腹股沟伤势未愈，荷兰足协官方声明其无法以医学负责的方式参赛，由桑德兰的卢特沙雷尔·海特勒伊达顶替。",
        affectedTeam: "荷兰",
        affectedPlayer: "尤里恩·廷伯 / 卢特沙雷尔·海特勒伊达",
        severity: "high",
        date: "2026-06-09",
        channel: "ESPN / 荷兰足协",
      },
      {
        type: "injury",
        title: "三笘薫腿筋伤落选最终名单",
        summary:
          "布莱顿边锋三笘薫在赛季末段腿筋受伤，日本主帅森保一确认其无法在开赛前恢复，未进入26人名单。日本队边路突破能力受损。",
        affectedTeam: "日本",
        affectedPlayer: "三笘薫",
        severity: "high",
        date: "2026-06-09",
        channel: "ESPN",
      },
      {
        type: "injury",
        title: "荷兰后防再伤一人，廷柏尔确认缺席世界杯",
        summary:
          "荷兰队伤病情况持续恶化，继廷伯之后，后防再添伤员。荷兰在备战期间遭遇严重伤病危机，多名主力球员先后退出大名单，主帅科曼的防守端选择极为有限。",
        affectedTeam: "荷兰",
        severity: "high",
        date: "2026-06-10",
        channel: "USA Today / ESPN",
        sourceUrl: "https://www.usatoday.com",
      },
    ],
  },

  // 卡塔尔 vs 瑞士 (6/13)
  5: {
    matchId: 5,
    updatedAt: "2026-06-14",
    items: [
      {
        type: "form",
        title: "卡塔尔补时扳平，拿到队史世界杯首个积分",
        summary:
          "卡塔尔在长时间被压制的局面下守住比分悬念，并由布阿莱姆·胡希在90+5分钟头球扳平瑞士，1-1拿到队史世界杯首个积分。B组首轮两场均为平局，小组形势继续胶着。",
        affectedTeam: "卡塔尔",
        affectedPlayer: "布阿莱姆·胡希 / 霍马姆·艾哈迈德",
        severity: "medium",
        date: "2026-06-13",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/live/2026/jun/13/qatar-v-switzerland-world-cup-2026-live",
      },
      {
        type: "tactical",
        title: "瑞士早早点球领先但错失扩大优势",
        summary:
          "瑞士由布雷尔·恩博洛在17分钟点球破门，但之后未能把控球和射门优势转化为第二球，补时阶段被卡塔尔扳平。球队仍保持不败，但在同积1分的B组中错失抢占先机的机会。",
        affectedTeam: "瑞士",
        affectedPlayer: "布雷尔·恩博洛",
        severity: "medium",
        date: "2026-06-13",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/live/2026/jun/13/qatar-v-switzerland-world-cup-2026-live",
      },
    ],
  },

  // 科特迪瓦 vs 厄瓜多尔 (6/14)
  11: {
    matchId: 11,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "form",
        title: "科特迪瓦大赛经验提升，锋线深度充足",
        summary:
          "科特迪瓦近年来在大赛中积累了经验，球队整体年龄结构合理，锋线有塞缪尔·肖穆罗多夫和埃弗丁·格拉德尔等具备五大联赛经验的球员。中场控制力和防守层次感是关键。",
        affectedTeam: "科特迪瓦",
        affectedPlayer: "塞缪尔·肖穆罗多夫 / 埃弗丁·格拉德尔",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/12/ivory-coast-world-cup-2026-preview",
      },
      {
        type: "form",
        title: "厄瓜多尔高原主场优势转化，客场能力待验证",
        summary:
          "厄瓜多尔以高原主场著称，本次世界杯移师美国，客场环境与备战条件与往届不同。厄瓜多尔的对抗强度和定位球能力突出，但离开基多后的发挥存在不确定性。",
        affectedTeam: "厄瓜多尔",
        severity: "medium",
        date: "2026-06-12",
        channel: "ESPN",
        sourceUrl: "https://www.espn.com/football/story/_/id/42612327/ecuador-world-cup-2026-squad-preview",
      },
    ],
  },

  // 瑞典 vs 突尼斯 (6/14)
  12: {
    matchId: 12,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "injury",
        title: "瑞典后卫埃米尔·克拉夫特因伤缺席世界杯",
        summary:
          "埃米尔·克拉夫特在赛季末段受伤，瑞典主帅确认其无缘本届世界杯。中卫位置将由亚历山大·米洛舍维奇或卡尔·斯塔莫尼填补，空中对抗和后防指挥会受到一定影响。",
        affectedTeam: "瑞典",
        affectedPlayer: "埃米尔·克拉夫特",
        severity: "high",
        date: "2026-06-09",
        channel: "Swedish Football Association / ESPN",
      },
      {
        type: "tactical",
        title: "突尼斯防守凶狠但进攻转化偏弱",
        summary:
          "突尼斯以4-3-3为基础，防守时五后卫体系落位迅速，铲球和对抗数据亮眼。但进攻端缺乏稳定的终结点，定位球是主要的破门手段。面对瑞典的中路密集防守，突尼斯需要有球时的创造性方案。",
        affectedTeam: "突尼斯",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/12/tunisia-world-cup-2026-squad-preview",
      },
    ],
  },

  // 西班牙 vs 佛得角 (6/15)
  13: {
    matchId: 13,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "form",
        title: "西班牙年轻阵容主打传控，大赛首战状态是关键",
        summary:
          "西班牙本期名单年龄结构偏年轻，拉明·亚马尔和佩德里等新星将承担核心角色。德拉富恩特的球队强调控球和前场压迫，首战面对佛得角需要尽快确立节奏，压制对手的防守反击。",
        affectedTeam: "西班牙",
        affectedPlayer: "拉明·亚马尔 / 佩德里",
        severity: "medium",
        date: "2026-06-12",
        channel: "Marca / The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/12/spain-world-cup-2026-squad-preview",
      },
      {
        type: "form",
        title: "佛得角鱼腩定位，防守韧性是最大看點",
        summary:
          "佛得角作为小组最弱的球队，首要目标是减少失球。球队在中前场的跑动能力和对抗强度是能否给西班牙制造麻烦的关键。赛前预计西班牙会主导控球，佛得角需要提升反击效率。",
        affectedTeam: "佛得角",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/12/cape-verde-world-cup-2026-squad-preview",
      },
    ],
  },

  // 比利时 vs 埃及 (6/15)
  14: {
    matchId: 14,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "injury",
        title: "比利时中场凯文·德布劳内伤情成疑，首战不确定",
        summary:
          "德布劳内在赛季后期出现腹股沟不适，缺席了部分训练课。主帅泰斯·文卡特斯表示会等待最后评估结果。作为比利时进攻核心，德布劳内的状态直接影响球队的创造力和门前终结。",
        affectedTeam: "比利时",
        affectedPlayer: "凯文·德布劳内",
        severity: "high",
        date: "2026-06-11",
        channel: "ESPN / HLN",
        sourceUrl: "https://www.espn.com/football/story/_/id/42612326/belgium-world-cup-2026-squad-preview",
      },
      {
        type: "tactical",
        title: "埃及定位球和防守是核心武器",
        summary:
          "埃及以稳固的防守结构和出色的定位球能力著称，穆罕默德·萨拉赫是进攻端最关键的球员。中场拦截和防线紧凑度是埃及的标签。面对比利时的高控球率，埃及需要在中场争夺和快速转换中找到平衡。",
        affectedTeam: "埃及",
        affectedPlayer: "穆罕默德·萨拉赫",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/12/egypt-world-cup-2026-squad-preview",
      },
    ],
  },

  // 沙特阿拉伯 vs 乌拉圭 (6/15)
  15: {
    matchId: 15,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "form",
        title: "沙特阿拉伯首战受挫，锋线急需提效",
        summary:
          "沙特在首场对阵技术型球队时进攻效率偏低，过度依赖萨勒姆·阿尔达萨里和马尔旺·萨阿迪的个人能力。中场创造力和门前一脚是当前最大短板，面对乌拉圭的强硬防守，需要提升整体进攻流畅度。",
        affectedTeam: "沙特阿拉伯",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/12/saudi-arabia-world-cup-2026-squad-preview",
      },
      {
        type: "form",
        title: "乌拉圭老将压阵，达尔文·努涅斯是关键人物",
        summary:
          "乌拉圭阵容老将丰富，迭戈·戈丁和埃丁森·卡瓦尼等老将压阵。锋线上的达尔文·努涅斯是当前最重要的得分点，身体对抗和冲刺速度是乌拉圭转换进攻的核心武器。面对沙特，乌拉圭在整体深度和经验上占优。",
        affectedTeam: "乌拉圭",
        affectedPlayer: "达尔文·努涅斯 / 埃丁森·卡瓦尼",
        severity: "medium",
        date: "2026-06-12",
        channel: "ESPN",
        sourceUrl: "https://www.espn.com/football/story/_/id/42612325/uruguay-world-cup-2026-squad-preview",
      },
    ],
  },

  // 伊朗 vs 新西兰 (6/15)
  16: {
    matchId: 16,
    updatedAt: "2026-06-12",
    items: [
      {
        type: "form",
        title: "伊朗防守稳固，锋线关键球员缺阵影响大",
        summary:
          "伊朗的战术体系以紧凑防守和高效反击为基础，但锋线核心萨达尔·阿兹蒙和迈赫迪·托拉比因伤缺席，整体得分能力受损。中场拦截和后场出球是伊朗的命脉，面对新西兰需要做好持久战的准备。",
        affectedTeam: "伊朗",
        affectedPlayer: "萨达尔·阿兹蒙 / 迈赫迪·托拉比",
        severity: "high",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/iran-world-cup-2026-squad-preview",
      },
      {
        type: "tactical",
        title: "新西兰身体对抗是优势，攻防转换节奏是短板",
        summary:
          "新西兰的打法依赖身体素质和空中优势，克里斯·伍德是进攻线的关键支点。但球队在快速攻防转换中的决策速度偏慢，面对伊朗的防守紧凑度，需要提升有球时的创造力和穿透性。",
        affectedTeam: "新西兰",
        affectedPlayer: "克里斯·伍德",
        severity: "medium",
        date: "2026-06-12",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/12/new-zealand-world-cup-2026-squad-preview",
      },
    ],
  },

  // 西班牙 vs 沙特阿拉伯 (6/21)
  37: {
    matchId: 37,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "佩德里轻微肌肉紧张，西班牙中场可能限制出场时间",
        summary:
          "佩德里在赛前最后一堂训练中出现轻微肌肉紧张，教练组倾向于控制他的出场时间。若西班牙在中场少了这层稳定器，控球推进和肋部渗透都会受到影响。",
        affectedTeam: "西班牙",
        affectedPlayer: "佩德里",
        severity: "high",
        date: "2026-06-20",
        channel: "Marca / ESPN",
      },
      {
        type: "tactical",
        title: "沙特预计继续收缩防线，准备把比赛拖入低节奏",
        summary:
          "沙特阿拉伯赛前明确会优先压缩中路空间，并把进攻重心放在反击和定位球。面对西班牙的持续压迫，这种更保守的结构会直接决定比赛是否进入单回合决胜。",
        affectedTeam: "沙特阿拉伯",
        severity: "medium",
        date: "2026-06-20",
        channel: "The Guardian",
      },
    ],
  },

  // 比利时 vs 伊朗 (6/21)
  38: {
    matchId: 38,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "凯文·德布劳内恢复合练但仍受负荷控制",
        summary:
          "凯文·德布劳内已经恢复合练，但比利时教练组仍在严格控制他的训练负荷。若他不能踢满整场，比利时前场的节奏控制和最后一传都会明显下滑。",
        affectedTeam: "比利时",
        affectedPlayer: "凯文·德布劳内",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters / HLN",
      },
      {
        type: "injury",
        title: "萨达尔·阿兹蒙继续缺阵，伊朗锋线支点仍不完整",
        summary:
          "伊朗确认萨达尔·阿兹蒙仍无法回到完整比赛节奏，前场需要更多依靠集体推进和边路传中。面对比利时的高位压迫，伊朗反击第一脚的质量将被放大检验。",
        affectedTeam: "伊朗",
        affectedPlayer: "萨达尔·阿兹蒙",
        severity: "high",
        date: "2026-06-21",
        channel: "The Guardian / IRIB",
      },
    ],
  },

  // 乌拉圭 vs 佛得角 (6/21)
  39: {
    matchId: 39,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "form",
        title: "达尔文·努涅斯近两天训练量受控，冲刺持续性成疑",
        summary:
          "乌拉圭在赛前压缩了达尔文·努涅斯的训练负荷，教练组更担心他在高压逼抢和连续冲刺中的持续性。如果他不能持续拉开佛得角后防，乌拉圭的纵深威胁会下降。",
        affectedTeam: "乌拉圭",
        affectedPlayer: "达尔文·努涅斯",
        severity: "medium",
        date: "2026-06-20",
        channel: "ESPN",
      },
      {
        type: "injury",
        title: "佛得角后防轮换压力上升，主力中卫赛前恢复未达最佳",
        summary:
          "佛得角主力中卫在最后训练周恢复进度一般，教练组已开始准备轮换方案。面对乌拉圭的高空球和身体对抗，这一点会直接影响禁区防守稳定性。",
        affectedTeam: "佛得角",
        affectedPlayer: "佛得角后防主力",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters",
      },
    ],
  },

  // 新西兰 vs 埃及 (6/21)
  40: {
    matchId: 40,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "穆罕默德·萨拉赫轻微脚踝不适，但埃及仍计划让他首发",
        summary:
          "穆罕默德·萨拉赫在训练中出现轻微脚踝不适，不过埃及队医和教练组都倾向于让他首发。只要他能保持爆发力，埃及右路推进和终结质量就会明显优于新西兰。",
        affectedTeam: "埃及",
        affectedPlayer: "穆罕默德·萨拉赫",
        severity: "high",
        date: "2026-06-21",
        channel: "The Guardian / BBC Sport",
      },
      {
        type: "injury",
        title: "克里斯·伍德带伤备战，新西兰更多依赖定位球抢分",
        summary:
          "克里斯·伍德的身体状态仍未完全恢复，新西兰因此更需要通过定位球和二点球制造威胁。若他无法提供足够的背身支点，球队的反击起手会变得吃力。",
        affectedTeam: "新西兰",
        affectedPlayer: "克里斯·伍德",
        severity: "medium",
        date: "2026-06-20",
        channel: "ESPN",
      },
    ],
  },

  // 阿根廷 vs 奥地利 (6/22)
  41: {
    matchId: 41,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "麦卡利斯特膝后侧不适，阿根廷中场控制可能受影响",
        summary:
          "亚历克西斯·麦卡利斯特在赛前训练中膝后侧不适，教练组正评估他是否需要减量。若阿根廷少了他在中场的推进和接应，球队的控球优势会被明显削弱。",
        affectedTeam: "阿根廷",
        affectedPlayer: "亚历克西斯·麦卡利斯特",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters / TyC Sports",
      },
      {
        type: "form",
        title: "奥地利计划延续高压和快速转移，抢阿根廷开局节奏",
        summary:
          "奥地利赛前继续强调高压逼抢和快速转移，目标是尽快破坏阿根廷的第一脚出球。若能逼迫阿根廷中后场犯错，比赛会更接近奥地利希望的节奏。",
        affectedTeam: "奥地利",
        severity: "medium",
        date: "2026-06-21",
        channel: "Kronen Zeitung",
      },
    ],
  },

  // 法国 vs 伊拉克 (6/22)
  42: {
    matchId: 42,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "姆巴佩恢复顺利，法国攻击线回到完整配置",
        summary:
          "基利安·姆巴佩在训练中没有再出现踝部反应，法国进攻端最关键的爆点基本恢复正常。只要他能首发，法国在边路一对一和禁区冲击上的上限就会明显提高。",
        affectedTeam: "法国",
        affectedPlayer: "基利安·姆巴佩",
        severity: "high",
        date: "2026-06-21",
        channel: "L'Équipe / Reuters",
      },
      {
        type: "form",
        title: "伊拉克前场连续高负荷出战，最后半小时体能风险上升",
        summary:
          "伊拉克前场球员近期连续承受高强度比赛和长途奔波，体能消耗已经成为隐患。面对法国的持续压迫，后程转换和回防速度会是最容易被放大的短板。",
        affectedTeam: "伊拉克",
        severity: "medium",
        date: "2026-06-20",
        channel: "The Guardian",
      },
    ],
  },

  // 挪威 vs 塞内加尔 (6/22)
  43: {
    matchId: 43,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "库利巴利恢复慢于预期，塞内加尔防线容错率下降",
        summary:
          "卡利杜·库利巴利的恢复进度慢于预期，塞内加尔后防仍需要靠轮换顶上强度。面对哈兰德领衔的挪威，禁区内的对抗和空中球防守会非常关键。",
        affectedTeam: "塞内加尔",
        affectedPlayer: "卡利杜·库利巴利",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters / L'Équipe",
      },
      {
        type: "form",
        title: "哈兰德脚踝无碍，挪威进攻组织回到正常节奏",
        summary:
          "埃尔林·哈兰德的脚踝反应已经消退，挪威进攻端重新恢复到正常配置。只要他能在禁区内保持身体优势，塞内加尔的防线就会被迫更深地回收。",
        affectedTeam: "挪威",
        affectedPlayer: "埃尔林·哈兰德",
        severity: "medium",
        date: "2026-06-21",
        channel: "BBC Sport",
      },
    ],
  },

  // 约旦 vs 阿尔及利亚 (6/22)
  44: {
    matchId: 44,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "马赫雷斯恢复合练，阿尔及利亚边路威胁重新拉满",
        summary:
          "里亚德·马赫雷斯恢复完整合练后，阿尔及利亚边路单点爆破的威胁重新回到最强状态。若他能首发，约旦在边路防守上的压力会非常大。",
        affectedTeam: "阿尔及利亚",
        affectedPlayer: "里亚德·马赫雷斯",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters / DZ Foot",
      },
      {
        type: "injury",
        title: "约旦防线主力带伤训练，定位球防守恐成隐患",
        summary:
          "约旦主力中卫在赛前训练中带伤完成部分内容，教练组更担心的是定位球防守的稳定性。面对阿尔及利亚的高空和二次进攻，这一点会直接影响结果。",
        affectedTeam: "约旦",
        affectedPlayer: "约旦后防主力",
        severity: "medium",
        date: "2026-06-20",
        channel: "The Guardian",
      },
    ],
  },

  // 葡萄牙 vs 乌兹别克斯坦 (6/23)
  45: {
    matchId: 45,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "克里斯蒂亚诺·罗纳尔多身体状态正常，葡萄牙进攻核心可用",
        summary:
          "克里斯蒂亚诺·罗纳尔多已经完成赛前完整训练，葡萄牙前场压迫与禁区终结最关键的变量回到了可用状态。只要他首发，乌兹别克斯坦防线就必须更早承受威胁。",
        affectedTeam: "葡萄牙",
        affectedPlayer: "克里斯蒂亚诺·罗纳尔多",
        severity: "high",
        date: "2026-06-21",
        channel: "Record / Reuters",
      },
      {
        type: "injury",
        title: "法伊祖拉耶夫脚踝仍有不适，乌兹别克斯坦反击效率受限",
        summary:
          "阿博斯别克·法伊祖拉耶夫的脚踝不适还没有完全解除，乌兹别克斯坦在快速反击中的第一脚质量可能打折。面对葡萄牙高控球压制，这一问题会被迅速放大。",
        affectedTeam: "乌兹别克斯坦",
        affectedPlayer: "阿博斯别克·法伊祖拉耶夫",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

  // 英格兰 vs 加纳 (6/23)
  46: {
    matchId: 46,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "凯恩轻微碰撞后恢复顺利，英格兰终结点依旧稳定",
        summary:
          "哈里·凯恩在训练中的轻微碰撞没有留下后遗症，英格兰前场最稳定的终结点仍然可用。若他能首发，加纳后防在禁区内的抗压会更难。",
        affectedTeam: "英格兰",
        affectedPlayer: "哈里·凯恩",
        severity: "high",
        date: "2026-06-21",
        channel: "BBC Sport / Reuters",
      },
      {
        type: "form",
        title: "加纳后腰覆盖仍是隐患，面对英格兰高位压迫压力很大",
        summary:
          "加纳赛前仍在修补中场横向覆盖问题，面对英格兰的高位压迫和二次进攻，后腰保护将直接决定比赛能否顶住前30分钟的冲击。",
        affectedTeam: "加纳",
        severity: "medium",
        date: "2026-06-20",
        channel: "The Guardian",
      },
    ],
  },

  // 巴拿马 vs 克罗地亚 (6/23)
  47: {
    matchId: 47,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "莫德里奇和科瓦契奇连续高负荷出战，克罗地亚中场可能轮换",
        summary:
          "卢卡·莫德里奇和马特奥·科瓦契奇都经历了连续高负荷出场，克罗地亚教练组在评估是否进行小幅轮换。中场一旦少了节奏控制，巴拿马的逼抢和反击就会更有机会。",
        affectedTeam: "克罗地亚",
        affectedPlayer: "卢卡·莫德里奇 / 马特奥·科瓦契奇",
        severity: "high",
        date: "2026-06-21",
        channel: "HNS / Reuters",
      },
      {
        type: "injury",
        title: "巴拿马左路推进点出战成疑，反击起手受影响",
        summary:
          "巴拿马左路主力训练中只完成了部分内容，教练组更担心的是球队反击起手阶段的推进质量。面对克罗地亚，失去这个支点会让防守转进攻更难。",
        affectedTeam: "巴拿马",
        affectedPlayer: "巴拿马左路主力",
        severity: "medium",
        date: "2026-06-20",
        channel: "ESPN",
      },
    ],
  },

  // 哥伦比亚 vs 刚果民主共和国 (6/23)
  48: {
    matchId: 48,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "路易斯·迪亚斯恢复合练，哥伦比亚最强爆点回到可用状态",
        summary:
          "路易斯·迪亚斯已经恢复合练，哥伦比亚边路最具爆破能力的球员重新回到可用范围。只要他能保持身体状态，哥伦比亚在一对一和转换进攻上的优势就会很明显。",
        affectedTeam: "哥伦比亚",
        affectedPlayer: "路易斯·迪亚斯",
        severity: "high",
        date: "2026-06-21",
        channel: "AS / Reuters",
      },
      {
        type: "tactical",
        title: "刚果民主共和国后防合练时间不足，面对边路冲击压力大",
        summary:
          "刚果民主共和国的后防组合合练时间有限，面对哥伦比亚的边路速度和连续冲击，站位协调会被迅速检验。若防线不能保持紧凑，比赛很可能早早失去平衡。",
        affectedTeam: "刚果民主共和国",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

  // 瑞士 vs 加拿大 (6/24)
  49: {
    matchId: 49,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "扎卡训练后负荷受控，瑞士中场组织可能降速",
        summary:
          "格拉尼特·扎卡在赛前训练后被要求减少对抗量，瑞士中场推进更多要依靠整体传导。若他无法持续覆盖大范围调度，瑞士对加拿大的控球优势会被削弱。",
        affectedTeam: "瑞士",
        affectedPlayer: "格拉尼特·扎卡",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters / SRF",
      },
      {
        type: "injury",
        title: "加拿大后防主力带小伤出战，边路回追压力偏大",
        summary:
          "加拿大后防核心在训练中完成了部分内容，但教练组担心他在边路回追中的爆发力。面对瑞士的边路传中和二点球，这会直接影响禁区防守质量。",
        affectedTeam: "加拿大",
        affectedPlayer: "加拿大后防主力",
        severity: "medium",
        date: "2026-06-21",
        channel: "TSN",
      },
    ],
  },

  // 波黑 vs 卡塔尔 (6/24)
  50: {
    matchId: 50,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "哲科仍是波黑最稳定支点，身体状态决定反击质量",
        summary:
          "埃丁·哲科的训练负荷已经被波黑教练组精细控制，球队希望他把最好的冲刺留到比赛日。若他能保持背身拿球和禁区终结，波黑就能把卡塔尔压回更深位置。",
        affectedTeam: "波黑",
        affectedPlayer: "埃丁·哲科",
        severity: "high",
        date: "2026-06-21",
        channel: "Sports Illustrated / HRT",
      },
      {
        type: "form",
        title: "卡塔尔中场拦截持续下滑，面对二点球争夺处于下风",
        summary:
          "卡塔尔近几场热身赛里中场拦截效率下滑明显，面对波黑的高球和二点球争夺会非常吃力。如果不能尽快把比赛切成低失误节奏，防线将承受持续冲击。",
        affectedTeam: "卡塔尔",
        severity: "medium",
        date: "2026-06-20",
        channel: "The Guardian",
      },
    ],
  },

  // 摩洛哥 vs 海地 (6/24)
  51: {
    matchId: 51,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "阿什拉夫恢复训练，摩洛哥右路推进回到最强配置",
        summary:
          "阿什拉夫·哈基米已经恢复完整训练，摩洛哥右路的前插和反抢威胁重新成型。只要他能正常首发，摩洛哥在边路压制和传中质量上都会占优。",
        affectedTeam: "摩洛哥",
        affectedPlayer: "阿什拉夫·哈基米",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters / Le360",
      },
      {
        type: "tactical",
        title: "海地预计继续深度防守，目标先把比赛拖到下半场",
        summary:
          "海地赛前仍会选择更低位的防守结构，优先减少早失球风险。面对摩洛哥这种边路冲击强、转换速度快的对手，他们能否扛住前60分钟基本决定结果。",
        affectedTeam: "海地",
        severity: "medium",
        date: "2026-06-21",
        channel: "ESPN",
      },
    ],
  },

  // 苏格兰 vs 巴西 (6/24)
  52: {
    matchId: 52,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "麦克托米奈膝部反应仍在观察，苏格兰中场强度成疑",
        summary:
          "斯科特·麦克托米奈在连续比赛后膝部仍有反应，苏格兰中场硬度和后插上威胁都可能受到影响。面对巴西的高质量控球，中场能否顶住会直接左右比赛。",
        affectedTeam: "苏格兰",
        affectedPlayer: "斯科特·麦克托米奈",
        severity: "high",
        date: "2026-06-21",
        channel: "The Guardian / BBC Sport",
      },
      {
        type: "injury",
        title: "巴西前场轮换接近定型，维尼修斯状态继续走高",
        summary:
          "维尼修斯·儒尼奥尔的身体状态持续回升，巴西前场轮换接近稳定。若他和另一侧边锋都能保持活力，苏格兰边后卫会持续暴露在一对一压力中。",
        affectedTeam: "巴西",
        affectedPlayer: "维尼修斯·儒尼奥尔",
        severity: "medium",
        date: "2026-06-21",
        channel: "GloboEsporte",
      },
    ],
  },

  // 南非 vs 韩国 (6/24)
  53: {
    matchId: 53,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "suspension",
        title: "南非主力左后卫停赛，韩国右路有望获得更多推进空间",
        summary:
          "南非主力左后卫因累计黄牌停赛，球队左路防守会被迫重组。韩国如果继续把进攻重心压向右侧，孙兴慜和李刚仁的配合将更容易制造突破口。",
        affectedTeam: "南非",
        affectedPlayer: "南非主力左后卫",
        severity: "high",
        date: "2026-06-21",
        channel: "CAF Online",
      },
      {
        type: "form",
        title: "孙兴慜恢复合练，韩国前场压迫和反击转换更完整",
        summary:
          "孙兴慜恢复合练后，韩国前场压迫和反击起手都回到更完整的配置。面对南非时，这种边路速度和身后冲击会是最关键的破局手段。",
        affectedTeam: "韩国",
        affectedPlayer: "孙兴慜",
        severity: "high",
        date: "2026-06-21",
        channel: "KFA / Reuters",
      },
    ],
  },

  // 捷克 vs 墨西哥 (6/24)
  54: {
    matchId: 54,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "墨西哥门将轮换未定，防线沟通问题可能被放大",
        summary:
          "墨西哥门将位置赛前仍在评估轮换方案，后场沟通是否稳定会直接影响面对捷克定位球时的防守质量。若门前指挥不够果断，比赛节奏会更难控制。",
        affectedTeam: "墨西哥",
        affectedPlayer: "墨西哥门将位置",
        severity: "high",
        date: "2026-06-21",
        channel: "ESPN",
      },
      {
        type: "tactical",
        title: "捷克仍会把比赛切成高对抗，先争定位球和第二落点",
        summary:
          "捷克赛前准备依然偏向高对抗和定位球争抢，这会让比赛更碎、更难进入墨西哥熟悉的节奏。若他们能率先制造定位球威胁，主场优势会明显被削弱。",
        affectedTeam: "捷克",
        severity: "medium",
        date: "2026-06-20",
        channel: "The Guardian",
      },
    ],
  },

  // 库拉索 vs 科特迪瓦 (6/25)
  55: {
    matchId: 55,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "科特迪瓦锋线头号冲击点带伤，首发时间受限",
        summary:
          "科特迪瓦的锋线头号冲击点在赛前训练后被纳入保护名单，教练组打算控制其首发时间。若他无法从开场就压制库拉索后防，比赛可能拖入更胶着的局面。",
        affectedTeam: "科特迪瓦",
        affectedPlayer: "科特迪瓦锋线头号冲击点",
        severity: "high",
        date: "2026-06-21",
        channel: "Le Monde / Reuters",
      },
      {
        type: "form",
        title: "库拉索防线回收积极，但中场出球质量不稳定",
        summary:
          "库拉索在防守回收上做得不错，但一旦拿到球后出球质量不稳定，反击就很难真正威胁对手。面对科特迪瓦更强的个人能力，这个问题会被快速放大。",
        affectedTeam: "库拉索",
        severity: "medium",
        date: "2026-06-20",
        channel: "ESPN",
      },
    ],
  },

  // 厄瓜多尔 vs 德国 (6/25)
  56: {
    matchId: 56,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "德国中卫组合仍在调整，空中球防守是重点课题",
        summary:
          "德国后防近期仍在磨合，中卫搭档和盯人分工还没有完全固定。面对厄瓜多尔的定位球和身体对抗，如果这一环出现失误，比赛会很难早早稳住。",
        affectedTeam: "德国",
        affectedPlayer: "德国中卫组合",
        severity: "high",
        date: "2026-06-21",
        channel: "DFB / Bild",
      },
      {
        type: "form",
        title: "厄瓜多尔高压逼抢延续，想用节奏打乱德国组织",
        summary:
          "厄瓜多尔会继续用高压逼抢和快速二次反抢去切断德国中场传导。只要能把比赛拉到高强度对抗，他们就有机会把局面拖入更开放的博弈。",
        affectedTeam: "厄瓜多尔",
        severity: "medium",
        date: "2026-06-21",
        channel: "ESPN",
      },
    ],
  },

  // 突尼斯 vs 荷兰 (6/25)
  57: {
    matchId: 57,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "荷兰边路突击点恢复一般，进攻宽度可能受限",
        summary:
          "荷兰边路突击点在训练中的恢复情况一般，教练组需要决定是否让他首发。若荷兰少了边路宽度，面对突尼斯密集防守时的破门手段会更单一。",
        affectedTeam: "荷兰",
        affectedPlayer: "荷兰边路突击点",
        severity: "high",
        date: "2026-06-21",
        channel: "NOS / Reuters",
      },
      {
        type: "tactical",
        title: "突尼斯继续压缩中路，逼荷兰打边路传中",
        summary:
          "突尼斯赛前仍会把防线压缩得很紧，重点是把荷兰的中路渗透挤到边路。若荷兰无法通过快速转移撕开第一层防守，比赛会非常消耗耐心。",
        affectedTeam: "突尼斯",
        severity: "medium",
        date: "2026-06-20",
        channel: "The Guardian",
      },
    ],
  },

  // 日本 vs 瑞典 (6/25)
  58: {
    matchId: 58,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "日本边路核心恢复合练，反击速度回到正常水平",
        summary:
          "日本边路核心已经恢复合练，球队反击推进速度回到正常水平。面对瑞典的高空球和身体对抗，边路速度将是日本最重要的破局方式。",
        affectedTeam: "日本",
        affectedPlayer: "日本边路核心",
        severity: "high",
        date: "2026-06-21",
        channel: "JFA / Reuters",
      },
      {
        type: "injury",
        title: "瑞典中卫仍在恢复，防线默契度可能不足",
        summary:
          "瑞典中卫组合在赛前仍处于恢复和磨合阶段，防线默契度存在隐患。若日本持续打身后和肋部，瑞典会面临更大防守压力。",
        affectedTeam: "瑞典",
        affectedPlayer: "瑞典中卫组合",
        severity: "medium",
        date: "2026-06-21",
        channel: "Aftonbladet",
      },
    ],
  },

  // 土耳其 vs 美国 (6/25)
  59: {
    matchId: 59,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "suspension",
        title: "美国后腰停赛，防守转换和中路保护都要重排",
        summary:
          "美国的首发后腰因为累计黄牌停赛，球队中路保护和攻防转换都需要重排。面对土耳其的前场技术型球员，这会直接影响防守稳定性。",
        affectedTeam: "美国",
        affectedPlayer: "美国首发后腰",
        severity: "high",
        date: "2026-06-21",
        channel: "US Soccer / ESPN",
      },
      {
        type: "form",
        title: "土耳其前场技术组状态在线，想靠控球压制美国",
        summary:
          "土耳其前场几名技术型球员近期状态不错，球队准备通过控球和肋部穿插压制美国。若美国中路保护不足，比赛会很快向土耳其倾斜。",
        affectedTeam: "土耳其",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

  // 巴拉圭 vs 澳大利亚 (6/25)
  60: {
    matchId: 60,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "巴拉圭锋线支点状态不稳，反击终结效率打折",
        summary:
          "巴拉圭锋线支点在赛前恢复一般，教练组担心他无法提供足够的背身和终结。对上澳大利亚这种身体对抗很强的对手，反击效率将直接决定胜负。",
        affectedTeam: "巴拉圭",
        affectedPlayer: "巴拉圭锋线支点",
        severity: "high",
        date: "2026-06-21",
        channel: "ABC Color",
      },
      {
        type: "injury",
        title: "澳大利亚边翼卫回归，推进和回追都更完整",
        summary:
          "澳大利亚边翼卫已经恢复完整训练，球队左右两侧的推进和回追会更平衡。若他能首发，澳大利亚在边路对抗中的稳定性会明显增强。",
        affectedTeam: "澳大利亚",
        affectedPlayer: "澳大利亚边翼卫",
        severity: "medium",
        date: "2026-06-21",
        channel: "SBS",
      },
    ],
  },

  // 挪威 vs 法国 (6/26)
  61: {
    matchId: 61,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "哈兰德肩部无碍，挪威最强终结点可正常使用",
        summary:
          "埃尔林·哈兰德的肩部问题没有影响到日常训练，挪威最强终结点可以正常使用。面对法国这样的高质量对手，他是否能持续把握禁区机会会非常关键。",
        affectedTeam: "挪威",
        affectedPlayer: "埃尔林·哈兰德",
        severity: "high",
        date: "2026-06-21",
        channel: "NRK / Reuters",
      },
      {
        type: "form",
        title: "法国中场轮换空间充足，但后场站位仍在微调",
        summary:
          "法国中场人员储备很厚，但后场站位和出球线路还在微调。若挪威能够前压抢断并迅速把球送到哈兰德脚下，法国也不能掉以轻心。",
        affectedTeam: "法国",
        severity: "medium",
        date: "2026-06-21",
        channel: "L'Équipe",
      },
    ],
  },

  // 塞内加尔 vs 伊拉克 (6/26)
  62: {
    matchId: 62,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "塞内加尔中场屏障恢复较慢，防守覆盖面积受考验",
        summary:
          "塞内加尔中场屏障恢复速度慢于预期，球队在中路的覆盖面积需要靠整体补位弥补。面对伊拉克的快速传递，这会直接影响防线稳定性。",
        affectedTeam: "塞内加尔",
        affectedPlayer: "塞内加尔中场屏障",
        severity: "high",
        date: "2026-06-21",
        channel: "RFI / Reuters",
      },
      {
        type: "form",
        title: "伊拉克锋线连续出战后体能偏紧，反击时间窗口更短",
        summary:
          "伊拉克锋线连续高强度出战后体能偏紧，快速反击的有效时间窗口会更短。若不能在前60分钟抓住机会，后程会非常难打。",
        affectedTeam: "伊拉克",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

  // 佛得角 vs 沙特阿拉伯 (6/26)
  63: {
    matchId: 63,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "佛得角主力边后卫出战成疑，边路防守压力增大",
        summary:
          "佛得角主力边后卫在赛前训练中只完成了部分内容，边路防守的压力会更大。面对沙特的外线推进，如果这一环失守，比赛会变得很被动。",
        affectedTeam: "佛得角",
        affectedPlayer: "佛得角主力边后卫",
        severity: "high",
        date: "2026-06-21",
        channel: "CAF Online",
      },
      {
        type: "form",
        title: "沙特锋线连续磨合，转换进攻效率仍是胜负手",
        summary:
          "沙特前场连续磨合后，转换进攻效率仍是他们最依赖的胜负手。若能把比赛拖到对手边路回追疲劳，沙特会更接近想要的节奏。",
        affectedTeam: "沙特阿拉伯",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

  // 乌拉圭 vs 西班牙 (6/26)
  64: {
    matchId: 64,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "西班牙中场核心恢复良好，控球节奏有望保持高位",
        summary:
          "西班牙中场核心恢复良好，教练组倾向于继续使用他维持控球节奏。若这一点成立，乌拉圭在中场的拦截和反击启动会更难完成。",
        affectedTeam: "西班牙",
        affectedPlayer: "西班牙中场核心",
        severity: "high",
        date: "2026-06-21",
        channel: "Marca / Reuters",
      },
      {
        type: "injury",
        title: "乌拉圭后防主力赛程密集，转身速度可能受影响",
        summary:
          "乌拉圭后防主力在连续高强度比赛后恢复不算理想，转身速度和对身后球的处理会成为隐患。面对西班牙的连续传切，这一弱点会被放大。",
        affectedTeam: "乌拉圭",
        affectedPlayer: "乌拉圭后防主力",
        severity: "medium",
        date: "2026-06-21",
        channel: "ESPN",
      },
    ],
  },

  // 新西兰 vs 比利时 (6/26)
  65: {
    matchId: 65,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "比利时边锋恢复合练，单点突破威胁重回首发级别",
        summary:
          "比利时边锋已经恢复合练，球队边路单点突破威胁重回首发级别。若他能拉开新西兰防线，比利时中路包抄的机会会明显增加。",
        affectedTeam: "比利时",
        affectedPlayer: "比利时边锋",
        severity: "high",
        date: "2026-06-21",
        channel: "HLN / Reuters",
      },
      {
        type: "form",
        title: "新西兰中场对抗强度在线，但出球稳定性仍不足",
        summary:
          "新西兰中场对抗强度一直在线，不过出球稳定性不足的问题没有解决。面对比利时的压迫，他们如果频繁丢失球权，比赛会迅速失去悬念。",
        affectedTeam: "新西兰",
        severity: "medium",
        date: "2026-06-20",
        channel: "ESPN",
      },
    ],
  },

  // 埃及 vs 伊朗 (6/26)
  66: {
    matchId: 66,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "萨拉赫脚踝恢复顺利，埃及反击效率关键人物可用",
        summary:
          "穆罕默德·萨拉赫的脚踝恢复顺利，埃及最重要的反击终结点大概率可以首发。只要他状态在线，伊朗后防就必须付出更多回追成本。",
        affectedTeam: "埃及",
        affectedPlayer: "穆罕默德·萨拉赫",
        severity: "high",
        date: "2026-06-21",
        channel: "BBC Sport / Reuters",
      },
      {
        type: "injury",
        title: "伊朗后场出球点受限，面对压迫时容错率不高",
        summary:
          "伊朗后场的出球点仍不完整，面对埃及前场逼抢时容错率不高。如果无法稳定把球送出第一线，反击起手就会被切断。",
        affectedTeam: "伊朗",
        affectedPlayer: "伊朗后场出球点",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

  // 巴拿马 vs 英格兰 (6/27)
  67: {
    matchId: 67,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "凯恩高负荷后仍无明显伤情，英格兰终结点稳定",
        summary:
          "哈里·凯恩在连续训练和比赛负荷后没有出现新的伤情，英格兰终结点依旧稳定。对巴拿马这种更重视防守的对手，这意味着比赛很可能先考验他们的定位球防守。",
        affectedTeam: "英格兰",
        affectedPlayer: "哈里·凯恩",
        severity: "high",
        date: "2026-06-21",
        channel: "BBC Sport",
      },
      {
        type: "tactical",
        title: "巴拿马预计先摆低位，重点防英格兰边路和定位球",
        summary:
          "巴拿马赛前几乎肯定会先摆低位，尽量把英格兰拖进更慢的节奏。若他们在边路和定位球上扛不住，比赛会很早失去平衡。",
        affectedTeam: "巴拿马",
        severity: "medium",
        date: "2026-06-21",
        channel: "La Prensa",
      },
    ],
  },

  // 克罗地亚 vs 加纳 (6/27)
  68: {
    matchId: 68,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "莫德里奇训练量受控，克罗地亚中场节奏仍要精打细算",
        summary:
          "卢卡·莫德里奇的训练量继续被控制，克罗地亚中场节奏分配需要更精细。若他无法长时间掌控节奏，加纳的冲击就会更容易打出来。",
        affectedTeam: "克罗地亚",
        affectedPlayer: "卢卡·莫德里奇",
        severity: "high",
        date: "2026-06-21",
        channel: "HNS / Reuters",
      },
      {
        type: "injury",
        title: "加纳中卫核心带伤出战，防线沟通可能出现漏洞",
        summary:
          "加纳中卫核心在训练中仍有轻微伤情，防线沟通与盯人会受到影响。面对克罗地亚的耐心传导和突然提速，这会成为关键隐患。",
        affectedTeam: "加纳",
        affectedPlayer: "加纳中卫核心",
        severity: "medium",
        date: "2026-06-21",
        channel: "GhanaWeb",
      },
    ],
  },

  // 哥伦比亚 vs 葡萄牙 (6/27)
  69: {
    matchId: 69,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "路易斯·迪亚斯恢复良好，哥伦比亚边路单兵爆破回到最强",
        summary:
          "路易斯·迪亚斯已经恢复到可以正常参加全队训练的程度，哥伦比亚边路单兵爆破威胁明显提升。若他能首发，葡萄牙右路防守会承受很大压力。",
        affectedTeam: "哥伦比亚",
        affectedPlayer: "路易斯·迪亚斯",
        severity: "high",
        date: "2026-06-21",
        channel: "AS / Reuters",
      },
      {
        type: "form",
        title: "葡萄牙前场轮换接近完成，控制比赛节奏更有底气",
        summary:
          "葡萄牙前场轮换接近完成，球队控制比赛节奏和中路推进的能力会更稳定。面对哥伦比亚更直接的边路冲击，谁先把节奏拉到自己熟悉的速度很关键。",
        affectedTeam: "葡萄牙",
        severity: "medium",
        date: "2026-06-21",
        channel: "Record",
      },
    ],
  },

  // 刚果民主共和国 vs 乌兹别克斯坦 (6/27)
  70: {
    matchId: 70,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "刚果民主共和国后腰伤情反复，中路保护力度下滑",
        summary:
          "刚果民主共和国后腰的伤情反复让中路保护力度下降，防线前的拦截质量会受影响。若乌兹别克斯坦通过中路直塞找到节奏，比赛会很难控制。",
        affectedTeam: "刚果民主共和国",
        affectedPlayer: "刚果民主共和国后腰",
        severity: "high",
        date: "2026-06-21",
        channel: "Reuters",
      },
      {
        type: "injury",
        title: "法伊祖拉耶夫恢复训练，乌兹别克斯坦创造力回升",
        summary:
          "阿博斯别克·法伊祖拉耶夫恢复完整训练后，乌兹别克斯坦前场创造力明显回升。若他能首发，球队在中前场的穿透力会比前一周强很多。",
        affectedTeam: "乌兹别克斯坦",
        affectedPlayer: "阿博斯别克·法伊祖拉耶夫",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

  // 阿尔及利亚 vs 奥地利 (6/27)
  71: {
    matchId: 71,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "马赫雷斯状态在线，阿尔及利亚最强边路武器可用",
        summary:
          "里亚德·马赫雷斯在赛前状态保持稳定，阿尔及利亚最强边路武器可正常使用。若他能持续制造一对一优势，奥地利边路防守就会被迫收缩。",
        affectedTeam: "阿尔及利亚",
        affectedPlayer: "里亚德·马赫雷斯",
        severity: "high",
        date: "2026-06-21",
        channel: "DZ Foot / Reuters",
      },
      {
        type: "tactical",
        title: "奥地利高压不变，想用前场压迫切断阿尔及利亚出球",
        summary:
          "奥地利依旧会用高压逼抢来切断阿尔及利亚后场出球，逼迫对手在第一时间犯错。若阿尔及利亚中后场处理稍慢，节奏就会被奥地利抢走。",
        affectedTeam: "奥地利",
        severity: "medium",
        date: "2026-06-21",
        channel: "Kronen Zeitung",
      },
    ],
  },

  // 约旦 vs 阿根廷 (6/27)
  72: {
    matchId: 72,
    updatedAt: "2026-06-21",
    items: [
      {
        type: "injury",
        title: "梅西训练无碍，阿根廷终结和定位球威胁都在",
        summary:
          "莱昂内尔·梅西已经完成连续合练，阿根廷最关键的终结和定位球威胁保持在线。面对防守更深的约旦，这意味着他们依旧能靠个人能力打破僵局。",
        affectedTeam: "阿根廷",
        affectedPlayer: "莱昂内尔·梅西",
        severity: "high",
        date: "2026-06-21",
        channel: "TyC Sports / Reuters",
      },
      {
        type: "form",
        title: "约旦继续深防反击，想把阿根廷拖进耐心战",
        summary:
          "约旦赛前仍然会把防线压得很低，目标是把阿根廷拖进更长时间的耐心战。若他们前60分钟不丢球，比赛悬念会明显上升。",
        affectedTeam: "约旦",
        severity: "medium",
        date: "2026-06-21",
        channel: "The Guardian",
      },
    ],
  },

};


export const hasMatchNews = (matchId: number): boolean => matchId in matchNewsMap;

export const getMatchNews = (matchId: number): MatchNews | undefined => matchNewsMap[matchId];

export const getHighSeverityCount = (matchId: number): number => {
  const news = matchNewsMap[matchId];
  if (!news) return 0;
  return news.items.filter((item) => item.severity === "high").length;
};
