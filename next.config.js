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

module.exports = moduleExports;
