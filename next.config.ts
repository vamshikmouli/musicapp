import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['drive.google.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
