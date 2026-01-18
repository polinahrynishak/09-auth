import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://09-auth-55mg.vercel.app/api/:path*",
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
