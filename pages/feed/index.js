import { FeedCard } from "@/components/FeedCard";
import * as React from "react";
import {
  authenticateAndGetClient,
  favoriteTransaction,
  follow,
  loadAllFavoriteTransactions,
  loadFollowing,
  unfavoriteTransaction,
  unfollow,
} from "store/ceramicStore";
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

export default function Feed() {
  const ceramicClient =  authenticateAndGetClient();
  const testingFunction = async function () {
    await follow(ceramicClient, "0xEd31Df7261CFFe94A81B63c6a408583Cf482f7Ba");
    await loadFollowing(ceramicClient);

    await unfollow(ceramicClient, "0xEd31Df7261CFFe94A81B63c6a408583Cf482f7Ba");
    await loadFollowing(ceramicClient);

    await favoriteTransaction(
      ceramicClient,
      "0xc6ddfacc31833b7c6e5dc59bf58a92706fd006e5dc37872dd0196ea8671be4f3"
    );
    await loadAllFavoriteTransactions(ceramicClient);

    await unfavoriteTransaction(
      ceramicClient,
      "0xc6ddfacc31833b7c6e5dc59bf58a92706fd006e5dc37872dd0196ea8671be4f3"
    );
    await loadAllFavoriteTransactions(ceramicClient);
  };
  

  return (
    <div>
      {FAKE_FEED.map((item, idx) => (
        <FeedCard
          key={idx}
          address={item.address}
          ens={item.ens}
          balance={item.balance}
          img={item.img}
          text={item.text}
          profilePath="abcd"
        />
      ))}
    </div>
  );
}
