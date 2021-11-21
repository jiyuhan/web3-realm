//import { Image } from "@geist-ui/react";
import * as React from "react";
import { Avatar } from "@geist-ui/react";
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

export default function NftImage({ avatar, isProfilePic }) {
  if (!avatar)
    return isProfilePic ? (
      <Avatar src={placeholderImage} scale={2} />
    ) : (
      <img src={placeholderImage} />
    );
  const { contract, tokenId } = parseEnsAvatar(avatar);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, error, data, isFetching } = useQuery(
    `nftImage-${tokenId}-${contract}`,
    async () => getImage(contract, tokenId)
  );

  const image = data?.nft?.metadata?.image;

  return (
    <>
      {isProfilePic ? (
        <Avatar src={image} scale={2} />
      ) : (
        <img
          src={image}
          style={{
            height: "150px",
            width: "150px",
            // objectFit: "cover",
          }}
        />
      )}
    </>
  );
}
