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
  Typography
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Close } from "@material-ui/icons";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";


export default function WithdrawDisabledModal({
  open,
  setOpen
}) {
  const auth = useContext(AuthContext);
  // console.log("availableFiero=-=-=-=", availableFiero);
  const [isValid, setIsValid] = useState(true);
  const [isSubmit, setisSubmit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [walletAddress, setWalletAddress] = useState("");
  const [code, setCode] = useState("");


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
      <DialogTitle  style={{display:"flex", justifyContent :"center"}}>Withdrawals Temporarily Unavailable.</DialogTitle>
      <DialogContent container style={{padding:"0px 24px"}}> 
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
         
           <Typography variant="body1">
           Due to ongoing maintenance, the withdrawal feature has been temporarily disabled. We are working to restore full functionality as soon as possible. Please stay tuned for further updates.
           </Typography>
           
          </Box>
      

        </Box>
      </DialogContent>
      <DialogActions style={{justifyContent :"center"}}>
        <Button 
          style={{ margin: "10px 0", alignItems:"center" }}
          variant="contained"
          color="primary"
          
          
          onClick={() =>  setOpen(false)}
        >
          Close 
        </Button>
      </DialogActions>
    </Dialog>
  );
}
