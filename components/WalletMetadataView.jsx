import { injectedConnector } from "@/wallet/connectors";
import { useEagerConnect, useInactiveListener } from "@/wallet/hooks";
import styled from "@emotion/styled";
import {
  Button,
  Dot,
  Grid,
  Spacer,
  useClipboard,
  useToasts,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useWeb3React } from "@web3-react/core";
import Router from "next/router";
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
import { useBalance } from "../hooks/useBalance";
import { EthereumIcon } from "./icons/Ethereum";
// TODO: rename file

function Account() {
  const { account } = useWeb3React();
  return (
    <>
      {account === null
        ? "-"
        : account
        ? `${account.substring(0, 6)}......${account.substring(
            account.length - 4
          )}`
        : ""}
    </>
  );
}

const Container = styled.div`
  width: 50%;
  max-width: calc(100% - 20 px);
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const testingFunction = async function () {
  const ceramicClient = await authenticateAndGetClient();
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
testingFunction().then(console.log);
export const WalletMetadataView = () => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const [toasts, setToast] = useToasts();
  const { copy } = useClipboard();
  const handleCopy = () => {
    copy(context.account);
    setToast({ text: "Copied to clipboard" });
  };

  const connectWallet = async () => {
    Router.push("/feed").then(() => {
      setActivatingConnector(injectedConnector);
      activate(injectedConnector);
    });
  };

  const balance = useBalance(context);

  const disconnectWallet = async () => {
    // deactivate(injectedConnector);

    Router.push("/").then(() => {
      deactivate(injectedConnector);
    });
  };

  return (
    <Container>
      <Grid xs={22}>
        {active ? (
          <>
            <Button
              auto
              w="45%"
              mx="2px"
              iconRight={<Icon.Copy />}
              onClick={handleCopy}
            >
              <Account />
            </Button>
            <Button
              auto
              w="25%"
              mx="2px"
              effect={false}
              icon={<EthereumIcon />}
            >
              <>{balance}</>
            </Button>
            <Button
              onClick={disconnectWallet}
              icon={<Icon.LogOut />}
              auto
              w="30%"
              mx="2px"
            />
          </>
        ) : (
          <Button
            mx="5px"
            w="75%"
            scale={1}
            type="success-light"
            onClick={connectWallet}
          >
            Connect your wallet
          </Button>
        )}
        <Spacer inline />
        <Dot type={active ? "success" : error ? "error" : "warning"} />
      </Grid>
    </Container>
  );
};
