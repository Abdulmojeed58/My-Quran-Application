export const whitelistedIps = [
  {
    ip: "127.04.02.10",
    isRemovable: false,
  },
  {
    ip: "102.89.44.15",
    isRemovable: false,
  },
];

export enum CacheKeys {
    CHAPTERS = 'chapters',
    VERSE = 'verse',
}

export const Config = {
    redisUrl: process.env.REDIS_URL,
    appEnv: process.env.APP_ENV,
    liveTailToken: process.env.LIVE_TAIL_TOKEN,
}