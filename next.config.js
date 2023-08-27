/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  env: {
    NEXT_APP_DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    KAVE_NEGAR_API_KEY: process.env.KAVE_NEGAR_API_KEY
  },
};

module.exports = nextConfig;
