import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { useState, useEffect } from "react";

import styles from "../../styles/Home.module.css";
import { injectedConnector } from "../../wallet/connectors";
import { NETWORK_NAME_TO_CHAIN_ID } from "../constants/network";
import { parseBigNumberToString } from "../util/bigNumberConverter";

export const WalletMetadataView = function () {
  const context = useWeb3React();
  const {
    connector,
    active,
    error,
    activate,
    deactivate,
    library,
    chainId,
    account,
  } = context;

  const [ethBalance, setWalletEthBalance] = useState(0);

  useEffect(() => {
    if (active) {
      async function getEthBalance(address) {
        const ethBalance = await library.getBalance(address);
        setWalletEthBalance(parseBigNumberToString(18, ethBalance));
      }
      getEthBalance(account);
    }
  }, [active, account, library]);

  return (
    <div className={styles.card}>
      {active ? (
        <div>
          <p>Wallet connected</p>
          <p>{NETWORK_NAME_TO_CHAIN_ID[chainId]}</p>
          <p>Network: {`${account.substring(0, 10)}...`}</p>
          <p>Ξ {ethBalance}</p>
          <button
            onClick={() => {
              deactivate(injectedConnector);
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            activate(injectedConnector);
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
};
