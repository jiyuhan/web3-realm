import { LoadingUI } from "@/components/loading";
import NftImage from "@/components/nft-image";
import ReadableTx from "@/components/readable-tx";
import { Button, Card, Grid } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { follow, loadFollowing, unfollow } from "@store/ceramicStore";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import * as React from "react";
import useSWR from "swr";
import { useCeramicContext } from "../../contexts/CeramicContext";
import { useBalance } from "../../hooks/useBalance";
import { useEnsData } from "../../hooks/useEnsData";
import { fetcher } from "../../lib/fetcher";

export default function Profile() {
  const web3Context = useWeb3React();
  const { library, chainId } = web3Context;
  const { client } = useCeramicContext();

  const router = useRouter();
  const { address } = router.query;
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const[ followed, setFollowed ] = React.useState(false);

  const { ens, url, avatar } = useEnsData({ provider: library, address });
  const balance = useBalance({ account: address, library, chainId });

  const { data, error } = useSWR(
    mounted ? `/api/address-txs/?address=${address}` : null,
    fetcher
  );
  const txsData = data ? data.data.items : [];

  React.useEffect(() => {
    (async () => {
      if (client) {
        const response = await loadFollowing(client);
        const { following } = response;
        console.log(
          "loadFollowing",
          following[0],
          address,
          following.includes(address)
        );
        const isFollowed = following.includes(address);
        setFollowed(isFollowed);
      }
    })();
    setMounted(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleFollowButtonClick = async (e) => {
    e.preventDefault();
    console.log(
      "button click with client",
      client,
      "resolved address",
      address
    );

    if (client) {
      follow(client, address);
    }
  };

  const handleUnfollowClick = async (event) => {
    event.preventDefault();
    console.log(
      "button click with client",
      client,
      "resolved address",
      address
    );

    if (client) {
      unfollow(client, address);
    }
  };
  if (error) return <div>Failed to load users</div>;
  if (!data || loading)
    return (
      <div>
        Loading... <LoadingUI />
      </div>
    );

  return (
    <Grid.Container
      gap={0.2}
      justify="center"
      direction="row"
      height="100%"
      width="70%"
    >
      <Grid md={24} justify="center">
        <NftImage avatar={avatar} />
      </Grid>
      <Grid md={24} justify="center">
        {followed ? (
          <Button
            icon={<Icon.UserX />}
            type="error"
            ghost
            w="305px"
            h="40px"
            shadow
            loading={loading}
            onClick={handleUnfollowClick}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            icon={<Icon.UserPlus />}
            w="305px"
            h="40px"
            shadow
            loading={loading}
            onClick={handleFollowButtonClick}
          >
            Follow
          </Button>
        )}
      </Grid>

      <Grid xs={12}>
        <Card shadow width="100%">
          <pre>balance:{balance}</pre>
          <pre>site: {url}</pre>
          {/* <pre> {JSON.stringify(data[0], null, 2)}</pre> */}
        </Card>
      </Grid>
      <Grid xs={24}>
        <ReadableTx datetime="" cost="" />
        {/* <Card shadow width="100%" height="50px">
          {JSON.stringify(data)}
        </Card> */}
      </Grid>
      <Grid>placeholder</Grid>
    </Grid.Container>
  );
}
