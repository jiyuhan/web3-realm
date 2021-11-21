import styled from "@emotion/styled";
import { Button, Grid, Input } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCeramicContext } from "contexts/CeramicContext";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";

const Container = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: calc(100% - 20 px);
`;
export const EthAddressSearchView = (props) => {
  const {} = props;
  const context = useWeb3React();
  const { client } = useCeramicContext();
  const {
    connector,
    active,
    error,
    activate,
    deactivate,
    library,
    chainId,
    account,
  } = context;
  const [loading, setLoading] = React.useState(false);
  const [userInput, setUserInput] = useState("");

  const onSearchInput = (event) => {
    setUserInput(event.target.value);
  };

  const router = useRouter();

  const onSearchSubmit = async (event) => {
    event.preventDefault();
    router.push({
      pathname: "/user",
      as: `/user/${userInput}`,
      query: { address: userInput },
    });
  };

  const onEnterPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push({
        pathname: "/user",
        as: `/user/${userInput}`,
        query: { address: userInput },
      });
    }
  };

  return (
    <Container>
      <Grid.Container justify="center" gap={1.5}>
        <Grid xs={14}>
          <Input
            mx="5px"
            w="100%"
            scale={1.1}
            placeholder="Type Eth or ENS address . . ."
            clearable
            readOnly={!active}
            onInput={onSearchInput}
            onKeyPress={onEnterPress}
          />
        </Grid>

        <Grid>
          <Button
            auto
            type="success-light"
            loading={loading}
            onClick={onSearchSubmit}
          >
            Search
          </Button>
          {/*

        <Spacer inline />
        <Dot type={active ? "success" : error ? "error" : "warning"} /> */}
        </Grid>
      </Grid.Container>
    </Container>
  );
};
