import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // @ts-expect-error - Next types don't expose full cache shape
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
