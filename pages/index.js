import { EthAddressSearchView } from "@/components/EthAddressSearchView";
import { WalletMetadataView } from "@/components/WalletMetadataView";
import styles from "@/styles/Home.module.css";
import { Web3Provider } from "@ethersproject/providers";
import {
  UnsupportedChainIdError,
  useWeb3React,
  Web3ReactProvider,
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import Head from "next/head";
import * as React from "react";

const getErrorMessage = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser provider detected. Please install MetaMask.";
  } else if (error instanceof UnsupportedChainIdError) {
    return `MetaMask detected an unsupported network. Please switch to another network.`;
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this application to access your Ethereum account in Metamask.";
  } else {
    console.log(error);
    return "An unknown error occurred. Please try again.";
  }
};

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  return library;
};

const App = () => {
  const context = useWeb3React();

  return (
    <div>
      <Head>
        <title>My Realm</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <WalletMetadataView />
        </div>
        <nav>
          {context.error && <p>{getErrorMessage(context.error)}</p>}
          {context.active && (
            <div>
              <EthAddressSearchView />
            </div>
          )}
        </nav>
        {/* <nav className="items">NAV</nav>
        <div className="items contents">CONTENTS</div>
        <aside className="items">ASIDE</aside>
        <div className={styles.footer}>FOOTER</div> */}
      </div>
    </div>
  );
};

export default function wrappedProvider() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
