import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: undefined, // Disable turbopack to avoid path issues
  },
  // Disable turbopack entirely
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
};

export default nextConfig;