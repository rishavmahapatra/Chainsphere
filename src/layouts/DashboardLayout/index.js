import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import AuthContext from "src/context/Auth";
import { useLocation } from "react-router-dom";
import ConnectWalletModal from "src/component/ConnectWalletModal";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    // paddingTop: 56,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    background: "#070406",
    color: "#fff",
    minHeight: "calc(100vh - 100px)",
    padding: "60px 0px 40px",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    padding: "50px 35px 10px",
    // [theme.breakpoints.down("sm")]: {
    //   padding: "10px 20px 1 10px ",
    // },
    [theme.breakpoints.down("xs")]: {
      padding: "40px 16px 10px ",
    },
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  // const auth = useContext(AuthContext);
  // console.log(" ------- open  ", auth?.isConnectMetamask);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  // useEffect(() => {
  //   // console.log("auth ---", auth.userLoggedIn);
  //   // if (auth.isLoggedIn) {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://static.zdassets.com/ekr/snippet.js?key=7dbbf158-16ff-4ff3-9903-cca2758e7fd6";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
            {/* <!-- Start of fieres Zendesk Widget script --> */}
            {/* <div
              dangerouslySetInnerHTML={{
                __html: ( */}
            {/* <html lang="en">
              <head>
                <meta charset="utf-8" />
                <script
                  id="ze-snippet"
                  src="https://static.zdassets.com/ekr/snippet.js?key=7dbbf158-16ff-4ff3-9903-cca2758e7fd6"
                >
                  {" "}
                </script>
              </head>
            </html> */}
            {/* ),
              }}
            ></div> */}
            {/* <script
              id="ze-snippet"
              src="https://static.zdassets.com/ekr/snippet.js?key=7dbbf158-16ff-4ff3-9903-cca2758e7fd6"
            >
              {" "}
            </script> */}
            {/* <div id="ze-snippet"> </div> */}
            {/* <!-- End of fieres Zendesk Widget script --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
