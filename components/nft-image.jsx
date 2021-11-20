import { Image } from "@geist-ui/react";
import * as React from "react";
import { useQuery } from "react-query";

const getURL = (contract, tokenId) =>
  `/api/nft-details/?contract_address=${contract}&token_id=${tokenId}`;

export default function NftImage({ contract, tokenId }) {
  const { isLoading, error, data, isFetching } = useQuery(
    "nftImage",
    async () => {
      const response = await fetch(getURL(contract, tokenId));
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );

  const image = data?.nft?.metadata?.image;

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;
  if (isFetching) return <span>Fetching...</span>;
  return <Image alt="nft image" src={image} width="540px" height="160px" />;
}
