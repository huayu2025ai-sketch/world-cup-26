export type RosterPlayer = {
  name: string;
  chineseName: string;
  position: "门将" | "后卫" | "中场" | "前锋";
};

export type TeamRoster = {
  teamCode: string;
  teamName: string;
  confirmed: boolean;
  publishedDate: string;
  source: string;
  sourceUrl: string;
  note?: string;
  players: RosterPlayer[];
};

export const officialSquadsNotice = {
  confirmedDate: "2026-06-02",
  source: "FIFA",
  sourceUrl: "https://www.fifa.com/en/articles/fifa-world-cup-2026-squads-confirmed",
  text: "FIFA 已确认 48 支参赛队的最终名单。"
};

export const teamRosters: Record<string, TeamRoster> = {
  ENG: {
    teamCode: "ENG",
    teamName: "英格兰",
    confirmed: true,
    publishedDate: "2026-05-22",
    source: "BBC Sport / England Football",
    sourceUrl: "https://www.bbc.co.uk/sport/football/articles/c1728r0l218o",
    note: "福登、帕尔默、阿诺德、马奎尔等人落选，托尼、沃特金斯、埃泽、马杜埃凯入选。",
    players: [
      { name: "Jordan Pickford", chineseName: "乔丹·皮克福德", position: "门将" },
      { name: "Dean Henderson", chineseName: "迪恩·亨德森", position: "门将" },
      { name: "James Trafford", chineseName: "詹姆斯·特拉福德", position: "门将" },
      { name: "Reece James", chineseName: "里斯·詹姆斯", position: "后卫" },
      { name: "Tino Livramento", chineseName: "蒂诺·利夫拉门托", position: "后卫" },
      { name: "Marc Guehi", chineseName: "马克·格伊", position: "后卫" },
      { name: "Ezri Konsa", chineseName: "埃兹里·孔萨", position: "后卫" },
      { name: "John Stones", chineseName: "约翰·斯通斯", position: "后卫" },
      { name: "Jarell Quansah", chineseName: "贾雷尔·宽萨", position: "后卫" },
      { name: "Nico O'Reilly", chineseName: "尼科·奥赖利", position: "后卫" },
      { name: "Dan Burn", chineseName: "丹·伯恩", position: "后卫" },
      { name: "Djed Spence", chineseName: "杰德·斯彭斯", position: "后卫" },
      { name: "Declan Rice", chineseName: "德克兰·赖斯", position: "中场" },
      { name: "Elliot Anderson", chineseName: "埃利奥特·安德森", position: "中场" },
      { name: "Jude Bellingham", chineseName: "裘德·贝林厄姆", position: "中场" },
      { name: "Jordan Henderson", chineseName: "乔丹·亨德森", position: "中场" },
      { name: "Morgan Rogers", chineseName: "摩根·罗杰斯", position: "中场" },
      { name: "Kobbie Mainoo", chineseName: "科比·梅努", position: "中场" },
      { name: "Harry Kane", chineseName: "哈里·凯恩", position: "前锋" },
      { name: "Ivan Toney", chineseName: "伊万·托尼", position: "前锋" },
      { name: "Ollie Watkins", chineseName: "奥利·沃特金斯", position: "前锋" },
      { name: "Bukayo Saka", chineseName: "布卡约·萨卡", position: "前锋" },
      { name: "Noni Madueke", chineseName: "诺尼·马杜埃凯", position: "前锋" },
      { name: "Marcus Rashford", chineseName: "马库斯·拉什福德", position: "前锋" },
      { name: "Anthony Gordon", chineseName: "安东尼·戈登", position: "前锋" },
      { name: "Eberechi Eze", chineseName: "埃贝雷奇·埃泽", position: "前锋" }
    ]
  }
};

export const rosterPositions = ["门将", "后卫", "中场", "前锋"] as const;
