import React from 'react';
import { makeStyles, Box, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    // backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    left: 0,
    // padding: theme.spacing(3),
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2000,
  },
  loader: {
    width: 200,
    maxWidth: "100%",
    margin: "auto",
  },
}));

export default function PageLoading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box width={200}>
        <img className={classes.loader} src="images/logo.svg" alt="loader" />
        {/* <LinearProgress height={10} /> */}
      </Box>
    </div>
  );
}
