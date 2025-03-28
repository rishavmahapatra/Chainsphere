import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  makeStyles,
  Typography,
  Container,
} from "@material-ui/core";
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
          "linear-gradient(93.34deg, #FF9500 6.82%, #FFC000 35.9%)",
      },
    },
  },
}));

const tabData = [
  { label: "Advanced Crypto", key: "Blockchain" },
  { label: "NFT 101", key: "Source" },
  { label: "Trading NFT", key: "support" },
  { label: "OpenSea", key: "LoremBlockchain" },
  { label: "NFT Security", key: "CryptocurrencyBlockchain" },
];

const tabContentsub = {
  Blockchain: " Deep Dive into the Market ",
  Source: "Unlock the Digital Revolution",
  support: "Invest and Maximise Profit",
  LoremBlockchain: "Buy, Sell, and Connect",
  CryptocurrencyBlockchain: " Protect Your Digital Assets",
};
const tabContent = {
  Blockchain:
    "Explore the 5 biggest cryptocurrency hacks and their lessons for security in the digital world. Learn about real-world blockchain applications transforming industries, from finance to supply chains. Understand what makes cryptocurrency valuable, examining factors like scarcity, utility, and market demand. Gain the advanced knowledge needed to navigate and capitalize on the evolving crypto landscape.",
  Source:
    "Learn the basics of NFTs (Non-Fungible Tokens), their benefits, and how they’re transforming digital ownership. Understand how to create your own NFTs, from minting to listing, and explore their potential across art, gaming, and beyond. Start your journey into the world of digital assets today!",
  support:
    "Master the strategies for investing in NFTs and maximizing your returns. Learn how to identify valuable assets, track market trends, and follow best practices to make informed trading decisions. Gain the skills to navigate the NFT space successfully while minimizing risks and optimizing profit potential.",
  LoremBlockchain:
    "Learn how to buy and sell NFTs on OpenSea, the largest marketplace for digital assets. Set up your MetaMask wallet to securely store your NFTs and connect your Coinbase wallet for easy transactions. With these tools, you can start exploring the vibrant world of NFTs, from browsing collections to making purchases with ease. NFT Security: Protect Your Digital Assets.",
  CryptocurrencyBlockchain:
    "Learn about the top 7 techniques for NFT theft and how to safeguard your valuable artwork. This comprehensive guide covers essential security practices, including how to protect your NFTs from scams, hacks, and unauthorized access. Discover tips for securing your wallets, using trusted platforms, and maintaining control over your assets to ensure a safe and secure NFT experience.",
};

export default function DescriptionText() {
  const classes = useStyles();
  const [tabview, setTabView] = useState("Blockchain");

  return (
    <Page title="Fierex">
      <Grid
        container
        alignItems="start"
        //   justifyContent="center"
        className="descriptionTextNew"
      >
        <Grid item xs={12} sm={12} md={12} mb={3}>
          <Box position="relative">
            <Box className={classes.TabButtonsBox}>
              {tabData.map((tab) => (
                <Button
                  key={tab.key}
                  style={tab.style}
                  className={tabview === tab.key ? "active" : ""}
                  onClick={() => setTabView(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} mt={3}>
          <Box className="TabButtonsContant">
            <Box className="tab-content" mt={3}>
              <Typography
                variant="h6"
                className="textgradient bulletText"
                mt={3}
              >
                {tabContentsub[tabview]}
              </Typography>
              <Typography variant="body1">{tabContent[tabview]}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
