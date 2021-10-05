/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  /* Add Your Scss File Folder Path Here */
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
