//import { Image } from "@geist-ui/react";
import * as React from "react";
import { useQuery } from "react-query";
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
const placeholderImage = `https://external-preview.redd.it/
NADbWsobDS1wOTyi_AcFjYmfKmz6Oxyre1kFSD93Rts.jpg
?auto=webp&s=832a2557421e6f81fb6dfd0110d652941b9de6c6`;

export default function NftImage({ avatar }) {
  if (!avatar) return <img src={placeholderImage} />;
  const { contract, tokenId } = parseEnsAvatar(avatar);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, error, data, isFetching } = useQuery(
    "nftImage",
    async () => getImage(contract, tokenId)
  );

  const image = data?.nft?.metadata?.image;

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;
  if (isFetching) return <span>Fetching...</span>;
  return (
    <img
      src={image}
      style={{
        height: "300px",
        width: "300px",
        objectFit: "cover",
      }}
    />
  );
}
