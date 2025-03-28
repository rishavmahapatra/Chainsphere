import React from "react";
import { Box, Typography, Container, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CircularChart from "./CircularChart";

const useStyles = makeStyles((theme) => ({
  cryptomain: {
    padding: "100px 0px",
    position: "relative",
    zIndex: 1,
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px 60px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "40px 0px 40px",
    },
    "& .mainbox": {
      "& h1": {
        textAlign: "center",
        marginBottom: "70px",
        [theme.breakpoints.down("sm")]: {
          marginBottom: "40px",
        },
      },
    },
  },
  flexbox12: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
  },
  flexbox: {
    display: "flex",
    marginTop: "25px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "14px",
    },
    "& .MuiAvatar-root": {
      width: "30px",
      height: "30px",
    },
    "& .circlebox": {
      background: "rgba(255, 255, 255, 0.05)",
      border: "5px solid #3D88FB",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
    },
    "& h1": {
      fontSize: "14px !important",
      fontWeight: "500",
      [theme.breakpoints.down("md")]: {
        fontSize: "12px !important",
      },
      "@media(max-width:767px)": {
        fontSize: "16px !important",
        lineHeight: "40px",
      },
      "@media(max-width:412px)": {
        fontSize: "14px !important",
        lineHeight: "32px",
      },
    },
    "& h6": {
      fontSize: "16px",
      fontWeight: "300",
      marginTop: "5px",
    },
  },
}));
const dataTokenNew1 = [
  {
    img1: "images/Ellipse/Ellipse4.svg",
    text1: " Public Sale",
    text2: "24%",
  },
  {
    img1: "images/Ellipse/Ellipse8.svg",
    text1: "Marketing",
    text2: "15%",
  },
  {
    img1: "images/Ellipse/Ellipse9.svg",
    text1: "Ecosystem",
    text2: "15%",
  },
  {
    img1: "images/Ellipse/Ellipse10.svg",
    text1: "Reserve",
    text2: "10%",
  },

  {
    img1: "images/Ellipse/Ellipse6.svg",
    text1: " Private Sale",
    text2: "10%",
  },
];
const dataTokenNew2 = [
  {
    img1: "images/Ellipse/Ellipse3.svg",
    text1: "Pre Sale",
    text2: "10%",
  },
  {
    img1: "images/Ellipse/Ellipse1.svg",
    text1: "Seed Sale",
    text2: "05%",
  },
  {
    img1: "images/Ellipse/Ellipse7.svg",
    text1: "Technical Team",
    text2: "05%",
  },
  {
    img1: "images/Ellipse/Ellipse5.svg",
    text1: "Airdrop",
    text2: "4%",
  },
  {
    img1: "images/Ellipse/Ellipse2.svg",
    text1: "Advisor",
    text2: "2%",
  },
];
function Tokenomics() {
  const classes = useStyles();
  return (
    <Box className={classes.cryptomain}>
      <div className="tokenomicsright"></div>
      <Container>
        <Box className="mainbox">
          <Typography variant="h1">Tokenomics</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {dataTokenNew1.map((data, i) => {
              return (
                <Box className={classes.flexbox}>
                  <Box>
                    <Avatar src={data?.img1} alt="" width="100%" />
                  </Box>
                  <Box style={{ marginLeft: "20px" }}>
                    <Typography variant="h3">{data.text1}</Typography>
                    <Typography variant="body2">{data.text2}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} alignItems="center">
            <Box style={{ maxWidth: "100%" }}>
              <CircularChart />
            </Box>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={12}
            xs={12}
            className={classes.flexbox12}
          >
            <Box>
              {dataTokenNew2.map((data, i) => {
                return (
                  <Box className={classes.flexbox}>
                    <Box>
                      <Avatar src={data?.img1} alt="" width="100%" />
                    </Box>
                    <Box style={{ marginLeft: "20px" }}>
                      <Typography variant="h3">{data.text1}</Typography>
                      <Typography variant="body2">{data.text2}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Tokenomics;
