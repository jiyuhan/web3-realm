import { LoadingUI } from "@/components/loading";
import NftImage from "@/components/nft-image";
import ReadableTx from "@/components/readable-tx";
import { Button, Card, Grid } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import {
  follow,
  loadFollowing,
  unfollow,
  detectFollowListChange,
} from "@store/ceramicStore";
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

  const [followingList, setFollowingList] = React.useState();

  const [resolvedName, setResolvedName] = React.useState();

  const { ens, url, avatar } = useEnsData({ provider: library, address });
  const balance = useBalance({ account: address, library, chainId });

  const transactionsForAddress = useSWR(
    mounted ? `/api/address-txs/?address=${address}` : null,
    fetcher
  );

  const transactionsDetail = transactionsForAddress.data;
  const transactionsError = transactionsForAddress.error;

  const txsData = transactionsDetail?.data.items || [];

  React.useEffect(() => {
    (async () => {
      if (client) {
        if (loading) {
          try {
            const response = await detectFollowListChange(
              client,
              client.signedInEthAddress,
              followingList,
              10000
            );
            setFollowingList(response.following);
            setLoading(false);
          } catch (error) {
            console.error("Error detected", error);
            // no change detected after timeout,
            setLoading(false);
          }
        } else {
          const response = await loadFollowing(client);
          const { following } = response;
          const resolvedName = await library.resolveName(address);
          setFollowingList(following);
          setResolvedName(resolvedName);
        }
      }
    })();

    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [client, loading]);

  const handleFollowButtonClick = async (e) => {
    e.preventDefault();
    console.log(
      "button click with client",
      client,
      "resolved address",
      address
    );

    if (client) {
      const resolvedAddress = await library.resolveName(address);
      follow(client, resolvedAddress);
      setLoading(true);
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
      setLoading(true);
    }
  };

  if (transactionsError) {
    return <div>Failed to load users</div>;
  }

  if (!transactionsDetail || !client) {
    return (
      <div>
        Loading... <LoadingUI />
      </div>
    );
  }

  return (
    <Grid.Container
      gap={0.2}
      justify="center"
      direction="row"
      height="100%"
      width="70%"
    >
      {console.log("avatar: ", avatar)}
      <Grid md={24} justify="center">
        <NftImage avatar={avatar} />
      </Grid>
      <Grid md={24} justify="center">
        {(followingList ? followingList.includes(resolvedName) : false) ? (
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
          <pre>Balance: {balance}</pre>
          <pre>Ethereum Address: {resolvedName}</pre>
          <pre>Site: {url}</pre>
          {/* <pre> {JSON.stringify(data[0], null, 2)}</pre> */}
        </Card>
      </Grid>
    </Grid.Container>
  );
}
