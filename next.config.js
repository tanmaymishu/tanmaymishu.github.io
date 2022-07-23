/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
