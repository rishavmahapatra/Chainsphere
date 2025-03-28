import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { calculateTimeLeft } from "src/utils";

const useStyles = makeStyles((theme) => ({
  bannerbox: {
    padding: "33px 0px 30px",
    position: "relative",
    zIndex: "9",
    [theme.breakpoints.down("xs")]: {
      padding: "70px 0px 30px",
    },
    // "& .order1": {
    //   order: "1",
    //   [theme.breakpoints.down("xs")]: {
    //     order: "2",
    //   },
    // },
    // "& .order2": {
    //   order: "2",
    //   [theme.breakpoints.down("xs")]: {
    //     order: "1",
    //   },
    // },
    "& .rightimgBox": {
      position: "absolute",
      right: "0",
      width: "auto",
      maxWidth: "100%",
      top: "-90px",
      height: "800px",
      // animation: "slideInRight 1.5s ease-in-out forwards",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& .exploreButton": {
      minWidth: "162px",
    },
    "& .rightShadeImg": {
      bottom: "0",
      right: "0",
      width: "auto",
      position: "absolute",
      maxWidth: "1000px",
      zIndex: "-1",
      opacity: "0.5",
      height: "700px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& .leftShadeImg": {
      top: "0",
      left: "0",
      width: "auto",
      position: "absolute",
      maxWidth: "100%",
      zIndex: "-1",
      opacity: "0.5",
      height: "658px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& h1": {
      fontSize: "45px",
      fontWeight: "700",
      lineHeight: "63px",

      letterSpacing: "1.6px",

      "@media(max-width:767px)": {
        fontSize: "25px !important",
        lineHeight: "40px",
      },
    },

    "& p": {
      color: "rgba(255, 255, 255, 0.6)",
      marginTop: "10px",
      textAlign: "left",
      maxWidth: "484px",
    },
  },
}));

function Banner() {
  const classes = useStyles();
  const history = useHistory();
  const tokenCheck = window.sessionStorage.getItem("token");
  const [liveSaleList, setLiveSaleList] = useState("");
  console.log("dgdggdgdgdg", liveSaleList);
  const timeValue = moment(liveSaleList?.enabled_sale?.saleDate).unix();
  const [closeTimeLeft, setCloseTimeLeft] = useState([]);

  const getSaleListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getsalelist,
      });

      if (res.data.status === 200) {
        setLiveSaleList(res.data.data.enabled_sale);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSaleListHandler();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCloseTimeLeft(calculateTimeLeft(new Date(parseInt(timeValue) * 1000)));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Box className={classes.bannerbox}>
      {/* <img src="/images/transaction.gif" className="rightimgBox" /> */}
      <img src="/images/rightshade.png" alt="Image" className="rightShadeImg" />
      <img src="/images/leftshade.png" alt="Image" className="leftShadeImg" />
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={6} md={6} sm={12} xs={12} className="order1">
            <Box>
              <Typography variant="h1">Learn & Earn Rewards</Typography>
              <Typography variant="body2">
                Enhance your skills through engaging courses and earn rewards as
                you learn, turning knowledge into valuable digital assets.
              </Typography>
              <Box mb={0} mt={3} className="displayStart">
                <>
                  {tokenCheck ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/buy-fiero")}
                    >
                      Start Learning
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/login")}
                    >
                      Start Learning
                    </Button>
                  )}
                  &nbsp; &nbsp;
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    className="exploreButton"
                    onClick={() => history.push("/login")}
                  >
                    Explore
                  </Button> */}
                </>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} className="order2">
            <img
              src="/images/transaction.gif"
              alt="Gif"
              style={{ width: "auto", maxWidth: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Banner;
