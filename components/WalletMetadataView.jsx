import { parseBigNumberToString } from "@/pages/util/bigNumberConverter";
import { injectedConnector } from "@/wallet/connectors";
import {
  Button,
  Card,
  Dot,
  Spacer,
  useClipboard,Text,
  useToasts,
} from "@geist-ui/react";
import { LogOut } from "@geist-ui/react-icons";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import styled from "styled-components";
function Account() {
  const { account } = useWeb3React();

  return (
    <>
      {account === null
        ? "-"
        : account
        ? `${account.substring(0, 6)}...${account.substring(
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
        ? `Ξ${parseBigNumberToString(18, balance).substr(0, 4)}`
        : ""}
    </>
  );
}

const Header = styled.div`
  width: 350px;
  height: 25px;
  display: flex;
  justify-content: space-between;
`;

export const WalletMetadataView = () => {
  const context = useWeb3React();
  const { active, error, activate, deactivate } = context;

  const [toasts, setToast] = useToasts();
  const { copy } = useClipboard();
  const handleCopy = () => {
    copy(context.account);
    setToast({ text: "Copied to clipboard" });
  };

  return (
    <Header>
      {active ? (
        <>
          {/* <Card w="200px" h="24px">
            <Card.Content paddingTop="0" paddingBottom="0">
              <Text font="14px">
              <Account />
              <Spacer inline />
              <Balance />
              </Text>
            </Card.Content>
          </Card> */}
          <Button h="24px" onClick={handleCopy}>
            <Account />
            <Spacer w={2.2} />
            <Balance />
          </Button>

          <Button
            h="24px"
            w="28px"
            icon={<LogOut />}
            onClick={() => {
              deactivate(injectedConnector);
            }}
          ></Button>
        </>
      ) : (
        <Button
          w="90%"
          h="24px"
          type="success-light"
          onClick={() => {
            activate(injectedConnector);
          }}
        >
          Connect
        </Button>
      )}
      <Button h="24px" w="2px" disabled>
        <Dot type={active ? "success" : error ? "error" : "warning"} />
      </Button>
    </Header>
  );
};
