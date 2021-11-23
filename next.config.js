module.exports = {
  webpack(config) {
    config.devtool = "eval-source-map";
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: [
      "gateway-to-blockchain-assets-development.s3.amazonaws.com",
      "gateway-to-blockchain-assets-production.s3.amazonaws.com",
    ],
  },
};
