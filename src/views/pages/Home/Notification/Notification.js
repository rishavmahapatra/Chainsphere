import {
  Avatar,
  Box,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";

import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import moment from "moment";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import { MdVerifiedUser } from "react-icons/md";
import { BsArrowReturnRight, BsArrowReturnLeft } from "react-icons/bs";
import { GoUnverified } from "react-icons/go";
import { FaUserCheck } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  notificationMainContainer: {
    "& .mainBoxPaper": {
      padding: "50px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px",
      },
      "& .headingBox": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& p": {
          color: "#F44336",
        },
      },
      "& .ListBox": {
        position: "relative",
        padding: "20px 0px",
        borderBottom: "1px solid #474747",
        "& .notificationDate": {
          whiteSpace: "pre",
          position: "absolute",
          right: "0",
          bottom: "4px",
          "& p": {
            fontSize: "12px",
          },
        },
      },
    },
  },
}));

export default function Notification() {
  const classes = useStyles();
  const [notificationData, setNotificationData] = useState([]);
  const [count, setCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);

  const getNotificationHandler = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getNotificationHandler();
  }, []);
  const clearNotificationHandler = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.clearNotification,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        toast.success("All notifications cleared");
        setNotificationData([]);
        getNotificationHandler();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box className={classes.notificationMainContainer}>
      <Box className="mainBoxPaper">
        <Box className="headingBox">
          <Typography variant="h2">Notifications</Typography>
          {notificationData && notificationData.length > 0 ? (
            <Typography
              variant="body2"
              style={{ cursor: "pointer" }}
              onClick={clearNotificationHandler}
            >
              Clear All
            </Typography>
          ) : (
            ""
          )}
        </Box>
        {notificationData &&
          notificationData?.map((data, i) => (
            <Box className="ListBox" display="flex" alignItems="center">
              <IconButton
                style={{
                  background:
                    " linear-gradient(93.34deg, rgb(255, 111, 55) 6.82%, rgb(255, 38, 118) 35.9%, rgb(184, 1, 170) 68.08%, rgb(113, 1, 188) 101.4%)",
                  color: "#fff",
                  marginRight: "12px",
                }}
              >
                {/* {data?.message ===
                  "Your KYC has been approved. Please start trading." && (
                  <MdVerifiedUser size={16} />
                )}
                {data.message ===
                  "Your account has been created successfully." && (
                  <FaUserCheck size={16} />
                )}
                {data?.message === "Your KYC request  has been revise." && (
                  <MdVerifiedUser size={16} />
                )} */}
                <NotificationsIcon size={16} />
              </IconButton>
              <Box pl={2}>
                <Typography variant="body2">{data.message}</Typography>
              </Box>
              <Box className="notificationDate">
                <Typography variant="body2">
                  {data.createdAt ? moment(data.createdAt).format("lll") : ""}
                </Typography>
              </Box>
            </Box>
          ))}
        {!isLoading && notificationData && notificationData.length === 0 && (
          <NodatafoundImage data={"No notifications found"} />
        )}
        {isLoading && <DataLoader />}
      </Box>
    </Box>
  );
}
