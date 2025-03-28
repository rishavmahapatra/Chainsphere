import {
  Box,
  Typography,
  makeStyles,
  Grid,
  Button,
  Avatar,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  WhitepaperBox: {
    "& .whiteminBox1": {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      padding: "60px 20px 1px",
      marginRight: "25px",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0px",
      },
    },
    "& .whiteminBox": {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      padding: "60px 20px 1px",
      marginLeft: "25px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0px",
      },
    },
    "& .displayBox1": {
      display: "flex",
      alignItems: "center",
    },
    "& .displayBox": {
      display: "flex",
      alignItems: "center",
    },
    "& .typoBox": {
      padding: "0px 80px 0px 50px",
    },
    "& .topBox": {
      paddingTop: "80px",
    },
    "& h1": {
      "@media(max-width:472px)": {
        fontSize: "18px !important",
        lineHeight: "31px",
      },
    },
  },
  BoxImg: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(30px)",
    borderRadius: "15px",
    height: "189px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& h6": {
      color: "#ffffff",
    },
  },
  imgsection1: {
    height: "189px",
    width: "100%",
    borderRadius: "10px",
    margin: "17px 0px",
    "& .MuiAvatar-img": {
      objectFit: "cover",
    },
  },
  icomButton: {
    borderRadius: "100%",
    padding: "10px 10px 7px",
    background: "rgba(255, 255, 255, 0.3)",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  },

  kycmain: {
    position: "relative",
    "& .MuiIconButton-root": {
      background:
        "linear-gradient(93.14deg, #FFB000 -20.75%, #FF564D 11.84%, #FF0098 53.76%, #5D00C1 102.96%)",

      position: "absolute",
      right: "10px",
      bottom: "10px",
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
export default function Step2kyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  NextPage,
  userData,
  profileImageFront,
  setProfileImageFront,
  isUploadingImage,
  frontProfileImage64,
  setFrontProfileImage64,
  profileImageBack,
  setProfileImageBack,
  backProfileImage64,
  setBackProfileImage64,
  documentType,
}) {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);

  const BackPage = () => {
    setTabView("step1");
    setProgressData("10");
    settimeData("1");
    setHeadingData("Basic Information");
  };
  return (
    <Box className={classes.mainkycStep2Box}>
      <Box className="paperBox">
        <Box className={classes.WhitepaperBox}>
          <Typography variant="h1">Upload your Document</Typography>
          <Box mt={1}>
            <Typography
              variant="body2"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              <span style={{ color: "#FF564D" }}>Note:</span> You have
              selected&nbsp;"{documentType}" as your Proof of Identity. Please
              upload Front and Back images of the document.
            </Typography>
          </Box>
          <Box align="center" className="topBox">
            <Box style={{ maxWidth: "800px" }}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Box align="centre">
                    <Typography variant="body1" style={{ color: "#fff" }}>
                      Front Side
                    </Typography>
                  </Box>
                  <Box>
                    <Box className={classes.kycmain}>
                      <label htmlFor="raised-button-file3">
                        <figure className="figure" style={{ margin: "0px" }}>
                          {frontProfileImage64 === "" ? (
                            <>
                              {" "}
                              <Box my={2} className={classes.BoxImg}>
                                <Box className={classes.icomButton}>
                                  <AiOutlinePlus
                                    style={{ color: "#fff", fontSize: "25px" }}
                                  />
                                </Box>
                                <Box mt={2}>
                                  <Typography variant="body2">
                                    Image Upload
                                  </Typography>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <>
                              {" "}
                              <Avatar
                                className={classes.imgsection1}
                                src={
                                  frontProfileImage64
                                    ? frontProfileImage64
                                    : "images/camera1.png"
                                }
                              />
                            </>
                          )}
                        </figure>
                      </label>
                      {frontProfileImage64 !== "" && (
                        <IconButton onClick={() => setFrontProfileImage64("")}>
                          <MdDelete />
                        </IconButton>
                      )}
                    </Box>

                    <>
                      <input
                        style={{ display: "none" }}
                        id="raised-button-file3"
                        multiple
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setProfileImageFront(e.target.files[0]);
                          getBase64(e.target.files[0], (result) => {
                            setFrontProfileImage64(result);
                          });
                        }}
                      />
                    </>
                  </Box>
                  {isSubmit && profileImageFront === "" && (
                    <FormHelperText error>
                      Please enter front side image.
                    </FormHelperText>
                  )}
                  {isUploadingImage.front && (
                    <FormHelperText error>
                      Your image is uploading please wait
                    </FormHelperText>
                  )}
                  <Box align="centre">
                    <Typography
                      variant="body2"
                      style={{ color: "rgba(255, 255, 255, 0.6)" }}
                    >
                      Max file Size 5 MB
                    </Typography>
                  </Box>
                </Grid>
                {documentType !== "Passport" && (
                  <Grid item xs={12} sm={6}>
                    <Box align="centre">
                      <Typography variant="body1" style={{ color: "#fff" }}>
                        Back Side
                      </Typography>
                    </Box>
                    <Box>
                      <Box className={classes.kycmain}>
                        <label htmlFor="raised-button-file1">
                          <figure className="figure" style={{ margin: "0px" }}>
                            {backProfileImage64 === "" ? (
                              <>
                                {" "}
                                <Box my={2} className={classes.BoxImg}>
                                  <Box className={classes.icomButton}>
                                    <AiOutlinePlus
                                      style={{
                                        color: "#fff",
                                        fontSize: "25px",
                                      }}
                                    />
                                  </Box>
                                  <Box mt={2}>
                                    <Typography variant="body2">
                                      Image Upload
                                    </Typography>
                                  </Box>
                                </Box>
                              </>
                            ) : (
                              <>
                                {" "}
                                <Avatar
                                  className={classes.imgsection1}
                                  src={
                                    backProfileImage64
                                      ? backProfileImage64
                                      : "images/camera1.png"
                                  }
                                />
                              </>
                            )}
                          </figure>
                        </label>
                        {backProfileImage64 !== "" && (
                          <IconButton onClick={() => setBackProfileImage64("")}>
                            <MdDelete />
                          </IconButton>
                        )}
                      </Box>

                      <>
                        <input
                          style={{ display: "none" }}
                          id="raised-button-file1"
                          multiple
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setProfileImageBack(e.target.files[0]);
                            getBase64(e.target.files[0], (result) => {
                              setBackProfileImage64(result);
                            });
                          }}
                        />
                      </>
                    </Box>
                    {isSubmit && profileImageBack === "" && (
                      <FormHelperText error>
                        Please enter back side image.
                      </FormHelperText>
                    )}
                    {isUploadingImage.back && (
                      <FormHelperText error>
                        Your image is uploading please wait
                      </FormHelperText>
                    )}
                    <Box align="centre">
                      <Typography
                        variant="body2"
                        style={{ color: "rgba(255, 255, 255, 0.6)" }}
                      >
                        Max file Size 5 MB
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
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
            onClick={BackPage}
            disabled={isUploadingImage.front || isUploadingImage.back}
          >
            Back
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{ padding: "8px 36px", marginLeft: "10px" }}
          disabled={isUploadingImage.front || isUploadingImage.back}
          onClick={() => {
            setIsSubmit(true);
            if (profileImageFront !== "") {
              if (profileImageBack !== "" && documentType == "Passport") {
              } else {
                NextPage();
              }
            }
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
