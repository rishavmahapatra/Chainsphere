import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import WalletCard from "src/component/WalletCard";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
// import { AuthContext } from "src/context/Auth";
// import ClaimModal from "src/component/ClaimModal";
const useStyles = makeStyles((theme) => ({
  dashboardbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
  },
}));

function MyWallet() {
  const classes = useStyles();
  // const [lockedFiero, setLockedFiero] = useState(0);
  const [userWalletData, setUserWalletData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableFiero, setAvailableFiero] = useState(0);

  const getWalletHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.myWallet,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });

      if (res.data.status === 200) {
        let arr = [];
        for (let i = 0; i < res.data.data.coinList.length; i++) {
          // console.log(" data --------- ", res.data.data.userBalance);
          const obj = {
            coinData: res.data.data.coinList[i],
            coinBalance: res.data.data.userBalance[0],
          };
          arr.push(obj);
        }

        const filterdata = arr.filter((data) => {
          return data.coinData?.coinShortName === "FIERO";
        });
        setUserWalletData(filterdata);

        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const getBalanceHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getBalance,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });

      if (res.data.status === 200) {
        setAvailableFiero(res.data?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // getClaimAmountHandler();
    getWalletHandler();
    getBalanceHandler();
  }, []);

  return (
    <Box className={classes.dashboardbox}>
      <Typography variant="h1">Total wallet asset value</Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          {userWalletData &&
            userWalletData.map((data, i) => {
              return (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  
                  {/* <WalletCard
                    data={data}
                    index={i}
                    availableFiero={availableFiero}
                  /> */}
                </Grid>
              );
            })}
          {/* <Grid item lg={4} md={4} sm={6} xs={12}>
            <WalletCard data={"data"} lockedFiero={lockedFiero} index={0} />
          </Grid> */}
        </Grid>
        {/* <Box mt={2}>
          {!isLoading && userWalletData && userWalletData.length === 0 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <NodatafoundImage />
            </Box>
          )}
          {isLoading && <DataLoader />}
        </Box> */}
        <div className="bg-gradient-to-r items-center text-black flex p-4 justify-between text-xl from-[#FFC000] to-[#FF9500] w-80 rounded-lg my-10">
          
           <Typography variant="h6">Total CSP Balance:</Typography>
           <Typography variant="h6">2000000</Typography>
        </div>
      </Box>
    </Box>
  );
}

export default MyWallet;
