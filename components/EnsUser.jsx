import * as React from 'react';
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { User, Link } from "@geist-ui/react";
import { useEnsData } from "../hooks/useEnsData";
import { parseEnsAvatar } from "../util/ens-avatar-parser";


const getImage = async (contract, tokenId) => {
  const response = await fetch(
    `/api/nft-details/?contract_address=${contract}&token_id=${tokenId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


export const EnsUser = ({ address }) => {
  const { library } = useWeb3React();

  const {ens, url, avatar, ethAddress} = useEnsData({ provider: library, address });

  const { contract, tokenId } = parseEnsAvatar(avatar);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, error, data, isFetching } = useQuery(
    `nftImage-${tokenId}-${contract}`,
    async () => getImage(contract, tokenId)
  );

  const image = data?.nft?.metadata?.image;

  return <>
    <User src={image || 'https://pbs.twimg.com/profile_images/1455381288756695041/acatxTm8_400x400.jpg'} name={ens || `${address.substring(0, 8)}...`} >
      {url
        ? <User.Link href={url}>{url}</User.Link>
        : <User.Link href={`https://etherscan.io/address/${ethAddress}`}>{ethAddress}</User.Link>}
    </User>
  </>;
}
