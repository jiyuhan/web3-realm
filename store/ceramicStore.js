import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';

import CeramicClient from '@ceramicnetwork/http-client';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';


const CLAY_TESTNET_ENDPOINT = 'https://ceramic-clay.3boxlabs.com';
const did = new DID({ resolver })
ceramic.did = did


export const getThreeIdConnectClient = async function(ethProvider, signedInEthAddress) {
  const authProvider = new EthereumAuthProvider(ethProvider, signedInEthAddress);
  const threeIdConnect = new ThreeIdConnect();
  await threeIdConnect.connect(authProvider);

  const ceramic = new CeramicClient(CLAY_TESTNET_ENDPOINT);
  const did = new DID({
    provider: threeIdConnect.getDidProvider(),
    resolver: ThreeIdResolver.getResolver(ceramic),
  });

  await did.authenticate();
  window.idx = new IDX({ ceramic });
  window.ceramic = ceramic;
  window.did = did.id;
}


/**
 * using 3ID-DID authentication path
 * https://developers.ceramic.network/authentication/3id-did/3id-connect
 */
export const signIn = async function() {

}

/**
 * Follow an address. This call needs authentication
 */
export const follow = async function() {
  // deterministic entry, family: <authenticated address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#create-a-deterministic-tiledocument
}

/**
 * Unfollow an address. This call needs authentication
 */
export const unfollow = async function() {
  // update stream, family: <authenticated address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#update-a-tiledocument
}

/**
 * Load all addresses a particular address is following. This call is open to public
 */
export const loadFollowing = async function() {
  // load stream, family: <any address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#query-a-deterministic-tiledocument
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
 export const favoriteTransaction = async function() {
  // update entry, family: <authenticated address>, tags: [favorite]
}

/**
 * Load all favorite transactions by an address. This call needs authentication
 */
export const loadAllFavoriteTransactions = async function() {
  // load stream, family: <any address>, tags: [favorite]
}
