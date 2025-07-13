import type { NextConfig } from "next";

import withPWA from "@ducanh2912/next-pwa";

const withPWAConfig = withPWA({
  disable: process.env.NODE_ENV === "development",
  reloadOnOnline: true,
  dest: "public",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
        protocol: "https",
        search: "",
      },
    ],
  },
};

export default withPWAConfig(nextConfig);
