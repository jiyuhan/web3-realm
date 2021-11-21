
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import Head from "next/head";
import * as React from "react";
import {Display, Image, Grid, Text} from '@geist-ui/react';

const getErrorMessage = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser provider detected. Please install MetaMask.";
  } else if (error instanceof UnsupportedChainIdError) {
    return `MetaMask detected an unsupported network. Please switch to another network.`;
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this application to access your Ethereum account in Metamask.";
  } else {
    console.log(error);
    return "An unknown error occurred. Please try again.";
  }
};

export default function App() {
  const web3Context = useWeb3React();
  const { library, active, account, chainId, address } = web3Context;
  // TODO: add title, favicon, etc.
  // TODO: add loading screen
  return (
    <div>
      <Head>
        <title>My Realm</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Display
        shadow
        caption="This is a demo."
      >
        <Image
          alt=""

          src="https://cdn.discordapp.com/attachments/874767980423159831/911775013353427025/unknown.png"
        />
      </Display>
    </div>
  );
}
