import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import moment from "moment";
import { HandleTrim } from "src/utils";

const useStyles = makeStyles((theme) => ({
  stagesmain: {
    padding: "100px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 150px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0px 90px",
    },

    "& .maintext": {
      background: "rgba(255, 255, 255, 0.01)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      padding: "10px",
      paddingTop: "30px",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
      },
      "& h6": {
        [theme.breakpoints.down("xs")]: {
          fontSize: "12px !important",
        },
      },
      "& h4": {
        color: "rgba(255, 255, 255, 0.6)",
        marginBottom: "20px",
        textAlign: "center",
      },
      "& p": {
        textAlign: "center",
        marginTop: "10px",
      },
      "& h1": {
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
          fontSize: "26px !important",
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "18px !important",
        },
      },
    },
  },
}));
const stagesdata = [
  {
    text1: "Closed",
    text2: "Private Sale",
  },
  {
    text1: "March 9th 11h UTC - March 10th 11h UTC",
    text2: "Pre-Sale",
    text3: "$0.004/token",
  },
];
function Stages() {
  const classes = useStyles();
  const [liveSaleList, setLiveSaleList] = useState([]);
  const [liveongoing, setLiveongoing] = useState("");
  const [upcomimg, setUpcomimg] = useState("");

  const getSaleListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getsalelist,
      });

      if (res.data.status === 200) {
        setLiveSaleList(res.data.data.fullList);
        setLiveongoing(res.data.data.enabled_sale);
        const index = res.data.data.fullList.findIndex(
          (data) => data?.icoStatus === "ENABLE"
        );
        const myData = res.data.data.fullList[index + 1];
        setUpcomimg(myData);
        // for (var i = 0; i < res.data.data.fullList?.length; i++) {
        //   const txnType = res.data.data.fullList;
        //   console.log("txnType", txnType[index + 1]);
        //   upcomimg.push(txnType[index + 1]);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSaleListHandler();
  }, []);

  return (
    <Box className={classes.stagesmain}>
      <Container>
        <Typography variant="h1" align="center">
          Private and pre-sale stages
        </Typography>
        <Box mt={5}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box className="maintext">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {moment(liveongoing?.saleDate).format("lll")}
                  </Typography>{" "}
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {" "}
                    &nbsp; To &nbsp;
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {moment(liveongoing?.saleUptodate).format("lll")}
                  </Typography>
                </Box>

                <Typography variant="h1">
                  {liveongoing?.planName
                    ? HandleTrim(liveongoing?.planName)
                    : "-"}
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    textAlign: "center",
                    paddingTop: "10px",
                  }}
                >
                  On Going
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box className="maintext">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {upcomimg?.saleDate
                      ? moment(upcomimg?.saleDate).format("lll")
                      : "-"}
                  </Typography>{" "}
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {" "}
                    &nbsp; To &nbsp;
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {upcomimg?.saleUptodate
                      ? moment(upcomimg?.saleUptodate).format("lll")
                      : "-"}
                  </Typography>
                </Box>

                <Typography variant="h1">
                  {upcomimg?.planName ? HandleTrim(upcomimg?.planName) : "-"}
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    textAlign: "center",
                    paddingTop: "10px",
                  }}
                >
                  Upcoming
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Stages;
