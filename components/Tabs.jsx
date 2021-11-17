import { Grid, Input, Link, Tabs, Text } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import * as React from "react";
import { EthAddressSearchView } from "./EthAddressSearchView";
export const TabsView = (props) => {
  return (
    <Grid.Container
      w="30%"
      gap={2}
      justify="flex-start"
      direction="column"
      alignItems="center"
    >
      <Input w="100%" placeholder="Type eth or ENS address here" />
      <EthAddressSearchView />
      {/*
      <Spacer /> */}
      <Grid>
        <Tabs initialValue="1" w="100%">
          <Tabs.Item
            label={
              <>
                <Icon.BookOpen /> Feed
              </>
            }
            value="1"
            key="1"
          >
            <Text mt={0}></Text>
            <Link
              href="https://github.com/geist-org/react"
              color
              rel="nofollow"
              target="_blank"
            >
              abcd
            </Link>
          </Tabs.Item>
          <Tabs.Item
            label={
              <>
                <Icon.Twitter /> Following{" "}
              </>
            }
            value="2"
            key="2"
          >
            <Text mt={0}>The Components of React looks very cool.</Text>
          </Tabs.Item>
          <Tabs.Item key="3" value="3" label={<>Followers</>}></Tabs.Item>
        </Tabs>
      </Grid>
    </Grid.Container>
  );
};
