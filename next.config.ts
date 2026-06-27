import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep local production builds out of the dev server's .next folder:
  // running `next build` while `next dev` is up corrupts shared chunks
  // (MODULE_NOT_FOUND './NNN.js', missing routes-manifest.json).
  // On Vercel (VERCEL=1) always use the default .next, which the platform expects.
  distDir:
    !process.env.VERCEL && process.env.NODE_ENV === "production"
      ? ".next-build"
      : ".next",
  images: {
    unoptimized: true,
  },
  // Reduce memory pressure from webpack persistent caching in dev
  // This mitigates: [webpack.cache.PackFileCacheStrategy] RangeError: Array buffer allocation failed
  webpack: (config, { dev }) => {
    if (dev && config.cache) {
      // disable filesystem cache in dev to avoid huge memory spikes on Windows
      // see https://webpack.js.org/configuration/cache/
      // Types are broad; guard before assigning
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
