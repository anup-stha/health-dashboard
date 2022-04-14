// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");
const path = require("path");

const moduleExports = {
  // Your existing module.exports
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
    images: {
      loader: "akamai",
      path: "",
    },
    domains: ["sunya-bucket.s3.us-west-2.amazonaws.com"],
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports);
