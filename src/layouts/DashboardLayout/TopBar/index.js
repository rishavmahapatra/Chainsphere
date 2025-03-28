import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  SvgIcon,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import { TopBarData } from "src/layouts/HomeLayout/TopBarData";
import { AuthContext } from "src/context/Auth";
import ConnectWalletModal from "src/component/ConnectWalletModal";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.secondary.main,
  },
  toolbar: {
    padding: "10px 10px",
    backgroundColor: "#0C0A0B",
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  menusec: {
    height: "21px !important",
    width: "21px !important",
    //     "& svg:"{
    // color:"#fff",
    //     },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.src = "https://embed.tawk.to/65e9c0129131ed19d9767856/1hochcibe";
  //   script.charset = "UTF-8";
  //   script.setAttribute("crossorigin", "*");
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <AppBar
      elevation={0}
      className={clsx(classes.root, className)}
      color="inherit"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="rgb(255, 86, 77)"
            onClick={onMobileNavOpen}
            style={{ marginRight: 10 }}
          >
            <SvgIcon fontSize="small" className={classes.menusec}>
              <MenuIcon style={{ color: "rgb(255, 86, 77)" }} />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <TopBarData />
      </Toolbar>
      {auth?.isConnectMetamask && (
        <ConnectWalletModal open={auth?.isConnectMetamask} />
      )}
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
