import * as React from 'react'
import { FeedCard } from './FeedCard'
import {Card, Grid, Spacer, Divider,} from '@geist-ui/react'
export const Feed = (props) => {
  const {feedData} = props;

  return (
    <Grid.Container>
      <FeedCard imgSrc={''} address={item} text={text} profilePath={1} />;
    </Grid.Container>
    // feedData.map((item) => {
    //   <FeedCard imgSrc={item.src} address={item} text={text} profilePath={1} />;
    // })
  );
}