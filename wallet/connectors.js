import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const RPC_URLS = {
  1: process.env.PRC_URL_1,
  4: process.env.PRC_URL_4,
}

// MetaMask handles onchain communication, and we only
// need to specify which chain IDs we support
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56],
});

// TODO: add connector for WalletConnect
export const walletConnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
})
