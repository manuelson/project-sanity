import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add cdn
  images: {
    domains: ["cdn.sanity.io", "ui-avatars.com"],
  },
};

export default nextConfig;
