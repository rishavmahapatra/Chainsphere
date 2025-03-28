import React, { useState } from "react";
import { Box, Grid, Button, makeStyles, Typography } from "@material-ui/core";
import Page from "src/component/Page";

const useStyles = makeStyles((theme) => ({
  TabButtonsBox: {
    zIndex: "1",
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",

    "& button": {
      color: "#ffffffb8",
      fontSize: "14px",
      marginBottom: "10px",
      marginRight: "10px",
      background: "#261D2E",
      borderRadius: "5px",
      padding: "10px 32px",
      fontFamily: "'Good Times Rg', sans-serif",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        padding: "10px 22px",
      },
      "&.active": {
        color: "#fff",
        background:
          "linear-gradient(93.34deg, #FF6F37 6.82%, #FF2676 35.9%, #B801AA 68.08%, #7101BC 101.4%)",
      },
    },
  },
}));

const tabData = [
  { label: "Blockchain", key: "Blockchain" },
  { label: "Open source", key: "Source" },
  { label: "Advanced data support", key: "support" },
  { label: "Lorem Blockchain", key: "LoremBlockchain" },
  { label: "Cryptocurrency Blockchain", key: "CryptocurrencyBlockchain" },
  {
    label: "Cryptocurrency digital Blockchain",
    key: "Cryptocurrency",
  },
  { label: "Ethereum", key: "Ethereum" },
];

export default function TabSection() {
  const classes = useStyles();
  const [tabview, setTabView] = useState("Blockchain");

  return (
    <Page title="Fierex">
      <Grid container spacing={5} alignItems="start">
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box position="relative" mb={3}>
            <Box className={classes.TabButtonsBox}>
              {tabData.map((tab) => (
                <Button
                  key={tab.key}
                  // className={tabview === tab.key ? "active" : ""}
                  onClick={() => setTabView(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Typography
            variant="body1"
            style={{ color: "#fff", textAlign: "left" }}
          >
            FIERO is our blockchain's native coin, poised to revolutionise the
            world of decentralised finance. FIERO is a cutting-edge digital
            asset, designed to be fast, secure, and decentralised. As the native
            coin of our blockchain, FIERO is at the heart of our ecosystem,
            powering transactions and enabling a range of exciting use cases.
          </Typography>

          <Typography
            variant="body1"
            style={{ color: "#fff", textAlign: "left", marginBottom: "0px" }}
          >
            Prepare for an exciting journey with Fieres Blockchain, a
            cutting-edge crypto engineering firm reshaping the digital asset
            landscape! With exceptional speed, security, and scalability, our
            blockchain ecosystem provides an extraordinary and unparalleled
            experience.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box className="TabButtonsContant">
            {[
              "Blockchain",
              "Source",
              "support",
              "LoremBlockchain",
              "CryptocurrencyBlockchain",
              "Cryptocurrency",
              "Ethereum",
            ].includes(tabview) && (
              <Box className="topicsimageframe image-container">
                <img src="images/topicsbanner.png" alt={tabview} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
