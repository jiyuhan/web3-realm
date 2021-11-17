import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';

import CeramicClient from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';

import detectEthereumProvider from '@metamask/detect-provider';

const CLAY_TESTNET_ENDPOINT = 'https://ceramic-clay.3boxlabs.com';

/**
 * Obtain an authenticated ceramic client
 * @returns ceramic client
 */
export const authenticateAndGetClient = async function() {
  const provider = await detectEthereumProvider();
  if (provider) {
    const addresses = await provider.enable();
    const authProvider = new EthereumAuthProvider(provider, addresses[0]);
    const threeIdConnect = new ThreeIdConnect();
    await threeIdConnect.connect(authProvider);

    const ceramic = new CeramicClient(CLAY_TESTNET_ENDPOINT);
    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: ThreeIdResolver.getResolver(ceramic),
    });

    await did.authenticate();
    window.ceramic = ceramic;
    window.did = did.id;

    ceramic.setDID(did);
    return ceramic;
  }

  return null;
}

/**
 * Follow an address. This call needs authentication
 */
export const follow = async function(ceramicClient, followingAddress) {
  // deterministic entry, family: <authenticated address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#create-a-deterministic-tiledocument

  const retrievedDoc = await TileDocument.deterministic(
    ceramicClient,
    { family: ceramicClient.signedInEthAddress, tags: ['following']},
    { pin: true }
  );

  console.log(retrievedDoc.content);

  if (retrievedDoc.content === undefined || retrievedDoc.content === null) {
    return await retrievedDoc.update(
      { following: [followingAddress]},
      { family: ceramicClient.signedInEthAddress, tags: ['following']},
      { pin: true }
    );
  } else {
    return await retrievedDoc.update(
      { following: [...new Set([...retrievedDoc.content.following, followingAddress])]},
      { family: ceramicClient.signedInEthAddress, tags: ['following']},
      { pin: true }
    );
  }
}

/**
 * Unfollow an address. This call needs authentication
 */
export const unfollow = async function(ceramicClient, unfollowAddress) {
  // update stream, family: <authenticated address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#update-a-tiledocument

  const retrievedDoc = await TileDocument.deterministic(
    ceramicClient,
    { family: ceramicClient.signedInEthAddress, tags: ['following']},
    { pin: true }
  );

  console.log(retrievedDoc.content);

  if (retrievedDoc.content === undefined || retrievedDoc.content === null) {
    return;
  } else {
    return await retrievedDoc.update(
      { following: retrievedDoc.content.following.filter(x => x !== unfollowAddress)},
      { family: ceramicClient.signedInEthAddress, tags: ['following']},
      { pin: true }
    );
  }
}

/**
 * Load all addresses a particular address is following. This call is open to public
 */
export const loadFollowing = async function(ceramicClient) {
  // load stream, family: <any address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#query-a-deterministic-tiledocument

  try {
    const retrievedDoc = await TileDocument.deterministic(
      ceramicClient,
      { family: ceramicClient.signedInEthAddress, tags: ['following']},
      { pin: true }
    );

    console.log(retrievedDoc.content);

    return retrievedDoc.content;
  } catch (error) {
    console.error(error);

    throw new Error('Error getting data');
  }
}

/**
 * Favorite a transaction. This call needs authentication
 */
export const favoriteTransaction = async function() {
  // deterministic entry, family: <authenticated address>, tags: [favorite]
}

/**
 * Un-favorite a transaction. This call needs authentication
 */
 export const unfavoriteTransaction = async function() {
  // update entry, family: <authenticated address>, tags: [favorite]
}

/**
 * Load all favorite transactions by an address. This call needs authentication
 */
export const loadAllFavoriteTransactions = async function() {
  // load stream, family: <any address>, tags: [favorite]
}
