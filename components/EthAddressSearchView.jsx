import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { useState, useEffect } from "react";

import styles from "@/styles/Home.module.css";
// import { injectedConnector } from "@/wallet/connectors";
// import { NETWORK_NAME_TO_CHAIN_ID } from "@/pages/constants/network";
import { parseBigNumberToString } from "@/pages/util/bigNumberConverter";

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

  const [userInput, setUserInput] = useState("");
  const [searchAddressBalance, setSearchAddressBalance] = useState(null);
  const [resolvedAddress, setResolvedEnsAddress] = useState();

  return (
    <div>
      <input
        placeholder="Type eth or ENS address here"
        onInput={(event) => {
          setUserInput(event.target.value);
        }}
        onKeyPress={(event) => {
          console.log('key pressed', event.key);
          if (event.key === 'Enter') {
            event.preventDefault();

            if (active) {
              async function getEthBalance(address) {
                try {
                  const ethBalance = await library.getBalance(address);
                  setSearchAddressBalance(parseBigNumberToString(18, ethBalance));

                } catch (error) {
                  setSearchAddressBalance(null);
                }
              }
              async function resolveName(address) {
                try {
                  const result = await library.resolveName(address);
                  setResolvedEnsAddress(result);

                } catch (error) {
                  setResolvedEnsAddress(null);
                  setSearchAddressBalance(null);
                }
              }
              getEthBalance(userInput);
              resolveName(userInput);
            }
          }
        }}
      />
      {searchAddressBalance !== null && <div>
        <p>Address: {resolvedAddress}</p>
        <p>Ξ {searchAddressBalance}</p>
        <button>Follow</button>
      </div>}
    </div>
  );
};
