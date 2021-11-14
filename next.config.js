module.exports = {
  env: {
    RPC_URL_1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
    RPC_URL_4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
    WALLETCONNECT_KEY: process.env.WALLETCONNECT_KEY,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  distDir: 'build'
};
