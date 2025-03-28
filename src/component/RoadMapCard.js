import {
  Grid,
  makeStyles,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  roapmapCardBox: {
    "& .roaddescriptionBox": {
      background: "rgba(255, 255, 255, 0.03)",
      padding: "20px",
      borderRadius: "10px",
      width: "calc(100% - 57px)",
      position: "relative",
      marginBottom: "50px",
      zIndex: "9999",
      "&::before": {
        bottom: "-40px",
        left: "42%",
        width: "0",
        filter: "blur(1px)",
        height: "0",
        content: '""',
        opacity: "0.85",
        position: "absolute",
        transition: "0.4s ease-in-out",
        borderLeft: "25px solid transparent",
        borderRight: "25px solid transparent",
        borderTop: "40px solid rgba(255, 255, 255, 0.03)",
      },
      // "&:hover": {
      //   "&::before": {
      //     height: "100%",
      //   },

      //   "& .iconbutton": {
      //     opacity: "1",
      //     top: "50%",
      //   },
      // },
      "& p": {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },

    "& .iconbutton": {
      position: "absolute",
      transform: "translate(-50%, -50%)",
      transition: "0.5s ease-in-out",
      opacity: "0",
      width: "100%",
      top: "65%",
      left: "50%",
      textAlign: "center",
      "& .MuiIconButton-root": {
        background: "rgba(255, 255, 255, 0.1)",
        padding: "15px",
      },
    },
  },
}));

export default function NewsCards({
  value,
  activeIndex,
  index,
  setAciveIndex,
}) {
  const classes = useStyles();

  return (
    <Box
      className={classes.roapmapCardBox}
      style={activeIndex == index ? { background: "transparent" } : {}}
      onClick={() => setAciveIndex(index)}
    >
      <Box className="roaddescriptionBox">
        <Box className="iconbutton">
          <IconButton>
            <BsArrowUpRight />
          </IconButton>
        </Box>

        <Box mt={1} mb={2}>
          <Typography variant="h4" color="primary">
            {value.head}
          </Typography>
        </Box>
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. dummy text ever since the 1500s, when an unknown printer
          Lorem Ipsum is simply dummy text of the printing and type setting
          industry. dummy text ever since the 1500s, when an unknown printer
          Lorem Ipsum.
        </Typography>
      </Box>
    </Box>
  );
}
