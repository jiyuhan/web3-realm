// import { injectedConnector } from "@/wallet/connectors";
// import { NETWORK_NAME_TO_CHAIN_ID } from "@/pages/constants/network";
import { parseBigNumberToString } from "@/pages/util/bigNumberConverter";
import { Input } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { useState } from "react";

export const OPENSEA_ENDPOINT = "https://api.opensea.io/api/v1";

export const fetchOpenSeaData = async (avatarAddress) => {
  const erc721Address =  avatarAddress.split("erc721:")[1];
  const response = await fetch(`${OPENSEA_ENDPOINT}/asset/${erc721Address}/`);
  const data = await response.json();
  return data;
}

const fetchAddresData = async (address, provider) => {
  const balance = await provider.getBalance(address);
  // ENS data
  const resolver = await provider.getResolver(address);
  const url = resolver === null ? "" : await resolver.getText("url");
  const avatar = resolver === null ? "" : await resolver.getText("avatar");
  const ethAddress = resolver === null ? address : await resolver.getAddress();
  const ens =
    resolver === null ? "" : await provider.lookupAddress(ethAddress);
  const openSeaData = await fetchOpenSeaData(avatar);
  return {
    address: ethAddress,
    ens,
    balance: parseBigNumberToString(18, balance).substr(0, 4),
    url,
    avatar,
    img: openSeaData.image_original_url,
  };
};

export const EthAddressSearchView = (props) => {
  const {} = props;
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

  const onSearchInput = (event) => {
    setUserInput(event.target.value);
  };

  const onEnterPress = async (event) => {
    console.log("key pressed", event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      fetchAddresData(userInput, library).then((item) => {
        console.log(item);
        return <pre>{JSON.stringify(item)}</pre>;
        // setSearchAddressBalance(item.balance)
        // setResolvedEnsAddress(item.url)
      });
      // const resolver = await library.getResolver(userInput);
      // if (active) {
      //   async function getEthBalance(address) {
      //     try {
      //       const ethBalance = await library.getBalance(address);
      //       setSearchAddressBalance(parseBigNumberToString(18, ethBalance));
      //     } catch (error) {
      //       setSearchAddressBalance(null);
      //     }
      //   }
      //   async function resolveName(address) {
      //     try {
      //       const result = await library.resolveName(address);

      //       const url = await resolver.getText("url");
      //       setResolvedEnsAddress(result);
      //       console.log(url);
      //     } catch (error) {
      //       setResolvedEnsAddress(null);
      //       setSearchAddressBalance(null);
      //     }
      //   }
      //   getEthBalance(userInput);
      //   resolveName(userInput);
      // }
    }
  };

  return (
    <div>
      <Input
        placeholder="Type eth or ENS address here"
        onInput={onSearchInput}
        onKeyPress={onEnterPress}
      />
      {searchAddressBalance !== null && (
        <div>
          <p>Address: {resolvedAddress}</p>
          <p>Ξ {searchAddressBalance}</p>
          <button>Follow</button>
        </div>
      )}
    </div>
  );
};
