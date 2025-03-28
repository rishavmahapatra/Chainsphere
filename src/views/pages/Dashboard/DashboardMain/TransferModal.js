import ApiConfig from "src/config/ApiConfig";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Close } from "@material-ui/icons";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";

export default function TransferModal({
  open,
  setOpen,
  availableFiero,
  callBack,
  setIsDisabled,
}) {
  const auth = useContext(AuthContext);
  // console.log("availableFiero=-=-=-=", availableFiero);
  const [isValid, setIsValid] = useState(true);
  const [isSubmit, setisSubmit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [walletAddress, setWalletAddress] = useState("");
  const [code, setCode] = useState("");
  // const handleInputChange = (event) => {
  //   const address = event.target.value;
  //   setWalletAddress(address);
  //   const walletaddressregex = /^(0x)?[0-9a-fA-F]{40}$/;
  //   setIsValid(walletaddressregex.test(address));
  // };
  // -==-=-=-=-= Transfer Amount in wallet =-=-=-=-=-//

  const transferAmountInWallet = async () => {
    try {
      setisSubmit(true);
      // if (
      //   walletAddress.toLocaleLowerCase() ==
      //   auth.walletAddress.toLocaleLowerCase()
      // ) {
      //   return;
      // }
      setisSubmit(false);
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.withdrawClaimablAmount,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },

        params: {
          address: auth?.userData?.withdrawAddress,
          amount: availableFiero,
          code: code,
        },
      });
      if (res.data.status === 200) {
        setTimeout(() => {
          setIsLoading(false);
          callBack();
          setTimeout(() => {
            callBack();
            setIsDisabled(true);
          }, 180000);
          // callBack();
          // setWalletAddress("");
          setOpen(false);
          toast.success(res.data.message);
        }, 60000);
      } else {
        setIsLoading(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => {
        if (!isLoading) {
          setOpen(false);
        }
      }}
    >
      <DialogTitle>Transfer funds to an external wallet address.</DialogTitle>
      <DialogContent container>
        <Box style={{ position: "absolute", top: "10px", right: "10px" }}>
          <IconButton disabled={isLoading} onClick={() => setOpen(false)}>
            <Close style={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Box
          // mt={3}
          className="balancebox"
          style={{
            // padding: "10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box pt={1}>
            <label style={{ display: "flex", alignItems: "flex-start" }}>
              Wallet Address
            </label>
            <TextField
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={auth?.userData?.withdrawAddress}
              // value={walletAddress}
              // disabled={isLoading}
              // placeholder="Please provide your withdrawal wallet address."
              // onChange={(e) => handleInputChange(e)}
            />
            {/* <FormHelperText error>
              {!isValid && walletAddress !== "" && "Invalid address"}
              {isSubmit &&
                walletAddress.toLocaleLowerCase() ==
                  auth.walletAddress.toLocaleLowerCase() &&
                "The withdrawal wallet address and internal wallet address must not be the same."}
            </FormHelperText> */}
          </Box>
          <Box pt={1}>
            <label style={{ display: "flex", alignItems: "flex-start" }}>
              2FA OTP
            </label>
            <TextField
              fullWidth
              variant="outlined"
              value={code}
              disabled={isLoading}
              type="number"
              placeholder="Enter your 2FA OTP"
              onChange={(e) => setCode(e.target.value)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
              onKeyPress={(event) => {
                if (event?.key === "-" || event?.key === "+") {
                  event.preventDefault();
                }
              }}
              inputProps={{
                autoComplete: "off",
                maxLength: 6,
              }}
            />
            <FormHelperText error>
              {/* {code !== "" && "Invalid address"} */}
            </FormHelperText>
          </Box>
          {/* <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="primary"
            disabled={
              !isValid || walletAddress === "" || code === "" || isLoading
            }
            onClick={() => transferAmountInWallet()}
          >
            Send {isLoading && <ButtonCircularProgress />}
          </Button> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          color="primary"
          disabled={code === "" || isLoading}
          onClick={() => transferAmountInWallet()}
        >
          Send {isLoading && <ButtonCircularProgress />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
