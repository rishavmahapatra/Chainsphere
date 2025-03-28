import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const useStyles = makeStyles(() => ({
  mainUpoadSection: {
    // position: "relative",
    "&  .MuiAvatar-root": {
      cursor: "pointer",
      height: "200px",
      display: "flex",
      background: "#2f2e2e",
      alignItems: "center",
      borderRadius: "10px",
      justifyContent: "center",

      width: "100%",
      maxWidth: "300px",
    },
    "& .MuiIconButton-root": {
      background:
        "linear-gradient(93.14deg, #FFB000 -20.75%, #FF564D 11.84%, #FF0098 53.76%, #5D00C1 102.96%)",

      position: "absolute",
      right: "10px",
      bottom: "10px",
    },
  },

  BoxImg: {
    //   border: "1px solid rgba(255, 255, 255, 0.4)",
    cursor: "pointer",
    height: "200px",
    display: "flex",
    background: "#2f2e2e",
    alignItems: "center",
    borderRadius: "10px",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: "300px",
    "& p": {
      paddingTop: "10px",
    },
    "& h6": {
      color: "#fff",
    },
  },
  uploadBox: {
    borderRadius: "100%",
    padding: "10px 10px 7px",
    background: "rgba(255, 255, 255, 0.3)",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  dashboardbox: {
    "& h1": {
      "@media(max-width:472px)": {
        fontSize: "18px !important",
        lineHeight: "31px",
      },
    },
  },
}));
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};
function Step4kyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  NextPage,
  residenceImage,
  setResidenceImage,
  residenceImage64,
  setResidenceImage64,
  isLoading,
  viewKycDetailHandler,
  documentType,
}) {
  const classes = useStyles();
  const BackPage = () => {
    setTabView("step3");
    setProgressData("52");
    settimeData("1");
    setHeadingData("Basic Information");
  };
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <Box className={classes.dashboardbox}>
      <Box className="paperBox">
        <Typography variant="h1">Upload your proof of residence</Typography>
        <Box py={1}>
          <Typography variant="body1">
            <span style={{ color: "#FF564D" }}>Note:</span> An image of a
            utility bill or bank statement dated within the last 3 months.
          </Typography>
          <Box>
            <Box className={classes.mainUpoadSection} align="center" pt={2}>
              <Box py={1}>
                <Typography variant="h6">Proof of Residence</Typography>
              </Box>
              <label htmlFor="raised-button-file3">
                <figure className="figure" style={{ margin: "0px" }}>
                  {residenceImage64 === "" ? (
                    <>
                      {" "}
                      <Box className={classes.BoxImg}>
                        <Box className={classes.uploadBox}>
                          <AiOutlinePlus
                            style={{ color: "#fff", fontSize: "25px" }}
                          />
                        </Box>
                        <Box mt={1}>
                          <Typography variant="body2">Image Upload</Typography>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        style={{
                          position: "relative",
                          width: "100%",
                          maxWidth: "fit-content",
                        }}
                      >
                        {" "}
                        <Avatar
                          className={classes.imgsection1}
                          src={
                            residenceImage64
                              ? residenceImage64
                              : "images/camera1.png"
                          }
                        />
                        {residenceImage64 !== "" && (
                          <IconButton onClick={() => setResidenceImage64("")}>
                            <MdDelete />
                          </IconButton>
                        )}
                      </Box>
                    </>
                  )}
                </figure>
              </label>

              <>
                <input
                  style={{ display: "none" }}
                  id="raised-button-file3"
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setResidenceImage(e.target.files[0]);
                    getBase64(e.target.files[0], (result) => {
                      setResidenceImage64(result);
                    });
                  }}
                />
              </>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              {isSubmit && residenceImage === "" && (
                <FormHelperText>Please submit residence proof</FormHelperText>
              )}
              {isLoading && (
                <FormHelperText error>
                  Your residence proof is uploading please wait
                </FormHelperText>
              )}
            </Box>
            <Box py={1}>
              <Typography variant="body1" align="center">
                Max file Size 5 MB
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" py={3}>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            style={{ padding: "8px 36px" }}
            onClick={() => BackPage()}
            disabled={isLoading}
          >
            Back
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{ padding: "8px 36px", marginLeft: "10px" }}
          disabled={isLoading}
          onClick={() => {
            NextPage();
          }}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
}

export default Step4kyc;
