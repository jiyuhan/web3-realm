import { Grid, Loading } from "@geist-ui/react";
import * as React from "react";
// TODO: how do?
export const LoadingUI = () => {
  return (
    <Grid.Container gap={2.5}>
      <Grid xs={24}>
        <Loading type="success" />
      </Grid>
      <Grid xs={24}>
        <Loading type="secondary" />
      </Grid>
      <Grid xs={24}>
        <Loading type="warning" />
      </Grid>
      <Grid xs={24}>
        <Loading type="error" />
      </Grid>
    </Grid.Container>
  );
};
