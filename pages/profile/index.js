import { LoadingUI } from "@/components/loading";
import NftImage from "@/components/nft-image";
import ReadableTx from "@/components/readable-tx";
import { Grid } from "@geist-ui/react";
import { loadFollowing } from "@store/ceramicStore";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import useSWR from "swr";
import { useCeramicContext } from "../../contexts/CeramicContext";
import { useEnsData } from "../../hooks/useEnsData";
import { fetcher } from "../../lib/fetcher";

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
  const { data, error } = useSWR(
    mounted ? `/api/address-txs/?address=${account}` : null,
    fetcher
  );
  const [following, setFollowing] = React.useState([]);

  const txsData = data ? data.data.items : [];

  const { ens, url, avatar } = useEnsData({
    provider: library,
    address: account,
  });
  const getPortfolioValue = async () => {
    const response = await fetcher(`/api/portfolio-value/?address=${account}`);
    setPortfolioValue(response);
  };
  const getFollowing = async () => {
    setFollowing([]);
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
    setLoading(true);
    getPortfolioValue();
    getFollowing();
    setTimeout(() => setLoading(false), 1000);
  }, [client]);

  if (error) return <div>Failed to load users</div>;
  if (!data || loading)
    return (
      <div>
        Loading... <LoadingUI />
      </div>
    );

  return (
    <Grid.Container gap={2} justify="center" height="100%" width="70%">
      <Grid xs={12}>
        <Grid.Container gap={2} justify="center" width="70%">
          <Grid xs={24}>
            <NftImage avatar={avatar} />
          </Grid>
          <Grid xs={12}></Grid>
        </Grid.Container>
      </Grid>
      {/* {following && following.map((address) => {
        return <Grid xs={12}>
        <Card shadow width="100%">
          <pre> {JSON.stringify(address, null, 2)}</pre>
        </Card>
      </Grid>
      })} */}

      <Grid xs={24}>
        {/* TODO: map txsData to ReadableTx */}
        {JSON.stringify(data)}
        <ReadableTx datetime="" cost="" />
      </Grid>
      <Grid>placeholder</Grid>
    </Grid.Container>
  );
}
