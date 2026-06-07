import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type VisitStats = {
  total: number;
  today: number;
};

type VisitStatsFile = VisitStats & {
  date: string;
};

const redisPrefix = "fifa26:visits";
const defaultFilePath = path.join(process.cwd(), ".data", "visit-stats.json");
const configuredFilePath = process.env.VISIT_STATS_FILE;
const filePath = configuredFilePath
  ? path.isAbsolute(configuredFilePath)
    ? configuredFilePath
    : path.join(process.cwd(), configuredFilePath)
  : defaultFilePath;
let fileWriteQueue = Promise.resolve();

const getShanghaiDateKey = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());

const getRedisConfig = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  return url && token ? { url, token } : null;
};

const redisCommand = async <T>(command: unknown[]): Promise<T> => {
  const config = getRedisConfig();

  if (!config) {
    throw new Error("Redis is not configured.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Redis command failed with ${response.status}.`);
  }

  const body = (await response.json()) as { result: T };
  return body.result;
};

const incrementRedisStats = async (): Promise<VisitStats> => {
  const dateKey = getShanghaiDateKey();
  const total = await redisCommand<number>(["INCR", `${redisPrefix}:total`]);
  const today = await redisCommand<number>(["INCR", `${redisPrefix}:day:${dateKey}`]);

  await redisCommand<number>(["EXPIRE", `${redisPrefix}:day:${dateKey}`, 60 * 60 * 48]);

  return { total, today };
};

const readFileStats = async (): Promise<VisitStatsFile> => {
  const date = getShanghaiDateKey();

  try {
    const raw = await readFile(filePath, "utf8");
    const stats = JSON.parse(raw) as Partial<VisitStatsFile>;

    return {
      date: typeof stats.date === "string" ? stats.date : date,
      total: typeof stats.total === "number" ? stats.total : 0,
      today: stats.date === date && typeof stats.today === "number" ? stats.today : 0
    };
  } catch {
    return { date, total: 0, today: 0 };
  }
};

const incrementFileStatsOnce = async (): Promise<VisitStats> => {
  const date = getShanghaiDateKey();
  const stats = await readFileStats();
  const nextStats: VisitStatsFile = {
    date,
    total: stats.total + 1,
    today: stats.date === date ? stats.today + 1 : 1
  };

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(nextStats, null, 2)}\n`, "utf8");

  return {
    total: nextStats.total,
    today: nextStats.today
  };
};

const incrementFileStats = async (): Promise<VisitStats> => {
  const nextWrite = fileWriteQueue.then(incrementFileStatsOnce, incrementFileStatsOnce);
  fileWriteQueue = nextWrite.then(
    () => undefined,
    () => undefined
  );

  return nextWrite;
};

export const incrementVisitStats = async (): Promise<VisitStats> => {
  return getRedisConfig() ? incrementRedisStats() : incrementFileStats();
};
