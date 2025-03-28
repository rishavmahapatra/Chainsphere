import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import DescriptionText from "./DescriptionText";

const useStyles = makeStyles((theme) => ({
  couresbannerbox: {
    padding: "0px 0 140px",
    position: "relative",

    [theme.breakpoints.down("xs")]: {
      padding: "9px 0px 0px",
    },
    "& .imageBox": {
      cursor: "pointer",
      overflow: "hidden",
      position: "relative",
      borderRadius: "10px",
      WebkitBoxPack: "center",
      justifyContent: "center",
      // height: "253px",
      display: "flex !important",
      marginBottom: "15px",
      "& img": {
        height: "100%",
        objectFit: "fill",
        width: "-webkit-fill-available",
        maxWidth: "100%",
      },
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
      marginTop: "8px",
      textAlign: "left",
      marginBottom: "13px",
    },
    "& .textgradientwhite": {
      fontSize: "18px !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px !important",
        lineHeight: "25px",
      },
    },
  },
}));

function Heading() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.couresbannerbox}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box className="coursestextBox">
              <Box className="imageBox">
                <img src="/images/heading_1.png" alt="heading" />
              </Box>

              <Typography
                variant="body1"
                className="textgradient bulletText"
                style={{ margin: "0px" }}
              >
                Other Coins 101
              </Typography>
              <Typography variant="h1" className="textgradientwhite">
                Discover Top Cryptos
              </Typography>

              <Typography variant="body1" mt={2}>
                Explore the histories and features of major cryptocurrencies
                like Ethereum, Ripple, Tether, and Cardano. Learn how Ethereum
                introduced smart contracts, how Ripple revolutionised
                cross-border payments, and how Tether and Cardano aim to enhance
                stability and scalability in the crypto space. Understand their
                impact and how each coin contributes to the evolving digital
                economy.
              </Typography>
              <Box align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/login")}
                >
                  Start Learning
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box className="coursestextBox">
              <Box className="imageBox">
                <img src="/images/heading_2.png" alt="heading" />
              </Box>

              <Typography
                variant="body1"
                className="textgradient bulletText"
                style={{ margin: "0px" }}
              >
                Trading Crypto
              </Typography>
              <Typography variant="h1" className="textgradientwhite">
                Master the Market
              </Typography>

              <Typography
                variant="body1"
                mt={2}
                style={{ marginBottom: "12px" }}
              >
                Learn the essentials of trading crypto, from understanding
                market trends to reading crypto charts. Explore key strategies
                for analysing price movements and managing risks. Discover how
                game theory impacts blockchain networks and trading decisions,
                influencing supply, demand, and network behaviour. Start
                building your trading skills while earning rewards along the way
              </Typography>
              <Box align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/login")}
                >
                  Start Learning
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <DescriptionText />
      </Container>
    </Box>
  );
}

export default Heading;
