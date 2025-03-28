import {
  Box,
  Grid,
  makeStyles,
  FormControl,
  TextField,
  Typography,
  Button,
  Link,
  ListItem,
  List,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import "react-phone-input-2/lib/style.css";
import Checkbox from "@material-ui/core/Checkbox";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  Step1KycContainer: {
    position: "relative",
    "& p": {
      color: "#fff",
      marginBottom: "5px",
      "& span": {
        color: "red",
      },
    },
    "& .boxcheck": {
      "& h5": {
        marginBottom: "10px",
      },
    },
    "& h1": {
      fontSize: "20px",
      fontWeight: "400",
      margin: "16px 0px",
      "@media(max-width:472px)": {
        fontSize: "18px !important",
        lineHeight: "35px",
      },
    },
    "& .formbox": {
      "& p": {
        marginBottom: "5px",
      },
      "& .MuiSelect-icon": {
        color: "#ffffff !important",
      },
      "& .MuiSvgIcon-root": {
        color: "#fff !important",
      },
    },
  },
  FormInputField: {
    "& .MuiSelect-selectMenu": {
      padding: "15px",
    },
  },

  chakboxbtn: {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#585858",
    },
    "& h6": {
      fontSize: "14px",
      fontWeight: "300",
      marginTop: "0px",
      maxWidth: "100%",
      "& a": {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
  },
  textboxs: {
    position: "relative",
    zIndex: "1",
    marginLeft: "10px",
    "& li": {
      position: "relative",
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: "300",
      fontFamily: "'Sora', sans-serif",
      "&::after": {
        content: "''",
        position: "absolute",
        height: "5px",
        width: "5px",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "50%",
        left: "-9px",
        top: "14px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
    "& .MuiList-padding": {
      paddingTop: "0px",
      paddingBottom: "0px",
    },
  },
}));
const bulletData = [
  {
    point1:
      "You are required to upload any form of your government-issued photo ID.",
  },
  
];
export default function Step1Kyc({
  handleFormSubmit,
  sourceIncome,
  setsourceIncome,
  occupationType,
  setOccupationType,
  documentType,
  setDocumentType,
  documentNumber,
  setDocumentNumber,
  isSubmit,
}) {
  const classes = useStyles();
  const [volume, setVolume] = useState("-");
  const [checked, setChecked] = useState(false);
  const auth = useContext(AuthContext);

  function testName(value) {
    const regex = /^[aA-zZ\s]+$/;
    return regex.test(value);
  }
  function testName1(value) {
    const regex = /^[aA-zZ\s]+$/;
    return regex.test(value);
  }
  const [isValidName, setIsValidName] = useState(true);
  const [isValidName1, setIsValidName1] = useState(true);

  return (
    <Box className={classes.Step1KycContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {auth?.userData?.kyc?.document[0]?.documentStatus !== "ACCEPTED" &&
            auth?.userData?.kyc?.document[0]?.documentStatus !== "PENDING" && (
              <>
                <Box className="boxcheck">
                  <Typography variant="h5">
                    Please read the below guidelines and our working criteria
                    before submitting your application:
                  </Typography>
                  {bulletData &&
                    bulletData.map((data, i) => {
                      return (
                        <>
                          <Box className={classes.textboxs}>
                            <List>
                              <ListItem>{data.point1}</ListItem>
                            </List>
                          </Box>
                        </>
                      );
                    })}
                  <Box pr={4} className={classes.chakboxbtn}>
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                    />
                    <Typography variant="h6">
                      I have read and agree to the
                      <Link target="_blank" style={{ cursor: "pointer" }}>
                        &nbsp;terms mentioned above.
                      </Link>{" "}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
        </Grid>
        {checked === true && (
          <Grid item xs={12} sm={12}>
            <Box className="formbox">
              <Box>
                <Typography variant="h1">
                  1. Enter your application details.
                </Typography>
              </Box>
              

              <Box mb={2}>
                <Typography variant="body1">Document Type</Typography>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.forminput}
                >
                  <Select
                    name="Asset"
                    onChange={(e) => setDocumentType(e.target.value)}
                    value={documentType}
                    error={isSubmit && documentType?.toString() == "0"}
                  >
                    <MenuItem value={0}>-Select document -</MenuItem>
                    <MenuItem value="Passport">Passport</MenuItem>
                    <MenuItem value="Government issued photo ID">
                      Government issued photo ID
                    </MenuItem>
                    <MenuItem value="Driving License">Driving License</MenuItem>
                  </Select>
                  {isSubmit && documentType?.toString() == "0" && (
                    <FormHelperText error>
                      Please select document
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box mb={2}>
                <Typography variant="body1">
                  Document Number (Without space or dashes)
                </Typography>
                <TextField
                  placeholder="Enter document number"
                  variant="outlined"
                  name="firstName"
                  inputProps={{ maxLength: 19 }}
                  fullWidth
                  onKeyPress={(event) => {
                    if (
                      event?.key === "-" ||
                      event?.key === "+" ||
                      event?.key === " "
                    ) {
                      event.preventDefault();
                    }
                  }}
                  value={documentNumber}
                  autoComplete="off"
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  error={isSubmit && documentNumber === ""}
                  helperText={
                    isSubmit &&
                    documentNumber === "" &&
                    "Please enter document number"
                  }
                />
                {documentNumber?.length > 18 && (
                  <FormHelperText error>
                    It should not exceed 18 characters.
                  </FormHelperText>
                )}
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
      {checked === true && (
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleFormSubmit()}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
