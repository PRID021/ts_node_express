import type { NextConfig } from "next";
import "reflect-metadata";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**", // Allow any path within this domain
      },
    ],
  },
};

export default nextConfig;
