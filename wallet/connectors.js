import { InjectedConnector } from "@web3-react/injected-connector";

// MetaMask handles onchain communication, and we only
// need to specify which chain IDs we support
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56],
});

// TODO: add connector for WalletConnect
