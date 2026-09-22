import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const internalHeaders = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, noimageindex" }];
    return [
      { source: "/threerace-brasil/:path*", headers: internalHeaders },
      { source: "/brasil-2027/:path*", headers: internalHeaders },
    ];
  },
};

export default nextConfig;
