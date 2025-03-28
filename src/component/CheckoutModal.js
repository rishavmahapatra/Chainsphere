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

export default function CheckoutModal({ openCheckout, handleCloseCheckout }) {
  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      open={openCheckout}
      onClose={handleCloseCheckout}
    >
      <DialogContent>
        <Box className={classes.modaltext}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              style={{ padding: "0px" }}
              onClick={handleCloseCheckout}
            >
              <ClearIcon style={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box mb={2}>
            <Typography variant="h1" align="center"></Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="h5">Wallet Address</Typography>
          </Box>

          <Box className="buttonboxes">
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              fullWidth={handleCloseCheckout}
            >
              Close
            </Button>
            <Button variant="contained" color="primary" size="large" fullWidth>
              Send
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
