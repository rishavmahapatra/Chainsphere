import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  IconButton,
  Dialog,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SwipeableTemporaryDrawer from "./RightDrawer";
import Logo from "src/component/Logo";
import DialogContent from "@material-ui/core/DialogContent";
import Badge from "@material-ui/core/Badge";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    height: 70,
  },

  desktopDrawer: {
    position: "absolute",
    right: 80,
    top: 30,
    width: "100%",
    // background: theme.palette.primary.main,
    height: 266,
    [theme.breakpoints.down("sm")]: {
      width: 600,
      right: 0,
    },
    [theme.breakpoints.down("xs")]: {
      width: 300,
      right: 0,
    },
  },

  logoboxes: {
    paddingTop: "0px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "150px",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <TopBarData />
      </Toolbar>
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

export function TopBarData() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [notificationData, setNotificationData] = useState([]);
  const [count, setCount] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const getNotificationHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getNotificationList,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });

      if (res.data.status === 1618) {
        setNotificationData(res.data.data);
        setCount(res.data.data.filter((data) => !data.isSeen));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getNotificationHandler();
  }, []);

  return (
    <>
      <Logo className={classes.logoboxes} />

      <Box flexGrow={1} />

      <IconButton
        style={{
          marginRight: 5,
          padding: "9px",
          background:
            "linear-gradient(43.34deg, #FFC000 56.82%, #FF9500)",
          color: "#000",
        }}
        onClick={() => history.push("/notification")}
      >
        <Badge color="error" badgeContent={count?.length}>
          <NotificationsIcon style={{ color: "#fff" }} />
        </Badge>
      </IconButton>
      <SwipeableTemporaryDrawer />
      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
}
