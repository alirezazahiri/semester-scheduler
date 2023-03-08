/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  env: {
    NEXT_APP_DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

module.exports = nextConfig;
