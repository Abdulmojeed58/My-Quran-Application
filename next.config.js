/** @type {import('next').NextConfig} */

module.exports = {
  env: {
      REDIS_PASSWORD: process.env.REDIS_PASSWORD,
      REDIS_HOST: process.env.REDIS_HOST,
      REDIS_PORT: process.env.REDIS_PORT,
  },
};