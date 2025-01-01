import type { NextConfig } from "next";
import "reflect-metadata";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allow https protocol
        hostname: "**", // Allow any hostname
        pathname: "/**", // Allow any path within any hostname
      },
      {
        protocol: "http", // Allow http protocol
        hostname: "**", // Allow any hostname
        pathname: "/**", // Allow any path within any hostname
      },
    ],
  },
};

export default nextConfig;
