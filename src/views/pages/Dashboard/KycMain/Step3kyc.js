import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Typography,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  mainUpoadSection: {
    "&  .MuiAvatar-root": {
      border: "1px solid rgba(255, 255, 255, 0.4)",
      cursor: "pointer",
      height: "200px", 
      display: "flex",
      background: "#2f2e2e",
      alignItems: "center",
      borderRadius: "100%",
      justifyContent: "center",
      width: "1000%",
      maxWidth: "200px",
      margin: "5px 0px",
    },
    "& .MuiIconButton-root": {
      background:
        "linear-gradient(93.14deg, #FFB000 -20.75%, #FF564D 11.84%, #FF0098 53.76%, #5D00C1 102.96%)",

      position: "absolute",
      right: "0px",
      bottom: "10px",
    },
  },

  BoxImg: {
    border: "1px solid rgba(255, 255, 255, 0.4)",
    cursor: "pointer",
    height: "200px",
    display: "flex",
    background: "#2f2e2e",
    alignItems: "center",
    borderRadius: "100%",
    justifyContent: "center",
    flexDirection: "column",
    width: "200px",
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
  maiKyc2Box: {
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
export default function Step3kyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  NextPage,
  selfieImageFront,
  setSelfieImageFront,
  selfieImage64,
  setSelfieImage64,
  isLoading,
  documentType,
}) {
  const classes = useStyles();
  const BackPage = () => {
    setTabView("step2");
    setProgressData("36");
    settimeData("2");
    setHeadingData("Upload Documents");
  };
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <Box className={classes.maiKyc2Box}>
      <Box className="paperBox">
        <Typography variant="h1">Upload your selfie</Typography>
        <Box py={1}>
          <Typography variant="body1">
            <span style={{ color: "#FF564D" }}>Note:</span> Please upload your
            selfie with holding the "{documentType}" you uploaded in the
            previous step.
          </Typography>
          <Box>
            <Box className={classes.mainUpoadSection} align="center" pt={2}>
              <Box py={1}>
                <Typography variant="h6">Selfie</Typography>
              </Box>
              <label htmlFor="raised-button-file3">
                <figure className="figure" style={{ margin: "0px" }}>
                  {selfieImage64 === "" ? (
                    <>
                      {" "}
                      <Box className={classes.BoxImg}>
                        <Box className={classes.uploadBox}>
                          <AiOutlinePlus
                            style={{ color: "#fff", fontSize: "25px" }}
                          />
                        </Box>
                        <Box pt={2}>
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
                            selfieImage64 ? selfieImage64 : "images/camera1.png"
                          }
                        />
                        {selfieImage64 !== "" && (
                          <IconButton onClick={() => setSelfieImage64("")}>
                            <MdDelete />
                          </IconButton>
                        )}
                      </Box>
                    </>
                  )}
                </figure>
              </label>
            </Box>

            <>
              <input
                style={{ display: "none" }}
                id="raised-button-file3"
                multiple
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSelfieImageFront(e.target.files[0]);
                  getBase64(e.target.files[0], (result) => {
                    setSelfieImage64(result);
                  });
                }}
              />
            </>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              {isSubmit && selfieImageFront === "" && (
                <FormHelperText error>Please enter selfie image</FormHelperText>
              )}
              {isLoading && (
                <Box>
                  <FormHelperText error>
                    Your selfie is uploading please wait
                  </FormHelperText>
                </Box>
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
            disabled={isLoading}
            onClick={() => BackPage()}
          >
            Back
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          style={{ padding: "8px 36px", marginLeft: "10px" }}
          onClick={() => {
            setIsSubmit(true);
            if (selfieImageFront !== "") {
              NextPage();
            }
          }}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
}
