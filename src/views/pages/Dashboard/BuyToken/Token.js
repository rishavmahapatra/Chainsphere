import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { AuthContext } from "src/context/Auth";
import { useHistory } from "react-router-dom";
import VestingPage from "src/views/pages/Dashboard/BuyToken/Vesting";
import { Autocomplete } from "@material-ui/lab";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import useDebounce from "src/customHook/Debounce";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  forminput: {
    "& .css-13cymwt-control": {
      background: "#181517",
      border: "none",
      minHeight: "56px",
      borderRadius: "8px",
    },
  },
  KycDetailbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "45px 70px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "15px",
    },
    "& h1": {
      marginBottom: "10px",
    },
    "& .ChipBox": {
      paddingTop: "5px",
      "& .MuiChip-clickable": {
        margin: "3px",
        height: "26px",
        borderRadius: "14px",
        fontSize: "13px",
      },
    },
    "& .tabBox": {
      "& h6": {
        whiteSpace: "pre",
      },
    },

    "& .displayBox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "@media(max-width:499px)": {
        display: "block",
      },
    },
    "& .boxstyle": {
      background: "rgba(255, 255, 255, 0.025)",
      backdropFilter: "blur(3.22162px)",
      borderRadius: "15px",
      padding: "20px 15px 30px",
      "& h6": {
        fontWeight: "600",
        marginBottom: "6px",
        "@media(max-width:1314px)": {
          fontSize: "13px",
        },
      },
      "& .MuiSelect-icon": {
        color: "#fff !important",
      },
      "& .MuiSvgIcon-root": {
        color: "#fff !important",
      },
      "& .paybutton": {
        background: "linear-gradient(43.34deg, #FFC000 56.82%, #FF9500)",
        width: "100%",
        maxWidth: "218px",
      },
    },
  },
}));

function Token() {
  const classes = useStyles();
  const [coin, setCoin] = useState("");
  const location = useLocation();
  // console.log("coin----", coin);
  const auth = useContext(AuthContext);
  const [coinDataDetail, setCoinDataDetail] = useState("");
  const [gbpAmount, setGbpAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isVesting, setIsVesting] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [isFetched, setisFetched] = useState(false);
  const history = useHistory();
  const [coinConvertedValue, setCoinConvertedValue] = useState();
  const [minimumAmount, setMinimumAmount] = useState();
  const [vestingData, setVestingData] = useState({});
  const coinDeb = useDebounce(coin, 1000);
  const gbpAmountDeb = useDebounce(gbpAmount, 1000);
  useEffect(() => {
    if (location && location.state && location.state) {
      setVestingData(location.state);
    }
  }, [location]);

  const VestingHandler = () => {
    setisSubmit(true);
    if (gbpAmount < vestingData.minGbpAmount) {
      return;
    }
    const vestingfrexvalue = gbpAmount * coinDataDetail?.gbpPrice;
    window.localStorage.setItem("GBPAmount", vestingfrexvalue);
    window.localStorage.setItem("CoinName", coin);
    window.localStorage.setItem("coinValue", gbpAmount);
    window.localStorage.setItem("convertedValueGbp", coinConvertedValue);
    // history.push("/vesting");
    setIsVesting(true);
  };

  const getAllCoinDetail = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getcoindetails,
        params: {
          coinName: coin,
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
    if (coin) {
      getAllCoinDetail();
    }
  }, [coin]);

  const concertedAmount = async () => {
    setisFetched(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getconvertedamount,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          amount: gbpAmount,
          assetName: "gbp",
          convertAssetName: coin,
        },
      });

      if (res.data.status === 200) {
        setisFetched(false);
        setCoinConvertedValue(res.data.data);
      }
    } catch (err) {
      setisFetched(false);
      console.log(err);
      setCoinConvertedValue("Error");
    }
  };
  useEffect(() => {
    if (coin && gbpAmount) {
      concertedAmount();
    }
  }, [coinDeb, gbpAmountDeb]);

  const getMinimumAmountHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.minimumAmount,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          assetName: coin,
        },
      });
      if (res.data.status === 200) {
        setMinimumAmount(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (coin) {
      getMinimumAmountHandler();
    }
  }, [coin]);
  return (
    <>
      {isVesting ? (
        <>
          <VestingPage
            setIsVesting={setIsVesting}
            coin={coin}
            gbpAmount={gbpAmount}
            vestingData={vestingData}
          />{" "}
        </>
      ) : (
        <Box className={classes.KycDetailbox}>
          <Box className="displayBox">
            <Typography variant="h1">Buy Chainsphere</Typography>
            {/* <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => history.push("/transaction")}
            >
              Transaction History
            </Button> */}
            
          </Box>

          <Box className="tabBox" mt={2} mb={1}>
            <Box>
              <div className="flex justify-between">
              <Typography variant="h6">Pay with crypto</Typography>
              <Typography variant="h5" className="text-yellow-300">Chainsphere Price - $0.05</Typography>
              </div> 
            </Box>
          </Box>

          <Box mt={3}>
            <Box className="boxstyle">
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Typography variant="h6">Select Coin</Typography>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.forminput}
                  >
                    <Autocomplete
                      id="asynchronous-demo"
                      // style={{ width: 300 }}
                      open={open}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={(option) => option.label}
                      options={auth.coinList}
                      loading={auth.loading}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select coin"
                          variant="outlined"
                          onClick={() => {
                            if (auth?.coinList?.length == 0) {
                              auth.getCoinlistHandler();
                            }
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {auth.loading ? (
                                  <ButtonCircularProgress
                                    color="inherit"
                                    size={20}
                                  />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                      onChange={(e, data) => {
                        if (data?.value) {
                          setCoin(data.value);
                        } else {
                          setCoin("");
                        }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box>
                    <Typography variant="h6">Enter USDT Amount</Typography>
                    <TextField
                      className="webkitcss"
                      variant="outlined"
                      placeholder="0.00"
                      fullWidth
                      type="number"
                      value={gbpAmount}
                      disabled={coin === "0"}
                      onChange={(e) => {
                        setGbpAmount(e.target.value);
                        setisFetched(true);
                      }}
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
                    />
                    {/* <Box className="ChipBox">
                      <Chip
                        label="150 "
                        onClick={(e) => {
                          setGbpAmount(150);
                          setisFetched(true);
                        }}
                        color={gbpAmount == 150 ? "secondary" : "primary"}
                      />
                      <Chip
                        label="200 "
                        onClick={(e) => {
                          setGbpAmount(200);
                          setisFetched(true);
                        }}
                        color={gbpAmount == 200 ? "secondary" : "primary"}
                      />
                      <Chip
                        label="250 "
                        onClick={(e) => {
                          setGbpAmount(250);
                          setisFetched(true);
                        }}
                        color={gbpAmount == 250 ? "secondary" : "primary"}
                      />
                      <Chip
                        label="300 "
                        onClick={(e) => {
                          setGbpAmount(300);
                          setisFetched(true);
                        }}
                        color={gbpAmount == 300 ? "secondary" : "primary"}
                      />
                      <Chip
                        label="500 "
                        onClick={(e) => {
                          setGbpAmount(500);
                          setisFetched(true);
                        }}
                        color={gbpAmount == 500 ? "secondary" : "primary"}
                      />
                      <Chip
                        label="1000 "
                        onClick={(e) => {
                          setGbpAmount(1000);
                          setisFetched(true);
                        }}
                        color={gbpAmount == 1000 ? "secondary" : "primary"}
                      />
                    </Box> */}
                    {console.log(
                      " --- - vestingData.minGbpAmount",
                      vestingData.minGbpAmount
                    )}
                    {gbpAmount < vestingData.minGbpAmount && isSubmit && (
                      <FormHelperText error>
                        Minimum order must be greater than or equal to £
                        {vestingData.minGbpAmount}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box>
                    <Typography variant="h6">
                      {coinDataDetail?.coinShortName
                        ? `${coinDataDetail?.coinShortName}-`
                        : coin === "0"
                        ? "Coin-"
                        : coin
                        ? `${coin.toUpperCase()}`
                        : ""}{" "}
                      amount you will be paying
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={coinConvertedValue}
                      disabled //isFetched
                      // inputProps={{
                      //   endAdornment: isFetched && (
                      //     <CircularProgress color="inherit" size={20} />
                      //   ),
                      // }}

                      InputProps={{
                        endAdornment: (
                          <IconButton disabled>
                            <span style={{ color: "white", fontSize: "12px" }}>
                              {" "}
                              (Approx)
                            </span>
                            {isFetched && coin && <ButtonCircularProgress />}
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
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
                  onClick={VestingHandler}
                  disabled={
                    isLoading ||
                    isFetched ||
                    gbpAmount === undefined ||
                    gbpAmount === "" ||
                    coinConvertedValue === undefined ||
                    coinConvertedValue === 0
                  }
                >
                  Pay
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Token;
