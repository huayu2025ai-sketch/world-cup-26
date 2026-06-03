# 2026 美加墨世界杯 Web App

一个基于 Next.js 14 App Router 和 Tailwind CSS 构建的 2026 世界杯响应式前端应用。项目使用本地静态数据，不调用外部 API。

## 功能

- 小组总览：展示 48 支球队、12 个小组、搜索球队或组别。
- 小组详情：点击小组卡片查看晋级形势和核心看点。
- 阵容信息：在小组详情中点击球队查看阵容，点击球员查看球员资料。
- 比赛时间表：展示 104 场比赛，支持按阶段和关键词筛选。
- 数据榜：预留进球榜和助攻榜页面，比赛开始后可录入真实数据。
- 顶部倒计时：导航栏中央显示世界杯揭幕倒计时。

## 技术栈

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS

## 目录结构

```text
app/
  layout.tsx
  page.tsx
  schedule/page.tsx
  stats/page.tsx
  globals.css
components/
  GroupCard.tsx
  Navbar.tsx
constants/
  worldcupData.ts
  scheduleData.ts
  teamRosters.ts
  playerProfiles.ts
  tournamentStats.ts
run.sh
```

## 启动

首次安装依赖：

```bash
./run.sh install
```

前台启动开发服务：

```bash
./run.sh start
```

查看状态：

```bash
./run.sh status
```

停止服务：

```bash
./run.sh stop
```

重启服务：

```bash
./run.sh restart
```

默认地址：

```text
http://localhost:3000
```

## 数据维护

- 小组和球队数据：`constants/worldcupData.ts`
- 比赛时间表：`constants/scheduleData.ts`
- 球队阵容：`constants/teamRosters.ts`
- 球员资料：`constants/playerProfiles.ts`
- 进球榜和助攻榜：`constants/tournamentStats.ts`

当前应用不会编造未录入的阵容或赛事统计。未录入完整名单的球队会显示提示信息；世界杯开赛前，进球榜和助攻榜保持为空。

## 构建检查

```bash
npm run build
```
