import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  IconButton,
  FormControl,
  InputBase,
  TextField,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import OTPInput from "otp-input-react";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  otpFormControl: {
    alignItems: "center",
    width: "100%",
    "& input": {
      color: "#fff",
      width: "65px !important",
      height: "65px !important",
      marginRight: "15px !important",
      borderRadius: "5px",
      border: "none",
      background: "#7b7575",
      [theme.breakpoints.down("xs")]: {
        marginRight: "5px !important",
        width: "30px !important",
        height: "40px !important",
      },
    },
  },
  modaltext: {
    "& h5": {
      fontWeight: "300",
      "& span": {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
    "& .buttonboxes": {
      display: "flex",
      alignItems: "center",
      padding: "30px",
      "@media(max-width:442px)": {
        display: "block",
        padding: "20px",
      },
      "& button": {
        margin: "0px 10px",
        "@media(max-width:442px)": {
          margin: "10px 0px 0px",
        },
      },
    },
    "& h3": {
      fontSize: "24px",
      fontWeight: "300",
      textAlign: "center",
    },
  },
}));

export default function OtpVerify({
  open,
  confirmationHandler,
  handleClose,
  email,
  // isLoading,
  OTP,
  setOTP,
}) {
  const classes = useStyles();

  const [OTP1, setOTP1] = useState("");
  const [isLoading, setIsLoading] = useState("");
  // console.log(" OTP ---- ", OTP1);

  const handleVerifyOTP = async (values) => {
    try {
      // console.log(" OTP ---- ", OTP1);
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.verifySMSCode,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          email: email,
        },
        data: {
          code: OTP1,
        },
      });

      if (res.data.status === 200) {
        handleClose();
        setOTP1("");
        confirmationHandler();
        toast.success(res.data.message);
        setIsLoading(false);
        // handleChangePassword1();
      } else {
        toast.warn(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Box className={classes.modaltext}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton style={{ padding: "0px" }}>
              <ClearIcon
                onClick={() => {
                  handleClose();
                  setOTP1("");
                }}
                style={{ color: "#fff" }}
              />
            </IconButton>
          </Box>
          <Box mb={2}>
            <Typography variant="h3" align="center">
              Verify OTP
            </Typography>
          </Box>
          <Box mt={4} mb={1}>
            <Typography variant="h5" align="center">
              OTP has been sent to {email}
            </Typography>
          </Box>
          <Box mt={1}>
            <FormControl fullWidth className={classes.otpFormControl}>
              <OTPInput
                inputVariant="standard"
                // style={{ display: "flex", justifyContent: "center" }}
                value={OTP1}
                autoComplete="off"
                // onChange={setOTP}
                onChange={setOTP1}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={isLoading || isLoading}
              />
              {/* <TextField
                className="webkitcss"
                variant="outlined"
                placeholder="0.00"
                fullWidth
                type="number"
                value={OTP}
                // disabled={coin === "0"}
                onChange={(e) => setOTP(e.target.value)}
                onKeyPress={(event) => {
                  if (
                    event?.key === "e" ||
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "*" ||
                    // event?.key === "." ||
                    event?.key === "/"
                  ) {
                    event.preventDefault();
                  }
                }}
              /> */}
            </FormControl>
          </Box>
          <Box className="buttonboxes">
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              fullWidth
              onClick={() => {
                handleClose();
                setOTP1("");
              }}
            >
              Cancle
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                // handleClose();
                handleVerifyOTP();
                // confirmationHandler();
              }}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
