import Layout from "@/components/layout";
import "@/styles/globals.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import * as React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CeramicContextWrapper } from "../contexts/CeramicContext";

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};
// TODO: add respectable logging
const Root = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    // <Component />
    <Web3ReactProvider
      getLibrary={getLibrary}
      libraryName={"ethers.js" | "web3.js" | null}
    >
      <CeramicContextWrapper>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CeramicContextWrapper>
    </Web3ReactProvider>
  );
};

export default Root;
