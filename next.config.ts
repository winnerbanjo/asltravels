import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/studio",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/studio",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
