import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography, Box,makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  accordianBox: {
    "& .MuiCollapse-wrapper": {
      display: "flex",
      backgroundColor: "#1c1c1c",
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    "& .MuiAccordion-root.Mui-expanded:last-child": {
      background:
        "linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
      padding: "1px",
      borderRadius: "10px",
    },
    "& .MuiCollapse-entered": {
      borderRadius: "0px 0px 10px 10px",
      backgroundColor: theme.palette.background.faqBox,
    },
    "& .MuiIconButton-edgeEnd": {
      marginRight: "0",
    },
    "& .MuiIconButton-root": {
      padding: "3px",
      borderRadius: "27% !important",
    },

    "& .MuiPaper-root": {
      backgroundColor: "transparent !important",
    },
  },
  accordianimgbox: {
    width: "500px",
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));
const Accordion = withStyles((theme) => ({
  root: {
    borderRadius: "10px",
    "&:not(:last-child)": {
      background: "#FFFFFF",
      padding: "2px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:not(:first-child)": {
      //   background:
      //   "linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
      // padding: "1px",
      // borderRadius: "10px",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      "&:not(:last-child)": {
        background:
          " linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
        padding: "1px",
        borderRadius: "10px",
      },
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      // backdropFilter: "blur(42px)",
    },
  },
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    color: theme.palette.primary.main,
    borderRadius: "10px",
    wordBreak: "break-word",
    backgroundColor: "#1c1c1c",
    "&$expanded": {
      borderRadius: "10px 10px 0px 0px",
      minHeight: 50,
      borderBottom: "0",
      // color: '#FFF',
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        // color: '#FFF',
      },
    },
  },
  content: {
    margin: "20px 0px",
    "&$expanded": {
      margin: "20px 0px",
    },
  },
  expanded: {
    margin: "0",
  },
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    "& h6": {
      color: "#000",
      paddingBottom: "15px",
    },
    "& p": {
      color: theme.palette.primary.main,
    },
  },
}))(MuiAccordionDetails);
export default function FaqData({ data, index, type }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box className={classes.accordianBox}>
      <Accordion
        square
        defaultExpanded={index === 0 || expanded === "panel" ? true : false}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          expandIcon={
            <ExpandMoreIcon
              style={{
                border: "2.5px solid rgba(255, 255, 255, 0.6)",
                borderRadius: "8px",
                transform: "matrix(1, 0, 0, -1, 0, 0)",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            />
          }
        >
          <Typography variant="h6" color="secondary">
            {data.question}
          </Typography>
        </AccordionSummary>
        <Box>
          <AccordionDetails>
            <Typography style={{ fontSize: "14px", fontWeight: "300" }}>
              {data.answer}
            </Typography>
          </AccordionDetails>
        </Box>
      </Accordion>
    </Box>
  );
}
