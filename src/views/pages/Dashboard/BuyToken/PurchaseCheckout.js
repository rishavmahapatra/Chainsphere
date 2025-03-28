import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { calculateTimeLeft, sortAddress } from "src/utils";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Calculate } from "./Vesting";

const useStyles = makeStyles((theme) => ({
  KycDetailbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "30px 20px 90px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "15px",
    },
    "& h1": {
      marginBottom: "10px",
    },
    "& .selectbox": {
      maxWidth: "700px",
    },
    "& .imgBox": {
      "& img": {
        maxWidth: "300px",
        width: "100%",
      },
    },
    "& .boxstyle": {
      background: "rgba(255, 255, 255, 0.025)",
      borderRadius: "15px",
      padding: "20px 15px 30px",
      "& h4": {
        fontFamily: "Good Times W00 Bold",
        "& span": {
          background:
            "linear-gradient(93.14deg, #FFB000 -20.75%, #FF564D 11.84%, #FF0098 53.76%, #5D00C1 102.96%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
        },
      },

      "& .MuiSelect-icon": {
        color: "#fff !important",
      },
      "& .MuiSvgIcon-root": {
        color: "#fff !important",
      },

      "& .paybutton": {
        background: "linear-gradient(135deg, #FF0098 0.75%, #5D00C1 100%)",
        width: "100%",
        maxWidth: "265px",
      },
    },
  },
}));

function PurchaseCheckout() {
  const classes = useStyles();
  const history = useHistory();
  const [age, setAge] = React.useState("");
  const AddressData = window.localStorage.getItem("Address");
  const paycurrencyName = window.localStorage.getItem("payCurrency");
  const convertedValueGbp = window.localStorage.getItem("convertedValueGbp");
  const timeStamp = window.localStorage.getItem("timeStamp");
  // const [timeLeft, setTimeLeft] = useState();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box className={classes.KycDetailbox}>
      <Typography variant="h1">Checkout</Typography>
      <Box mt={3} align="center">
        <Box className="boxstyle">
          <Box my={2}>
            <Typography variant="h5">
              Please scan the below QR from your wallet app to process the{" "}
              {paycurrencyName ? paycurrencyName.toUpperCase() : "USDT"}
              &nbsp;payment.
            </Typography>
          </Box>
          <Box mb={3} className="imgBox">
            <img
              src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${AddressData}&choe=UTF-8`}
              alt=""
              style={{ width: "100%" }}
            />
          </Box>
          <Box className="selectbox" align="center">
            <Box mb={1}>
              <Typography variant="body2">
                Wallet Address :{" "}
                {AddressData ? (
                  <>
                    {sortAddress(AddressData)}{" "}
                    <CopyToClipboard text={AddressData}>
                      <BiCopy
                        style={{
                          color: "rgb(255, 86, 77)",
                          fontSize: " 14px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard>
                  </>
                ) : (
                  "-"
                )}{" "}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography
                variant="body2"
                style={{ fontWeight: "800", fontSize: "16px" }}
              >
                Amount you need to pay{" "}
                {Number(convertedValueGbp) +
                  Number(
                    convertedValueGbp * (Calculate(paycurrencyName) / 100)
                  )}{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {paycurrencyName ? paycurrencyName : "USDT"}
                </span>
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography
                variant="body2"
                style={{
                  color: "rgb(255, 86, 77)",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                This order will get expired in 48 hours
              </Typography>
              <Typography
                variant="body2"
                // style={{
                //   color: "rgb(255, 86, 77)",
                //   fontSize: "16px",
                //   fontWeight: "500",
                // }}
              >
                Your order has been placed on{" "}
                {moment(Number(timeStamp)).format("lll")}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="paybutton"
              onClick={() => history.push("/dashboard")}
            >
              Go To Dashboard
            </Button>
          </Box>
          <Box>
            <Typography
              style={{
                fontStyle: "italic",
                fontSize: "12px",
                paddingTop: "10px",
              }}
            >
              Important: The final quantity of allocated Fieros will be
              determined upon the completion of the transaction, and the
              applicable rate prevailing at that time will apply.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PurchaseCheckout;
