import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  Grid,
  Select,
  MenuItem,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TransactionTable from "./TransactionTable";
import Axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  filtermainbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",

    "& .active": {
      background: "linear-gradient(180deg, #FDA645 0%, #FF00CD 100%)",
      color: "#fff",
    },
    "& .subdata": {
      marginBottom: "30px",
    },
    "& label": {
      fontFamily: "'Sora', sans-serif",
    },

    "& .MuiSelect-icon": {
      color: "#fff !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#fff !important",
    },
  },
  flexgrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    "& .buttonbox": {
      marginRight: "16px",
    },

    "@media(max-width:465px)": {
      "& button": {
        width: "100%",
        marginBottom: "10px",
      },
      display: "block",
    },
  },
}));

function TransactionHistory() {
  const classes = useStyles();
  const [currentvalue, setCurrentValue] = useState("WITHDRAW");
  const csvLink = useRef();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [fromDate, setFromDate] = useState();
  const [isClear, setIsClear] = useState(false);
  const [toDate, setToDate] = useState();
  const [coinName, setCoinName] = useState("");
  const [details, setdetails] = useState([]);
  const [listTransactionData, setListTransactionData] = useState([]);
  const [page, setPage] = useState(1);
  const userdata = auth?.userData ? auth?.userData : "";
  const [isLoading, setLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState(1);
  const [coin, setCoin] = useState("WITHDRAW");
  const [allListData1, setAllListData1] = useState([]);
  const data = auth?.userData ? auth?.userData : "";
  const [value, setValue] = useState(0);

  const [toggle, settoggle] = React.useState(false);

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
      paddingBottom: " 2px",
    },
    switchBase: {
      padding: 2,
      color: "green",
      "&$checked": {
        transform: "translateX(12px)",
        color: "yellow",
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  const historyHandler = async () => {
    setLoading(true);
    setListTransactionData([]);
    let coinData;
    let txnType;
    // if (currentvalue !== "CLAIM") {
    txnType = currentvalue;
    // }
    // if (coin !== "CLAIM") {
    //   coinData = coin;
    // }
    try {
      const res = await Axios.get(ApiConfig.transactionHistory, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          page: page - 1,
          pageSize: 10,
          txnType: txnType,
          coinName: coinData?.coinShortName,
          fromDate: fromDate ? `${moment(fromDate).unix()}000` : null,
          toDate: toDate ? `${moment(toDate).unix()}000` : null,
          status: toggle ? "PENDING" : "CONFIRM",
        },
      });
      var currencyId = [];
      if (res.data.status === 200) {
        if (currentvalue !== "BUYTOKEN") {
          // setIsClear(false);
          setListTransactionData(res.data.data.resultlist);
          for (var i = 0; i < res.data.data.resultlist?.length; i++) {
            const txnType = res.data.data.resultlist[i]?.txnType;
            const txnId = res.data.data.resultlist[i]?.txnId;
            const txnHash = res.data.data.resultlist[i]?.txnHash;
            const fees = res.data.data.resultlist[i]?.fees;
            const gbpAmount = res.data.data.resultlist[i]?.gbpAmount;
            const amount = res.data.data.resultlist[i]?.amount;
            const coinType = res.data.data.resultlist[i]?.coinType;
            const status = res.data.data.resultlist[i]?.status;
            const txnTime = res.data.data.resultlist[i]?.txnTime;
            const lastFieroPrice = res.data.data.resultlist[i]?.lastFieroPrice;
            let obj = {
              TxnType: txnType,
              TxnId: txnId,
              TxnHash: txnHash,
              Fees: fees,
              GBPAmount: `£${amount}`,
              Amount: amount,
              CoinType: coinType,
              Status: status,
              TxnTime: txnTime,
              lastFieroPriceInUSD:
                res.data.data?.transactionType == "NEW"
                  ? res.data?.data?.lastFieroPrice
                  : res.data?.data?.lastFieroPrice
                  ? parseFloat(
                      1 / Number(res.data?.data?.lastFieroPrice)
                    ).toFixed(2)
                  : "-",
            };
            currencyId.push(obj);
          }

          setAllListData1(currencyId);
          setPagesCount(res.data.data.totalCount / 10);
          setLoading(false);
        }
        // setIsClear(false);
        setLoading(false);
      }
    } catch (error) {
      // setIsClear(false);
      setLoading(false);
      if (error.response) {
        // setIsClear(false);
      } else {
        // setIsClear(false);
      }
    }
  };
  const handlereset = () => {
    setCoin("WITHDRAW");
    setValue();
    setFromDate();
    setToDate();
    setCurrentValue("WITHDRAW");
    setIsClear(true);
  };
  useEffect(() => {
    if (page && userdata?.userId) {
      historyHandler([]);
    }
  }, [page, userdata?.userId]);
  useEffect(() => {
    if (userdata?.userId) {
      historyHandler();
      setPage(1);
    }
  }, [currentvalue, fromDate, toDate, coin, userdata?.userId, isClear, toggle]);
  useEffect(() => {
    if (currentvalue === "BUYTOKEN") {
      const filterFun = listTransactionData.filter((data, i) => {
        return data.status === "SUCCESS";
      });
      setListTransactionData(filterFun);
    }
  }, [currentvalue]);

  const downloadExcel = () => {
    if (allListData1.length === 0) {
      return toast.warn("No data found!");
    }
    const workSheet = XLSX.utils.json_to_sheet(allListData1);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "transactionhistory");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "transaction_history.xlsx");
  };
  const getCoinlistHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getcoinlist,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        // SetCoinList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCoinlistHandler();
  }, []);

  return (
    <Box className={classes.filtermainbox}>
      <Box className="subdata">
        <Typography variant="h1">Filters</Typography>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <label>From</label>
          <Box mt={1}>
            <FormControl fullWidth>
              <KeyboardDatePicker
                format="DD/MM/YYYY"
                id="date-picker-dialog"
                placeholder="DD/MM/YYYY"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                disableFuture
                name="dateOfBirth"
                value={fromDate}
                onChange={(date) => {
                  setFromDate(date);
                  setIsClear(false);
                }}
                className={classes.borderRadius}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <label>To</label>
          <Box mt={1}>
            <FormControl fullWidth>
              <KeyboardDatePicker
                format="DD/MM/YYYY"
                id="date-picker-dialog"
                placeholder="DD/MM/YYYY"
                // KeyboardButtonProps={{
                //   "aria-label": "change date",
                // }}
                disableFuture
                name="dateOfBirth"
                value={toDate}
                minDate={fromDate}
                onChange={(date) => {
                  setToDate(date);
                  setIsClear(false);
                }}
                className={classes.borderRadius}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Box mt={3}>
            {/* <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={downloadExcel}
            >
              Download XLSX
            </Button> */}
            <Button
          variant="contained"
          color="secondary"
          size="large"
          className="buttonbox"
          onClick={handlereset}
        >
          Reset All
        </Button>
          </Box>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {/*   <label>Type</label>
          <Box mt={1}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.forminput}
            >
              <Select
                name="Asset"
                onChange={(e) => setCurrentValue(e.target.value)}
                value={currentvalue}
              >
                <MenuItem value="CLAIM">Select</MenuItem>
                <MenuItem value="CLAIM">Claim</MenuItem>
                <MenuItem value="BUY">Buy</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
        </Grid>
      </Grid>
      <Box className={classes.flexgrid}>
        <Box className={classes.flexgrid}>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={`buttonbox ${currentvalue === "WITHDRAW" ? "active" : ""}`}
              onClick={() => {
                setCurrentValue("WITHDRAW");
                setIsClear(false);
              }}
            >
              Withdrawal
            </Button>{" "}
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              size="large"
              // className="buttonbox"
              className={`buttonbox ${currentvalue == "BUY" ? "active" : ""}`}
              onClick={() => {
                setCurrentValue("BUY");
                setIsClear(false);
              }}
            >
              Buy
            </Button>{" "}
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              size="large"
              // className="buttonbox"
              className={`buttonbox ${
                currentvalue == "REWARDED" ? "active" : ""
              }`}
              onClick={() => {
                setCurrentValue("REWARDED");
                setIsClear(false);
              }}
            >
              Reward
            </Button>
          </Box>

          {currentvalue !== "REWARDED" && (
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item style={!toggle ? { color: "green" } : {}}>
                  Completed
                </Grid>
                <Grid item>
                  <AntSwitch
                    checked={toggle}
                    onClick={() => {
                      settoggle(!toggle);
                      setIsClear(false);
                    }}
                    name="checkedC"
                  />
                </Grid>
                <Grid item style={!toggle ? {} : { color: "yellow" }}>
                  Pending
                </Grid>
              </Grid>
            </Typography>
          )}
        </Box>
        
        <Button
              style={{ width: "30%" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={downloadExcel}
            >
              Download XLSX
            </Button>
      </Box>

      <Box mt={6}>
        <TransactionTable
          listTransactionData={listTransactionData}
          data={data}
          isLoading={isLoading}
          pagesCount={pagesCount}
          setPage={setPage}
          page={page}
          currentvalue={currentvalue}
          pStatus={!toggle}
        />
      </Box>
    </Box>
  );
}

export default TransactionHistory;
