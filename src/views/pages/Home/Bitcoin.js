import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  couresbannerbox: {
    padding: "0px 0 20px",
    position: "relative",

    [theme.breakpoints.down("xs")]: {
      padding: "20px 0px",
    },
    "& .coursestextBox": {
      border: "1.09225px solid #ff00cd0d",
      padding: "20px",
      position: "relative",
      background: "#0B0A0A",
      borderRadius: "10.9225px",
      zIndex: "9",
      "& .globeImgeBox": {
        position: "absolute",
        left: "36%",
        top: "0",
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
    },
    "& .leftimage2": {
      marginTop: "171px",
      marginLeft: "-58px",
      "& img": {
        width: "auto",
        maxWidth: "100%",
      },
    },
    "& .leftimage1": {
      width: "auto",
      height: "400px",

      "& img": {
        width: "auto",
        maxWidth: "100%",
        height: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        height: "auto",
      },
    },
    "& .caniicon": {
      width: "auto",
      maxWidth: "85px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "55px",
      },
    },

    "& h1": {
      fontSize: "45px",
      fontWeight: "700",
      lineHeight: "50px",
      textTransform: "uppercase",
      "@media(max-width:767px)": {
        fontSize: "22px !important",
        lineHeight: "40px",
      },
    },
    "& .textgradient": {
      fontSize: "25px",
    },
    "& .textgradientwhite": {
      fontSize: "18px !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px !important",
        lineHeight: "25px",
      },
    },
    "& h1": {
      fontSize: "45px",
      fontWeight: "700",
      lineHeight: "50px",
      textTransform: "uppercase",
      "@media(max-width:767px)": {
        fontSize: "25px !important",
        lineHeight: "40px",
      },
    },
    "& p": {
      color: "#fff",
      fontSize: "14px",
      maxWidth: "484px",
      marginTop: "20px",
      textAlign: "left",
      marginBottom: "25px",
    },
  },
}));

function Bitcoin() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.couresbannerbox}>
      <Container maxWidth="lg">
        <Box className="coursestextBox">
          <Box align="center">
            <img src="/images/globe_new.png" className="globeImgeBox" />
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Box
                className="displayStart"
                style={{ alignItems: "flex-start" }}
              >
                <Box className="leftimage1">
                  <img src="/images/bitcoin_new.png" alt="learn" />
                </Box>

                <Box className="leftimage2">
                  <img
                    src="/images/bitcoin_bottom.png"
                    alt="learn"
                    className="lunaBox"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <Typography
                variant="body1"
                className="textgradient bulletText"
                style={{ margin: "0px" }}
              >
                Bitcoin 101
              </Typography>
              <Typography variant="h1" className="textgradientwhite">
                The Basics and Beyond
              </Typography>
              <Typography variant="body1" mt={2}>
                Discover Bitcoin’s history, how nodes and mining secure the
                network, and its role in decentralised finance. Master the
                essentials to confidently explore Bitcoin while earning rewards!
              </Typography>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/login")}
                >
                  Start Learning
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Bitcoin;
