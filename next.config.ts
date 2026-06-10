import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";
// const repoName = "/llm-docs";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  // basePath: isProd ? repoName : "",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    process.env.ALLOWED_DEV_ORIGINS || "http://localhost:3000",
  ],
};

export default nextConfig;
