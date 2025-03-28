import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  canibannerbox: {
    padding: "100px 0 140px",
    position: "relative",
    zIndex: "9",

    [theme.breakpoints.down("xs")]: {
      padding: "0px 0px 10px",
    },
    "& .caniicon": {
      width: "auto",
      maxWidth: "85px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "55px",
      },
    },
    "& .arrowImg": {
      width: "auto",
      maxWidth: "247px",
      position: "absolute",
      right: "50%",
    },
    "& .imagenone": {
      position: "relative",
      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .textBox": {
      padding: "50px 0",
    },
    "& .centerimg": {
      position: "absolute",
      width: "728px",
      top: "-158px",
      zIndex: "-1",
      height: "700px",

      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& h1": {
      fontSize: "45px",
      fontWeight: "700",
      lineHeight: "50px",
      textTransform: "uppercase",
      "@media(max-width:767px)": {
        fontSize: "20px !important",
        lineHeight: "30px",
      },
    },
    "& .textgradient": {
      fontSize: "25px",
    },
    "& p": {
      color: "#fff",
      maxWidth: "484px",
      marginTop: "10px",
      textAlign: "left",
      fontSize: "13px",
      marginBottom: "20px",
    },
  },
}));

function Cani() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.canibannerbox}>
      <Container maxWidth="md">
        <Box className="displayCenter textBox" mb={3}>
          <Box>
            <img src="/images/caniicona.svg" alt="Can" className="caniicon" />
          </Box>
          <Box ml={2} align="center">
            <Typography variant="h1">How Can I </Typography>
            <Typography variant="h1" className="textgradient">
              LEARN & Earn?
            </Typography>
          </Box>
        </Box>

        <Box
          align="center"
          className="displayCenter"
          style={{ position: "relative" }}
        >
          <img src="/images/chaincenter.png" className="centerimg" />
        </Box>
        <Grid container spacing={2} alignItems="start">
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box className="displayStart" style={{ alignItems: "flex-start" }}>
              <img src="/images/learnicon.png" alt="learn" width="50px" />
              <Box ml={2}>
                <Typography variant="h6">Explore Blockchain Basics</Typography>
                <Typography variant="body2">
                  Discover the fundamental concepts of blockchain technology and
                  its real-world applications.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            align="center"
            className="imagenone"
          >
            <img
              src="/images/arrorchain.png"
              alt="learn"
              className="arrowImg"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="start">
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            align="center"
            className="imagenone"
          >
            <img
              src="/images/chainleft.png"
              alt="learn"
              className="arrowImg"
              style={{ left: "30%" }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box className="displayStart" style={{ alignItems: "flex-start" }}>
              <img src="/images/learnicon.png" alt="learn" width="50px" />
              <Box ml={2}>
                <Typography variant="h6">Gain Practical Knowledge</Typography>
                <Typography variant="body2">
                  Learn hands-on skills to understand decentralised systems and
                  cryptocurrencies.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="start">
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box className="displayStart" style={{ alignItems: "flex-start" }}>
              <img src="/images/learnicon.png" alt="learn" width="50px" />
              <Box ml={2}>
                <Typography variant="h6">Build Real-World Skills</Typography>
                <Typography variant="body2">
                  Master blockchain tools, frameworks, and processes to innovate
                  and earn rewards.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            align="center"
            className="imagenone"
          >
            <img
              src="/images/arrorchain.png"
              alt="learn"
              className="arrowImg"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="start">
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            align="center"
            className="imagenone"
          ></Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box className="displayStart" style={{ alignItems: "flex-start" }}>
              <img src="/images/learnicon.png" alt="learn" width="50px" />
              <Box ml={2}>
                <Typography variant="h6">Start Your Earning Journey</Typography>
                <Typography variant="body2">
                  Apply your knowledge to participate in projects, earn tokens,
                  and unlock opportunities.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Cani;
