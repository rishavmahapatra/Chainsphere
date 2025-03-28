import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dashboardbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    "& .imagebox": {
      margin: "40px 0px",
      "& img": {
        width: "100%",
        maxWidth: "149px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    "& p": {
      color: "rgba(255, 255, 255, 0.6)",
      width: "100%",
      maxWidth: "908px",
      marginBottom: "13px",
    },
    "& h1": {
      "@media(max-width:472px)": {
        fontSize: "18px !important",
        lineHeight: "31px",
      },
    },
  },
}));

function Step6kyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  NextPage,
}) {
  const classes = useStyles();
  const BackPage = () => {
    setTabView("step5");
    setProgressData("68");
    settimeData("1");
    setHeadingData("Basic Information");
  };
  const history = useHistory();
  return (
    <>
      <Box className={classes.dashboardbox}>
        <Typography variant="h1">Application is in progress Last</Typography>
        <Box mt={3} className="imagebox">
          <img src="images/vectorkyc.png" alt="" width="100%" />
        </Box>
        <Typography variant="body2">
          Your application is successfully submitted and in progress. You will
          receive a notification in your email regarding the status of your
          application within 72 hours.
        </Typography>
        <Typography variant="body2">
          You can modify your application within 5 hours of submission.
          Afterward, you cannot change the application content. In case of
          rejection, you need to re-submit your application.
        </Typography>
      </Box>
      <Box display="flex" py={3}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => BackPage()}
          >
            Back
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          style={{ padding: "8px 36px", marginLeft: "10px" }}
          onClick={() => {
            NextPage();
          }}
        >
          Proceed
        </Button>
      </Box>
    </>
  );
}

export default Step6kyc;
