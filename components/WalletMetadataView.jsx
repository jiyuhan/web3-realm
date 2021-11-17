import { parseBigNumberToString } from "util/bigNumberConverter";
import { injectedConnector } from "@/wallet/connectors";
import {
  Grid,
  Button,
  ButtonGroup,
  Card,
  Dot,
  Spacer,
  Link,
  Toggle,
  Text,
  useClipboard,
  useToasts, Input
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import styled from "@emotion/styled";
import { EthereumIcon } from "./icons/Ethereum";
import { follow, authenticateAndGetClient, loadFollowing, unfollow } from "store/ceramicStore";



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

function Balance() {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;
      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);
  return (
    <>
      {balance === null
        ? "Error"
        : balance
        ? parseBigNumberToString(18, balance).substr(0, 4)
        : ""}
    </>
  );
}

const Header = styled.div`
  /* width: 400px;
  max-width: calc(100% - 20px);
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end; */

  width: 50%;
  max-width: calc(100% - 20 px);
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const testingFunction = async function() {
  const ceramicClient = await authenticateAndGetClient();
  await follow(ceramicClient, '0xEd31Df7261CFFe94A81B63c6a408583Cf482f7Ba');
  const followingList = await loadFollowing(ceramicClient);

  await unfollow(ceramicClient, '0xEd31Df7261CFFe94A81B63c6a408583Cf482f7Ba');
  const followingList = await loadFollowing(ceramicClient);
}

export const WalletMetadataView = () => {
  const context = useWeb3React();
  const { active, error, activate, deactivate } = context;

  React.useEffect(() => {

    if (active) {
      testingFunction(context);
    }

  }, [active, error, activate, deactivate]);

  const [toasts, setToast] = useToasts();
  const { copy } = useClipboard();
  const handleCopy = () => {
    copy(context.account);
    setToast({ text: "Copied to clipboard" });
  };

  return (
    <Header>
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
            <Button auto w="25%" mx="2px" effect={false} icon={<EthereumIcon/>}>
              <Balance />
            </Button>
            <Button
              onClick={() => {
                deactivate(injectedConnector);
              }}
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

            onClick={() => {
              activate(injectedConnector);
            }}
          >
            Connect your wallet
          </Button>
        )}
        <Spacer inline />
        <Dot type={active ? "success" : error ? "error" : "warning"} />
      </Grid>
    </Header>
  );
};
