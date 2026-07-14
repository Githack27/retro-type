import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const apiDest = process.env.API_URL
      ? `${process.env.API_URL}/api/:path*`
      : 'https://api.retro-type.detqel.com/api/:path*';
    return [
      {
        source: '/api/:path*',
        destination: apiDest,
      },
    ];
  },
};

export default nextConfig;
