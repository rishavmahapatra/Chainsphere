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
  dashboardbox: {
    // background: "rgba(255, 255, 255, 0.025)",
    // borderRadius: "15px",
    // padding: "20px",
    "& .imagebox": {
      margin: "40px 0px",
      "& img": {
        width: "100%",
        maxWidth: "149px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    "& p": {
      color: "rgba(255, 255, 255, 0.6)",
      width: "100%",
      maxWidth: "908px",
      marginBottom: "13px",
    },
    "& h1": {
      "@media(max-width:472px)": {
        fontSize: "18px !important",
        lineHeight: "31px",
      },
    },
  },
}));

export default function KycInfromation({
handleClose,
openApplicationModal
}) {
  const classes = useStyles();


  return (
    <Dialog
      open={openApplicationModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Box className={classes.modaltext}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton style={{ padding: "0px" }}>
              <ClearIcon onClick={handleClose} style={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box className={classes.dashboardbox}>
            <Typography variant="h1">Application is in progress</Typography>
            <Box mt={3} className="imagebox">
              <img src="images/vectorkyc.png" alt="" width="100%" />
            </Box>
            <Typography variant="body2">
              Your application is successfully submitted and in progress. You
              will receive a notification in your email regarding the status of
              your application within 72 hours.
            </Typography>
            <Typography variant="body2">
              You cannot change the application content. In case of rejection,
              you need to re-submit your application.
            </Typography>
          </Box>
          <Box py={3}>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "8px 36px" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
