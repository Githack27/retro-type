import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const apiDest = process.env.API_URL
      ? `${process.env.API_URL}/api/:path*`
      : 'https://retro-type-production.up.railway.app/api/:path*';
    return [
      {
        source: '/api/:path*',
        destination: apiDest,
      },
    ];
  },
};

export default nextConfig;
