import {
  Avatar,
  Button,
  Divider,
  Fieldset,
  Grid,
  Link,
  Spacer,
  Text,
  Badge,
  Card
} from "@geist-ui/react";
import NftImage from "@/components/nft-image";
import * as Icon from "@geist-ui/react-icons";
import { useEnsData } from "../hooks/useEnsData";
import { parseBigNumberToString } from "util/bigNumberConverter";
import { EnsUser } from './EnsUser'
import { ArrowRight } from '@geist-ui/react-icons'
import * as React from "react";
import { useWeb3React } from "@web3-react/core";


export const FeedCard = ({ transactionDetail }) => {
  const { library }  = useWeb3React();

  return (
    <>
      {/* <Fieldset style={{ width: "480px", maxWidth: "calc(100% - 20px)" }}>
        <Fieldset.Content py="8pt" px="10pt">
          <Grid.Container alignItems="center" justify="flex-start">
            <Grid w="33%">
              <Avatar src={img} scale={2}></Avatar>
            </Grid>
            <Spacer w="10px" />
            <Grid xs={8} w="66%">
              <Grid.Container direction="row">
                <Grid xs={20} margin="1px">
                  <Text b h4 mx="0px" my="5.5px">
                    {ens}
                  </Text>
                </Grid>
                <Grid xs={24}>
                  <Text small>
                    <Link block padding="0px">
                      {address}
                    </Link>
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Fieldset.Content>

        <Divider my={0} />
        <Fieldset.Content>
          <Text scale={1.25} mb={0}>
            {text}
          </Text>
        </Fieldset.Content>
        <Fieldset.Footer
          py="0px"
          px="3px"
          margin="0px"
          style={{ justifyContent: "space-between" }}
        >
          <Button type="abort" auto iconRight={<Icon.Heart />} />

          <Button type="abort" auto scale={2 / 3} iconRight={<Icon.Link />}>
            2021-9-4 21:30:21
          </Button>

          <Button type="abort" auto scale={2 / 3} iconRight={<Icon.Copy />}>
            0xfcc...
          </Button>
        </Fieldset.Footer>
      </Fieldset>
      <Spacer inline h="12pt" /> */}
      <Card shadow style={{minWidth: '600px'}}>
        <Spacer />
        <Grid.Container gap={2} justify="center">
          <EnsUser address={transactionDetail.from} />
          {/* <NftImage avatar={ensFrom.avatar} isProfilePic={true} />
          <Grid xs><Link href={`https://etherscan.io/address/${transactionDetail.from}`}>{ensFrom.ens || transactionDetail.from.substring(0, 8)}</Link></Grid> */}
          <Grid style={{ minWidth: '300px', textAlign: 'center' }}><ArrowRight /></Grid>

          {/* <Divider style={{minWidth: '300px'}} /> */}
          <EnsUser address={transactionDetail.to} />
          {/* <NftImage avatar={ensTo.avatar} isProfilePic={true} />
          <Grid xs><Link href={`https://etherscan.io/address/${transactionDetail.to}`}>{ensTo.ens || transactionDetail.to.substring(0, 8)}</Link></Grid> */}
        </Grid.Container>

        <Link href={`https://etherscan.io/tx/${transactionDetail.hash}`} >
          <Text h6 type="secondary">{transactionDetail.hash}</Text>
        </Link>

        <Grid.Container gap={2} justify="center">
          {/* <Grid md></Grid> */}
          <Grid xs>Value</Grid>
          <Grid xs>Ξ {parseBigNumberToString(18, transactionDetail.value).substring(0, 6)}</Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          {/* <Grid md></Grid> */}
          <Grid xs>Block confirmations</Grid>
          <Grid xs><Badge>{transactionDetail.confirmations}</Badge></Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          {/* <Grid md></Grid> */}
          <Grid xs>Transaction type</Grid>
          <Grid xs>{transactionDetail.data === '0x' ? 'Transaction' : 'Smart contract'}</Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          {/* <Grid md></Grid> */}
          <Grid xs>Gas price</Grid>
          <Grid xs>{parseBigNumberToString(9, transactionDetail.gasPrice)} GWEI</Grid>
        </Grid.Container>
        <Card.Footer>
          {new Date(transactionDetail.timestamp * 1000).toDateString()} {new Date(transactionDetail.timestamp * 1000).toLocaleTimeString()}
        </Card.Footer>
      </Card>
    </>
  );
};
