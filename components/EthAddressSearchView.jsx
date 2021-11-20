// import { injectedConnector } from "@/wallet/connectors";
// import { NETWORK_NAME_TO_CHAIN_ID } from "@/pages/constants/network";
import styled from "@emotion/styled";
import { Button, Grid, Input } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCeramicContext } from "contexts/CeramicContext";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
// console.log("nftport");
// retrieveNftDetails(
//   "eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/2430"
// ).then(console.log);
// export const OPENSEA_ENDPOINT = "https://api.opensea.io/api/v1";
// export const fetchOpenSeaData = async (avatarAddress) => {
//   const erc721Address = avatarAddress.split("erc721:")[1];
//   const response = await fetch(`${OPENSEA_ENDPOINT}/asset/${erc721Address}/`);
//   const data = await response.json();
//   return data;
// };

// const fetchAddressData = async (address, provider) => {
//   const balance = await provider.getBalance(address);
//   // ENS data
//   const resolver = await provider.getResolver(address);
//   // if (resolver) {
//   //   const [url, avatar, ethAddress] = Promise.all([resolver.getText('url'), resolver.getText('avatar'), resolver.getAddress()]);
//   // }
//   const url = resolver === null ? "" : await resolver.getText("url");
//   const avatar = resolver === null ? "" : await resolver.getText("avatar");
//   const ethAddress = resolver === null ? address : await resolver.getAddress();
//   // const ens =
//   //   resolver === null ? "" : await provider.lookupAddress(ethAddress);
//   // const openSeaData = await fetchOpenSeaData(avatar);
//   return {
//     address: ethAddress,
//     // ens,
//     balance: parseBigNumberToString(18, balance).substr(0, 4),
//     // url,
//     // avatar,
//     // img: openSeaData.image_original_url,
//   };
// };
const Container = styled.div`
  height: 35px;
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const EthAddressSearchView = (props) => {
  const {} = props;
  const context = useWeb3React();
  const { client } = useCeramicContext();
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
  const [loading, setLoading] = React.useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchAddressBalance, setSearchAddressBalance] = useState(null);
  const [resolvedAddress, setResolvedEnsAddress] = useState();

  const onSearchInput = (event) => {
    setUserInput(event.target.value);
    // console.log(`onSearchInput: DID\n${client?.context.did._id}`);
  };

  const router = useRouter();

  const onSearchSubmit = async (event) => {
    event.preventDefault();
    // fetchAddressData(userInput, library).then((data) => {
    //   setResolvedEnsAddress(data);
    //   setSearchAddressBalance(data.balance);
    router.push({
      pathname: "/user",
      as: `/user/${userInput}`,
      query: { address: userInput },
    });
  };

  const onEnterPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // fetchAddressData(userInput, library).then((item) => {
      //   setSearchAddressBalance(item.balance);
      //   setResolvedEnsAddress(item.address);
      // });
      router.push({
        pathname: "/user",
        as: `/user/${userInput}`,
        query: { address: userInput },
      });
    }
  };

  return (
    <Container>
      <Grid.Container direction="row" gap={1.5}>
        <Grid md={15}>
          <Input
            mx="5px"
            w="100%"
            scale={1.1}
            placeholder="Type Eth or ENS address . . ."
            clearable
            readOnly={!active}
            onInput={onSearchInput}
            onKeyPress={onEnterPress}
          />
        </Grid>

        <Grid>
          <Button
            auto
            type="success-light"
            loading={loading}
            onClick={onSearchSubmit}
          >
            Search
          </Button>
          {/*

        <Spacer inline />
        <Dot type={active ? "success" : error ? "error" : "warning"} /> */}
        </Grid>
      </Grid.Container>
    </Container>
    // <div>
    //   <Input
    //     placeholder="Type eth or ENS address here"
    //     onInput={onSearchInput}
    //     onKeyPress={onEnterPress}
    //   />
    //   {searchAddressBalance !== null && (
    //   <div>
    //     <p>Address: {resolvedAddress}</p>
    //     <p>Ξ {searchAddressBalance}</p>
    //     <button onClick={handleFollowButtonClick}>Follow</button>
    //   </div>
    //   )}
    // </div>
  );
};
