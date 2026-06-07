import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // output: "export",
  cacheComponents: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    process.env.ALLOWED_DEV_ORIGINS || "http://localhost:3000",
  ],
};

export default nextConfig;
