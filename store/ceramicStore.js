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

  await add(ceramicClient, 'following', followingAddress);
}

/**
 * Unfollow an address. This call needs authentication
 */
export const unfollow = async function(ceramicClient, unfollowAddress) {
  // update stream, family: <authenticated address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#update-a-tiledocument

  await remove(ceramicClient, 'following', unfollowAddress);
}

/**
 * Load all addresses the authenticated wallet itself is following
 */
 export const loadFollowing = async function(ceramicClient) {
  // load stream, family: <any address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#query-a-deterministic-tiledocument

  return await getList(ceramicClient, 'following', ceramicClient.signedInEthAddress);
}

/**
 * Load all addresses a particular address is following. This call does not require authentication
 */
export const loadFollowingForAddress = async function(ceramicClient, forAddress) {
  // load stream, family: <any address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#query-a-deterministic-tiledocument

  return await getList(ceramicClient, 'following', forAddress);
}

/**
 * Favorite a transaction. This call needs authentication
 */
export const favoriteTransaction = async function(ceramicClient, transactionHash) {
  // deterministic entry, family: <authenticated address>, tags: [favorite]

  await add(ceramicClient, 'favorite', transactionHash);
}


/**
 * Un-favorite a transaction. This call needs authentication
 */
 export const unfavoriteTransaction = async function(ceramicClient, transactionHash) {
  // update entry, family: <authenticated address>, tags: [favorite]

  await remove(ceramicClient, 'favorite', transactionHash);
}

/**
 * Load all favorite transactions for wallet itself. This call needs authentication
 */
export const loadAllFavoriteTransactions = async function(ceramicClient) {
  // load stream, family: <any address>, tags: [favorite]

  return await getList(ceramicClient, 'favorite', ceramicClient.signedInEthAddress);
}

/**
 * Load all favorite transactions for a particular address. This call needs authentication
 */
 export const loadAllFavoriteTransactionsForAddress = async function(ceramicClient, forAddress) {
  // load stream, family: <any address>, tags: [favorite]

  return await getList(ceramicClient, 'favorite', forAddress);
}

const add = async function(ceramicClient, tag, item) {
  const retrievedDoc = await TileDocument.deterministic(
    ceramicClient,
    { family: ceramicClient.signedInEthAddress, tags: [tag]},
    { pin: true }
  );

  console.log(retrievedDoc.content);

  if (!retrievedDoc.content
    || Object.keys(retrievedDoc.content).length === 0
  ) {
    return await retrievedDoc.update(
      { [tag]: [item]},
      { family: ceramicClient.signedInEthAddress, tags: [tag]},
      { pin: true }
    );
  } else {
    return await retrievedDoc.update(
      { [tag]: [...new Set([...retrievedDoc.content[tag], item])]},
      { family: ceramicClient.signedInEthAddress, tags: [tag]},
      { pin: true }
    );
  }
}

const remove = async function(ceramicClient, tag, item) {
  const retrievedDoc = await TileDocument.deterministic(
    ceramicClient,
    { family: ceramicClient.signedInEthAddress, tags: [tag]},
    { pin: true }
  );

  console.log(retrievedDoc.content);

  if (retrievedDoc.content === undefined || retrievedDoc.content === null) {
    return;
  } else {
    return await retrievedDoc.update(
      { [tag]: retrievedDoc.content[tag].filter(x => x !== item)},
      { family: ceramicClient.signedInEthAddress, tags: [tag]},
      { pin: true }
    );
  }
}

const getList = async function(ceramicClient, tag, forAddress) {
  try {
    const retrievedDoc = await TileDocument.deterministic(
      ceramicClient,
      { family: forAddress, tags: [tag]},
      { pin: true }
    );

    console.log(retrievedDoc.content);

    return retrievedDoc.content;
  } catch (error) {
    console.error(error);

    throw new Error('Error getting data');
  }
}
