/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API: process.env.API,
    WS: process.env.WS,
  },
};

module.exports = nextConfig;
