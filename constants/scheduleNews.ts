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
    updatedAt: "2026-06-12",
    items: [
      {
        type: "form",
        title: "卡塔尔连续缺席两届世界杯，大赛状态存疑",
        summary:
          "卡塔尔在2022年世界杯作为东道主未能从小组出线，本届再度缺席上届赛事后再参赛。球队备战时间有限，面对瑞士的高压踢法，中场组织和防线稳定性是最大考验。",
        affectedTeam: "卡塔尔",
        severity: "medium",
        date: "2026-06-10",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/10/qatar-world-cup-2026-squad-preview-tactics",
      },
      {
        type: "tactical",
        title: "瑞士欧国联表现亮眼，防守结构是核心资产",
        summary:
          "瑞士在欧国联比赛中表现稳定，4-2-3-1体系运转流畅，防守端组织严密。锋线阿坎吉和恩多耶的跑动能力是转换进攻的关键。面对卡塔尔，瑞士在控球和压制方面占优。",
        affectedTeam: "瑞士",
        affectedPlayer: "阿坎吉 / 恩多耶",
        severity: "medium",
        date: "2026-06-11",
        channel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/football/2026/jun/11/switzerland-world-cup-squad-preview-tactics",
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

};


export const hasMatchNews = (matchId: number): boolean => matchId in matchNewsMap;

export const getMatchNews = (matchId: number): MatchNews | undefined => matchNewsMap[matchId];

export const getHighSeverityCount = (matchId: number): number => {
  const news = matchNewsMap[matchId];
  if (!news) return 0;
  return news.items.filter((item) => item.severity === "high").length;
};
