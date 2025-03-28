import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  IconButton,
  FormHelperText,
  DialogActions,
  FormControl,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import ButtonCircularProgress from "./ButtonCircularProgress";
// import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import { AuthContext } from "src/context/Auth";
import OTPInput from "otp-input-react";
// import Web3 from "web3";
// import { default_RPC_URL } from "src/utils";

const useStyles = makeStyles((theme) => ({
  modaltext: {
    "& .subtitle2": {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "12px",
      fontStyle: "italic",
      "& span": {
        color: "rgb(255 255 255 / 72%)",
        fontWeight: 600,
      },
    },
    "& p": { color: "rgba(255, 255, 255, 0.6)", fontSize: "14px" },
    "& h5": {
      fontWeight: "300",
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
    "& .flexbox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "@media(max-width:533px)": {
        display: "block",
      },
    },
    "& .balancebox": {
      background: "rgba(255, 255, 255, 0.025)",
      backdropFilter: "blur(4px)",
      borderRadius: "10px",
      padding: "22px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      "& h5": {
        fontWeight: "300",
      },
    },
  },
  otpFormControl: {
    alignItems: "start",
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
}));

export default function ConnectWalletModal({ open, handleClose }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const [OTPCode, setOTPCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conformations, setConformations] = useState(false);
  console.log(" ------- open ", open);
  // withdrawAddress

  const HandleSubmit = async (value) => {
    setIsSubmit(true);
    if (auth.account) {
      let dataToSend;
      if (auth.userData?.twoFaType !== "NONE" && OTPCode === "") {
        return;
      }
      if (auth.userData?.twoFaType == "NONE") {
        dataToSend = {
          address: auth.account,
          choice: false,
        };
      } else {
        dataToSend = {
          address: auth.account,
          choice: true,
          code: OTPCode,
        };
      }
      try {
        setIsSubmit(false);
        setIsLoading(true);
        const res = await axios({
          method: "PUT",
          url: ApiConfig.withdrawAddress,
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          params: dataToSend,
        });
        if (res.data.status === 200) {
          toast.success("Wallet address set successfully.");
          setIsLoading(false);
          auth.getProfileHandler();
          setOTPCode("");
        } else if (res.data.status === 205) {
          toast.warn(res.data.message);
          setIsLoading(false);
          // setGoogle(res.data.message);
        } else {
          setIsLoading(false);
          toast.warn(res.data.message);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Internal server error");
      }
    } else {
      toast.warn("Please enter your valid OTP");
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
          <Box mb={2} mt={2}>
            <Typography variant="body1" style={{ marginBottom: "4px" }}>
              Please connect your metamask account to save your wallet for
              future withdrawals.
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Connect with metamask wallet"
              fullWidth
              value={auth.account}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          {auth.userData?.twoFaType !== "NONE" && conformations && (
            <Box mb={2} mt={2}>
              <Typography variant="body1" style={{ marginBottom: "4px" }}>
                Authentication: Please Enter Your 2FA OTP
              </Typography>
              {/* <FormControl fullWidth className={classes.otpFormControl}>
                <OTPInput
                  inputVariant="standard"
                  value={OTPCode}
                  autoComplete="off"
                  onChange={setOTPCode}
                  autoFocus
                  OTPLength={6}
                  otpType="number"
                  disabled={isLoading}
                  error={isSubmit && OTPCode == ""}
                />
              </FormControl> */}
              <TextField
                fullWidth
                variant="outlined"
                value={OTPCode}
                disabled={isLoading}
                type="number"
                placeholder="Enter your 2FA OTP"
                onChange={(e) => setOTPCode(e.target.value)}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
                onKeyPress={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                inputProps={{
                  autoComplete: "off",
                  maxLength: 6,
                }}
                error={isSubmit && OTPCode == ""}
              />
              <FormHelperText error>
                {isSubmit && OTPCode == "" && "Please enter the 2FA OTP."}
              </FormHelperText>
            </Box>
          )}

          {conformations ? (
            <Typography
              variant="body1"
              color="secondary"
              // className="subtitle2"
            >
              Are you sure you want to set the withdrawal wallet address?
            </Typography>
          ) : (
            <Typography
              variant="subtitle2"
              color="secondary"
              className="subtitle2"
            >
              Disclaimer: All future withdrawals of Fiero rewards will only be
              possible using this metamask wallet.{" "}
              <span>
                This is a one-time process and irreplaceable hence kindly ensure
                the safety and security of the wallet address
              </span>{" "}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions
        style={{ justifyContent: conformations ? "flex-end" : "center" }}
      >
        {!auth?.account && (
          <Box my={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                auth.connectWallet();
              }}
            >
              Connect Wallet
            </Button>
          </Box>
        )}
        {auth?.account && !conformations && (
          <Box my={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setConformations(true);
              }}
              // onClick={HandleSubmit}
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        )}
        {auth?.account && conformations && (
          <Box style={{ display: "flex" }} my={2} mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setConformations(false)}
              // onClick={HandleSubmit}
              size="large"
              fullWidth
            >
              No
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              // onClick={() => setConformations(true)}
              onClick={HandleSubmit}
              size="large"
              fullWidth
              disabled={isLoading}
            >
              Yes {isLoading && <ButtonCircularProgress />}
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
}
