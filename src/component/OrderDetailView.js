import React, { useState, useEffect } from "react";
import { Typography, Box, Dialog, IconButton } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  modaltext: {
    paddingBottom: "10px",
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
// export const DailyRelease = async (amount, term, commission) => {
export function DailyRelease(amount, releaseTerm, commission) {
  console.log(amount, releaseTerm, commission);
  let perDay = amount / releaseTerm;
  let CommissionsWithClaim = (commission / 100) * perDay;
  console.log(perDay, CommissionsWithClaim, perDay - CommissionsWithClaim);
  return perDay - CommissionsWithClaim;
}
export default function OrderDetailView({ handleClose, open, viewData }) {
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
              Order History Detail
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Bought Date</Typography>
            <Typography variant="body1">
              {viewData?.txnTime
                ? moment(viewData?.txnTime).format("lll")
                : "-"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Amount</Typography>
            <Typography variant="body1">
              {viewData?.amount ? viewData?.amount : "0"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Release Date</Typography>
            <Typography variant="body1">
              {viewData?.txnTime
                ? moment(viewData?.txnTime)
                    .add(
                      viewData?.planData?.terms
                        ? Number(viewData?.planData?.terms)
                        : 730,
                      "days"
                    )
                    .format("lll")
                : "N/A"}
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
              £ {viewData?.gbpAmount ? viewData?.gbpAmount : 0}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">Daily Release</Typography>
            <Typography variant="body1">
              {/* {viewData?.perDayClaimAmount ? viewData?.perDayClaimAmount : 0} */}
              {viewData.planId
                ? DailyRelease(
                    viewData.amount,
                    Number(viewData.planData.releaseTerm),
                    viewData.planData.comission
                  )
                : viewData?.perDayClaimAmount
                ? viewData?.perDayClaimAmount
                : 0}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
