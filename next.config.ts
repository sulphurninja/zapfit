import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable Turbopack for builds
    turbo: undefined,
  },
  // Use SWC for CSS minification instead of lightningcss
  swcMinify: true,
};

export default nextConfig;
