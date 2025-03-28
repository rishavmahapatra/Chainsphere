import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  maincardbox: {
    background: "rgba(255, 255, 255, 0.025)",
    borderTopLeftRadius: "11.2757px",
    borderTopRightRadius: "11.2757px",
    padding: "18px",
    "& h6": {
      fontWeight: "500",
      marginLeft: "10px",
    },
  },
  colorbox: {
    backgroundColor: "#4F0B99",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: "11.2757px",
    borderBottomRightRadius: "11.2757px",
    padding: "18px",
    "& p": {
      fontWeight: "500",
    },
  },
}));

function DashboardCard(props) {
  const classes = useStyles();
  const { data } = props;
  const history = useHistory();

  return (
    <>
      <Box>
        <Box className={classes.maincardbox}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src={data.img1} alt="" />
            <Typography variant="h6">{data.amount}</Typography>
          </Box>
        </Box>
        <Box
          className={classes.colorbox}
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/vesting")}
        >
          <Typography variant="body2">{data.text1}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default DashboardCard;
