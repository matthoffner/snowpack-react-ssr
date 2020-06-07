import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function Shell() {
    return (
      <Grid container wrap="nowrap">
        {Array.from(new Array(3)).map((item, index) => (
          <Box key={index} width={210} marginRight={0.5} my={5}>
            <Skeleton variant="rect" width={210} height={118} />
            <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
          </Box>
        ))}
      </Grid>
    )
  }
export default Shell;  