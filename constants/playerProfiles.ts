export type PlayerProfile = {
  name: string;
  chineseName: string;
  position: "门将" | "后卫" | "中场" | "前锋";
  role: string;
  bio: string;
  strengths: string[];
};

export type PlayerProfileMeta = {
  club: string;
  age: number;
  caps: number | "待核实";
};

export const playerProfiles: Record<string, PlayerProfile> = {
  "Jordan Pickford": {
    name: "Jordan Pickford",
    chineseName: "乔丹·皮克福德",
    position: "门将",
    role: "一号门将 / 后场指挥",
    bio: "英格兰长期主力门将，比赛气质强硬，擅长用长传快速发动反击，也能在高压淘汰赛中保持专注。",
    strengths: ["扑救反应", "长传发动", "大赛经验"]
  },
  "Dean Henderson": {
    name: "Dean Henderson",
    chineseName: "迪恩·亨德森",
    position: "门将",
    role: "轮换门将 / 高位防线保险",
    bio: "移动积极、覆盖范围较大的门将，适合需要门将前提保护身后空间的比赛方案。",
    strengths: ["出击覆盖", "近距离扑救", "比赛侵略性"]
  },
  "James Trafford": {
    name: "James Trafford",
    chineseName: "詹姆斯·特拉福德",
    position: "门将",
    role: "年轻门将 / 未来储备",
    bio: "年轻门将代表，脚下处理和现代门将属性突出，是英格兰门将位置的长期储备人选。",
    strengths: ["脚下处理", "反应速度", "成长潜力"]
  },
  "Reece James": {
    name: "Reece James",
    chineseName: "里斯·詹姆斯",
    position: "后卫",
    role: "右后卫 / 边路爆点",
    bio: "攻防能力都很完整的边后卫，传中质量和身体对抗是英格兰右路的重要武器。",
    strengths: ["传中", "身体对抗", "边路推进"]
  },
  "Tino Livramento": {
    name: "Tino Livramento",
    chineseName: "蒂诺·利夫拉门托",
    position: "后卫",
    role: "边后卫 / 速度型轮换",
    bio: "具备速度和单兵推进能力，可在左右边路提供纵深，是调整比赛节奏的灵活选择。",
    strengths: ["速度", "推进", "防守回追"]
  },
  "Marc Guehi": {
    name: "Marc Guehi",
    chineseName: "马克·格伊",
    position: "后卫",
    role: "中后卫 / 稳定出球点",
    bio: "防守判断成熟，处理球冷静，适合作为英格兰后场稳定结构的一环。",
    strengths: ["防守站位", "出球冷静", "一对一防守"]
  },
  "Ezri Konsa": {
    name: "Ezri Konsa",
    chineseName: "埃兹里·孔萨",
    position: "后卫",
    role: "中后卫 / 多面防守人",
    bio: "可胜任中卫和边中卫角色，防守动作简洁，适合面对转换速度快的对手。",
    strengths: ["位置灵活", "防守选择", "回追速度"]
  },
  "John Stones": {
    name: "John Stones",
    chineseName: "约翰·斯通斯",
    position: "后卫",
    role: "中后卫 / 后场组织核心",
    bio: "拥有顶级出球能力的中后卫，可在控球阶段前提到中场区域，帮助球队建立人数优势。",
    strengths: ["后场出球", "控球推进", "战术理解"]
  },
  "Jarell Quansah": {
    name: "Jarell Quansah",
    chineseName: "贾雷尔·宽萨",
    position: "后卫",
    role: "中后卫 / 年轻轮换",
    bio: "身体条件和防守覆盖出色，属于英格兰后防线的新鲜力量。",
    strengths: ["身体条件", "空中对抗", "防守覆盖"]
  },
  "Nico O'Reilly": {
    name: "Nico O'Reilly",
    chineseName: "尼科·奥赖利",
    position: "后卫",
    role: "左路防守 / 技术型选择",
    bio: "技术基础扎实，能在边路和中后场连接中提供控球质量。",
    strengths: ["技术衔接", "传球选择", "位置适应"]
  },
  "Dan Burn": {
    name: "Dan Burn",
    chineseName: "丹·伯恩",
    position: "后卫",
    role: "左后卫 / 高点防守",
    bio: "身材高大、对抗强硬，在定位球攻防和弱侧保护中很有价值。",
    strengths: ["空中对抗", "定位球", "防守硬度"]
  },
  "Djed Spence": {
    name: "Djed Spence",
    chineseName: "杰德·斯彭斯",
    position: "后卫",
    role: "右路轮换 / 冲刺型边卫",
    bio: "具备边路纵向冲击和回追能力，可用于增加右路速度。",
    strengths: ["冲刺速度", "边路突破", "回防"]
  },
  "Declan Rice": {
    name: "Declan Rice",
    chineseName: "德克兰·赖斯",
    position: "中场",
    role: "防守中场 / 中场屏障",
    bio: "英格兰中场的防守基石，覆盖面积大，也能通过带球和长传改变进攻方向。",
    strengths: ["拦截覆盖", "中场推进", "长传转移"]
  },
  "Elliot Anderson": {
    name: "Elliot Anderson",
    chineseName: "埃利奥特·安德森",
    position: "中场",
    role: "中场轮换 / 活力补充",
    bio: "跑动积极、对抗投入度高，可在中场提供压迫和二点球竞争。",
    strengths: ["跑动覆盖", "压迫", "对抗"]
  },
  "Jude Bellingham": {
    name: "Jude Bellingham",
    chineseName: "裘德·贝林厄姆",
    position: "中场",
    role: "攻击中场 / 核心推进器",
    bio: "兼具推进、终结和无球前插能力，是英格兰中前场最具决定性的球员之一。",
    strengths: ["前插终结", "持球推进", "关键时刻影响力"]
  },
  "Jordan Henderson": {
    name: "Jordan Henderson",
    chineseName: "乔丹·亨德森",
    position: "中场",
    role: "经验型中场 / 更衣室领袖",
    bio: "经验丰富、战术纪律强，可在需要控制节奏和稳定队形时提供帮助。",
    strengths: ["比赛经验", "组织沟通", "战术纪律"]
  },
  "Morgan Rogers": {
    name: "Morgan Rogers",
    chineseName: "摩根·罗杰斯",
    position: "中场",
    role: "攻击型中场 / 盘带冲击",
    bio: "擅长在肋部持球推进和制造对抗，能为阵地战增加直接性。",
    strengths: ["肋部推进", "盘带", "制造犯规"]
  },
  "Kobbie Mainoo": {
    name: "Kobbie Mainoo",
    chineseName: "科比·梅努",
    position: "中场",
    role: "中前卫 / 控球连接点",
    bio: "脚下冷静、转身摆脱能力强，适合在高压环境中完成中场连接。",
    strengths: ["摆脱", "短传连接", "控球稳定"]
  },
  "Harry Kane": {
    name: "Harry Kane",
    chineseName: "哈里·凯恩",
    position: "前锋",
    role: "中锋 / 队长级终结点",
    bio: "英格兰锋线核心，既能作为禁区终结者，也能回撤组织，为边锋和前插中场创造空间。",
    strengths: ["终结", "回撤做球", "点球"]
  },
  "Ivan Toney": {
    name: "Ivan Toney",
    chineseName: "伊万·托尼",
    position: "前锋",
    role: "中锋 / 定位球与点球武器",
    bio: "身体对抗强，背身和点球能力突出，适合在需要支点和禁区压迫时登场。",
    strengths: ["背身支点", "点球", "空中对抗"]
  },
  "Ollie Watkins": {
    name: "Ollie Watkins",
    chineseName: "奥利·沃特金斯",
    position: "前锋",
    role: "中锋 / 身后冲刺手",
    bio: "跑动范围大，擅长攻击防线身后，可以给英格兰锋线带来更直接的纵深威胁。",
    strengths: ["无球跑位", "反击冲刺", "门前嗅觉"]
  },
  "Bukayo Saka": {
    name: "Bukayo Saka",
    chineseName: "布卡约·萨卡",
    position: "前锋",
    role: "右边锋 / 一对一强点",
    bio: "英格兰右路核心之一，能内切、传中和制造点球，是阵地战破解低位防守的重要武器。",
    strengths: ["一对一", "内切射门", "边路配合"]
  },
  "Noni Madueke": {
    name: "Noni Madueke",
    chineseName: "诺尼·马杜埃凯",
    position: "前锋",
    role: "边锋 / 替补冲击手",
    bio: "左脚右路球员，盘带直接，适合在比赛后段针对疲劳防线制造冲击。",
    strengths: ["盘带突破", "内切", "替补冲击"]
  },
  "Marcus Rashford": {
    name: "Marcus Rashford",
    chineseName: "马库斯·拉什福德",
    position: "前锋",
    role: "边锋 / 反击箭头",
    bio: "速度和纵深能力突出，适合在开放空间中冲击防线身后。",
    strengths: ["速度", "反击", "左路内切"]
  },
  "Anthony Gordon": {
    name: "Anthony Gordon",
    chineseName: "安东尼·戈登",
    position: "前锋",
    role: "边锋 / 高强度压迫",
    bio: "跑动积极、压迫强度高，可为英格兰边路带来持续冲击和防守回追。",
    strengths: ["高位压迫", "边路速度", "无球跑动"]
  },
  "Eberechi Eze": {
    name: "Eberechi Eze",
    chineseName: "埃贝雷奇·埃泽",
    position: "前锋",
    role: "前场自由人 / 创造力补充",
    bio: "脚下节奏变化丰富，能在狭小空间完成摆脱，为英格兰提供不同于传统边锋的创造力。",
    strengths: ["节奏变化", "小空间摆脱", "创造机会"]
  }
};

export const playerProfileMeta: Record<string, PlayerProfileMeta> = {
  "Jordan Pickford": { club: "埃弗顿", age: 32, caps: 80 },
  "Dean Henderson": { club: "水晶宫", age: 29, caps: 2 },
  "James Trafford": { club: "伯恩利", age: 23, caps: 0 },
  "Reece James": { club: "切尔西", age: 26, caps: 16 },
  "Tino Livramento": { club: "纽卡斯尔联", age: 23, caps: "待核实" },
  "Marc Guehi": { club: "水晶宫", age: 25, caps: 25 },
  "Ezri Konsa": { club: "阿斯顿维拉", age: 28, caps: 12 },
  "John Stones": { club: "曼城", age: 32, caps: 85 },
  "Jarell Quansah": { club: "利物浦", age: 23, caps: "待核实" },
  "Nico O'Reilly": { club: "曼城", age: 21, caps: "待核实" },
  "Dan Burn": { club: "纽卡斯尔联", age: 34, caps: "待核实" },
  "Djed Spence": { club: "托特纳姆热刺", age: 25, caps: "待核实" },
  "Declan Rice": { club: "阿森纳", age: 27, caps: 72 },
  "Elliot Anderson": { club: "诺丁汉森林", age: 23, caps: "待核实" },
  "Jude Bellingham": { club: "皇家马德里", age: 22, caps: 50 },
  "Jordan Henderson": { club: "布伦特福德", age: 35, caps: 85 },
  "Morgan Rogers": { club: "阿斯顿维拉", age: 23, caps: "待核实" },
  "Kobbie Mainoo": { club: "曼联", age: 21, caps: 15 },
  "Harry Kane": { club: "拜仁慕尼黑", age: 32, caps: 110 },
  "Ivan Toney": { club: "吉达国民", age: 30, caps: 8 },
  "Ollie Watkins": { club: "阿斯顿维拉", age: 30, caps: 25 },
  "Bukayo Saka": { club: "阿森纳", age: 24, caps: 50 },
  "Noni Madueke": { club: "切尔西", age: 24, caps: "待核实" },
  "Marcus Rashford": { club: "曼联", age: 28, caps: 62 },
  "Anthony Gordon": { club: "纽卡斯尔联", age: 25, caps: 15 },
  "Eberechi Eze": { club: "水晶宫", age: 27, caps: 12 }
};
