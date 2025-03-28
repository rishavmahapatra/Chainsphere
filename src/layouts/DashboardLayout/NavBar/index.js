/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
// import { Link, Component } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import Logo from "src/component/Logo";
import {
  FaTachometerAlt,
  FaWallet,
  FaClipboardCheck,
  FaHistory,
  FaUserAlt,
} from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { BiBookOpen } from "react-icons/bi";
import { SiKhanacademy } from "react-icons/si";
import { RiSecurePaymentLine } from "react-icons/ri";
import NavItem from "./NavItem";
import { AuthContext } from "src/context/Auth";
const sections = [
  {
    items: [
      // {
      //   title: "Dashboard",
      //   icon: FaTachometerAlt,
      //   href: "/dashboard",
      // },
      {
        title: "Buy CSP",
        icon: GiToken,
        href: "/buy-csp",
      },
      {
        title: "Transaction History",
        icon: FaHistory,
        href: "/transaction",
      },
      {
        title: "Ambassador",
        icon: BiBookOpen,
        href: "/ambassador",
      },
      {
        title: "My Wallet",
        icon: FaWallet,
        href: "/my-wallet",
      },
      {
        title: "KYC",
        icon: FaClipboardCheck,
        href: "/kyc",
      },
      // {
      //   title: "2FA Authentication",
      //   icon: RiSecurePaymentLine,
      //   href: "/authentication",
      // },
      
      // {
      //   title: "White Paper",
      //   icon: BiBookOpen,
      //   href: "/white-paper",
      // },
      {
        title: "My Profile",
        icon: FaUserAlt,
        href: "/my-profile",
      },
      // {
      //   title: "Fieres Academy",
      //   icon: SiKhanacademy,
      //   href: "/fieres-academy",
      // },
    ],
  },
];

const fieresAcademy = [
  {
    items: [
      {
        title: "Fieres Academy",
        icon: SiKhanacademy,
        href: "/fieres-academy",
      },
    ],
  },
];
// const sectionsBelow = [
//   {
//     items: [
//       {
//         title: "Terms & Condition",
//         //icon: PieChartIcon,
//         href: "/terms",
//       },
//       {
//         title: "Privacy Policy",
//         //icon: PieChartIcon,
//         href: "/privacy-policy",
//       },
//     ],
//   },
// ];

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

  if (item.items) {
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
    background: "#0C0A0B",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: "100%",
    background: "#0C0A0B",
    backdropFilter: "blur(3.22162px)",
    /* Note: backdrop-filter has minimal browser support */
    // borderRadius: "15px",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // console.log(" ----- auth ---", auth?.userData?.status);
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Hidden mdDown>
        <Box padding={0} align="center" onClick={() => history.push("/")}>
          <Logo
            alt="Logo"
            style={{
              paddingTop: "20px",
              width: "100%",
              cursor: "pointer",
              maxWidth: "190px",
            }}
          />
        </Box>
      </Hidden>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box my={3}>
          {sections?.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section?.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
          {auth?.userData?.status &&
            fieresAcademy?.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section?.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}
        </Box>
        {/* <Box className="side_nev_Bottom">
          {sectionsBelow?.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {section?.items?.map((itemList, i) => {
                return (
                  <Button
                    fullWidth
                    key={i}
                    style={{
                      justifyContent: "start",
                      paddingLeft: 25,
                      borderRadius: 0,
                      textTransform: "capitalize",
                    }}
                    onClick={() => history.push(itemList.href)}
                  >
                    {itemList.title}
                  </Button>
                );
              })}
            </List>
          ))}
        </Box> */}
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
