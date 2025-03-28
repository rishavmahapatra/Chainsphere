import React from "react";
import { Box, Typography, Container, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";

const useStyles = makeStyles((theme) => ({
  cryptomain: {
    padding: "100px 0px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "70px 0px 0px",
    },
    "& h1": {
      margin: "30px 0px",
      width: " 100%",
      maxWidth: "677px",
      lineHeight: "49px !important",
      [theme.breakpoints.down("sm")]: {
        lineHeight: "40px !important",
      },
    },
  },
  timelinetext: {
    "& h4": {
      marginBottom: "16px",
    },
    "& p": {
      width: "100%",
      maxWidth: "466px",
    },
  },
  rightImage: {
    position: "absolute",
    right: "0px",
    top: "50%",
    maxWidth: "60%",
    transform: "translateY(-50%)",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      maxWidth: "70%",
      top: "auto",
      transform: "none",
      margin: "0 auto",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%",
    },
    "& img": { width: "100%" },
  },
}));

function IcoCrypto() {
  const classes = useStyles();
  return (
    <Box className={classes.cryptomain}>
      <Container>
        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Box display="flex" alignItems="center" pb={1}>
                <img
                  src="images/icoline.png"
                  alt=""
                  width="100%"
                  style={{ maxWidth: "129px" }}
                />
                <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                  Fieres ICO
                </Typography>
              </Box>
              <Typography variant="h1">
                Our groundbreaking blockchain-powered ICO
                {/*  platform provides a
                seamless
                and transparent experience for buying and selling
                tokens. Built with cutting-edge technology, our platform offers
                unparalleled security and efficiency, enabling users to easily
                participate in the token economy's growth. */}
              </Typography>
              <Box className={classes.timelinetext}>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <Avatar src="images/platform.png" alt="" width="100%" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h4">Transparent platform</Typography>
                      <Typography variant="body1">
                        With a commitment to transparency and security, our
                        platform operates in an open and trustworthy manner.
                        {/* Our
                        advanced technology ensures lightning-fast transactions,
                        giving users the peace of mind to confidently
                        participate in the token economy. */}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <Avatar src="images/SV1.svg" alt="" width="100%" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h4">
                        Smart contract functionality
                      </Typography>
                      <Typography variant="body1">
                        We use smart contract vesting functionality for secure
                        and transparent transactions.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <Avatar src="images/SV2.svg" alt="" width="100%" />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h4">Rewards Mechanism</Typography>
                      <Typography variant="body1">
                        By participating in our ICO and choosing to vest your
                        tokens, you'll gain access to a rewards mechanism.
                        {/* as
                        your tokens vest over time, you'll receive bonus tokens
                        at predetermined intervals, giving you an added
                        incentive to hold onto your coins and participate in the
                        growth of our ecosystem. */}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Box>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}></Grid>
          </Grid>
        </Box>
      </Container>
      <Box className={classes.rightImage}>
        <img src="images/mainImg.webp" alt="" />
      </Box>
    </Box>
  );
}

export default IcoCrypto;
