import { Button, Grid, Card, Text } from "@geist-ui/react";
import * as React from "react";
// TODO: finish
export default function ReadableTx(props) {
  const {datetime, cost,} = props;

  return (
<Grid>
  <Card>
    {JSON.stringify(props)}
  </Card>
</Grid>
  );
}
