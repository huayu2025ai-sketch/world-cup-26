"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { matchOddsById, oddsDataUpdatedAt } from "@/constants/oddsData";
import { scheduleMatches, type ScheduleMatch } from "@/constants/scheduleData";
import { formatPercent, getMatchPrediction, type MatchPrediction, type OutcomeKey } from "@/lib/oddsPrediction";

type PlatformKey = "xiaohongshu" | "moments";
type ThemeKey = "night" | "paper" | "stadium";

type ExportMatch = {
  match: ScheduleMatch;
  prediction: MatchPrediction | null;
};

type CanvasTheme = {
  background: string;
  panel: string;
  panelMuted: string;
  text: string;
  muted: string;
  faint: string;
  accent: string;
  accentSoft: string;
  warning: string;
  line: string;
};

const qrCodeUrl = "https://wc26.solalab.cn/";

const platformOptions: Record<PlatformKey, { label: string; width: number; height: number; description: string }> = {
  xiaohongshu: {
    label: "小红书",
    width: 1080,
    height: 1440,
    description: "竖图封面，适合笔记首图"
  },
  moments: {
    label: "朋友圈",
    width: 1080,
    height: 1350,
    description: "竖图摘要，留出更舒展的阅读空间"
  }
};

const themeOptions: Record<ThemeKey, { label: string; description: string; palette: CanvasTheme }> = {
  night: {
    label: "深色电竞",
    description: "高对比夜场，适合赛前预测",
    palette: {
      background: "#07111f",
      panel: "#101b2d",
      panelMuted: "#0b1424",
      text: "#f8fafc",
      muted: "#a6b3c6",
      faint: "#64748b",
      accent: "#22d3ee",
      accentSoft: "rgba(34, 211, 238, 0.16)",
      warning: "#fbbf24",
      line: "rgba(148, 163, 184, 0.24)"
    }
  },
  paper: {
    label: "清爽白底",
    description: "冷白编辑卡，适合朋友圈转发",
    palette: {
      background: "#f8fbfc",
      panel: "#ffffff",
      panelMuted: "#f1f7f7",
      text: "#102033",
      muted: "#475569",
      faint: "#7b8794",
      accent: "#0f9f8f",
      accentSoft: "rgba(15, 159, 143, 0.13)",
      warning: "#e11d48",
      line: "rgba(16, 32, 51, 0.16)"
    }
  },
  stadium: {
    label: "球场海报",
    description: "草地绿与记分牌风格",
    palette: {
      background: "#09261c",
      panel: "#103427",
      panelMuted: "#0a2018",
      text: "#f3f7ee",
      muted: "#b8c8ba",
      faint: "#718b79",
      accent: "#bef264",
      accentSoft: "rgba(190, 242, 100, 0.16)",
      warning: "#fdba74",
      line: "rgba(216, 244, 207, 0.22)"
    }
  }
};

const outcomeKeys: OutcomeKey[] = ["home", "draw", "away"];

const getOutcomeShortLabel = (outcome: OutcomeKey) => {
  if (outcome === "home") {
    return "主胜";
  }

  if (outcome === "away") {
    return "客胜";
  }

  return "平局";
};

const getOutcomeLabel = (outcome: OutcomeKey, match: ScheduleMatch) => {
  if (outcome === "home") {
    return `${match.home}胜`;
  }

  if (outcome === "away") {
    return `${match.away}胜`;
  }

  return "平局";
};

const getBeijingDateKey = (match: ScheduleMatch) => {
  const [month, day] = match.beijingTime.split(" ")[0].split("-");
  return `2026-${month}-${day}`;
};

const getTodayInBeijing = () => {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value ?? "2026";
  const month = parts.find((part) => part.type === "month")?.value ?? "06";
  const day = parts.find((part) => part.type === "day")?.value ?? "08";

  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (value: string) => {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(new Date(`${value}T12:00:00+08:00`));
};

const getBeijingTimeOnly = (match: ScheduleMatch) => match.beijingTime.split(" ")[1] ?? match.beijingTime;

const formatMatchOptionLabel = (row: ExportMatch) => {
  const dateKey = getBeijingDateKey(row.match);

  return `M${row.match.id} · ${row.match.home} vs ${row.match.away} · ${formatDisplayDate(dateKey)} ${getBeijingTimeOnly(
    row.match
  )}`;
};

const buildPredictedExportRows = () => {
  return scheduleMatches
    .map<ExportMatch>((match) => ({
      match,
      prediction: getMatchPrediction(matchOddsById[match.id] ?? [])
    }))
    .filter((row): row is ExportMatch & { prediction: MatchPrediction } => Boolean(row.prediction));
};

const buildExportRows = (dateKey: string) => {
  return buildPredictedExportRows().filter(({ match }) => getBeijingDateKey(match) === dateKey);
};

const getAvailableDates = () => {
  return Array.from(new Set(buildPredictedExportRows().map(({ match }) => getBeijingDateKey(match)))).sort();
};

const getDefaultDate = () => {
  const today = getTodayInBeijing();
  const dates = getAvailableDates();
  const todayWithMatches = dates.find((date) => date === today);

  if (todayWithMatches) {
    return todayWithMatches;
  }

  return dates.find((date) => date >= today) ?? dates[0];
};

const getDefaultMatchId = () => {
  const defaultDate = getDefaultDate();
  const rows = buildPredictedExportRows();

  return rows.find(({ match }) => getBeijingDateKey(match) === defaultDate)?.match.id ?? rows[0]?.match.id ?? 0;
};

const buildCaptionOptions = (dateKey: string, row: ExportMatch | undefined, includeDisclaimer: boolean) => {
  const tags = "#世界杯 #足球预测 #今日比赛 #胜平负预测";
  const disclaimer = includeDisclaimer ? "\n\n数据模型预测，仅供交流娱乐参考。" : "";

  if (!row) {
    return Array.from({ length: 5 }, (_, index) => `今天先按兵不动，第 ${index + 1} 条文案也等赛程上线。${disclaimer}\n\n${tags}`);
  }

  const matchup = `${row.match.home} vs ${row.match.away}`;
  const timeLine = `${formatDisplayDate(dateKey)} ${row.match.beijingTime}`;
  const pick = row.prediction ? getOutcomeLabel(row.prediction.predictedOutcome, row.match) : "先看临场数据";
  const probability = row.prediction ? formatPercent(row.prediction.predictedProbability) : "待更新";
  const confidence = row.prediction ? `${row.prediction.confidence}置信度` : "数据未录入";

  const options = row.prediction
    ? [
        `今晚这场 ${matchup}，模型先站 ${pick}。\n概率 ${probability}，${confidence}。\n不保证剧本照写，但至少市场共识先把态度摆出来了。`,
        `${matchup} 这场有点意思。\n模型看好 ${pick}，概率 ${probability}。\n如果足球有说明书，这场大概写着“别想太复杂”。`,
        `赛前小纸条：${matchup}\n倾向：${pick}\n概率：${probability}\n友情提醒：强队也会演，但数据目前不想陪它演。`,
        `赛前腹黑一句：${matchup} 这场，模型更信 ${pick}。\n概率 ${probability}。\n如果冷门来了，那就是足球在提醒我们别太自信。`,
        `${timeLine} 开球。\n${matchup}，模型选择 ${pick}。\n${confidence}，概率 ${probability}。\n看球嘛，快乐第一，打脸第二。`
      ]
    : [
        `${matchup} 这场先收进待观察名单。\n预测数据还没补齐，别急着站队，赛前风向比嘴硬更重要。`,
        `${timeLine}，${matchup}。\n模型数据暂缺，今天先当冷静观众，不当冲动预言家。`,
        `${matchup} 暂无预测。\n没数据就不硬猜，毕竟足球已经够会整活了。`,
        `这场 ${matchup} 先看赛程。\n模型还没开口，我也不替它装懂。`,
        `${timeLine}，${matchup}。\n预测稍后再看，先把闹钟定上，错过比赛才是真冷门。`
      ];

  return options.map((option) => `${option}${disclaimer}\n\n${tags}`);
};

const setFont = (ctx: CanvasRenderingContext2D, size: number, weight = 700, family = "PingFang SC") => {
  ctx.font = `${weight} ${size}px ${family}, Microsoft YaHei, sans-serif`;
};

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
};

const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 2
) => {
  const chars = Array.from(text);
  const lines: string[] = [];
  let current = "";

  chars.forEach((char) => {
    const next = `${current}${char}`;

    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else {
      current = next;
    }
  });

  if (current) {
    lines.push(current);
  }

  lines.slice(0, maxLines).forEach((line, index) => {
    const isLast = index === maxLines - 1 && lines.length > maxLines;
    let finalLine = line;

    if (isLast) {
      while (ctx.measureText(`${finalLine}...`).width > maxWidth && finalLine.length > 1) {
        finalLine = finalLine.slice(0, -1);
      }
      finalLine = `${finalLine}...`;
    }

    ctx.fillText(finalLine, x, y + index * lineHeight);
  });

  return Math.min(lines.length, maxLines) * lineHeight;
};

const drawPill = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  background: string,
  border?: string
) => {
  setFont(ctx, 26, 800);
  const width = ctx.measureText(text).width + 34;
  roundRect(ctx, x, y, width, 46, 23);
  ctx.fillStyle = background;
  ctx.fill();

  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.fillStyle = color;
  ctx.fillText(text, x + 17, y + 31);

  return width;
};

const drawMiniPill = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  background: string,
  border?: string
) => {
  setFont(ctx, 18, 900);
  const width = ctx.measureText(text).width + 24;

  roundRect(ctx, x, y, width, 34, 17);
  ctx.fillStyle = background;
  ctx.fill();

  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.fillStyle = color;
  ctx.fillText(text, x + 12, y + 23);

  return width;
};

const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, theme: CanvasTheme, themeKey: ThemeKey) => {
  ctx.fillStyle = theme.background;
  ctx.fillRect(0, 0, width, height);

  if (themeKey === "paper") {
    const topWash = ctx.createLinearGradient(0, 0, width, 280);
    topWash.addColorStop(0, "rgba(15, 159, 143, 0.12)");
    topWash.addColorStop(0.65, "rgba(15, 159, 143, 0.035)");
    topWash.addColorStop(1, "rgba(15, 159, 143, 0)");
    ctx.fillStyle = topWash;
    ctx.fillRect(0, 0, width, 360);

    const bottomWash = ctx.createLinearGradient(width, height - 340, 0, height);
    bottomWash.addColorStop(0, "rgba(225, 29, 72, 0.07)");
    bottomWash.addColorStop(0.55, "rgba(225, 29, 72, 0.025)");
    bottomWash.addColorStop(1, "rgba(225, 29, 72, 0)");
    ctx.fillStyle = bottomWash;
    ctx.fillRect(0, height - 380, width, 380);

    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(15, 159, 143, 0.09)";
    ctx.lineWidth = 2;

    for (let x = -height; x < width; x += 96) {
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + height, 0);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(16, 32, 51, 0.045)";
    ctx.lineWidth = 1;
    for (let y = 80; y < height; y += 120) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    return;
  }

  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 2;

  for (let x = -height; x < width; x += 84) {
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.lineTo(x + height, 0);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  const gradient = ctx.createRadialGradient(width * 0.72, height * 0.08, 0, width * 0.72, height * 0.08, height * 0.62);
  gradient.addColorStop(0, theme.accentSoft);
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

const getQrLayout = (width: number, height: number) => {
  const boxSize = width >= height ? 146 : 164;
  const padding = 16;
  const labelHeight = 34;
  const panelWidth = boxSize + padding * 2;
  const panelHeight = boxSize + padding * 2 + labelHeight;

  return {
    boxSize,
    padding,
    labelHeight,
    panelWidth,
    panelHeight,
    x: width - panelWidth - 54,
    y: height - panelHeight - 44
  };
};

const drawQrCode = (ctx: CanvasRenderingContext2D, width: number, height: number, theme: CanvasTheme) => {
  const qr = QRCode.create(qrCodeUrl, { errorCorrectionLevel: "M", margin: 0 });
  const moduleCount = qr.modules.size;
  const { boxSize, padding, panelWidth, panelHeight, x, y } = getQrLayout(width, height);
  const moduleSize = Math.floor(boxSize / moduleCount);
  const qrSize = moduleSize * moduleCount;
  const qrX = x + padding + Math.floor((boxSize - qrSize) / 2);
  const qrY = y + padding;

  roundRect(ctx, x, y, panelWidth, panelHeight, 22);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16);
  ctx.fillStyle = "#0f172a";

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (qr.modules.get(row, col)) {
        ctx.fillRect(qrX + col * moduleSize, qrY + row * moduleSize, moduleSize, moduleSize);
      }
    }
  }

  setFont(ctx, 20, 900);
  ctx.fillStyle = "#0f172a";
  ctx.textAlign = "center";
  ctx.fillText("wc26.solalab.cn", x + panelWidth / 2, y + panelHeight - 18);
  ctx.textAlign = "left";
};

const drawProbabilityColumns = (
  ctx: CanvasRenderingContext2D,
  prediction: MatchPrediction,
  x: number,
  y: number,
  width: number,
  theme: CanvasTheme,
  compact: boolean
) => {
  const gap = compact ? 12 : 18;
  const columnWidth = (width - gap * 2) / 3;
  const labelSize = compact ? 20 : 23;
  const valueSize = compact ? 25 : 30;
  const barHeight = compact ? 10 : 12;

  outcomeKeys.forEach((key, outcomeIndex) => {
    const itemX = x + (columnWidth + gap) * outcomeIndex;
    const probability = prediction.average[key];
    const isPredicted = prediction.predictedOutcome === key;

    roundRect(ctx, itemX, y, columnWidth, compact ? 78 : 92, 18);
    ctx.fillStyle = isPredicted ? theme.accentSoft : "rgba(15, 23, 42, 0.18)";
    ctx.fill();
    ctx.strokeStyle = isPredicted ? theme.accent : theme.line;
    ctx.lineWidth = isPredicted ? 2 : 1.5;
    ctx.stroke();

    setFont(ctx, labelSize, 900);
    ctx.fillStyle = isPredicted ? theme.accent : theme.muted;
    ctx.fillText(getOutcomeShortLabel(key), itemX + 18, y + (compact ? 29 : 34));

    setFont(ctx, valueSize, 900);
    ctx.fillStyle = isPredicted ? theme.text : theme.muted;
    ctx.textAlign = "right";
    ctx.fillText(formatPercent(probability), itemX + columnWidth - 18, y + (compact ? 32 : 37));
    ctx.textAlign = "left";

    roundRect(ctx, itemX + 18, y + (compact ? 50 : 60), columnWidth - 36, barHeight, barHeight / 2);
    ctx.fillStyle = theme.line;
    ctx.fill();
    roundRect(ctx, itemX + 18, y + (compact ? 50 : 60), Math.max(18, (columnWidth - 36) * probability), barHeight, barHeight / 2);
    ctx.fillStyle = isPredicted ? theme.accent : theme.faint;
    ctx.fill();
  });
};

const drawCompactProbabilityStrip = (
  ctx: CanvasRenderingContext2D,
  prediction: MatchPrediction,
  x: number,
  y: number,
  width: number,
  theme: CanvasTheme
) => {
  const gap = 10;
  const columnWidth = (width - gap * 2) / 3;

  outcomeKeys.forEach((key, outcomeIndex) => {
    const itemX = x + (columnWidth + gap) * outcomeIndex;
    const probability = prediction.average[key];
    const isPredicted = prediction.predictedOutcome === key;

    roundRect(ctx, itemX, y, columnWidth, 50, 14);
    ctx.fillStyle = isPredicted ? theme.accentSoft : "rgba(15, 23, 42, 0.22)";
    ctx.fill();
    ctx.strokeStyle = isPredicted ? theme.accent : theme.line;
    ctx.lineWidth = isPredicted ? 1.8 : 1.2;
    ctx.stroke();

    setFont(ctx, 16, 900);
    ctx.fillStyle = isPredicted ? theme.accent : theme.muted;
    ctx.fillText(getOutcomeShortLabel(key), itemX + 12, y + 21);

    setFont(ctx, 18, 900);
    ctx.fillStyle = isPredicted ? theme.text : theme.muted;
    ctx.textAlign = "right";
    ctx.fillText(formatPercent(probability), itemX + columnWidth - 12, y + 21);
    ctx.textAlign = "left";

    roundRect(ctx, itemX + 12, y + 34, columnWidth - 24, 7, 4);
    ctx.fillStyle = theme.line;
    ctx.fill();
    roundRect(ctx, itemX + 12, y + 34, Math.max(12, (columnWidth - 24) * probability), 7, 4);
    ctx.fillStyle = isPredicted ? theme.accent : theme.faint;
    ctx.fill();
  });
};

const drawMatchCard = (
  ctx: CanvasRenderingContext2D,
  row: ExportMatch,
  index: number,
  x: number,
  y: number,
  width: number,
  height: number,
  theme: CanvasTheme
) => {
  const { match, prediction } = row;
  const compact = height < 360;
  const ultraCompact = compact && height < 270;
  const roomyCompact = compact && height >= 310;
  const cardPadding = compact ? 24 : 30;
  const headerY = y + cardPadding;
  const teamY = y + (compact ? (roomyCompact ? 106 : 88) : 126);
  const venueY = y + (compact ? (roomyCompact ? 138 : 118) : 168);
  const predictionBoxY = y + (compact ? (roomyCompact ? 166 : 140) : 204);
  const predictionBoxHeight = compact ? (roomyCompact ? 58 : 48) : 74;
  const probabilityY = compact ? y + height - 92 : y + height - 118;

  roundRect(ctx, x, y, width, height, 28);
  ctx.fillStyle = index === 0 ? theme.panel : theme.panelMuted;
  ctx.fill();
  ctx.strokeStyle = index === 0 ? theme.accent : theme.line;
  ctx.lineWidth = index === 0 ? 3 : 2;
  ctx.stroke();

  if (compact) {
    const firstPillWidth = drawMiniPill(ctx, `M${match.id}`, x + cardPadding, headerY, theme.text, theme.accentSoft, theme.line);
    drawMiniPill(
      ctx,
      `${match.stage}${match.group ? ` · ${match.group}组` : ""}`,
      x + cardPadding + firstPillWidth + 10,
      headerY,
      theme.accent,
      theme.accentSoft
    );

    setFont(ctx, 20, 800);
    ctx.fillStyle = theme.muted;
    ctx.textAlign = "right";
    ctx.fillText(match.beijingTime, x + width - cardPadding, headerY + 23);
    ctx.textAlign = "left";

    setFont(ctx, roomyCompact ? 33 : 29, 900);
    ctx.fillStyle = theme.text;
    drawText(ctx, `${match.home}  VS  ${match.away}`, x + cardPadding, y + 84, width - cardPadding * 2, 38, 1);

    if (roomyCompact) {
      setFont(ctx, 17, 700);
      ctx.fillStyle = theme.faint;
      drawText(ctx, `${match.venue} · ${match.city}`, x + cardPadding, y + 112, width - cardPadding * 2, 24, 1);
    }

    if (!prediction) {
      setFont(ctx, 22, 800);
      ctx.fillStyle = theme.muted;
      ctx.fillText("待录入预测数据", x + cardPadding, y + height - 32);
      return;
    }

    const summaryY = y + (roomyCompact ? 136 : 118);
    roundRect(ctx, x + cardPadding, summaryY, width - cardPadding * 2, 38, 14);
    ctx.fillStyle = theme.accentSoft;
    ctx.fill();

    setFont(ctx, 21, 900);
    ctx.fillStyle = theme.accent;
    ctx.fillText(`预测：${getOutcomeLabel(prediction.predictedOutcome, match)}`, x + cardPadding + 16, summaryY + 26);

    setFont(ctx, 18, 900);
    ctx.fillStyle = theme.warning;
    ctx.textAlign = "right";
    ctx.fillText(
      `${formatPercent(prediction.predictedProbability)} · ${prediction.confidence}置信度`,
      x + width - cardPadding - 16,
      summaryY + 26
    );
    ctx.textAlign = "left";

    if (ultraCompact) {
      const confidenceWidth = width - cardPadding * 2;
      const confidenceY = y + height - 38;
      roundRect(ctx, x + cardPadding, confidenceY, confidenceWidth, 9, 5);
      ctx.fillStyle = theme.line;
      ctx.fill();
      roundRect(
        ctx,
        x + cardPadding,
        confidenceY,
        Math.max(18, confidenceWidth * prediction.predictedProbability),
        9,
        5
      );
      ctx.fillStyle = theme.accent;
      ctx.fill();
      return;
    }

    drawCompactProbabilityStrip(ctx, prediction, x + cardPadding, y + height - 66, width - cardPadding * 2, theme);
    return;
  }

  drawPill(ctx, `M${match.id}`, x + cardPadding, headerY, theme.text, theme.accentSoft, theme.line);
  drawPill(ctx, `${match.stage}${match.group ? ` · ${match.group}组` : ""}`, x + cardPadding + 88, headerY, theme.accent, theme.accentSoft);

  setFont(ctx, compact ? 22 : 25, 800);
  ctx.fillStyle = theme.muted;
  ctx.textAlign = "right";
  ctx.fillText(match.beijingTime, x + width - cardPadding, headerY + 32);
  ctx.textAlign = "left";

  setFont(ctx, compact ? (roomyCompact ? 35 : 31) : 48, 900);
  ctx.fillStyle = theme.text;
  const teamLine = `${match.home}  VS  ${match.away}`;
  drawText(ctx, teamLine, x + cardPadding, teamY, width - cardPadding * 2, compact ? 42 : 56, 1);

  setFont(ctx, compact ? (roomyCompact ? 19 : 17) : 23, 700);
  ctx.fillStyle = theme.faint;
  drawText(ctx, `${match.venue} · ${match.city}`, x + cardPadding, venueY, width - cardPadding * 2, 30, 1);

  if (!prediction) {
    setFont(ctx, compact ? 23 : 29, 800);
    ctx.fillStyle = theme.muted;
    ctx.fillText("待录入市场数据，暂不生成赛果预测", x + cardPadding, y + height - cardPadding);
    return;
  }

  const predictedLabel = getOutcomeLabel(prediction.predictedOutcome, match);
  roundRect(ctx, x + cardPadding, predictionBoxY, width - cardPadding * 2, predictionBoxHeight, 20);
  ctx.fillStyle = theme.accentSoft;
  ctx.fill();
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  setFont(ctx, compact ? (roomyCompact ? 25 : 22) : 32, 900);
  ctx.fillStyle = theme.accent;
  ctx.fillText(`预测：${predictedLabel}`, x + cardPadding + 22, predictionBoxY + (compact ? (roomyCompact ? 38 : 32) : 48));

  setFont(ctx, compact ? (roomyCompact ? 20 : 17) : 24, 800);
  ctx.fillStyle = theme.warning;
  ctx.textAlign = "right";
  ctx.fillText(
    `${formatPercent(prediction.predictedProbability)} · ${prediction.confidence}置信度`,
    x + width - cardPadding - 22,
    predictionBoxY + (compact ? (roomyCompact ? 38 : 32) : 48)
  );
  ctx.textAlign = "left";

  drawProbabilityColumns(ctx, prediction, x + cardPadding, probabilityY, width - cardPadding * 2, theme, compact);
};

const drawPoster = (
  canvas: HTMLCanvasElement,
  row: ExportMatch | undefined,
  dateKey: string,
  platform: PlatformKey,
  themeKey: ThemeKey,
  includeDisclaimer: boolean,
  matchIndex: number,
  matchCount: number
) => {
  const { width, height } = platformOptions[platform];
  const theme = themeOptions[themeKey].palette;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  canvas.width = width;
  canvas.height = height;
  drawBackground(ctx, width, height, theme, themeKey);

  const padding = platform === "xiaohongshu" ? 70 : 62;
  setFont(ctx, 25, 900);
  ctx.fillStyle = theme.accent;
  ctx.fillText("WORLD CUP 26 DAILY PICK", padding, padding + 8);

  setFont(ctx, platform === "xiaohongshu" ? 84 : 66, 900);
  ctx.fillStyle = theme.text;
  drawText(ctx, "比赛预测", padding, padding + 112, width - padding * 2, 92, 1);

  setFont(ctx, 29, 800);
  ctx.fillStyle = theme.muted;
  ctx.fillText(`${formatDisplayDate(dateKey)} · 北京时间`, padding, padding + 164);

  const statY = padding + 204;
  drawPill(ctx, row?.prediction ? "1 场有预测" : "待预测数据", padding, statY, theme.text, theme.panel, theme.line);
  drawPill(ctx, `数据 ${oddsDataUpdatedAt}`, padding + 235, statY, theme.accent, theme.accentSoft);

  const cardGap = platform === "xiaohongshu" ? 24 : 20;
  const qrLayout = getQrLayout(width, height);
  const cardTop = platform === "xiaohongshu" ? 390 : 340;
  const bottomSafeTop = qrLayout.y - 34;
  const availableHeight = bottomSafeTop - cardTop;
  const preferredCardHeight = platform === "xiaohongshu" ? 440 : 430;
  const cardHeight = Math.min(preferredCardHeight, availableHeight);

  if (row) {
    drawMatchCard(ctx, row, 0, padding, cardTop, width - padding * 2, cardHeight, theme);
  } else {
    roundRect(ctx, padding, cardTop, width - padding * 2, cardHeight, 28);
    ctx.fillStyle = theme.panel;
    ctx.fill();
    ctx.strokeStyle = theme.line;
    ctx.lineWidth = 2;
    ctx.stroke();
    setFont(ctx, 32, 900);
    ctx.fillStyle = theme.muted;
    ctx.fillText("当前比赛日暂无可导出场次", padding + 34, cardTop + 80);
  }

  drawQrCode(ctx, width, height, theme);

  setFont(ctx, 23, 700);
  ctx.fillStyle = theme.faint;
  drawText(
    ctx,
    includeDisclaimer ? "数据模型预测，仅供交流娱乐参考。" : "2026 美加墨世界杯赛程与胜平负模型",
    padding,
    height - padding,
    qrLayout.x - padding - 24,
    28,
    1
  );
};

export default function ExportPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const captionRef = useRef<HTMLTextAreaElement | null>(null);
  const [platform, setPlatform] = useState<PlatformKey>("xiaohongshu");
  const [theme, setTheme] = useState<ThemeKey>("night");
  const [selectedMatchId, setSelectedMatchId] = useState(getDefaultMatchId);
  const [includeDisclaimer, setIncludeDisclaimer] = useState(true);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "selected">("idle");

  const matchOptions = useMemo(() => buildPredictedExportRows(), []);
  const selectedMatch = matchOptions.find(({ match }) => match.id === selectedMatchId) ?? matchOptions[0];
  const selectedDate = selectedMatch ? getBeijingDateKey(selectedMatch.match) : getDefaultDate();
  const rows = useMemo(() => buildExportRows(selectedDate), [selectedDate]);
  const currentMatchIndex = Math.max(
    0,
    rows.findIndex(({ match }) => match.id === selectedMatchId)
  );
  const currentRow = rows[currentMatchIndex] ?? rows[0];
  const captionOptions = useMemo(
    () => buildCaptionOptions(selectedDate, currentRow, includeDisclaimer),
    [currentRow, includeDisclaimer, selectedDate]
  );
  const caption = captionOptions[captionIndex] ?? captionOptions[0] ?? "";
  const currentPlatform = platformOptions[platform];

  useEffect(() => {
    setCaptionIndex(0);
  }, [includeDisclaimer, selectedDate, selectedMatchId]);

  useEffect(() => {
    if (currentRow && currentRow.match.id !== selectedMatchId) {
      setSelectedMatchId(currentRow.match.id);
    }
  }, [currentRow, selectedMatchId]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    drawPoster(
      canvasRef.current,
      currentRow,
      selectedDate,
      platform,
      theme,
      includeDisclaimer,
      currentMatchIndex,
      Math.max(1, rows.length)
    );
  }, [currentMatchIndex, currentRow, includeDisclaimer, platform, rows.length, selectedDate, theme]);

  const downloadImage = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const link = document.createElement("a");
    link.download = `worldcup-${platform}-${selectedDate}-M${currentRow?.match.id ?? "empty"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const goToMatch = (direction: -1 | 1) => {
    if (rows.length <= 1) {
      return;
    }

    const nextIndex = (currentMatchIndex + direction + rows.length) % rows.length;
    setSelectedMatchId(rows[nextIndex].match.id);
  };

  const copyCaption = async () => {
    let copied = false;

    try {
      await navigator.clipboard.writeText(caption);
      copied = true;
    } catch {
      const textarea = captionRef.current;

      if (textarea) {
        textarea.focus();
        textarea.select();
        copied = document.execCommand("copy");

        if (copied) {
          textarea.setSelectionRange(0, 0);
        }
      }
    }

    setCopyState(copied ? "copied" : "selected");
    window.setTimeout(() => setCopyState("idle"), 1400);
  };

  const goToNextMatchDay = () => {
    setSelectedMatchId(getDefaultMatchId());
  };

  return (
    <main className="mx-auto max-w-7xl px-3 pb-10 pt-5 sm:px-5 lg:px-6">
      <section className="grid gap-4 py-4 lg:grid-cols-[minmax(280px,390px)_1fr] lg:items-start">
        <aside className="space-y-3 lg:sticky lg:top-24">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-cyan-200">Social Studio</p>
            <h1 className="mt-2 text-2xl font-black leading-tight text-slate-100 sm:text-3xl">素材导出工作台</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              选择比赛日、平台比例和视觉主题，生成今日比赛与胜平负预测素材。
            </p>
          </div>

          <section className="rounded-lg border border-slate-700 bg-slate-800/55 p-3 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="export-match" className="text-xs font-bold text-slate-200">
                比赛日
              </label>
              <button
                type="button"
                onClick={goToNextMatchDay}
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-[11px] font-black text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
              >
                今日/下一比赛日
              </button>
            </div>
            <select
              id="export-match"
              value={selectedMatchId}
              onChange={(event) => setSelectedMatchId(Number(event.target.value))}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm font-bold text-slate-100 outline-none focus:border-cyan-300/70"
            >
              {matchOptions.map((row) => (
                <option key={row.match.id} value={row.match.id}>
                  {formatMatchOptionLabel(row)}
                </option>
              ))}
            </select>
          </section>

          <section className="rounded-lg border border-slate-700 bg-slate-800/55 p-3 backdrop-blur-md">
            <p className="text-xs font-bold text-slate-200">导出平台</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(platformOptions) as PlatformKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPlatform(key)}
                  className={`rounded-md border p-3 text-left transition ${
                    platform === key
                      ? "border-cyan-300 bg-cyan-300 text-slate-950"
                      : "border-slate-700 bg-slate-950/55 text-slate-200 hover:border-cyan-300/60"
                  }`}
                >
                  <span className="block text-sm font-black">{platformOptions[key].label}</span>
                  <span className={`mt-1 block text-[11px] ${platform === key ? "text-slate-800" : "text-slate-500"}`}>
                    {platformOptions[key].width}x{platformOptions[key].height}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-700 bg-slate-800/55 p-3 backdrop-blur-md">
            <p className="text-xs font-bold text-slate-200">视觉主题</p>
            <div className="mt-2 space-y-2">
              {(Object.keys(themeOptions) as ThemeKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTheme(key)}
                  className={`grid w-full grid-cols-[22px_1fr] items-center gap-2 rounded-md border p-2.5 text-left transition ${
                    theme === key
                      ? "border-cyan-300/80 bg-slate-950 text-slate-100"
                      : "border-slate-700 bg-slate-950/45 text-slate-300 hover:border-cyan-300/50"
                  }`}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-slate-500"
                    style={{ background: themeOptions[key].palette.accent }}
                  />
                  <span>
                    <span className="block text-sm font-black">{themeOptions[key].label}</span>
                    <span className="block text-[11px] text-slate-500">{themeOptions[key].description}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-700 bg-slate-800/55 p-3 backdrop-blur-md">
            <label className="flex items-center justify-between gap-3 text-sm font-bold text-slate-200">
              <span>添加免责声明</span>
              <input
                type="checkbox"
                checked={includeDisclaimer}
                onChange={(event) => setIncludeDisclaimer(event.target.checked)}
                className="h-4 w-4 accent-cyan-300"
              />
            </label>
          </section>
        </aside>

        <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-lg border border-slate-700 bg-slate-800/45 p-3 backdrop-blur-md">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-black text-cyan-200">{currentPlatform.label}预览</p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {currentPlatform.description} · 第 {currentMatchIndex + 1}/{Math.max(1, rows.length)} 张
                  {currentRow ? ` · M${currentRow.match.id} ${currentRow.match.home} vs ${currentRow.match.away}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToMatch(-1)}
                  disabled={rows.length <= 1}
                  className="grid h-9 w-9 place-items-center rounded-md border border-slate-700 bg-slate-950 text-sm font-black text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="上一场素材"
                  title="上一场"
                >
                  ←
                </button>
                <span className="min-w-14 rounded-md border border-slate-700 bg-slate-950/70 px-2 py-2 text-center text-xs font-black text-cyan-100">
                  {currentMatchIndex + 1}/{Math.max(1, rows.length)}
                </span>
                <button
                  type="button"
                  onClick={() => goToMatch(1)}
                  disabled={rows.length <= 1}
                  className="grid h-9 w-9 place-items-center rounded-md border border-slate-700 bg-slate-950 text-sm font-black text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="下一场素材"
                  title="下一场"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={downloadImage}
                  className="rounded-md border border-cyan-300 bg-cyan-300 px-4 py-2 text-xs font-black text-slate-950 shadow-glow transition hover:bg-cyan-200"
                >
                  下载当前 PNG
                </button>
              </div>
            </div>

            <div className="grid min-h-[520px] place-items-center overflow-auto rounded-lg border border-slate-700 bg-slate-950/60 p-3">
              <canvas
                ref={canvasRef}
                className="h-auto max-h-[78vh] w-auto max-w-full rounded-md shadow-2xl shadow-black/45"
                aria-label="社媒素材预览画布"
              />
            </div>
          </div>

          <aside className="space-y-3">
            <section className="rounded-lg border border-slate-700 bg-slate-800/55 p-3 backdrop-blur-md">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-black text-cyan-200">配套文案</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">5 条轻松调侃风，左右切换后复制</p>
                </div>
                <button
                  type="button"
                  onClick={copyCaption}
                  className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-black text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                >
                  {copyState === "copied" ? "已复制" : copyState === "selected" ? "已选中" : "复制"}
                </button>
              </div>
              <div className="mt-3 grid grid-cols-[40px_1fr_40px] items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCaptionIndex((current) => (current + captionOptions.length - 1) % captionOptions.length)}
                  className="grid h-10 place-items-center rounded-md border border-slate-700 bg-slate-950 text-sm font-black text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                  aria-label="上一条文案"
                  title="上一条文案"
                >
                  ←
                </button>
                <span className="rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-center text-xs font-black text-cyan-100">
                  文案 {captionIndex + 1}/{captionOptions.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCaptionIndex((current) => (current + 1) % captionOptions.length)}
                  className="grid h-10 place-items-center rounded-md border border-slate-700 bg-slate-950 text-sm font-black text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                  aria-label="下一条文案"
                  title="下一条文案"
                >
                  →
                </button>
              </div>
              <textarea
                ref={captionRef}
                readOnly
                value={caption}
                className="mt-3 h-64 w-full resize-none rounded-md border border-slate-700 bg-slate-950/70 p-3 text-xs leading-5 text-slate-200 outline-none"
              />
            </section>

            <section className="rounded-lg border border-slate-700 bg-slate-800/55 p-3 backdrop-blur-md">
              <p className="text-xs font-black text-cyan-200">比赛摘要</p>
              <div className="mt-3 space-y-2">
                {rows.map((row, index) => (
                  <button
                    key={row.match.id}
                    type="button"
                    onClick={() => setSelectedMatchId(row.match.id)}
                    className={`w-full rounded-md border p-2 text-left transition ${
                      currentMatchIndex === index
                        ? "border-cyan-300/70 bg-cyan-300/10"
                        : "border-slate-700 bg-slate-950/50 hover:border-cyan-300/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-black text-slate-100">
                        M{row.match.id} ·{" "}
                        {row.match.home} vs {row.match.away}
                      </p>
                      <span className="shrink-0 text-[10px] font-bold text-slate-500">{row.match.beijingTime}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {row.prediction
                        ? `${getOutcomeLabel(row.prediction.predictedOutcome, row.match)} · ${formatPercent(
                            row.prediction.predictedProbability
                          )} · ${row.prediction.confidence}置信度`
                        : "待录入预测数据"}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
