import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Box, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    // height: "100vh",
    overflowX: "auto",
  },
  imgbox: {
    cursor: "pointer",
    "& img": {
      width: "100%",
      maxWidth: "460px",
      margin: " 0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  mainlogin: {
    background: "rgba(255, 255, 255, 0.025)",
    backdropFilter: " blur(4px)",
    borderRadius: "15px",
    padding: "20px",
    display: "flex",
    zIndex: "9",
    position: "relative",
    justifyContent: "center",
    minHeight: "calc(100vh - 415px)",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  headloginbox: {
    height: "calc(100vh - 0px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  GridBox1: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.headloginbox}>
      <Container>
        <Box className={classes.mainlogin}>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              className={classes.GridBox1}
            >
              <Box className={classes.imgbox}>
                <img
                  src="/images/logo.svg"
                  alt=""
                  width="100%"
                  onClick={() => history.push("/")}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className={classes.content}>{children}</Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
