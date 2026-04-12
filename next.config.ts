import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/studio",
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
