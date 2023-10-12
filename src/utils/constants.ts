export const whitelistedIps = [
  {
    ip: "127.0.0.1",
    isRemovable: false,
  },
  {
    ip: "102.89.44.1",
    isRemovable: false,
  },
];

export enum CacheKeys {
    CHAPTERS = 'chapters',
    VERSE = 'verse',
}

export const Config = {
    redisPassword: process.env.REDIS_PASSWORD,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
}