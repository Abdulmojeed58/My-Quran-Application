/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    REDIS_URL: process.env.REDIS_URL,
    APP_ENV: process.env.APP_ENV,
    LIVE_TAIL_TOKEN: process.env.LIVE_TAIL_TOKEN,
  },
};
