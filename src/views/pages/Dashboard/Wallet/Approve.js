import { Box, makeStyles, Typography, Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory, Link as RouterLink } from "react-router-dom";
import ApiConfig from "src/config/ApiConfig";

const useStyles = makeStyles((theme) => ({
  bannerBox1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "90vh",
    width: "100%",

    "& .subtext": {
      borderTop: "1px solid rgba(128, 128, 128, 0.22)",
    },
  },
  newbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "11.2757px",
  },
}));

export default function Approve() {
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [ids, setId] = useState("");
  const history = useHistory();
  useEffect(() => {
    const searchLink = location.search.substring(0);

    if (location.search.split("?")) {
      const id = location.search.split("?");
      setId(id[1]);
    } else {
      const ids = location.search.split("#");
      setId(ids[1]);
    }
  }, [location.search]);

  const CancelWithdrawCoin = async (id) => {
    setIsLoading("cancel");
    try {
      let ids = location.hash.split("#");
      const res = await axios({
        method: "GET",
        url: ApiConfig.cancelWithdraw,

        params: {
          token: ids[1],
        },
      }).then(async (res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setIsLoading(false);
          history.push("/");
        } else if (res.data.status === 403) {
          toast.error(res.data.message);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error(error.res.data.message);
      setIsLoading(false);
    }
  };

  const ApproveWithdrawCoin = async (id) => {
    setIsLoading("approve");

    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.approveWithdraw,
        data: {
          isWithdraw: id,
          withdrawToken: ids,
        },
      }).then(async (res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setIsLoading(false);
          history.push("/");
        } else if (res.data.status === 403) {
          toast.error(res.data.message);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error(error.res.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box className={classes.bannerBox1}>
      <Box className={classes.newbox}>
        <Box
          style={{
            padding: "40px 20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" style={{ fontSize: "18px" }}>
            Are you sure you wan’t to Approve your Withdraw? !
          </Typography>
        </Box>
        <Box className="subtext">
          <Box style={{ padding: "20px" }}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => ApproveWithdrawCoin(true)}
                  fullWidth
                  disabled={isLoading === "approve" || isLoading === "cancel"}
                  style={{ cursor: "pointer" }}
                >
                  Approve{isLoading === "approve" && <ButtonCircularProgress />}
                </Button>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => CancelWithdrawCoin()}
                  disabled={isLoading === "approve" || isLoading === "cancel"}
                  style={{ cursor: "pointer" }}
                >
                  Reject{isLoading === "cancel" && <ButtonCircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
