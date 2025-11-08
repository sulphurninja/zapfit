import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['lightningcss'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    
    // Handle lightningcss native modules
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push({
        'lightningcss': 'commonjs lightningcss',
      });
    }
    
    return config;
  },
  outputFileTracing: true,
};

export default nextConfig;
