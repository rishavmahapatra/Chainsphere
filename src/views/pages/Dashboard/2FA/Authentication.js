import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import axios from "axios";
import Apiconfigs from "src/config/ApiConfig";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  historybox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    "& h2": {
      fontSize: "30px",
      fontWeight: "500",
      color: theme.palette.background.yellow,
    },
  },
  cardbox: {
    "& h3": {
      fontSize: "18px",
      fontWeight: "300 !important",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    "& h6": {
      fontSize: "22px",
      fontWeight: "700",
    },
    "& h5": {
      fontSize: "16px",
      fontWeight: "300 !important",
      marginBottom: "10px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        textAlign: "left",
      },
      "& span": {
        color: "#EA1A1A",
      },
    },
    "& h4": {
      color: theme.palette.background.yellow,
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "8px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
  },
  subtext: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      backgroundColor: "#1BA526",
      borderRadius: "32px",
      fontSize: "16px",
      fontWeight: "300",
      color: "#fff",
      width: "100%",

      whiteSpace: "pre",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
      },
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "left",
    },
  },
  modalbox: {
    "& h4": {
      fontSize: "16px",
      fontWeight: "300",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  buttongrid: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
    "& .rightbutton": {
      fontSize: "14px",
      margin: "0px 10px",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        margin: "10px 0px",
      },
    },
  },
}));
function Authentication() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const [googleData, setGoogleData] = useState();
  // console.log("googleData---", googleData);
  const [secretKey, setSecretKey] = useState("");
  const [google, setGoogle] = useState("");

  const handleClose = () => {
    setOpen1(false);
  };
  const handleClose1 = () => {
    setOpen2(false);
  };
  const handleClose2 = () => {
    setOpen(false);
  };

  //***************************section for google******************************//

  const SendGoogleOtpHandle = async (values) => {
    try {
      setIsLoading("googlesend");
      const res = await axios({
        method: "GET",
        url: Apiconfigs.googleauth,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setSecretKey(res.data.data);
        setOpen(true);
        setIsLoading(false);
      } else {
        setOpen(true);
        setIsLoading(false);
        toast.warn(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Internal server error");
    }
  };

  const VerifyGoogleOtpHandle = async (values) => {
    setIsSubmit(true);
    if (googleData !== "") {
      try {
        setIsLoading("googleverify");
        const res = await axios({
          method: "POST",
          url: Apiconfigs.VerifyGoogleOtp,
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          data: {
            code: googleData,
            secretKey: secretKey?.secretKey,
          },
        });
        if (res.data.status === 200) {
          setOpen(false);
          toast.success("Enabled Successfully");
          setIsLoading(false);
          auth.getProfileHandler();
        } else if (res.data.status === 205) {
          toast.warn(res.data.message);
          setIsLoading(false);
          setGoogle(res.data.message);
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
      toast.warn("Please enter a valid OTP");
    }
  };
  setTimeout(() => {
    setGoogle();
  }, 20000);

  const DisableGoogleHandle = async (value) => {
    setIsSubmit(true);
    if (googleData !== "") {
      try {
        setIsLoading("googledisable");
        const res = await axios({
          method: "POST",
          url: Apiconfigs.DisableGoogle,
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          data: {
            code: googleData,
          },
        });
        if (res.data.status === 200) {
          setOpen(false);
          // toast.success(res.data.message);
          toast.success("Disabled Successfully");
          setIsLoading(false);
          auth.getProfileHandler();
        } else if (res.data.status === 205) {
          toast.warn(res.data.message);
          setIsLoading(false);
          setGoogle(res.data.message);
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
  setTimeout(() => {
    setGoogle();
  }, 20000);
  function testNumber(value) {
    const regex = /^-?[0-9]*$/;
    return regex.test(value);
  }
  const [isValidName, setIsValidName] = useState(true);
  // console.log("secretKey?.secretKey", secretKey?.secretKey);
  return (
    <Box className={classes.historybox}>
      <Box>
        <Typography variant="h2">2FA</Typography>
      </Box>
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box className={classes.cardbox}>
            <Box mt={2}>
              <Grid container spacing={3} alignItems="center">
                <Grid item lg={9} md={9} sm={12} xs={12}>
                  <Grid container>
                    <Grid item lg={1} md={1} sm={1} xs={12}>
                      <Box>
                        <img
                          src="images/googlepic.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "59px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item lg={11} md={11} sm={11} xs={12}>
                      <Box style={{ margin: "0 10px" }}>
                        <Typography variant="h4">
                          Google Authentication
                        </Typography>
                        <Typography variant="h3">
                          Used for withdraw & security modification
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <Box>
                    <Typography variant="h5">
                      Google Auth :
                      <span>
                        {auth?.userData?.twoFaType === "GOOGLE" ? (
                          <>
                            {" "}
                            <span style={{ color: "#1BA526" }}>Enabled</span>
                          </>
                        ) : (
                          <> Disabled</>
                        )}
                      </span>
                    </Typography>
                  </Box>
                  <Box className={classes.subtext}>
                    <Button
                      fullWidth
                      // onClick={SendGoogleOtpHandle}
                      onClick={() => {
                        if (auth?.userData?.twoFaType === "GOOGLE") {
                          setOpen(true);
                        } else {
                          SendGoogleOtpHandle();
                        }
                      }}
                      disabled={isLoading}
                    >
                      {auth?.userData?.twoFaType === "GOOGLE" ? (
                        <>
                          Disable Google Auth
                          {isLoading === "googlesend" && (
                            <ButtonCircularProgress />
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          Enable Google Auth
                          {isLoading === "googlesend" && (
                            <ButtonCircularProgress />
                          )}
                        </>
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={6} mb={6}>
                <Divider />
              </Box>
            </Box>
          </Box>
          <Box>
            <Dialog
              disableScrollLock
              open={open}
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              maxWidth="xs"
            >
              <DialogContent>
                <Box className={classes.modalbox}>
                  <Box>
                    <Typography variant="h4">Google Auth</Typography>
                  </Box>
                  <Box mt={1}>
                    <img
                      src={
                        secretKey?.qrCode
                          ? secretKey?.qrCode
                          : "images/chartimg.png"
                      }
                      alt=""
                      width="100%"
                    />
                    <Box>
                      {secretKey?.secretKey === undefined ? (
                        <>
                          <Typography>Please enter the OTP : </Typography>
                        </>
                      ) : (
                        <>
                          <Typography>
                            SecretKey :{" "}
                            {secretKey?.secretKey ? secretKey?.secretKey : "--"}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      className="webkitcss"
                      // type="number"
                      placeholder="Enter Authenticator Code"
                      inputProps={{ maxLength: 6 }}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      value={googleData}
                      onChange={(e) => {
                        setGoogleData(e.target.value);
                        const isValid = testNumber(e.target.value);
                        setIsValidName(isValid);
                      }}
                      error={isSubmit && googleData === ""}
                      helperText={
                        isSubmit && googleData === "" && "Please enter your Otp"
                      }
                    />
                    {!isValidName && googleData !== "" && (
                      <FormHelperText error>
                        You can enter only number.
                      </FormHelperText>
                    )}
                    <Typography
                      variant="h6"
                      style={{
                        color: " #e34813",
                        fontSize: "12px",
                        marginTop: " 2px",
                      }}
                    >
                      {google}
                    </Typography>
                  </Box>
                  <Box
                    mt={2}
                    pb={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {auth?.userData?.twoFaType === "GOOGLE" ? (
                      <Box className={classes.buttongrid}>
                        <Button
                          style={{ fontSize: "14px", width: "100%" }}
                          variant="contained"
                          color="primary"
                          size="large"
                          type="submit"
                          fullWidth
                          disabled={
                            isLoading ||
                            googleData === "" ||
                            googleData === undefined
                          }
                          onClick={DisableGoogleHandle}
                        >
                          Disable{isLoading && <ButtonCircularProgress />}
                        </Button>
                        <Button
                          className="rightbutton"
                          variant="contained"
                          color="primary"
                          size="large"
                          type="submit"
                          fullWidth
                          disabled={isLoading}
                          onClick={handleClose2}
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : (
                      <Box className={classes.buttongrid}>
                        <Button
                          style={{ fontSize: "14px", width: "100%" }}
                          variant="contained"
                          color="primary"
                          size="large"
                          type="submit"
                          onClick={VerifyGoogleOtpHandle}
                          disabled={
                            isLoading ||
                            googleData === "" ||
                            googleData === undefined
                          }
                        >
                          Enable{isLoading && <ButtonCircularProgress />}
                        </Button>
                        <Button
                          className="rightbutton"
                          variant="contained"
                          color="primary"
                          size="large"
                          type="submit"
                          onClick={handleClose2}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Authentication;
