import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { useState, useEffect } from "react";

import styles from "../../styles/Home.module.css";
import { injectedConnector } from "../../wallet/connectors";
import { NETWORK_NAME_TO_CHAIN_ID } from "../constants/network";
import { parseBigNumberToString } from "../util/bigNumberConverter";

export const EthAddressSearchView = function () {
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
    <input placeholder='Type eth or ENS address here' />
  );
};
