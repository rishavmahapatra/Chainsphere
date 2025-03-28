import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { setCryptoDecimals, sortAddress } from "src/utils";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  maincardbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "11.2757px",

    // backdropFilter: "blur(3.0845px)",
    "& h6": {
      fontWeight: "500",
      marginLeft: "6px",
    },
    "& h5": {
      fontWeight: "500",
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
    },
    "& .uppercontent": {
      padding: "15px",
    },
    "& .buttoncontent": {
      padding: "15px",
      [theme.breakpoints.down("sm")]: {
        padding: "8px",
      },
    },
    "& .buttonbox": {
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "40.2703px",
      padding: "4px",
      cursor: "pointer",
      zIndex: "999",
      position: "relative",
      "& img": {
        width: "100%",
        maxWidth: "42px",
        [theme.breakpoints.down("sm")]: {
          maxWidth: "32px",
        },
      },
      "& p": {
        paddingLeft: "16px",
        [theme.breakpoints.down("sm")]: {
          paddingLeft: "8px",
        },
      },
    },
    "& .borderbox": {
      position: "relative",
      "&::after": {
        content: "''",
        height: "48px",
        width: "37px",
        position: "absolute",
        right: "-14px",
        top: "2px",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        [theme.breakpoints.down("sm")]: {
          height: "32px",
          top: "5px",
        },
      },
    },
  },
}));

function WalletCard(props) {
  const classes = useStyles();
  const { data, availableFiero } = props;
  const { allocatedAmount, getLaserValue, userData } = useContext(AuthContext);

  const [coinAddress, setCoinAddress] = useState("");

  const getAllCoinWalletAddress = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAddress,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          coinName: data?.coinData?.coinShortName,
        },
      });
      if (res.data.status === 200) {
        setCoinAddress(res.data.data.walletAddress);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLaserValue();
    if (data?.coinData?.coinShortName) {
      // getAllCoinDetail();
      getAllCoinWalletAddress();
    }
  }, [data?.coinData?.coinShortName]);

  return (
    <>
      <Box className={classes.maincardbox}>
        <Box className="uppercontent">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" mb={1}>
              <img
              // {data?.coinData?.coinImage}
                src="images/logo.svg"
                alt=""
                width="100%"
                style={{ width: "100%", maxWidth: "30px" }}
              />
              <Typography variant="h6">
                {/* {data?.coinData?.coinFullName}({data?.coinData?.coinShortName}) */}
                Chainsphere
              </Typography>
            </Box>
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="h5">Total Balance:</Typography>
            <Typography variant="body2">
              {allocatedAmount &&
                setCryptoDecimals(
                  Number(availableFiero) + Number(allocatedAmount)
                )}
            </Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="h5">Address:</Typography>
            <Typography variant="body2">
              {" "}
              {sortAddress(coinAddress)}
              {coinAddress && (
                <CopyToClipboard text={coinAddress}>
                  <BiCopy
                    style={{
                      color: "#ff564d",
                      fontSize: " 17px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                    onClick={() => toast.success("Copied successfully")}
                  />
                </CopyToClipboard>
              )}
            </Typography>
          </Box>
          {userData?.withdrawAddress && (
            <Box mt={2} display="flex" justifyContent="space-between">
              <Typography variant="h5">Withdraw Address:</Typography>
              <Typography variant="body2">
                {" "}
                {sortAddress(userData?.withdrawAddress)}
                {userData?.withdrawAddress && (
                  <CopyToClipboard text={userData?.withdrawAddress}>
                    <BiCopy
                      style={{
                        color: "#ff564d",
                        fontSize: " 17px",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                      onClick={() => toast.success("Copied successfully")}
                    />
                  </CopyToClipboard>
                )}
              </Typography>
            </Box>
          )}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="body2"></Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WalletCard;
