import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { injectedConnector } from "./connectors";

// "Eager connect" is to store connectorId in localStorage
export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injectedConnector, undefined, true).catch(() => {
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
        activate(injectedConnector);
      };
      const handleChainChanged = (chainId) => {
        console.log(`handling 'chainChanged' event..: ${chainId}`);
        activate(injectedConnector);
      };
      const handleAccountsChanged = (accounts) => {
        console.log(
          `handling 'accountsChanged' event with payload ${accounts}`
        );
        if (accounts.length > 0) {
          deactivate(injectedConnector);
          activate(injectedConnector);
        }
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};
