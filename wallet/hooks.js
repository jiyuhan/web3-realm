import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { injected } from "./connectors";

// "Eager connect" is to store connectorId in localStorage
export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);
  return tried;
};

export const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React();

  React.useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("handling 'connect' event..");
        activate(injected)
      };
      const handleChainChanged = (chainId) => {
        console.log("handling 'chainChanged' event..");
        activate(injected);
      };
      const handleAccountsChanged = (accounts) => {
        console.log(
          `handling 'accountsChanged' event with payload ${accounts}`
        );
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId) => {
        console.log(
          `Handling 'networkChanged' event wi finjeth payload ${networkId}`
        );
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};
