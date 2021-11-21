import * as React from 'react';
import { useWeb3React } from "@web3-react/core";
import { User, Link } from "@geist-ui/react";
import { useEnsData } from "../hooks/useEnsData";

export const EnsUser = ({ address }) => {
  const { library } = useWeb3React();

  const {ens, url, avatar} = useEnsData(library, address);

  return <Link href={`https://etherscan.io/address/${address}`}>
    <User src={avatar || 'https://pbs.twimg.com/profile_images/1455381288756695041/acatxTm8_400x400.jpg'} name={ens || `${address.substring(0, 8)}...`} >
      {url && <User.Link href={`https://etherscan.io/address/${address}`}>{address}</User.Link>}
    </User>
  </Link>;
}
