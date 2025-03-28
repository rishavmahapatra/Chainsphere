import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  IconButton,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import DataLoader from "./DataLoader";
import NodatafoundImage from "./NoDataFound";
const useStyles = makeStyles((theme) => ({
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
    "& img": {
      width: "100%",
      maxWidth: "206px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

export default function ReceiveCoinModal({
  openReceive,
  handleCloseReceive,
  receiveData,
  data,
}) {
  const classes = useStyles();
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getAddressHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAddress,
        params: {
          coinName: data?.coinBalance?.instrument,
        },
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });

      if (res.data.status === 200) {
        setAddress(res.data.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAddressHandler();
    setAddress([]);
  }, []);

  return (
    <Dialog
      open={openReceive}
      onClose={handleCloseReceive}
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
                onClick={handleCloseReceive}
                style={{ color: "#fff" }}
              />
            </IconButton>
          </Box>
          <Box mb={2}>
            <Typography variant="h1" align="center">
              {data?.coinBalance?.instrument === "BTC" && "Receive BTC"}
              {data?.coinBalance?.instrument === "ETH" && "Receive ETH"}
              {data?.coinBalance?.instrument === "BNB" && "Receive BNB"}
              {data?.coinBalance?.instrument === "USDT" && "Receive USDT"}
              {data?.coinBalance?.instrument === "TRX" && "Receive TRX"}
              {data?.coinBalance?.instrument === "MATIC" && "Receive MATIC"}
              {data?.coinBalance?.instrument === "FIEREX" && "Receive FIEREX"}
            </Typography>
          </Box>
          <Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "-10px",
                    marginBottom: "20px",
                  }}
                >
                  <DataLoader />
                </Box>
              ) : (
                <Box
                  textAlign="center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "244px",
                    border: "1px solid #797979",
                  }}
                >
                  {!isLoading && address && address.length === 0 ? (
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <NodatafoundImage data={"No data found"} />
                    </Box>
                  ) : (
                    <>
                      <img
                        src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${address?.walletAddress}&choe=UTF-8`}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="h5">Wallet Address</Typography>
            <Box mt={1} display="flex" alignItems="center">
              <Typography
                variant="body1"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {address?.walletAddress
                  ? address?.walletAddress
                  : "No wallet address found"}
              </Typography>

              <CopyToClipboard text={address?.walletAddress}>
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
            </Box>
          </Box>

          <Box className="buttonboxes">
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              fullWidth
              onClick={handleCloseReceive}
            >
              Close
            </Button>
            {/* <Button variant="contained" color="primary" size="large" fullWidth>
              Send
            </Button> */}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
