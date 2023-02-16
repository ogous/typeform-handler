/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ALCHEMY_KEY: process.env.ALCHEMY_KEY
  }
}

module.exports = nextConfig
