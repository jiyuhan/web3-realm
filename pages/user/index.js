import { LoadingUI } from "@/components/loading";
import NftImage from "@/components/nft-image";
import ReadableTx from "@/components/readable-tx";
import { Button, Card, Grid } from "@geist-ui/react";
import { follow } from "@store/ceramicStore";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import * as React from "react";
import useSWR from "swr";
import { parseBigNumberToString } from "util/bigNumberConverter";
import { parseEnsAvatar } from "util/ens-avatar-parser";
import { useCeramicContext } from "../../contexts/CeramicContext";
import { fetcher } from "../../lib/fetcher";

const fetchAddressData = async (address, provider) => {
  const balance = await provider.getBalance(address);
  const ens = await provider.lookupAddress(address);
  const resolver = await provider.getResolver(ens);
  const url = await resolver.getText("url");
  const avatar = await resolver.getText("avatar");
  const { contractAddress, tokenId } = parseEnsAvatar(avatar);
  return {
    address: address,
    balance: parseBigNumberToString(18, balance).substr(0, 4),
    ens,
    url,
    avatar: {
      contractAddress,
      tokenId,
    },
  };
};

const SearchedUser = () => {
  const web3Context = useWeb3React();
  const { client } = useCeramicContext();
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const router = useRouter();
  const { address } = router.query;

  const [mounted, setMounted] = React.useState(false);
  const queryParams = new URLSearchParams({ address });
  //const api_route = `/api/nft/account?${queryParams}`;

  const { data, error } = useSWR(
    loading ? `/api/address-txs/?address=${address}` : null,
    fetcher
  );
  const txsData = data ? data.data.items : [];
  console.log(data);
  const loadUserData = async () => {
    const res = await fetchAddressData(address, web3Context.library);
    setUserData(res);
  };

  React.useEffect(() => {
    setMounted(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    loadUserData();
  }, []);

  const handleFollowButtonClick = (e) => {
    e.preventDefault();
    console.log(
      "button click with client",
      client,
      "resolved address",
      address
    );
    follow(client, address);
  };

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
            <NftImage
              contract={userData.avatar.contractAddress}
              tokenId={userData.avatar.tokenId}
            />
          </Grid>
          <Grid xs={12}>
            <Button
              auto
              // type="success-light"
              loading={loading}
              onClick={handleFollowButtonClick}
            >
              Follow
            </Button>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={12}>
        <Card shadow width="100%">
          <pre> {JSON.stringify(userData, null, 2)}</pre>
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
};
export default SearchedUser;
