export const parseEnsAvatar = (avatarAddress) => {
  const [type, address, tokenId] = avatarAddress.split("/");
  const [chainId, ensAddress, ensTokenId] = address.split(":");

  return {
    type,
    contract: ensAddress,
    tokenId: ensTokenId || tokenId,
    chainId: chainId || "1",
  };
};
