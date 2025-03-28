import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import OrderHistoryTable from "./OrderHistoryTable";
import ClaimModal from "src/component/ClaimModal";
import PaymentHistoryTable from "./PaymentHistoryTable";
import { AuthContext } from "src/context/Auth";
import LoopIcon from "@material-ui/icons/Loop";
import DashboardNewCards from "src/component/DashboardNewCards";
import DataLoader from "src/component/DataLoader";
import TransferModal from "./TransferModal";
import { setCryptoDecimals } from "src/utils";
import CommonToolTip from "src/component/CommonToolTip";
import ThreeDotProgress from "src/component/ThreeDotProgress";
import WithdrawDisabledModal from "./WithdrawDisabledModal";

const useStyles = makeStyles((theme) => ({
  dashboardbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "50px 20px",
    "& .MuiButton-contained.Mui-disabled": {
      background: "rgb(101 96 96 / 88%) !important",
    },
    "& .balancebox": {
      background: "rgba(255, 255, 255, 0.025)",
      backdropFilter: "blur(4px)",
      borderRadius: "10px",
      padding: "22px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& h5": {
        fontWeight: "300",
      },
    },
    "& button": {
      padding: "8px 60px",
    },
    "& .flexmain": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "@media(max-width:501px)": {
        display: "block",
      },
    },
  },
  tableboxmain: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    marginTop: "24px",
    "& .dFlex": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));

function DashboardIndex() {
  const classes = useStyles();

  const [orderlistData, setOrdeListData] = useState([]);
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [page, setPage] = useState(1);
  const [LivesalePriceFrom, setLivesalePriceFrom] = useState(0);
  const [fieroUsdAmountActual, setFieroUsdAmountActual] = useState(0);
  const [priceWithoutMark, setpriceWithoutMark] = useState(false);
  const [page1, setPage1] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [pagesCount1, setPagesCount1] = useState(1);
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState();
  const [vestingPlan, setVestingPlan] = useState([]);
  const [vestingPlanLoading, setVestingPlanLoading] = useState(true);
  const [isParticipated, setIsParticipated] = useState(false);
  const [sendMoney, setSendMoney] = useState(false);

  const auth = useContext(AuthContext);
  const UserdataId = auth?.userData ? auth?.userData : "";
  const [isShowWed, setisShowWed] = useState(true);
  const [isWithdrawModal, setIsWithdrawModal] = useState(false);
  useEffect(() => {
    const options = { weekday: "long", timeZone: "Europe/London" };
    const ukDateTimeFormatter = new Intl.DateTimeFormat("en-GB", options);

    const today = new Date();
    const dayInUKTime = ukDateTimeFormatter.format(today);
    if (dayInUKTime == "Wednesday") {
      setisShowWed(true);
    } else {
      setisShowWed(false);
    }
  }, []);

  const getFieroUsdAmount = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getsalelist,
      });
      if (response.data.status === 200) {
        setLivesalePriceFrom(response.data.data);
        let getSaleEnabled = response.data.data.enabled_sale;
        setpriceWithoutMark(response.data.data.enabled_sale.priceWithoutMark);
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
          setFieroUsdAmountActual(fieroPrice);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setClaimOpen(false);
  };
  const listOrderHistory = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.orderhistorylist,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          page: page - 1,
          pageSize: 10,
          type: "BUY_TOKEN",
          fkUserId: UserdataId?.userId,
        },
      });

      if (res.data.status === 200) {
        setOrdeListData(res.data.data.resultlist);
        setPagesCount(res.data.data.totalCount / 10);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getpaymentlistHandler = async () => {
    setIsLoading1(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getpaymentlist,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          page: page1 - 1,
          pageSize: 10,
        },
      });

      if (res.data.status === 200) {
        setPaymentHistoryData(res.data.data.list);
        setPagesCount1(res.data.data.count / 10);
        setIsLoading1(false);
      } else {
        setIsLoading1(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading1(false);
    }
  };

  const getClaimAmountHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getclaimableAmount,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setClaimableAmount(Number(res.data?.data?.perDayClaim));

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  // =-=-=-=-= List Vesting Plans ==-=-=-=-=-=//

  const getvestingPlanHandler = async () => {
    setVestingPlanLoading(true);
    setVestingPlan([]);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.vestingPlans,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setVestingPlanLoading(false);
        setVestingPlan(res.data.data);
      } else {
        setVestingPlanLoading(false);
      }
      setVestingPlanLoading(false);
    } catch (err) {
      console.log(err);
      setVestingPlanLoading(false);
    }
  };

  useEffect(() => {
    getFieroUsdAmount();
  }, []);
  useEffect(() => {
    listOrderHistory();
  }, [page]);
  useEffect(() => {
    getpaymentlistHandler();
  }, [page1]);
  // consol.log(" -------getParticipatedPoolForMultiCall")
  useEffect(() => {
    if (auth.userLoggedIn) {
      getParticipatedPoolForMultiCall();
      auth.getProfileHandler();
    }
  }, [auth.userLoggedIn]);
  useEffect(() => {
    // auth.getLaserValue()
    getClaimAmountHandler();
    if (window.sessionStorage.getItem("token")) {
      getvestingPlanHandler();
    }
  }, [window.sessionStorage.getItem("token")]);
  // =-=-=-=-= Checking Participate User  =-=-=-=-=//
  const getParticipatedPoolForMultiCall = async () => {
    auth.getLaserValue();
  };
  const getParticipatedPoolHandler = async () => {
    setVestingPlanLoading(true);
    setVestingPlan([]);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getParticipatedPool,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });

      if (res.data.status === 200) {
        const filteredUsers = res.data.data;
        setVestingPlan(filteredUsers);
        setVestingPlanLoading(false);
      } else {
        setVestingPlanLoading(false);
      }
    } catch (error) {
      setVestingPlanLoading(false);
    }
  };

  return (
    <Box>
      <Box className={classes.dashboardbox}>
        <Box className="flexmain">
          <Typography variant="h1">dashboard</Typography>
          <Box className="" pt={2}>
            <Typography
              variant="h5"
              style={{ paddingTop: "10px", textAlign: "center" }}
            >
              <span>
                {" "}
                {/* Chainsphere Price = ${" "}
                {priceWithoutMark ? parseFloat(priceWithoutMark) : "0"} */}
                Chainsphere Price = $0.05
              </span>
            </Typography>
          </Box>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item lg={7} md={7} sm={7} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="balancebox">
                    <Typography variant="h5">
                      Available Chainsphere Balance
                    </Typography>
                    <Box className="displayFlexSpace">
                      {auth.loadingbalance && <ThreeDotProgress />}
                      {!auth.loadingbalance && (
                        <>
                          <Typography
                            variant="h5"
                            style={{ color: "rgba(255, 255, 255, 0.6)" }}
                          >
                            {auth.allocatedAmount &&
                              setCryptoDecimals(auth.allocatedAmount)}
                            &nbsp;
                            {priceWithoutMark && auth.allocatedAmount > 0 && (
                              <span style={{ fontSize: "12px" }}>
                                ${" "}
                                {priceWithoutMark && auth.allocatedAmount
                                  ? parseFloat(
                                      auth.allocatedAmount * priceWithoutMark
                                    ).toFixed(2)
                                  : ""}{" "}
                              </span>
                            )}
                          </Typography>

                          {UserdataId &&
                          UserdataId.kyc &&
                          UserdataId.kyc.kycStatus &&
                          UserdataId.kyc.kycStatus === "ACCEPTED" ? (
                            <>
                              {/* {isShowWed && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => setSendMoney(true)}
                                  disabled={
                                    auth.allocatedAmount < 0.01 ||
                                    UserdataId.twoFaType != "GOOGLE" ||
                                    isDisabled
                                  }
                                  style={{
                                    padding: "5px 8px",
                                    marginLeft: "3px",
                                  }}
                                >
                                  Transfer
                                </Button>
                              )} */}
                            </>
                          ) : (
                            <Typography
                              color="primary"
                              style={{ padding: "5px 8px", marginLeft: "3px" }}
                            >
                              {UserdataId &&
                              UserdataId.kyc &&
                              UserdataId.kyc.kycStatus &&
                              UserdataId.kyc.kycStatus === "PENDING"
                                ? "KYC is not approved"
                                : UserdataId?.kyc?.kycStatus === "REJECTED"
                                ? "KYC is rejected"
                                : "KYC is not applied"}
                            </Typography>
                          )}
                          {/* {UserdataId &&
                          UserdataId.kyc &&
                          UserdataId.kyc.kycStatus &&
                          UserdataId.kyc.kycStatus === "ACCEPTED" ? (
                            <>
                              {
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => setIsWithdrawModal(true)}
                                  style={{
                                    padding: "5px 8px",
                                    marginLeft: "3px",
                                  }}
                                >
                                  Transfer
                                </Button>
                              }
                            </>
                          ) : (
                            <Typography
                              color="primary"
                              style={{ padding: "5px 8px", marginLeft: "3px" }}
                            >
                              {UserdataId &&
                              UserdataId.kyc &&
                              UserdataId.kyc.kycStatus &&
                              UserdataId.kyc.kycStatus === "PENDING"
                                ? "KYC is not approved"
                                : UserdataId?.kyc?.kycStatus === "REJECTED"
                                ? "KYC is rejected"
                                : "KYC is not applied"}
                            </Typography>
                          )} */}
                        </>
                      )}
                      <CommonToolTip
                        title={
                          <div>
                            <p>
                              The total available balance is released on a daily
                              basis. You can claim this balance to your external
                              wallet by clicking on the 'Transfer' option.
                            </p>
                            <p>
                              Withdrawals are currently restricted. We will
                              notify you as soon as they are enabled. Thank you
                              for your patience.
                            </p>
                            <p>
                              Enabled 2FA for security reasons before
                              transferring.
                            </p>
                          </div>
                        }
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="balancebox">
                    <Typography variant="h5">Locked Chainsphere Balance</Typography>
                    <Box display="flex" alignItems="center">
                      {auth.loadingbalance && <ThreeDotProgress />}
                      {!auth.loadingbalance && (
                        <Typography
                          variant="h5"
                          style={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          {auth.lockedAmount
                            ? setCryptoDecimals(auth.lockedAmount)
                            : ""}
                          &nbsp;
                          {priceWithoutMark && auth.lockedAmount && (
                            <span style={{ fontSize: "12px" }}>
                              ${" "}
                              {priceWithoutMark && auth.lockedAmount
                                ? parseFloat(
                                    auth.lockedAmount * priceWithoutMark
                                  ).toFixed(2)
                                : ""}{" "}
                            </span>
                          )}
                        </Typography>
                      )}
                      &nbsp;
                      <CommonToolTip title="The total locked balance will become available for claiming once the lock period is over." />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="balancebox">
                    <Typography variant="h5">
                      Total Claimed Chainsphere Balance
                    </Typography>
                    <Box display="flex" alignItems="center">
                      {auth.loadingbalance && <ThreeDotProgress />}
                      {!auth.loadingbalance && (
                        <Typography
                          variant="h5"
                          style={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          {auth.totalClaimedAmount
                            ? setCryptoDecimals(auth.totalClaimedAmount)
                            : "0"}
                        </Typography>
                      )}
                      &nbsp;
                      <CommonToolTip title="The total balance claimed up to today is as follows." />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {sendMoney && (
              <TransferModal
                open={sendMoney}
                setOpen={(item) => setSendMoney(item)}
                setIsDisabled={(item) => setIsDisabled(item)}
                availableFiero={auth.allocatedAmount}
                callBack={getParticipatedPoolForMultiCall}
              />
            )}
            {isWithdrawModal && (
              <WithdrawDisabledModal
                open={isWithdrawModal}
                setOpen={(item) => setIsWithdrawModal(item)}
                setIsDisabled={(item) => setIsDisabled(item)}
                callBack={getParticipatedPoolForMultiCall}
              />
            )}
          </Grid>
        </Box>
      </Box>
      {/* <Box display="flex" justifyContent="end" mt={1} mb={1}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              onChange={(e) => {
                if (e.target.checked) {
                  setIsParticipated(true);
                  getParticipatedPoolHandler();
                } else {
                  setIsParticipated(false);
                  getvestingPlanHandler();
                }
              }}
              name="gilad"
            />
          }
          label="Participated Pool"
        />
      </Box>
      <Box my={2}>
        {vestingPlanLoading ? (
          <DataLoader />
        ) : (
          <DashboardNewCards
            isParticipated={isParticipated}
            vestingPlan={vestingPlan}
            fieroUsdAmountActual={fieroUsdAmountActual}
            listOrderHistory={listOrderHistory}
            UserdataId={UserdataId}
            coinDataDetail={LivesalePriceFrom}
          />
        )}
      </Box> */}

      <Box className={classes.tableboxmain}>
        <Box className="dFlex">
          <Typography variant="h1">Order History</Typography>
          <IconButton
            onClick={() => {
              listOrderHistory();
            }}
          >
            <LoopIcon
              className={isLoading ? "rotating-icon" : ""}
              style={{ color: "#fff" }}
            />
          </IconButton>
        </Box>
        <Box mt={3}>
          <OrderHistoryTable
            orderlistData={orderlistData}
            isLoading={isLoading}
            pagesCount={pagesCount}
            setPage={setPage}
            page={page}
          />
        </Box>
      </Box>
      <Box className={classes.tableboxmain}>
        {/* <Typography variant="h1">Payment History</Typography> */}
        <Box className="dFlex">
          <Typography variant="h1">Payment History</Typography>
          <IconButton
            onClick={() => {
              getpaymentlistHandler();
            }}
          >
            <LoopIcon
              className={isLoading1 ? "rotating-icon" : ""}
              style={{ color: "#fff" }}
            />
          </IconButton>
        </Box>
        <Box mt={3}>
          <PaymentHistoryTable
            paymentHistoryData={paymentHistoryData}
            isLoading1={isLoading1}
            pagesCount1={pagesCount1}
            setPage1={setPage1}
            page1={page1}
          />
        </Box>
      </Box>
      <ClaimModal
        handleClose={handleClose}
        claimOpen={claimOpen}
        claimableAmount={claimableAmount}
        listOrderHistory={listOrderHistory}
      />
    </Box>
  );
}

export default DashboardIndex;
