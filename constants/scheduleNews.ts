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

};


export const hasMatchNews = (matchId: number): boolean => matchId in matchNewsMap;

export const getMatchNews = (matchId: number): MatchNews | undefined => matchNewsMap[matchId];

export const getHighSeverityCount = (matchId: number): number => {
  const news = matchNewsMap[matchId];
  if (!news) return 0;
  return news.items.filter((item) => item.severity === "high").length;
};
