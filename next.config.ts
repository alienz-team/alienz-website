import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Media is pre-compressed to WebP in /public/media, so skip the Next image
  // optimizer (Workers would otherwise need a paid Cloudflare Images binding).
  images: { unoptimized: true },
  // Let OpenNext bundle and patch the Prisma client for workerd.
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
};

export default nextConfig;

// Exposes Cloudflare bindings to `next dev`.
initOpenNextCloudflareForDev();
