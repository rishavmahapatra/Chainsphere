import React from "react";
import {
  Typography,
  Box,
  Button,
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
    "& h3": {
      fontSize: "24px",
      fontWeight: "300",
      textAlign: "center",
    },
  },
}));

export default function ConfirmationDialog({
  open,
  confirmationHandler,
  handleClose,
}) {
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
              Logout
            </Typography>
          </Box>
          <Box mt={4} mb={1}>
            <Typography variant="h3">Do you want to logout?</Typography>
          </Box>
          <Box className="buttonboxes">
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              fullWidth
              onClick={handleClose}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                handleClose();
                confirmationHandler();
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
