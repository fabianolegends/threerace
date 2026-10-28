import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const internalHeaders = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, noimageindex" }];
    return [
      ...[1, 2, 3].map((stage) => ({
        source: `/uruguay-2026/gpx/stage-${stage}-tr3-uruguay.gpx`,
        headers: [
          { key: "Content-Type", value: "application/gpx+xml; charset=utf-8" },
          { key: "Content-Disposition", value: `attachment; filename="Stage ${stage} - TR3 Uruguay.gpx"` },
        ],
      })),
      ...[1, 2].map((stage) => ({
        source: `/gravel-2026/gpx/stage-${stage}-gravel-experience-tr3-uruguay.gpx`,
        headers: [
          { key: "Content-Type", value: "application/gpx+xml; charset=utf-8" },
          { key: "Content-Disposition", value: `attachment; filename="Stage ${stage} - Gravel Experience TR3 Uruguay.gpx"` },
        ],
      })),
      { source: "/threerace-brasil/:path*", headers: internalHeaders },
      { source: "/:locale(pt|es|en)/threerace-brasil/:path*", headers: internalHeaders },
      { source: "/brasil-2027/:path*", headers: internalHeaders },
    ];
  },
};

export default nextConfig;
