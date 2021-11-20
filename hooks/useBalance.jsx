import * as React from "react";
import { parseBigNumberToString } from "../util/bigNumberConverter";
export const useBalance = (props) => {
  const { account, library, chainId } = props;
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
  return balance === null
    ? "Error"
    : balance
    ? parseBigNumberToString(18, balance).substr(0, 4)
    : "";
};
