import { LoadingUI } from "@/components/loading";
import NftImage from "@/components/nft-image";
import ReadableTx from "@/components/readable-tx";
import { Card, Grid, Text, Link, Note } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import useSWR from "swr";
import { useCeramicContext } from "../../contexts/CeramicContext";
import { useEnsData } from "../../hooks/useEnsData";
import { fetcher } from "../../lib/fetcher";
import {
  follow,
  loadFollowing,
  unfollow,
  detectFollowListChange,
} from "@store/ceramicStore";
import { FollowCard } from "../../components/FollowCard";

export default function Profile() {
  const web3Context = useWeb3React();
  const { active, account, library } = web3Context;
  const { client } = useCeramicContext();
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [mounted, setMounted] = React.useState(false);
  const [portfolioValue, setPortfolioValue] = React.useState();
  const queryParams = new URLSearchParams({ account });
  //const api_route = `/api/nft/account?${queryParams}`;
  // const { data, error } = useSWR(
  //   mounted ? `/api/address-txs/?address=${account}` : null,
  //   fetcher
  // );
  const [following, setFollowing] = React.useState([]);

  // const txsData = data ? data.data.items : [];

  const { ens, url, avatar } = useEnsData({
    provider: library,
    address: account,
  });
  const getPortfolioValue = async () => {
    const response = await fetcher(`/api/portfolio-value/?address=${account}`);
    setPortfolioValue(response);
  };

  React.useEffect(() => {
    (async () => {
      if (client) {
        const response = await loadFollowing(client);
        const { following } = response;
        setFollowing(following);
      }
    })();
    setMounted(true);

    return () => {
      setMounted(false);
    }
  }, [client, loading]);

  if (loading)
    return (
      <div>
        Loading... <LoadingUI />
      </div>
    );

  return (
    <div>
      {ens ? (
        <>
          <Text h1>{`Hi, ${ens}`}</Text>
          <NftImage avatar={avatar} />{" "}
        </>
      ) : (
        <Note>
          <Text h5>
            You don't seem to have a primary ENS domain to serve as your web3
            profile. Learn more{" "}
            <Link color href="https://ens.domains/" target="_blank">
              here.
            </Link>
          </Text>
        </Note>
      )}
      <br />
      <Text h1>Following</Text>
      <br />
      {following &&
        following.map((address) => {
          return <FollowCard address={address} />;
        })}
    </div>
  );
}
