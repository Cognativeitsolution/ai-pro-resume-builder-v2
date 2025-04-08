import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // disables TypeScript errors during build
  },
};

export default nextConfig;
