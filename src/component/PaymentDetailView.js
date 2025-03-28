import React, { useState, useEffect } from "react";
import { Typography, Box, Dialog, IconButton } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import { sortAddress } from "src/utils";

const useStyles = makeStyles((theme) => ({
  modaltext: {
    paddingBottom: "10px",
    "& a": { color: "#a0a0a0" },
    "& h5": {
      fontWeight: "300",
      "& span": {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
    "& h1": {
      fontSize: "30px",
      marginBottom: "30px",
    },
    "& h6": {
      fontWeight: "400",
    },
  },
}));

export default function PaymentDetailView({ handleClose, open, viewData1 }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
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
          <Box mb={2}>
            <Typography variant="h1" align="center">
              Payment History Detail
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Update Date</Typography>
            <Typography variant="body1">
              {viewData1?.updateDate
                ? moment(viewData1?.updateDate).format("lll")
                : "-"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">To Allocate Amount</Typography>
            <Typography variant="body1">
              <img src="images/firex.png" alt="" style={{ width: "15px" }} />{" "}
              {viewData1?.toAllocateAmount ? viewData1?.toAllocateAmount : "0"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Create Date</Typography>
            <Typography variant="body1">
              {viewData1?.createDate
                ? moment(viewData1?.createDate).format("lll")
                : "-"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">GBP Amount</Typography>
            <Typography variant="body1">
              £ {viewData1?.gbpAmount ? viewData1?.gbpAmount : 0}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" style={{ textTransform: "capitalize" }}>
              {viewData1?.payCurrency
                ? viewData1?.payCurrency.toUpperCase()
                : "Asset"}{" "}
              Amount
            </Typography>
            <Typography variant="body1">
              {viewData1?.assetAmont ? viewData1?.assetAmont : 0}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" style={{ textTransform: "capitalize" }}>
              {viewData1?.payCurrency
                ? viewData1?.payCurrency.toUpperCase()
                : "Asset"}{" "}
              Pay Address
            </Typography>
            <Typography variant="body1">
              {/* {viewData1?.assetAmont ? viewData1?.assetAmont : 0} */}
              {/* {console.log("viewData1 ----- ", viewData1)} */}
              <a
                href={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${viewData1?.payAddress}&choe=UTF-8`}
                target="_blank"
              >
                {" "}
                {viewData1?.payAddress
                  ? sortAddress(viewData1?.payAddress)
                  : "-"}
              </a>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
