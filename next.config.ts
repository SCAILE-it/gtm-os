import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: undefined, // Disable turbopack to avoid path issues
  },
  // Disable turbopack entirely
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;