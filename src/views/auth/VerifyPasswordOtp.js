import React, { useState, useContext } from "react";

import {
  makeStyles,
  Typography,
  Box,
  Button,
  FormControl,
} from "@material-ui/core";
import OTPInput from "otp-input-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import moment from "moment";

import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  mainOTPContainer: {
    background: "rgba(255, 255, 255, 0.025)",
    padding: "32px 20px 20px",
    borderRadius: "15px",

    "& h1": {
      fontWeight: "100",
      fontSize: "32px",
    },
  },
  otpFormControl: {
    "& input": {
      color: "#fff",
      width: "65px !important",
      height: "65px !important",
      marginRight: "15px !important",
      borderRadius: "5px",
      border: "none",
      background: "#2a2929",
      [theme.breakpoints.down("xs")]: {
        marginRight: "5px !important",
        width: "30px !important",
        height: "40px !important",
      },
    },
  },
  BaseBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "25px 0px",
    "& p": {
      color: "#FFFFFF99",
    },

    "& span": {
      color: "#FF564D",
      fontWeight: "500",
    },
  },
  TimeBox: {
    padding: "30px 0px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "320px",
    "& p": {
      fontWeight: "700",
      background: "linear-gradient(135deg, #FFB000 0%, #FF564D 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
    },
  },
}));

export default function VerifyPasswordOtp() {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const [OTP, setOTP] = useState("");
  const [isLoading, setLoader] = useState(false);
  const history = useHistory();
  const [isloading, setloader] = useState(false);
  const auth = useContext(AuthContext);

  const handleFormSubmit = async (values) => {
    setIsSubmit(true);
    if (OTP !== "") {
      try {
        setLoader(true);

        const res = await axios({
          method: "POST",
          url: ApiConfig.verifyOTPSMS,
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          data: {
            code: parseInt(OTP),
          },
          params: {
            email: window.location.search.split("?")[1],
          },
        });

        if (res.data.status === 200) {
          toast.success("OTP verified successfully");
          setLoader(false);
          setIsSubmit(true);
          history.push({
            pathname: "/reset-password",
            state: { email: window.sessionStorage.getItem("email"), otp: OTP },
            search: window.location.search.split("?")[1],
            hash: parseInt(OTP).toString(),
          });
        } else if (res.data.status === 400) {
          setLoader(false);
          toast.warn("Please enter valid OTP");
        } else {
          setLoader(false);
          toast.warn(res.data.message);
        }
      } catch (error) {
        setLoader(false);
        if (error.response) {
          toast.error("Please enter valid OTP");
        } else {
          toast.error(error.message);
        }
      }
    } else {
      toast.error("Please enter otp");
    }
  };
  // console.log("==== window.location", window.location.origin);
  const resetotphandle = async (values) => {
    try {
      setloader(true);

      const res = await axios({
        method: "GET",
        url: `${ApiConfig.forgotPassword}?email=${
          window.location.search.split("?")[1]
        }`,
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        auth.setEndtime(moment().add(3, "m").unix());

        setloader(false);
        setIsSubmit(true);
      } else {
        setloader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setloader(false);
      if (error.response) {
        toast.error("Please enter the correct Email");
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <Box className={classes.mainOTPContainer}>
        <Box>
          <Typography variant="h1">Verify OTP</Typography>
          <Box>
            <Box py={3}>
              <Typography variant="body2">
                OTP has been sent to {window.location.search.split("?")[1]}{" "}
              </Typography>
            </Box>
          </Box>
          <Box mt={1}>
            <FormControl fullWidth className={classes.otpFormControl}>
              <OTPInput
                inputVariant="standard"
                // style={{ display: "flex", justifyContent: "center" }}
                value={OTP}
                autoComplete="off"
                onChange={setOTP}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={isLoading || isLoading}
              />
            </FormControl>
          </Box>
          <Box className={classes.TimeBox}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              // onClick={() => history.push("/reset-password")}
              onClick={() => handleFormSubmit()}
              disabled={isLoading || OTP.length !== 4}
            >
              Verify OTP
              {isLoading && <ButtonCircularProgress />}
            </Button>
            {/* <Box>
              <Typography variant="body2">03:00</Typography>
            </Box> */}
          </Box>
          <Box className={classes.BaseBox}>
            {auth.timeLeft &&
            auth.timeLeft.seconds > 0 &&
            auth.timeLeft.minutes > 0 ? (
              <>
                <Typography
                  variant="body2"
                  style={{
                    marginBottom: "10px",
                    color: "red",
                  }}
                >
                  Your OTP will expire in {auth.timeLeft?.minutes} m :{" "}
                  {auth.timeLeft?.seconds} s
                </Typography>{" "}
              </>
            ) : (
              <Typography variant="body1">
                If you don't receive any OTP ?{" "}
                <span
                  disabled={isLoading}
                  onClick={() => resetotphandle()}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  Resend OTP{" "}
                </span>
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
