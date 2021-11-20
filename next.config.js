module.exports = {
  env: {
    RPC_URL_1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
    RPC_URL_4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
    // WALLETCONNECT_KEY: process.env.WALLETCONNECT_KEY,
    // NFT_PORT_KEY: process.env.PORT_NFT_KEY,
    // ETHERSCAN_IO_KEY: process.env.ETHERSCAN_IO_KEY,
    // INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
    // INFURA_PROJECT_SECRET: process.env.INFURA_PROJECT_SECRET,
    // INFURA_MAINNET_ENDPOINT: process.env.INFURA_MAINNET_ENDPOINT,
    // INFURA_TESTNET_ENDPOINT: process.env.INFURA_TESTNET_ENDPOINT,
  },
  reactStrictMode: true,
  swcMinify: true,
  styledComponents: true,
  trailingSlash: true,
  distDir: "build",
};
