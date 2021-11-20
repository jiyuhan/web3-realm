export const parseEnsAvatar = (avatarAddress) => {
  const [type, address, tokenId] = avatarAddress.split("/");
  const [chainId, ensAddress, ensTokenId] = address.split(":");

  return {
    type,
    contractAddress: ensAddress,
    tokenId: ensTokenId || tokenId,
    chainId: chainId || "1",
  };
};
