import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import TabSection from "./TabSection";

const useStyles = makeStyles((theme) => ({
  couresbannerbox: {
    padding: "0px 0 70px",
    position: "relative",

    [theme.breakpoints.down("xs")]: {
      padding: "70px 0px 0px",
    },

    "& .caniicon": {
      width: "auto",
      maxWidth: "100%",
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
    "& .caniicon": {
      width: "auto",
      maxWidth: "85px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "55px",
      },
    },
    "& p": {
      color: "#FFFFFF99",
      fontSize: "14px",
      // maxWidth: "484px",
      textAlign: "center",
      marginBottom: "25px",
    },
  },
}));

function Topics() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.couresbannerbox}>
      <Container maxWidth="lg">
        <Box
          className="displayCenter textBox"
          mb={5}
          style={{ alignItems: "flex-start" }}
        >
          <Box align="center">
            <Typography variant="h1">Topics </Typography>
            <Typography variant="h1" className="textgradient">
              Explore
            </Typography>
            <Typography
              variant="body2"
              color="#FFFFFF99"
              style={{ maxWidth: "484px" }}
            >
              Dive into a wide range of subjects and expand your knowledge, with
              carefully curated content designed to inspire and inform.
            </Typography>
          </Box>
          <Box>
            <img
              src="/images/topic_text.png"
              alt="Can"
              className="caniicon"
              // style={{ width: "auto", maxWidth: "100%" }}
            />
          </Box>
        </Box>

        <TabSection />
      </Container>
    </Box>
  );
}

export default Topics;
