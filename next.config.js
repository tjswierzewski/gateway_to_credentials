module.exports = {
  webpack(config) {
    config.devtool = "eval-source-map";
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: [
      "lighthouse-the-asset-storage-dev.s3.amazonaws.com",
      "lighthouse-the-asset-storage-prod.s3.amazonaws.com",
    ],
  },
};
