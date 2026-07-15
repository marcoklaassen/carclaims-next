import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.VOICE_API_BACKEND
          ? `${process.env.VOICE_API_BACKEND}/:path*`
          : 'http://localhost:8080/:path*',
      },
    ];
  },
};

export default nextConfig;
