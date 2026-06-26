# 2026 美加墨世界杯 Web App

一个基于 Next.js 14 App Router、React 18、TypeScript 和 Tailwind CSS 构建的 2026 世界杯响应式前端应用。项目使用本地静态数据展示 48 支球队、12 个小组、完整赛程、球队名单、球员资料和赛事统计占位，不依赖外部业务 API。

## 功能

- 小组总览：展示 48 支球队、12 个小组，支持按中文队名、英文队名、三字母代码、洲际足联和组别搜索。
- 小组详情：点击小组卡片打开弹窗，查看小组看点、晋级形势描述和队伍列表。
- 阵容信息：在小组详情中切换球队，查看 26 人名单、号码、位置、来源和维护备注。
- 球员资料：点击阵容球员查看球员档案；已精修球员读取 `playerProfiles.ts`，其余球员由阵容基础信息生成兜底资料。
- 数据更新记录：首页底部展示最后数据更新时间，可打开弹窗查看最近更新记录。
- 比赛时间表：展示 104 场比赛，支持按阶段、球队、组别、日期、城市和球场筛选。
- 胜负预测：基于 Pinnacle、Betfair Exchange、bet365、SBOBet、DraftKings 五家 1/X/2 赔率，计算去水概率、平均市场概率、最高概率赛果和置信度。
- 赛前情报：在赛程卡片中展示高/中影响伤病、停赛、战术和状态情报，含发布日期与来源渠道；仅收录近3天内情报。
- 数据榜：展示进球榜和助攻榜；赛事未开赛时保持空榜并显示维护提示。
- 顶部导航：提供小组总览、比赛时间表、数据榜入口，并显示揭幕倒计时。
- 访问统计：调用 `POST /api/visits` 记录总访问量和今日访问量，支持 Upstash Redis；未配置 Redis 时使用本地文件兜底。

## 技术栈

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Node.js 20（Docker 镜像使用 `node:20-alpine`）

## 目录结构

```text
.
├── app/
│   ├── api/
│   │   └── visits/route.ts        # 访问统计 API
│   ├── predictions/page.tsx       # 五家赔率源胜平负预测页面
│   ├── schedule/page.tsx          # 比赛时间表页面
│   ├── stats/page.tsx             # 进球榜/助攻榜页面
│   ├── globals.css                # Tailwind 全局样式
│   ├── layout.tsx                 # 根布局、metadata、Navbar
│   └── page.tsx                   # 小组总览、详情弹窗、阵容和球员资料
├── components/
│   ├── GroupCard.tsx              # 小组卡片
│   ├── Navbar.tsx                 # 顶部导航和倒计时
│   └── VisitCounter.tsx           # 访问统计展示组件
├── constants/
│   ├── playerProfiles.ts          # 球员档案和 club/age/caps 元信息
│   ├── oddsData.ts                # 五家博彩公司 1/X/2 赔率录入
│   ├── scheduleData.ts            # 104 场比赛赛程和阶段列表
│   ├── scheduleNews.ts            # 赛前情报数据（高/中影响、近3天内、含日期与渠道）
│   ├── teamRosters.ts             # 48 队 26 人名单、来源和备注
│   ├── tournamentStats.ts         # 进球榜、助攻榜和空榜提示
│   └── worldcupData.ts            # 12 个小组、球队信息和更新记录
├── PROMPTS.md                     # 情报更新提示词模板与规则
├── lib/
│   ├── oddsPrediction.ts          # 赔率去水、平均概率和预测逻辑
│   └── visitStats.ts              # Redis/本地文件访问统计逻辑
├── public/                        # 静态资源目录
├── Dockerfile                     # 生产镜像构建
├── docker-compose.yml             # Docker Compose 部署示例
├── run.sh                         # 本地安装、启动、停止、状态脚本
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 本地启动

首次安装依赖：

```bash
./run.sh install
```

前台启动开发服务：

```bash
./run.sh start
```

默认地址：

```text
http://localhost:3000
```

其他脚本：

```bash
./run.sh status
./run.sh stop
./run.sh restart
```

也可以直接使用 npm：

```bash
npm install
npm run dev
npm run build
npm run start
```

## 页面与组件

- `/`：小组总览页，使用 `GroupCard`、`VisitCounter`，读取 `worldcupData.ts`、`teamRosters.ts`、`playerProfiles.ts`。
- `/schedule`：比赛时间表页，读取 `scheduleData.ts` 和 `scheduleNews.ts`；比赛卡片内联展示高/中影响赛前情报，含发布日期、来源渠道、影响等级和分页切换。
- `/predictions`：胜负预测页，读取 `scheduleData.ts`、`oddsData.ts`，调用 `oddsPrediction.ts` 计算市场概率。
- `/stats`：进球榜和助攻榜页，读取 `tournamentStats.ts`。
- `Navbar`：在 `app/layout.tsx` 中全站挂载，倒计时目标为北京时间 `2026-06-12 03:00`。
- `POST /api/visits`：动态 Node.js API 路由，调用 `lib/visitStats.ts` 写入访问统计。

## 数据维护

- 小组和球队数据：维护 `constants/worldcupData.ts` 中的 `worldCupGroups`。每组包含 `id`、`name`、`headline`、`detail`、`watchPoints` 和 `teams`。
- 数据更新记录：维护 `constants/worldcupData.ts` 中的 `groupOverviewUpdates`。首页默认读取数组第一项作为最后更新时间。
- 比赛时间表：维护 `constants/scheduleData.ts` 中的 `scheduleMatches` 和 `scheduleStages`。当前页面按 `stage`、`group`、`date`、`etTime`、`beijingTime`、`home`、`away`、`venue`、`city` 搜索。
- 赔率预测：维护 `constants/oddsData.ts` 中的 `matchOddsById`。每场比赛按 `scheduleMatches` 的 `id` 录入 Pinnacle、Betfair Exchange、bet365、SBOBet、DraftKings 五家 `home/draw/away` 十进制赔率；`lib/oddsPrediction.ts` 会自动计算隐含概率、去水概率、平均概率、预测结果和置信度。
- 球队阵容：维护 `constants/teamRosters.ts` 中的 `teamRosters`。每支球队包含 `teamCode`、`teamName`、`confirmed`、`publishedDate`、`source`、`sourceUrl`、`note` 和 `players`。
- 阵容来源提示：维护 `constants/teamRosters.ts` 中的 `officialSquadsNotice`。首页阵容区域会显示该说明。
- 球员资料：维护 `constants/playerProfiles.ts` 中的 `playerProfiles` 和 `playerProfileMeta`。未精修球员会基于 `teamRosters` 自动生成基础档案，`club`、`age`、`caps` 默认为“待核实”。
- 进球榜和助攻榜：维护 `constants/tournamentStats.ts` 中的 `goalsRanking`、`assistsRanking` 和 `statsNotice`。比赛开始前保持空数组，避免展示模拟统计。
- 赛前情报：维护 `constants/scheduleNews.ts` 中的 `matchNewsMap`。每条情报包含 `type`、`title`、`summary`、`affectedTeam`、`affectedPlayer`、`severity`（仅 `high` 或 `medium`）、`date`（发布日期，需在 `updatedAt` 前3天内）、`channel`（来源媒体）和可选 `sourceUrl`。新增或更新情报时请参考 `PROMPTS.md` 中的规则。

当前应用不会编造未录入的阵容或赛事统计。阵容基础信息以 `teamRosters.ts` 为准；赛事统计只展示 `tournamentStats.ts` 中实际录入的数据。

## 访问统计

访问统计接口为 `POST /api/visits`。展示值会在真实计数基础上增加默认基数：

```text
总访问量 +2026
今日访问量 +30
```

生产部署建议配置 Upstash Redis：

```text
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

未配置 Redis 时，应用会把计数写入本地文件。默认路径为：

```text
.data/visit-stats.json
```

也可以用 `VISIT_STATS_FILE` 指定计数文件路径。该文件方案只适合本地或单实例部署；Vercel 等无服务器环境应使用 Redis，否则本地文件不会持久可靠保存。

## Docker 部署

构建镜像：

```bash
docker build -t world-cup-26 .
```

直接运行容器：

```bash
docker run --rm -p 3000:3000 \
  -e VISIT_STATS_FILE=/data/visit-stats.json \
  -v "$(pwd)/data:/data" \
  world-cup-26
```

使用 Docker Compose：

```bash
docker compose up -d --build
```

当前 `docker-compose.yml` 使用外部网络 `npm-network`，适合接入已有反向代理。如果本机没有该网络，需要先创建：

```bash
docker network create npm-network
```

Compose 默认设置：

```text
VISIT_STATS_FILE=/data/visit-stats.json
./data -> /data
```

因此 Docker 下的访问统计会保存在宿主机 `data/visit-stats.json`。

## Vercel 部署

本项目是标准 Next.js App Router 应用，不需要额外的 Vercel 配置文件即可部署。

推荐设置：

```text
Framework Preset: Next.js
Install Command: npm ci
Build Command: npm run build
Output Directory: .next
Node.js Version: 20.x
```

## 自动更新

仓库包含一个每天北京时间 12:00 执行的 GitHub Actions 工作流：

- 文件：[.github/workflows/worldcup-daily-update.yml](/Users/huayu/Documents/fifa26/.github/workflows/worldcup-daily-update.yml)
- 逻辑：先检测已完赛但尚未写入的比赛，再从可配置的可信结果源同步数据，最后构建并自动提交
- 结果源优先级：
  - `WORLD_CUP_RESULTS_JSON`
  - `WORLD_CUP_RESULTS_URL`
  - `WORLD_CUP_RESULTS_FILE`

结果源可以提供官方/可信来源的 JSON 结果清单，格式详见 `scripts/daily-worldcup-update.py` 注释。若未配置结果源，工作流会只做检测，不会写入新数据。

如果要在 Vercel 上启用访问统计，请在项目环境变量中配置：

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

不要依赖 `VISIT_STATS_FILE` 作为 Vercel 生产存储；无服务器运行环境中的本地文件不适合保存长期计数。

## 构建检查

```bash
npm run build
```

## 维护检查清单

- 新增页面时，同步更新“目录结构”和“页面与组件”。
- 新增组件时，同步更新 `components/` 目录说明。
- 新增数据文件或导出字段时，同步更新“数据维护”。
- 修改访问统计存储方式时，同步更新“访问统计”“Docker 部署”和“Vercel 部署”。
- 修改运行脚本或端口时，同步更新“本地启动”和部署命令。
