import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    forceSwcTransforms: true,
  },
  // experimental: {
  //   staleTimes: {
  //     dynamic: 60
  //   }
  // }
};

export default nextConfig;
