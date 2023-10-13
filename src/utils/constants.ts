export const whitelistedIps = [
  {
    ip: "102.89.43.30",
    isRemovable: false,
  },
  {
    ip: "102.89.44.15",
    isRemovable: false,
  },
];

export enum CacheKeys {
  CHAPTERS = "chapters",
  VERSE = "verse",
}

export const Config = {
  redisUrl: process.env.REDIS_URL,
  appEnv: process.env.APP_ENV,
  liveTailToken: process.env.LIVE_TAIL_TOKEN,
};
