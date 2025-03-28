import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import ButtonCircularProgress from "./ButtonCircularProgress";
// import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
// import { AuthContext } from "src/context/Auth";
// import Web3 from "web3";
// import { default_RPC_URL } from "src/utils";

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
    "& .balancebox": {
      background: "rgba(255, 255, 255, 0.025)",
      backdropFilter: "blur(4px)",
      borderRadius: "10px",
      padding: "22px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      "& h5": {
        fontWeight: "300",
      },
    },
  },
}));

export default function ClaimModal({
  claimOpen,
  handleClose,
  listOrderHistory,
  claimId,
  claimableAmount,
  fromAddress,
}) {
  // console.log("claimableAmount=-=-=-=", claimableAmount);
  const classes = useStyles();

  // const auth = useContext(AuthContext);
  const [claimRequest, setClaimRequest] = useState("FULL");
  const [walletAddress, setWalletAddress] = useState("");
  // const [withdrawAmount, setwithdrawAmount] = useState("");
  // const [transactionFee, setTransactionFee] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const provider = new Web3.providers.HttpProvider(
  //   default_RPC_URL
  // );
  // const web3 = new Web3(provider);
  // const handleGasFee = async () => {
  // let withdrawAmount;
  // const amountInWei = web3.utils.toWei(claimableAmount?.toString(), "ether");
  // web3.eth.getGasPrice().then(async (gasPrice) => {
  //   const gasPriceWei = web3.utils.toWei(gasPrice, "gwei");
  //   // Estimate the total transaction cost (in wei)
  //   var gasLimit = await web3.eth.getGasPrice();
  //   const transactionCostWei = web3.utils
  //     .toBN(gasPriceWei)
  //     .mul(web3.utils.toBN(gasLimit));
  //   // Calculate the total amount to be sent, including the transaction cost
  //   const totalAmountWei = web3.utils
  //     .toBN(amountInWei)
  //     .sub(transactionCostWei);
  // console.log(
  //   web3.utils.fromWei(transactionCostWei?.toString(), "ether"),
  //   "totalAmountWei :==",
  //   web3.utils.fromWei(totalAmountWei?.toString(), "ether")
  // );
  // setTransactionFee(
  //   web3.utils.fromWei(transactionCostWei?.toString(), "ether")
  // );
  // setwithdrawAmount(
  //   web3.utils.fromWei(totalAmountWei?.toString(), "ether")
  // );
  // });
  // };
  // useEffect(() => {
  //   if (claimableAmount) handleGasFee();
  // }, [claimableAmount]);

  const claimHandler = async () => {
    setIsSubmit(true);
    try {
      if (
        claimRequest != "0" &&
        claimableAmount != "" &&
        claimableAmount != 0 &&
        walletAddress != ""
      ) {
        setIsLoading("claim");
        const res = await axios({
          method: "POST",
          url: ApiConfig.sendclaimrequest,
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          params: {
            claimRequest: claimRequest,
            amount: claimableAmount,
            toAddress: walletAddress,
            planId: claimId ? claimId : 0,
            planType: claimId ? "NEW" : "OLD",
          },
        });
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setIsLoading(false);
          handleClose();

          listOrderHistory();
        } else {
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
  return (
    <Dialog
      open={claimOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Box className={classes.modaltext}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton style={{ padding: "0px" }}>
              <ClearIcon onClick={handleClose} style={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box>
            <Box className="balancebox">
              <Typography variant="h5">Claimable Fiero Balance</Typography>
              <Typography
                variant="h5"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {claimableAmount ? claimableAmount : 0}
              </Typography>
            </Box>
            <Box className="">
              {isSubmit && claimRequest === "0" && (
                <FormHelperText error>
                  Please select claim Request
                </FormHelperText>
              )}
            </Box>
          </Box>
          <Box mb={2} mt={2}>
            <Typography variant="body1" style={{ marginBottom: "4px" }}>
              External Wallet Address
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter wallet address"
              fullWidth
              // type="number"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              error={isSubmit && walletAddress === ""}
              helperText={
                isSubmit &&
                walletAddress === "" &&
                "Please enter external wallet address"
              }
            />
          </Box>
          <Box mb={2} mt={2}>
            {" "}
            {/*  
                 <Typography variant="body1" style={{ marginBottom: "4px" }}>
              Amount
            </Typography>
              
            <TextField
              variant="outlined"
              placeholder="Enter Amount"
              fullWidth
              // type="number"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              error={isSubmit && walletAddress === ""}
              helperText={isSubmit && amount === "" && "Please enter amount"}
              // toAddress
            /> */}
          </Box>

          <Box className="buttonboxes">
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              fullWidth
              onClick={handleClose}
              disabled={isLoading === "claim"}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={claimHandler}
              // onClick={() => history.push("/vesting")}
            >
              Claim Now{isLoading === "claim" && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
