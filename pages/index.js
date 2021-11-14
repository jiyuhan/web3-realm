import * as React from "react";
import { Web3Provider } from "@ethersproject/providers";
import {
  UnsupportedChainIdError,
  useWeb3React,
  Web3ReactProvider
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import { injected, network } from "../wallet/connectors";
import { useEagerConnect, useInactiveListener } from "../wallet/hooks";

const connectorsByName = {
  Injected: injected,
  Network: network,
}

const getErrorMessage = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser provider detected. Please install MetaMask.";
  } else if (error instanceof UnsupportedChainIdError) {
    return `MetaMask detected an unsupported network. Please switch to ${error.chainId} network.`;
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this application to access your Ethereum account in Metamask.";
  } else {
    console.log(error);
    return "An unknown error occurred. Please try again.";
  }
};

const getLibrary = (provider, connector) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

// eslint-disable-next-line import/no-anonymous-default-export
// eslint-disable-next-line react/display-name
export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}

const App = () => {
  const {
    connector,
    active,
    error,
    activate,
    deactivate,
    library,
    chainId,
    account
  } = useWeb3React();

  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector();
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>My Realm</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to your <a href="">Realm</a>
          </h1>

          <p className={styles.description}>
            Connect your wallet to get started{" "}
          </p>

          {Object.keys(connectorsByName).map((name) => {
            const currectConnector = connectorsByName[name];
            const activating = currectConnector === activatingConnector;
            const connected = currectConnector === connector;
            const disabled = !triedEager || !!activatingConnector || connected || !!error;
            return (
              <div className={styles.grid} key={name}>
                <div href="https://nextjs.org/docs" className={styles.card}>
                  <button disabled={disabled} onClick={() => {
                    console.log("clicked connect");
                    setActivatingConnector(currectConnector);
                    activate(connectorsByName[name]);
                  }}>{name}</button>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
};
