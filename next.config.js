/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_DB_URI: process.env.DB_URI
  }
}

module.exports = nextConfig
