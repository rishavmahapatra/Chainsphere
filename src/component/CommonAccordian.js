import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button } from "@material-ui/core";
import ClaimModal from "./ClaimModal";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "transparent",
    "&.MuiAccordion-root.Mui-expanded:last-child ": {
      background: "transparent",
    },
    "&.MuiAccordionSummary-root": {
      padding: "0px !important",
    },
    "& .MuiButton-contained.Mui-disabled": {
      background: "rgb(101 96 96 / 88%) !important",
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "48px",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CommonAccordian({
  // claimData,
  // getclaimableAmountHandler,
  item,
  listOrderHistory,
  // isLoading,
}) {
  const [claimableData, setClaimableData] = useState({});
  const [claimData, setClaimData] = useState({});
  const [claimData1, setClaimData1] = useState(0);
  // console.log(" ------ claimData ", claimData);
  let userClaimValue = claimData && claimData?.userInfo && claimData?.userInfo;
  // console.log(" ------ claimData userClaimValue ", userClaimValue);
  const classes = useStyles();
  const [claimOpen, setClaimOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setClaimOpen(false);
  };
  const handleClickOpen = (selectedData) => {
    setClaimableData(selectedData);
    setClaimOpen(true);
  };

  const getclaimableAmountHandler = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getclaimableAmount,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          planId: id,
        },
      });
      if (res.data.status === 200) {
        setClaimData(res.data.data);
        // console.log(" ------ claimData ", claimData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getFieroBalanceHandler = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getTotalClaimed,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },

        params: {
          planId: id,
        },
      });

      if (res.data.status === 200) {
        setClaimData1(res.data?.data.claimable);
        // setFieroBalance(res.data?.data.withdraw);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getclaimableAmountHandler(item.id);
    getFieroBalanceHandler(item.id);
  }, []);

  return (
    <div className={classes.root}>
      <Accordion
        style={{ background: "transparent", minHeight: "40px", padding: "0px" }}
        // onClick={() => getclaimableAmountHandler(item.id ? item.id : undefined)}
      >
        <AccordionSummary
          style={{ fontFamily: "'Sora', sans-serif" }}
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Claim
        </AccordionSummary>
        <AccordionDetails style={{ justifyContent: "center" }}>
          {isLoading ? (
            "Checking..."
          ) : (
            <>
              <Typography variant="h5" style={{ fontSize: "12px" }}>
                Claimable Amount :&nbsp;&nbsp;
              </Typography>
              {/* {userClaimValue ? ( */}
              <Typography variant="h5" style={{ fontSize: "12px" }}>
                {""}
                {/* {userClaimValue &&
                    (Number(userClaimValue?.totalAllocatedAmount) -
                      Number(userClaimValue?.totalClaimedAmount)) /
                      Math.pow(10, 18).toFixed(4)} */}
                {claimData1}
              </Typography>
              {/* ) : (
                <Typography variant="h5" style={{ fontSize: "12px" }}>
                  0
                </Typography>
              )} */}
            </>
          )}
        </AccordionDetails>
        <AccordionDetails className="displayFlexCenter">
          <Button
            onClick={() => handleClickOpen(item)}
            variant="contained"
            color="primary"
            disabled={
              userClaimValue?.totalAllocatedAmount === 0 ||
              claimData?.perDayClaim === undefined ||
              claimData1 == 0 ||
              true
            } // uncomment this
            // disabled // comment this
          >
            Full Claim
          </Button>
        </AccordionDetails>
      </Accordion>
      {claimOpen && (
        <ClaimModal
          handleClose={handleClose}
          claimOpen={claimOpen}
          claimableAmount={
            userClaimValue &&
            (Number(userClaimValue?.totalAllocatedAmount) -
              Number(userClaimValue?.totalClaimedAmount)) /
              Math.pow(10, 18)
          }
          claimId={claimableData && claimableData.id}
          listOrderHistory={listOrderHistory}
        />
      )}
    </div>
  );
}
