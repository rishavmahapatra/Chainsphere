import React, { useState, useContext, useEffect } from "react";

import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { AuthContext } from "src/context/Auth";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CheckoutModal from "src/component/CheckoutModal";
import MenuItem from "@material-ui/core/MenuItem";
import DataLoader from "src/component/DataLoader";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  dashboardbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    "& .sidebox": {
      background: "rgba(255, 255, 255, 0.025)",
      borderRadius: "15px",
      padding: "25px",
      backdropFilter: "blur(4px)",
      "& img": {
        width: "100%",
        maxWidth: "200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    "& .textbox": {
      "& h1": {
        textAlign: "center",
        fontSize: "20px",
        margin: "16px 0px 20px",
      },
    },
  },
  textboxs: {
    position: "relative",
    zIndex: "1",
    "& li": {
      position: "relative",

      fontSize: "16px",
      color: "#ffffff",
      fontWeight: "500",
      fontFamily: "'Sora', sans-serif",
      "&::after": {
        content: "''",
        position: "absolute",
        height: "5px",
        width: "5px",
        backgroundColor: " #D9D9D9",
        borderRadius: "50%",
        left: "-9px",
        top: "14px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
    "& .MuiList-padding": {
      paddingTop: "4px",
      paddingBottom: "4px",
    },
  },
  subboxes: {
    "& h1": {
      margin: "12px 0px 10px",
    },
  },

  leftform: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    "& h1": {
      fontSize: "20px",
      marginBottom: "16px",
    },
    "& p": {
      color: "#fff",
      marginBottom: "5px",
    },
    "& .MuiSelect-icon": {
      color: "#fff !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#fff !important",
    },
    "& .buttonboxes": {
      display: "flex",
      alignItems: "center",
      padding: "20px 50px",
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
  },
  textflex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
}));

export const Calculate = (CoinName) => {
  let listadCoin = ["ETH", "BTC", "USDTERC20", "TUSD"];

  const matchedData = listadCoin.filter(
    (element) => CoinName.toLowerCase() == element.toLowerCase()
  );
  // let value;
  // if (matchedData.length == 1) {
  //   value = 3;
  // } else {
  //   value = 1.75;
  // }
  return 3;
};
function Vesting({ setIsVesting, vestingData }) {
  console.log("vestingData=-=-=-", vestingData);
  const classes = useStyles();
  const history = useHistory();
  const GBPAmount = window.localStorage.getItem("GBPAmount");
  const CoinName = window.localStorage.getItem("CoinName");
  const coinValue = window.localStorage.getItem("coinValue");
  const convertedValueGbp = window.localStorage.getItem("convertedValueGbp");
  const auth = useContext(AuthContext);
  const [coinDataDetail, setCoinDataDetail] = useState("");
  // const [fieroUsdAmountActual, setFieroUsdAmountActual] = useState("");
  let fieroUsdAmountActual =
    vestingData && vestingData.tokenPrice && vestingData.tokenPrice;
  const [volume, setVolume] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [coinConvertedValue, setCoinConvertedValue] = useState();
  const [openCheckout, setOpenCheckout] = useState(false);
  const handleClickOpen = () => {
    setOpenCheckout(true);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };
  const getAllCoinDetail = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getcoindetails,
        params: {
          coinName: CoinName,
        },
      });
      if (res.data.status === 200) {
        setCoinDataDetail(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (CoinName) {
      getAllCoinDetail();
    }
  }, [CoinName]);
  const gbptofrex = Number(coinConvertedValue) / Number(fieroUsdAmountActual);
  console.log(
    " ===== amount need to pay >>>>> ",
    Number(convertedValueGbp) + Number(convertedValueGbp * (1.75 / 100))
  );
  const PaywithCryptoHandler = async () => {
    setIsSubmit(true);

    try {
      if (volume != "0") {
        setIsLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.buytoken,
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          data: {
            assetAmount: Number(
              Number(convertedValueGbp) +
                Number(convertedValueGbp * (Calculate(CoinName) / 100))
            ),
            assetName: CoinName,
            buyAmount: Number(gbptofrex), //LOCKAMOUNT
            gbpAmount: Number(coinValue),
            ibiId: auth?.userData?.ibiId,
            ibiName: auth?.userData?.ibiName,
            volume: volume,
            buyPrice: Number(fieroUsdAmountActual),
            planType: vestingData?.id ? "NEW" : "OLD",
            planId: vestingData?.id ? vestingData?.id : undefined,
            usdAmount: coinConvertedValue,
          },
        });

        if (res.data.status === 200) {
          toast.success(res.data.message);
          window.localStorage.setItem(
            "Address",
            res.data?.data?.paymentDetails?.pay_address
          );
          window.localStorage.setItem(
            "payCurrency",
            res.data?.data?.paymentDetails?.pay_currency
          );
          window.localStorage.setItem(
            "timeStamp",
            `${moment(new Date()).unix()}000`
          );
          history.push({
            pathname: "/vesting-purchase",
          });
          setIsLoading(false);
        } else {
          toast.error(res.data.message);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
      if (error) {
        toast.error(error.res.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  const concertedAmount = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getconvertedamount,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          amount: convertedValueGbp,
          assetName: CoinName,
          convertAssetName: "usd",
        },
      });

      if (res.data.status === 200) {
        setCoinConvertedValue(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    concertedAmount();
  }, []);
  const getFieroUsdAmount = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getsalelist,
      });
      if (response.data.status === 200) {
        let getSaleEnabled = response.data.data.enabled_sale;
        const res = await axios({
          method: "GET",
          url: ApiConfig.getcoindetails,
          params: {
            coinName: "FIERO",
          },
        });

        if (res.data.status === 200) {
          let fieroPrice;
          let markStatus = res.data.data.markStatus;
          let markType = res.data.data.markType;
          if (markStatus == "ENABLE") {
            if (markType == "NOMARK") {
              fieroPrice = getSaleEnabled.priceWithoutMark; // without mark
            } else {
              fieroPrice = getSaleEnabled.price; // with mark
            }
          } else {
            fieroPrice = getSaleEnabled.fieroUsdPrice; // tranch
          }
          // setFieroUsdAmountActual(fieroPrice);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFieroUsdAmount();
  }, []);

  // const Calculate = async (CoinName) => {
  //   try {
  //     let listadCoin = ["ETH", "BTC", "USDTERC20", "TUSD"];

  //     const matchedData = await listadCoin.filter(
  //       (element) => CoinName.toLowerCase() == element.toLowerCase()
  //     );
  //     let value;
  //     if (matchedData.length == 1) {
  //       value = 3;
  //     } else {
  //       value = 1.75;
  //     }
  //     console.log(value, " ---- matchedData ---", matchedData);
  //     return value;
  //   } catch (error) {
  //     console.log("- err", error);
  //   }
  // };

  console.log("--- matchedData Calculate ", Calculate("eth"));
  return (
    <Box className={classes.dashboardbox}>
      <Typography variant="h1">Vesting</Typography>
      {coinConvertedValue === undefined ? (
        <DataLoader />
      ) : (
        <>
          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Box className="sidebox">
                  <img src="images/masterlogo.svg" alt="" width="100%" />
                  <Box textAlign="center" pt={2}>
                    <Typography>
                      {vestingData && vestingData.terms && vestingData.terms}{" "}
                      Days Locked
                    </Typography>
                  </Box>
                  <Box textAlign="center" pt={2}>
                    <Typography>
                      Total Fiero: {gbptofrex ? gbptofrex : 0}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box className={classes.leftform}>
                  <Typography variant="h1">New Order</Typography>
                  <Box mb={2}>
                    <Typography variant="body1">IBI Name</Typography>
                    <TextField
                      placeholder="Nexarise"
                      variant="outlined"
                      name="firstName"
                      fullWidth
                      disabled
                      value={auth?.userData?.ibiName}
                    />
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body1">IBI ID</Typography>
                    <TextField
                      placeholder="2"
                      variant="outlined"
                      name="firstName"
                      fullWidth
                      disabled
                      value={auth?.userData?.ibiId}
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body1">Payment Method</Typography>
                    <TextField
                      placeholder="2"
                      variant="outlined"
                      name="firstName"
                      fullWidth
                      value={CoinName.toUpperCase()}
                      disabled
                    />
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body1">Volume Allocation</Typography>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.forminput}
                    >
                      <Select
                        name="volume"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        error={isSubmit && volume === "0"}
                        helperText={
                          isSubmit && volume === "0" && "Please select volume"
                        }
                      >
                        <MenuItem value="0">-Select Volume -</MenuItem>
                        <MenuItem value="1 month">1 month</MenuItem>
                        <MenuItem value="3 month">3 month</MenuItem>
                        <MenuItem value="6 month">6 month</MenuItem>
                      </Select>
                    </FormControl>
                    {isSubmit && volume === "0" && (
                      <FormHelperText error>
                        Please select volume
                      </FormHelperText>
                    )}
                  </Box>

                  <Box mt={2}>
                    <Box className={classes.textflex}>
                      <Typography variant="body1">Fiero</Typography>
                      <Typography
                        variant="body1"
                        color="#fff"
                        style={{ fontWeight: "500" }}
                      >
                        <img
                          src="images/firex.png"
                          alt=""
                          style={{ width: "15px" }}
                        />{" "}
                        {gbptofrex ? gbptofrex : 0}
                      </Typography>
                    </Box>
                    <Box className={classes.textflex}>
                      <Typography
                        variant="body1"
                        style={{ textTransform: "capitalize" }}
                      >
                        {CoinName.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#fff"
                        style={{ fontWeight: "500" }}
                      >
                        {convertedValueGbp}
                      </Typography>
                    </Box>
                    <Box className={classes.textflex}>
                      <Typography variant="body1">USD</Typography>
                      <Typography
                        variant="body1"
                        color="#fff"
                        style={{ fontWeight: "500" }}
                      >
                        $ {coinConvertedValue}
                      </Typography>
                    </Box>
                    <Box className={classes.textflex}>
                      <Typography variant="body1">GBP</Typography>
                      <Typography
                        variant="body1"
                        color="#fff"
                        style={{ fontWeight: "500" }}
                      >
                        £ {coinValue}
                      </Typography>
                    </Box>
                    <Box className={classes.textflex}>
                      <Typography variant="body1">Charge</Typography>
                      <Typography
                        variant="body1"
                        color="#fff"
                        style={{ fontWeight: "500" }}
                      >
                        <span
                          style={{
                            fontWeight: "400",
                            color: "#fff9",
                            fontSize: "12px",
                          }}
                        >
                          {CoinName.toUpperCase()}
                        </span>{" "}
                        {/* {Calculate(CoinName) / 100} */}
                        {convertedValueGbp * (Calculate(CoinName) / 100)}
                      </Typography>
                    </Box>
                    <Box className="buttonboxes">
                      <Button
                        variant="outlined"
                        size="large"
                        color="secondary"
                        fullWidth
                        onClick={() => setIsVesting(false)}
                        // onClick={() => history.push("/buy-fiero")}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={PaywithCryptoHandler}
                        disabled={isLoading || coinConvertedValue === undefined}
                      >
                        Checkout {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <CheckoutModal
              handleClickOpen={handleClickOpen}
              handleCloseCheckout={handleCloseCheckout}
              openCheckout={openCheckout}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Vesting;
