import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
   serverExternalPackages: [
      'puppeteer-core',
      '@sparticuz/chromium'
    ],
reactStrictMode:false
  
};

export default nextConfig;
