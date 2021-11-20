import * as React from "react";
import { useWeb3React } from "@web3-react/core";
import { authenticateAndGetClient } from "store/ceramicStore";

export const CeramicContext = React.createContext(null);

export const useCeramicContext = () => {
  return React.useContext(CeramicContext);
};

export const CeramicContextWrapper = ({children}) => {
  const web3Context = useWeb3React();
  const { active, } = web3Context;

  const [client, setClient] = React.useState();

  const value = { client, setClient };

  const loadCeramicClient = async (isWalletConnected) => {
    if (isWalletConnected) {
      const ceramicClient = await authenticateAndGetClient();
      setClient(ceramicClient);
    }
  }
  React.useEffect(() => {
    loadCeramicClient(active);
  }, [active]);

  return (
    <CeramicContext.Provider value={value}>
      {children}
    </CeramicContext.Provider>
  )
}

