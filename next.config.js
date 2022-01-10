/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/10/22, 8:57 AM
 *
 *
 */

/** @type {import("next").NextConfig} */
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, crypto: false };

    return config;
  },

  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [],
  },
});
