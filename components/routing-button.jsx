import styled from "@emotion/styled";
import { Button, Grid } from "@geist-ui/react";
import Router from "next/router";
import * as React from "react";

const Container = styled.div`
  height: 35px;
  display: flex;
  flex-direction: column;
  width: 15%;
`;

// TODO: styling for the button
export const RoutingButton = (props) => {
  const {text, pathname,} = props;
  const [loading, setLoading] = React.useState(false);

  const onButtonClick = async (event) => {
    event.preventDefault();
    Router.push(pathname);
  };

  return (
    <Container>
      <Grid.Container direction="row" gap={1} justify="center">
        <Grid>
          <Button
            auto
            type="secondary"
            loading={loading}
            onClick={onButtonClick}
          >
            {text}
          </Button>
          {/*

        <Spacer inline />
        <Dot type={active ? "success" : error ? "error" : "warning"} /> */}
        </Grid>
      </Grid.Container>
    </Container>
  );
};
