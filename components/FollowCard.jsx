import {
  Avatar,
  Button,
  Divider,
  Fieldset,
  Grid,
  Link,
  Spacer,
  Text,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import * as React from "react";
import { useWeb3React } from "@web3-react/core";
import { useEnsData } from "../hooks/useEnsData";
import { parseEnsAvatar } from "../util/ens-avatar-parser";
import { useQuery } from "react-query";

import NftImage from "./nft-image";

export const FollowCard = ({ address }) => {
  const web3Context = useWeb3React();
  const { library, chainId } = web3Context;
  const { ens, url, avatar } = useEnsData({ provider: library, address });
  const topline = ens || address;

  return (
    <>
      {console.log("avatar: ", avatar)}
      <Fieldset style={{ width: "480px", maxWidth: "calc(100% - 20px)" }}>
        <Fieldset.Content py="8pt" px="10pt">
          <Grid.Container alignItems="center" justify="flex-start">
            <Grid w="33%">
              <NftImage avatar={avatar} isProfilePic={true} />
              {/* <Avatar src={image ? image : placeholderImage} scale={2} /> */}
            </Grid>
            <Spacer w="10px" />
            <Grid xs={8} w="66%">
              <Grid.Container direction="row">
                <Grid xs={20} margin="1px">
                  <Text h4 mx="0px" my="5.5px">
                    <Link href={`/user/?address=${topline}`}>{topline}</Link>
                  </Text>
                </Grid>
                <Grid xs={24}>
                  <Text small>
                    <Link href={url} target="_blank" block padding="0px">
                      {url && url}
                    </Link>
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Fieldset.Content>
      </Fieldset>
      <Spacer inline h="12pt" />
    </>
  );
};
