/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "picsum.photos",
      "fakestoreapi.com",
      "naszsklep-api.vercel.app",
      "media.graphassets.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
  i18n,
};

module.exports = nextConfig;
