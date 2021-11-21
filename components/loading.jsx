import { Grid, Loading } from "@geist-ui/react";
import * as React from "react";
// TODO: how do?
export const LoadingUI = () => {
  return (
    <Grid.Container gap={2.5}>
      <Grid xs={24}>
        <Loading type="success" />
      </Grid>
    </Grid.Container>
  );
};
