import React from "react";
import { Box, Typography, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { FcNeutralTrading } from "react-icons/fc";
const useStyles = makeStyles((theme) => ({
  cryptomain: {
    padding: "100px 0px",
    position: "relative",
    zIndex: 1,
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      padding: "71px 0px 71px 0px",
    },
    "& h1": {
      margin: "30px 0px",
    },
    "& .cardbox": {
      background: "rgba(255, 255, 255, 0.025)",
      border: "1.09225px solid #ff00cd0d",
      borderRadius: "10.9225px",
      // padding: "70px 15px",
      textAlign: "center",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minHeight: "350px",
      "&:before": {
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        zIndex: "-1",
        content: "' '",
        position: "absolute",
        backdropFilter: "blur(50px)",
      },
      "& h4": {
        width: "100%",
        maxWidth: "230px",
        margin: "0 auto",
        padding: "16px 0px",
      },
      "& p": {
        padding: "0px 14px",
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "14px",
      },
    },
  },
  netImg: {
    position: "absolute",
    width: "auto",
    maxWidth: "900px",
    right: "0",
    top: "-11%",
    opacity: "0.5",
  },
}));
const tokenData = [
  {
    imagebox: "images/UtilityCoin.png",
    text1: "Utility Coin",
    id: "1",
    text2:
      "Fiero functions as a utility coin, providing users with a means of payment on platforms that are built upon the Fiero Blockchain and its associated ecosystem.",
  },
  {
    imagebox: "images/money.png",
    text1: "Trading",
    id: "1",
    text2:
      "As a cryptocurrency, FIERO can be exchanged on various crypto exchanges for other cryptocurrencies or fiat currencies.",
  },
  {
    imagebox: "images/staking.jpg",
    text1: "Staking",
    id: "1",
    text2:
      // "Users have the ability to stake FIERO coins, thereby participating in the network's consensus mechanism and contributing to its security. As a result of this participation, users may receive rewards in the form of additional FIERO coins.",
      "Users have the ability to stake FIERO coins, thereby participating in the network's consensus mechanism and contributing to its security.",
  },
  {
    imagebox: "images/vector1.png",
    text1: "Transactions fees and Smart Contracts",
    id: "2",

    text2:
      "Within the Fieres Blockchain ecosystem, FIERO serves as a means of payment for executing transactions and smart contracts.",
  },
  // {
  //   imagebox: "images/vector1.png",
  //   text1: "Lifetime free transaction",
  //   id: "2",

  //   text2:
  //     " Lorem ipsum Description In used to demonstrate without relying meaningful content.",
  // },
  // {
  //   imagebox: "images/protect.png",
  //   text1: "Protect the identityy",
  //   id: "3",

  //   text2:
  //     " Lorem ipsum Description In used to demonstrate without relying meaningful content.",
  // },
  // {
  //   imagebox: "images/money.png",
  //   text1: "Security & control over money",
  //   id: "4",

  //   text2:
  //     " Lorem ipsum Description In used to demonstrate without relying meaningful content.",
  // },
];
function ChooseToken() {
  const classes = useStyles();
  return (
    <Box className={classes.cryptomain}>
      <div className="choosetokenLeft"></div>

      <Container>
        <Box display="flex" alignItems="center">
          <img
            src="images/icoline.png"
            alt=""
            width="100%"
            style={{ maxWidth: "129px" }}
          />
          <Typography variant="h5" style={{ textTransform: "uppercase" }}>
            Fiero
          </Typography>
          {/* <Typography variant="body1">
            FIERO is our blockchain's native coin, poised to revolutionise the
            world of decentralised finance. FIERO is a cutting-edge digital
            asset, designed to be fast, secure, and decentralised. As the native
            coin of our blockchain, FIERO is at the heart of our ecosystem,
            powering transactions and enabling a range of exciting use cases.
          </Typography> */}
        </Box>
        <Typography variant="h1">How can I use Fiero?</Typography>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Typography variant="body1">
            FIERO is our blockchain's native coin, poised to revolutionise the
            world of decentralised finance. FIERO is a cutting-edge digital
            asset, designed to be fast, secure, and decentralised. As the native
            coin of our blockchain, FIERO is at the heart of our ecosystem,
            powering transactions and enabling a range of exciting use cases.
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {tokenData &&
              tokenData.map((data, i) => {
                return (
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Box className="cardbox">
                      <Box>
                        <img
                          src={data.imagebox}
                          alt=""
                          style={{ width: "100%", maxWidth: "23px" }}
                        />
                        <Typography variant="h4">{data.text1}</Typography>
                        <Typography variant="body2">{data.text2}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default ChooseToken;
