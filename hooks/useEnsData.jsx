import * as React from "react";
export const useEnsData = (props) => {
  const { provider, address } = props;
  const [ethAddress, setEthAddress] = React.useState();
  const [ens, setEns] = React.useState();
  const [url, setUrl] = React.useState();
  const [avatar, setAvatar] = React.useState();
  React.useEffect(() => {
    if (!!provider && !!address) {
      console.log("provider", provider)
      let stale = false;
      // only way to use async inside useEffect
      (async () => {
        const ens = address.endsWith(".eth")
          ? address
          : await provider.lookupAddress(address);
        const ethAddress = await provider.resolveName(address);
        setEthAddress(ethAddress);
        !stale && setEns(ens);
        const resolver = await provider.getResolver(ens);
        if (resolver === null) {
          setUrl(null);
          setAvatar(null);
        } else {
          !stale && setUrl(await resolver.getText("url"));
          !stale && setAvatar(await resolver.getText("avatar"));
        }
      })();
      return () => {
        stale = true;
        setEns(undefined);
        setUrl(undefined);
        setAvatar(undefined);
        setEthAddress(undefined);
      };
    }
  }, [address]);
  console.log(ens);
  return { ens, url, avatar, ethAddress };
};
