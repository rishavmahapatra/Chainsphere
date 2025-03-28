/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import { matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  List,
  makeStyles,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import NavItem from "src/layouts/DashboardLayout/NavBar/NavItem";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "src/component/ConfirmationDialog";
import { FaWallet, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import Axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { AuthContext } from "src/context/Auth";

const sections = [
  {
    title: "Profile",
    href: "/edit-profile",
    icon: FaUserEdit,
  },
  {
    title: "Wallet",
    href: "/my-wallet",
    icon: FaWallet,
  },

  {
    title: "Logout",
    href: "/",
    icon: FaSignOutAlt,
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item?.title + depth;

  if (item?.items) {
    const open = matchPath(pathname, {
      path: item?.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item?.icon}
        info={item?.info}
        key={key}
        open={Boolean(open)}
        title={item?.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item?.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item?.href}
        icon={item?.icon}
        info={item?.info}
        key={key}
        title={item?.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    position: "absolute",
    right: 0,
    top: 30,
    width: 280,
    // background: theme.palette.primary.main,
  },
  avatar: {
    cursor: "pointer",
    width: 43,
    height: 43,
    background:
      "linear-gradient(43.34deg, #FFC000 50.82%, #FF9500)",
    // "@media (max-width: 767px)": {
    //   width: "30px",
    //   height: "30px",
    // },
  },
  avatarBig: {
    cursor: "pointer",
    width: 150,
    height: 150,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  profileButton: {
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    padding: "15px",
    margin: "8px",
    "& h6": {
      fontWeight: "600",
      color: "#fff",
    },
    "& p": {
      fontSize: "12px",
      wordBreak: "break-word",
    },
  },
  button: {
    padding: "15px 10px",
    borderRadius: "0px",
    borderBottom: "1px solid rgba(237, 237, 237, 0.08)",
    fontWeight: "300",
    fontSize: "16px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  iconbutton: {
    color: "#fff",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "14px",
    padding: "8px",
    fontSize: "20px",
    marginRight: "10px",
  },
  profileBox: {
    border: "solid 2px transparent",
    backgroundImage:
      "linear-gradient(#2D2D2D, #2D2D2D),    linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    borderRadius: "10px",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [rightBar, setRightBar] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const confirmationHandler = () => {
    history.push("/login");
    window.sessionStorage.removeItem("token");
    window.localStorage.removeItem("GBPAmount");
    window.localStorage.removeItem("CoinName");
    auth.userLogIn(false, null);
  };
  const getProfileHandler = async () => {
    try {
      const res = await Axios.get(ApiConfig.myAccount, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProfileHandler();
  }, []);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Logout"}
          desc={"Do you want to Logout"}
          style={{ color: "#fff" }}
          confirmationHandler={confirmationHandler}
        />
      )}
      <Box className={classes.profileBox}>
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          className="walletbox"
        >
          <Box className={classes.profileButton}>
            <Avatar src="images/favicon.png" />
            <Box ml={1}>
              <Typography variant="h6">
                {auth?.userData?.firstName.slice(0, 15)}
                {auth?.userData?.firstName.length > 15 && "..."}
              </Typography>
              <Typography variant="body1">{auth?.userData?.email}</Typography>
            </Box>
          </Box>

          <Box pb={2} px={1}>
            {sections?.map((section, i) => {
              const Icon = section.icon;
              return (
                <Button
                  fullWidth
                  className={classes.button}
                  style={{
                    justifyContent: "left",
                    textTransform: "capitalize",
                    color: "#fff",
                  }}
                  key={i}
                  onClick={() => {
                    section.title === "Logout"
                      ? setOpen(true)
                      : history.push(section.href);
                  }}
                >
                  <Icon className={classes.iconbutton} /> &nbsp;&nbsp;
                  {section.title}
                </Button>
              );
            })}
          </Box>
        </PerfectScrollbar>
      </Box>
    </Box>
  );

  return (
    <>
      <Avatar
        src="/images/user.png"
        className={classes.avatar}
        onClick={() => {
          setRightBar(!rightBar);
        }}
      />
      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
