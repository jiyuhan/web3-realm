// Docs: https://docs.nftport.xyz/docs

const API_KEY = process.env.NEXT_PUBLIC_NFT_PORT_KEY;
const NFT_PORT_ENDPOINT = "https://api.nftport.xyz/v0";
console.log(API_KEY);

// TODO: add logging and error handling

/**
 * NFTPort API Wrapper
 * @param {string} relativePath - The relative path to the endpoint
 * @param {object} [parameters] - Optional query parameters
 * @return {Promise<Object>}
 */
const NftPortRequest = async (
  relativePath,
  parameters = { chain: "ethereum" }
) => {
  const queryParams = new URLSearchParams(parameters);
  const url = `${NFT_PORT_ENDPOINT}/${relativePath}?` + queryParams;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    redirect: "follow",
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * Returns NFTs owned by a given account (i.e. wallet) address. Can also return each NFT metadata with 'include' parameter.
 */
export const retrieveNftsByAddress = async (address) => {
  const relativePath = `accounts/${address}`;
  return NftPortRequest(relativePath);
};

/**
 * Returns details for a given NFT. These include metadata_url, metadata such as name, description, attributes, etc., image_url, cached_image_url and mint_date.
 */
export const retrieveNftDetails = async (contractAddress, tokenId) => {
  //const { type, contractAddress, tokenId, chainId } = parseEnsAvatar(ensAvatar);
  const relativePath = `nfts/${contractAddress}/${tokenId}`;
  return NftPortRequest(relativePath);
};
