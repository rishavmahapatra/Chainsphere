import React, { useEffect, useState } from "react";
import { makeStyles, Grid, Box, Typography, Button } from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import CommonAccordian from "./CommonAccordian";
import { default_RPC_URL } from "src/constants";
import OldVestingABI from "src/config/OldVestingABI.json";
import { getWeb3ContractObject } from "src/utils";
import NodatafoundImage from "./NoDataFound";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "1px",
    width: "100%",
    position: "relative",
    background:
      "linear-gradient(92.79deg, #FFB000 -32.2%, #FF564D 5.51%, #FF0098 54.01%, #5D00C1 110.93%)",
    borderRadius: "10px",
  },
  upperBox: {
    background: " #0C0C0C",
    borderRadius: "10px",
    padding: "15px",
    "& img": {
      width: "100%",
    },
    "& .displayFlexSpace": {
      borderBottom: "1px dotted #3b3a3a",
      paddingBottom: "9px",
      height: "18px",
      "& p": {
        fontSize: "12px",
      },
      "& h5": {
        fontSize: "14px",
      },
      "& img": {
        height: "17px",
      },
    },
    "& .fontVariant": {
      display: "flex",
      "& p": {
        fontSize: "12px",
      },
      "& h5": {
        fontSize: "12px",
      },
    },
    "& .fontVariant1": {
      display: "flex",
      "& p": {
        fontSize: "12px",
      },
      "& h5": {
        fontSize: "16px",
      },
    },
  },
  MnSubCrd: {
    marginTop: "11px",
    display: "flex",
    gap: "14px",
  },
  subCard: {
    padding: "10px 0px",
    textAlign: "center",
    background: "#131313",
    width: "100%",
    "& p": {
      fontSize: "10px",
    },
    "& h5": {
      fontSize: "12px",
      marginTop: "5px",
    },
  },
}));

export default function DashboardNewCards({
  isParticipated,
  vestingPlan,
  fieroUsdAmountActual,
  listOrderHistory,
  UserdataId,
  coinDataDetail,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [claimData, setClaimData] = useState({});
  // const [whiteList, setWhiteList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDefault, setShowDefault] = useState(false);
  const staticCard = [
    {
      planName:
        coinDataDetail &&
        coinDataDetail.enabled_sale &&
        coinDataDetail.enabled_sale.planName &&
        coinDataDetail.enabled_sale.planName,
      tokenPrice: fieroUsdAmountActual,
      terms: 730,
      minGbpAmount: 200,
    },
  ];

  // =-=-=-=-= Get Claimable Amount =-=-=-=-=//
  const getclaimableAmountHandler = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getclaimableAmount,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          planId: id,
        },
      });
      if (res.data.status === 200) {
        setClaimData(res.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetched = async () => {
      let WalletAddress;
      if (isParticipated) {
        try {
          const resGetAddress = await axios({
            method: "GET",
            url: ApiConfig.getAddress,
            headers: {
              authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
            params: {
              coinName: "FIERO",
            },
          });
          if (resGetAddress.data.status === 200) {
            WalletAddress = resGetAddress.data.data.walletAddress;
            // setwalletAddress(resGetAddress.data.data.walletAddress);
          }
          const oldconstantObj = await getWeb3ContractObject(
            OldVestingABI,
            "0xB02C238dBcA61c3e91BfcF37cA1097a42560d485",
            default_RPC_URL
          );
          const getUserTotalVesting1 = await oldconstantObj.methods
            .getUserTotalVesting(WalletAddress)
            .call();

          if (Number(getUserTotalVesting1) > 0) {
            setShowDefault(true);
          }
        } catch (error) {}
      } else {
        setShowDefault(true);
      }
    };
    fetched();
  }, [isParticipated]);
  return (
    <Grid container spacing={2}>
      {showDefault &&
        staticCard.map((item, i) => {
          return (
            <>
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <CommonnCard
                  isParticipated={isParticipated}
                  item={item}
                  classes={classes}
                  history={history}
                  UserdataId={UserdataId}
                  claimData={claimData}
                  listOrderHistory={listOrderHistory}
                  isLoading={isLoading}
                  coinDataDetail={
                    coinDataDetail &&
                    coinDataDetail.enabled_sale &&
                    coinDataDetail.enabled_sale
                  }
                  getclaimableAmountHandler={getclaimableAmountHandler}
                  i={i}
                  text="On Going"
                />
              </Grid>
            </>
          );
        })}
      {!isParticipated ? (
        <>
          {vestingPlan &&
            vestingPlan.map((item, i) => {
              return (
                <>
                  {!item?.blackList && (
                    <>
                      {(UserdataId?.newUser && item?.newPlan_NewUser) ||
                      (!UserdataId?.newUser && item?.whitelisted) ||
                      (UserdataId?.newUser && item?.whitelisted) ? (
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                          <CommonnCard
                            isParticipated={isParticipated}
                            item={item}
                            classes={classes}
                            history={history}
                            claimData={claimData}
                            UserdataId={UserdataId}
                            listOrderHistory={listOrderHistory}
                            getclaimableAmountHandler={
                              getclaimableAmountHandler
                            }
                            i={i}
                            isLoading={isLoading}
                          />
                        </Grid>
                      ) : (
                        <>
                          {!UserdataId?.newUser && item?.newPlan_OldUser && (
                            <Grid item lg={3} md={3} sm={6} xs={12}>
                              <CommonnCard
                                isParticipated={isParticipated}
                                item={item}
                                classes={classes}
                                history={history}
                                claimData={claimData}
                                UserdataId={UserdataId}
                                listOrderHistory={listOrderHistory}
                                getclaimableAmountHandler={
                                  getclaimableAmountHandler
                                }
                                i={i}
                                isLoading={isLoading}
                              />
                            </Grid>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              );
            })}
        </>
      ) : (
        <>
          {" "}
          {vestingPlan &&
            vestingPlan.map((item, i) => {
              return (
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CommonnCard
                    isParticipated={isParticipated}
                    item={item}
                    classes={classes}
                    history={history}
                    claimData={claimData}
                    UserdataId={UserdataId}
                    listOrderHistory={listOrderHistory}
                    getclaimableAmountHandler={getclaimableAmountHandler}
                    i={i}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })}
        </>
      )}
      {vestingPlan.length == 0 && !showDefault && (
        <NodatafoundImage data="No participated pool found" />
      )}
    </Grid>
  );
}
const CommonnCard = ({
  classes,
  isParticipated,
  item,
  history,
  claimData,
  getclaimableAmountHandler,
  listOrderHistory,
  UserdataId,
  text,
  isLoading,
  coinDataDetail,
}) => {
  return (
    <>
      <Box className={classes.mainBox} key={1}>
        <Box className={classes.upperBox} position="relative">
          {text && (
            <Box
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                background: "#FF00CD",
                padding: "5px",
                borderRadius: "9px",
              }}
            >
              <Typography variant="body1">{text && text}</Typography>
            </Box>
          )}
          <img
            style={{ height: "100px", objectFit: "cover" }}
            src={item?.image ? item?.image : "images/rocketImg.png"}
            alt=""
          />
          <Box className="fontVariant" mt={1.3}>
            <Typography variant="h5">
              {item && item.planName && item.planName}
            </Typography>
          </Box>
          <Box className="fontVariant1" mt={1.3}>
            <Typography variant="body1">Price:</Typography>
            &nbsp;&nbsp;
            <Typography variant="h5">
              {item && item.tokenPrice && `$${item.tokenPrice}`}
            </Typography>
          </Box>
          <Box className={classes.MnSubCrd}>
            <Box className={classes.subCard}>
              <Typography variant="body1">Start Date</Typography>
              <Typography variant="h5">
                {item && item.startDate
                  ? moment(item.startDate).format("MMM Do YY")
                  : coinDataDetail &&
                    moment(coinDataDetail.saleDate).format("MMM Do YY")}
              </Typography>
            </Box>
            <Box className={classes.subCard}>
              <Typography variant="body1">End Date</Typography>
              <Typography variant="h5">
                {item && item.endDate
                  ? moment(item.endDate).format("MMM Do YY")
                  : coinDataDetail &&
                    moment(coinDataDetail.saleUptodate).format("MMM Do YY")}
              </Typography>
            </Box>
          </Box>
          {item?.sellLimit ? (
            <Box className="displayFlexSpace" mt={2}>
              <Typography variant="body1">Token Available :</Typography>
              <Box display="flex">
                <Typography variant="h5">
                  {item && item.sellLimit
                    ? Number(item.sellLimit).toFixed(2)
                    : "N/A"}
                </Typography>
                &nbsp;
                <img src="images/tokenImage.png" alt="" />
              </Box>
            </Box>
          ) : (
            <Box className="displayFlexSpace" mt={2}>
              <Typography variant="body1"></Typography>
              <Box display="flex">
                <Typography variant="h5"></Typography>
              </Box>
            </Box>
          )}

          {!isParticipated ? (
            <Box className="displayFlexCenter" pt={1.7}>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  history.push({
                    pathname: "/buy-fiero",
                    state: item,
                  })
                }
                disabled // comment this
              >
                Buy Now
              </Button> */}
            </Box>
          ) : (
            <CommonAccordian
              item={item}
              claimData={claimData}
              listOrderHistory={listOrderHistory}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
