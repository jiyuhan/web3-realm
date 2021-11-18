import { EthAddressSearchView } from "@/components/EthAddressSearchView";
import { FeedCard } from "@/components/FeedCard";
import { WalletMetadataView } from "@/components/WalletMetadataView";
import styles from "@/styles/Home.module.css";
import { Web3Provider } from "@ethersproject/providers";
import {
  UnsupportedChainIdError,
  useWeb3React,
  Web3ReactProvider,
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { CeramicContextWrapper } from "../context/CeramicContext";
import Head from "next/head";
import * as React from "react";

const getErrorMessage = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser provider detected. Please install MetaMask.";
  } else if (error instanceof UnsupportedChainIdError) {
    return `MetaMask detected an unsupported network. Please switch to another network.`;
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this application to access your Ethereum account in Metamask.";
  } else {
    console.log(error);
    return "An unknown error occurred. Please try again.";
  }
};

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  return library;
};

// fetch(ENDPOINT/following, {streamId: 342345724})
/**
 * response = {
 * [
 * "0x3457634875624",
 * "0x3457634875624",
 * "0x3457634875624",
 * "0x3457634875624",
 * "0x3457634875624",
 * ]
 * }
 */
// imgSrc, address, text, profilePath
export const FAKE_FEED = [
  {
    address: "0x983110309620D911731Ac0932219af06091b6744",
    ens: "brantly.eth",
    balance: "2.46",
    url: "http://brantly.xyz/",
    avatar: "eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/2430",
    img: "https://api.wrappedpunks.com/images/punks/2430.png",
    text: "Swapped 25 ETH for 420.69 USDC on PussySwap v69 💸",
    details: "",
  },
  {
    address: "0x648aA14e4424e0825A5cE739C8C68610e143FB79",
    ens: "sassal.eth",
    balance: "69.46",
    url: "http://jondoe.pizza/",
    avatar: "eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/6571",
    img: "https://lh3.googleusercontent.com/-w3k-j9DHgkrIJ10IJ7aNmRSawLKJW3JLtLjTH9jHyxEmgBb30KFj82YX59kQImzDZy1yiu5Gv7YyAJwfTtSKcToffSM3-OcdILkNg=w600",
    text: "Minted a new ERC-721 token: CryptoPunk[6969] 🎨",
    detail: "",
  },
  {
    address: "0x648aA14e4424e0825A5cE739C8C686123985271",
    ens: "krypto.eth",
    balance: "0.87",
    url: "http://jondoe.pizza/",
    avatar: "eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/6571",
    img: "https://lh3.googleusercontent.com/YinTK0CUDPGnoE-7RPOuSlDSO8-3WyNrpkzcOXPtKRl36yuhMGoJjLfzrCyx15bh8gCYZf33SxALC_FxxnW-tNJpUIubv4CUeAcnLDQ=s0",
    text: "Withdrew 75% of LINK-USDT liquidity pool 🐻 📉",
    detail: "",
  },
];

const App = () => {
  return (
    <div>
      <Head>
        <title>My Realm</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          {/* <EthAddressSearchView /> */}
          <WalletMetadataView />
        </div>
        <div className={styles.content}>

          <EthAddressSearchView />
          {/* {FAKE_FEED.map((item, idx) => (

              <FeedCard
                key={idx}
                address={item.address}
                ens={item.ens}
                balance={item.balance}
                img={item.img}
                text={item.text}
                profilePath="abcd"
              />

          ))} */}
        </div>
        {/* <Card>
          {context.error && <p>{getErrorMessage(context.error)}</p>}
          {context.active && (
            <div>
              <EthAddressSearchView />
            </div>
          )}
        </Card> */}
        {/* <nav className="items">NAV</nav>
        <div className="items contents">CONTENTS</div>
        <aside className="items">ASIDE</aside>
        */}
        {/* <div className={styles.footer}>FOOTER</div> */}
      </div>
    </div>
  );
};

export default function wrappedProvider() {
  const { client, setClient } = React.useState();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <CeramicContext.Provider value={{client, setClient}}>
        <App />
      </CeramicContext.Provider> */}
      <CeramicContextWrapper>
         <App />
      </CeramicContextWrapper>
    </Web3ReactProvider>
  );
}
