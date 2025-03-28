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
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/ApiConfig";
import ButtonCircularProgress from "./ButtonCircularProgress";
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
    "& .flexbox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "@media(max-width:533px)": {
        display: "block",
      },
    },
  },
}));

export default function SendCoinModal({
  openModal,
  handleCloseModal,
  sendData,
  data,
  coinDataDetail,
}) {
  const classes = useStyles();
  const [amountData, setAmountData] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const webUrl = window?.location?.href;
  const [isLoading, setIsLoading] = useState(false);

  const sendWithdarwHandler = async () => {
    setIsSubmit(true);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.withdraw,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        data: {
          amount: amountData,
          coinName: data?.coinData?.coinShortName,
          isExternal: true,
          isKycAccepted: false,
          isWithdraw: false,
          tag: "string",
          toAddress: walletAddress,
          url: `${webUrl}/approve`,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        handleCloseModal();
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Box className={classes.modaltext}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton style={{ padding: "0px" }}>
              <ClearIcon onClick={handleCloseModal} style={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box mb={2}>
            <Typography variant="h1" align="center">
              {data?.coinBalance?.instrument === "BTC" && "Send BTC"}
              {data?.coinBalance?.instrument === "ETH" && "Send ETH"}
              {data?.coinBalance?.instrument === "BNB" && "Send BNB"}
              {data?.coinBalance?.instrument === "USDT" && "Send USDT"}
              {data?.coinBalance?.instrument === "TRX" && "Send TRX"}
              {data?.coinBalance?.instrument === "MATIC" && "Send MATIC"}
              {data?.coinBalance?.instrument === "FIEREX" && "Send FIEREX"}
            </Typography>
          </Box>

          <Typography variant="h5">Coin Amount</Typography>
          <Box mt={1}>
            <TextField
              variant="outlined"
              placeholder="Enter coin amount"
              fullWidth
              type="number"
              value={amountData}
              onChange={(e) => setAmountData(e.target.value)}
              error={isSubmit && amountData === ""}
              helperText={
                isSubmit && amountData === "" && "Please enter coin amount"
              }
            />
          </Box>
          <Box mt={3}>
            <Typography variant="h5">Wallet Address</Typography>
            <Box mt={1}>
              <TextField
                variant="outlined"
                placeholder="Enter wallet address"
                fullWidth
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                error={isSubmit && walletAddress === ""}
                helperText={
                  isSubmit &&
                  walletAddress === "" &&
                  "Please enter wallet address"
                }
              />
            </Box>
          </Box>
          <Box mt={1} mb={1} className="flexbox">
            <Typography variant="h5">
              <span>Fee : </span>
              {coinDataDetail?.withdrawlFee}
            </Typography>
            <Typography variant="h5">
              <span>Minimum Available Balance : </span>
              {coinDataDetail?.withdrawalAmount}
            </Typography>
          </Box>
          <Box mt={1} mb={1} className="flexbox">
            <Typography variant="h5">
              <span>Send Amount :</span> 0
            </Typography>
            <Typography variant="h5">
              <span>Available Balance : </span>{" "}
              {data?.coinBalance?.availableBalance}
            </Typography>
          </Box>
          <Box className="buttonboxes">
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              fullWidth
              onClick={handleCloseModal}
              disable={isLoading}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isLoading}
              onClick={() => {
                setIsSubmit(true);
                if (amountData !== "" && walletAddress !== "") {
                  setIsSubmit(false);
                  sendWithdarwHandler();
                }
              }}
            >
              Send {isLoading && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
