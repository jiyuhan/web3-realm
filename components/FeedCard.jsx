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
const following = {
  address: "0xb407e25e70ce8f9273cd9bd25cf18a98ab151dce",
  following: [
    {
      address: "0x26437d312fb36bdd7ac9f322a6d4ccfe0c4fa313",
      ens: "bearbear.eth",
      img: "https://bearimage.png",
    },
    {
      address: "0x26437d312fiyfdd7ac9f322a6d4ccfe0c4fa313",
      ens: "bullbull.eth",
      img: "https://bullimage.png",
    },
  ],
};

export const FeedCard = (props) => {
  const { address, ens, img, text, profilePath, balance } = props;

  return (
    <>
      <Fieldset style={{ width: "480px", maxWidth: "calc(100% - 20px)" }}>
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
      <Spacer inline h="12pt" />
    </>
  );
};
