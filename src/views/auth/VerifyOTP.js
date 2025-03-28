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
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import moment from "moment";

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

export default function VerifyOtp() {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const emailvalue = window.sessionStorage.getItem("email");
  const verificationHandler = async (values) => {
    setIsSubmit(true);
    if (OTP !== "") {
      try {
        setIsLoading("otVerify");

        const res = await axios({
          method: "GET",
          url: ApiConfig.verifyOTP,

          params: {
            token: OTP,
          },
        });
        if (res.data.status === 200) {
          toast.success("OTP verified successfully");

          setIsLoading(false);
          setIsSubmit(true);
          history.push({
            pathname: "/login",
          });
        } else {
          setIsLoading(false);
          toast.warn("Please enter valid OTP");
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    }
  };

  const resendOtpHandler = async (values) => {
    try {
      setIsLoading("resend");

      const res = await axios({
        method: "GET",
        url: `${ApiConfig.resendemail}?email=${window.sessionStorage.getItem(
          "email"
        )}&webUrl=${window.location.origin}`,
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        auth.setEndtime(moment().add(3, "m").unix());

        setIsLoading(false);
        setIsSubmit(true);
      } else {
        setIsLoading(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
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
                OTP has been sent to {emailvalue}. Please enter the OTP.
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
              onClick={() => verificationHandler()}
              disabled={isLoading || OTP.length !== 4}
            >
              Verify OTP
              {isLoading === "otVerify" && <ButtonCircularProgress />}
            </Button>
          </Box>
          <Box className={classes.BaseBox}>
            {auth.timeLeft && auth.timeLeft.seconds >= 0 ? (
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
              <Box display="flex" alignItems="center">
                <Typography variant="body1" style={{ cursor: "pointer" }}>
                  If you don't receive any OTP ?{" "}
                </Typography>
                &nbsp;
                <Button disabled={isLoading} onClick={() => resendOtpHandler()}>
                  Resend OTP
                  {isLoading === "resend" && <ButtonCircularProgress />}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
