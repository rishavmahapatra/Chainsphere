import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import { Cancel } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  KycDetailbox: {
    // background: "rgba(255, 255, 255, 0.025)",
    // borderRadius: "15px",
    // padding: "45px 70px",
    // [theme.breakpoints.down("sm")]: {
    //   padding: "20px",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   padding: "15px",
    // },
    "& h1": {
      marginBottom: "10px",
      "& span": {
        color: "#F44336",
      },
    },
    "& .boxstyle": {
      background: "rgba(255, 255, 255, 0.025)",
      borderRadius: "15px",
      padding: "15px",
      "& h6": {
        fontWeight: "600",
        marginBottom: "30px",
      },
      "& h5": {
        fontWeight: "500",
        fontSize: "16px",
        textTransform: "capitalize",
        wordBreak: "break-word",
        "@media(max-width:1069px)": {
          fontSize: "14px !important",
        },
      },
      "& .borderbox": {
        position: "relative",
        "&::after": {
          content: "''",
          height: "0px",
          width: "10px",
          position: "absolute",
          right: "40px",
          top: "12px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
          "@media(max-width:1066px)": {
            right: "18px",
          },
          "@media(max-width:959px)": {
            right: "70px",
          },
          "@media(max-width:540px)": {
            right: "38px",
          },
          "@media(max-width:407px)": {
            width: "0px",
          },
        },
      },
    },
    "& .infobox": {
      "& p": {
        marginBottom: "11px",
        fontSize: "14px",
      },
      "& h5": {
        marginBottom: "11px",
        fontSize: "14px",
        wordBreak: "break-word",
      },
    },
  },
  imgbox: {
    marginTop: "20px",
    "& figure": {
      maxHeight: "113px",
      minHeight: "113px",
      margin: "0px",
      "& img": {
        objectFit: "contain",
        maxHeight: "113px",
        minHeight: "113px",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "200px",
        cursor: "pointer",
      },
    },
  },
  imgbox1: {
    "& figure": {
      maxHeight: "113px",
      minHeight: "113px",
      margin: "0px",
      "& img": {
        objectFit: "contain",
        maxHeight: "113px",
        minHeight: "113px",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "200px",
        cursor: "pointer",
      },
    },
  },
  applicationbox: {
    background: "rgba(255, 255, 255, 0.025)",
    backdropFilter: "blur(3.22162px)",
    borderRadius: "15px",
    padding: "15px",
    "& .flexapplication": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      "& p": {
        fontSize: "14px",
        [theme.breakpoints.down("xs")]: {
          fontSize: "12px !important",
        },
      },
      "& h5": {
        fontSize: "14px",
        wordBreak: "break-word",
        [theme.breakpoints.down("xs")]: {
          fontSize: "12px !important",
        },
      },
    },
    "& .flexapplication1": {
      display: "flex",
      alignItems: "center",
      "& p": {
        fontSize: "14px",
      },
      "& h5": {
        fontSize: "14px",
        wordBreak: "break-word",
        marginLeft: "30px",
      },
    },
    "& h6": {
      fontWeight: "600",
      marginBottom: "30px",
    },
    "& h5": {
      "@media(max-width:767px)": {
        fontSize: "14px !important",
      },
    },
  },
}));

function Step5kyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  NextPage,
  kycHandler,
  allKycDetail,
  reSubmit,
  frontImage,
  documentType,
  backImage,
  residence,
  occupationType,
  sourceIncome,
  documentNumber,
  isResubmit,
  selfie,
  previousDetails,
}) {
  const classes = useStyles();

  const BackPage = () => {
    setTabView("step4");
    setProgressData("84");
    settimeData("1");
    setHeadingData("Basic Information");
  };
  const auth = useContext(AuthContext);
  const [openResidenceBox, setOpenResidenceBox] = useState(false);
  const [residenceImage, setResidenceImage] = useState();
  const [openSelfieBox, setOpenSelfieBox] = useState(false);
  const [selfieImage, setSelfieImage] = useState();
  const [frontImageBox, setFrontImageBox] = useState(false);
  const [frontImageDoc, setFrontImageDoc] = useState();
  const [backImageBox, setBackImageBox] = useState(false);
  const [backImageDoc, setBackImageDoc] = useState();
  const residenceDialog = (item) => {
    setOpenResidenceBox(true);
    setResidenceImage(item);
  };
  const selfieDialog = (item) => {
    setOpenSelfieBox(true);
    setSelfieImage(item);
  };
  const frontImageDialog = (item) => {
    setFrontImageBox(true);
    setFrontImageDoc(item);
  };
  const backImageDialog = (item) => {
    setBackImageBox(true);
    setBackImageDoc(item);
  };
  // console.log("hhhhhh", auth?.userData?.kyc?.document[0]?.documentStatus);
  return (
    <Box className={classes.KycDetailbox}>
      {(auth?.userData?.kyc?.document[0]?.documentStatus === "ACCEPTED" ||
        auth?.userData?.kyc?.document[0]?.documentStatus === "PENDING") && (
        <>
          <Typography variant="body1">
            Application ID : {allKycDetail?.documentId} &nbsp;, Date :&nbsp;
            {allKycDetail?.createTime
              ? moment(allKycDetail?.createTime).format("lll")
              : "-"}
          </Typography>
        </>
      )}

      <Box mt={3}>
        <Grid container spacing={2}>
          {/* <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box className="boxstyle">
              <Typography variant="h6">Application Info</Typography>
              <Grid container spacing={2} className="infobox">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box className="borderbox"></Box>
                  <Typography variant="body1">Occupation Type</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h5">
                    {allKycDetail?.occupation
                      ? allKycDetail?.occupation
                      : occupationType}
                    {occupationType
                      ? occupationType
                      : allKycDetail?.occupation
                      ? allKycDetail?.occupation
                      : ""}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box className="borderbox"></Box>
                  <Typography variant="body1">Source of Income </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h5">
                    {sourceIncome
                      ? sourceIncome
                      : allKycDetail?.incomeSource
                      ? allKycDetail?.incomeSource
                      : ""}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box className={classes.imgbox1}>
                    <figure>
                      <img
                        onClick={() =>
                          residenceDialog(
                            residence
                              ? residence
                              : allKycDetail?.residenceProof
                              ? allKycDetail?.residenceProof
                              : ""
                          )
                        }
                        // onClick={() =>
                        //   residenceDialog(
                        //     allKycDetail?.residenceProof
                        //       ? allKycDetail?.residenceProof
                        //       : residence
                        //   )
                        // }
                        // src={
                        //   allKycDetail?.residenceProof
                        //     ? allKycDetail?.residenceProof
                        //     : residence
                        // }
                        src={
                          residence
                            ? residence
                            : allKycDetail?.residenceProof
                            ? allKycDetail?.residenceProof
                            : ""
                        }
                        alt=""
                        width="100%"
                      />
                    </figure>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body1">Proofs of Residence</Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box className={classes.imgbox1}>
                    <figure
                      onClick={() =>
                        selfieDialog(
                          selfie
                            ? selfie
                            : allKycDetail?.selfieUrl
                            ? allKycDetail?.selfieUrl
                            : ""
                        )
                      }
                      // onClick={() =>
                      //   selfieDialog(
                      //     allKycDetail?.selfieUrl
                      //       ? allKycDetail?.selfieUrl
                      //       : selfie
                      //   )
                      // }
                    >
                      <img
                        // src={
                        //   allKycDetail?.selfieUrl
                        //     ? allKycDetail?.selfieUrl
                        //     : selfie
                        // }
                        src={
                          selfie
                            ? selfie
                            : allKycDetail?.selfieUrl
                            ? allKycDetail?.selfieUrl
                            : ""
                        }
                        alt=""
                        width="100%"
                      />
                    </figure>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body1">Selfie</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid> */}
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box className="boxstyle">
              <Typography variant="h6">Uploaded Documents</Typography>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="borderbox"></Box>
                  <Typography variant="body1">Document Type</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h5">
                    {/* {allKycDetail?.docName
                      ? allKycDetail?.docName
                      : documentType} */}
                    {documentType != "0"
                      ? documentType
                      : allKycDetail?.docName
                      ? allKycDetail?.docName
                      : ""}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="borderbox"></Box>
                  <Typography variant="body1">Document Number</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h5">
                    {/* {allKycDetail?.documentNumber
                      ? allKycDetail?.documentNumber
                      : documentNumber} */}
                    {documentNumber
                      ? documentNumber
                      : allKycDetail?.documentNumber
                      ? allKycDetail?.documentNumber
                      : ""}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box className={classes.imgbox}>
                    <figure>
                      <img
                        onClick={() =>
                          frontImageDialog(
                            frontImage
                              ? frontImage
                              : allKycDetail?.frontIdUrl
                              ? allKycDetail?.frontIdUrl
                              : ""
                          )
                        }
                        // onClick={() =>
                        //   frontImageDialog(
                        //     allKycDetail?.frontIdUrl
                        //       ? allKycDetail?.frontIdUrl
                        //       : frontImage
                        //   )
                        // }
                        // src={
                        //   allKycDetail?.frontIdUrl
                        //     ? allKycDetail?.frontIdUrl
                        //     : frontImage
                        // }
                        src={
                          frontImage
                            ? frontImage
                            : allKycDetail?.frontIdUrl
                            ? allKycDetail?.frontIdUrl
                            : ""
                        }
                        alt=""
                        width="100%"
                      />
                    </figure>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body1">Front Side</Typography>
                  </Box>
                </Grid>
                {(backImage || allKycDetail?.backIdUrl) && (
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Box className={classes.imgbox}>
                      <figure>
                        <img
                          onClick={() =>
                            backImageDialog(
                              backImage
                                ? backImage
                                : allKycDetail?.backIdUrl
                                ? allKycDetail?.backIdUrl
                                : ""
                            )
                          }
                          // onClick={() =>
                          //   backImageDialog(
                          //     allKycDetail?.backIdUrl
                          //       ? allKycDetail?.backIdUrl
                          //       : backImage
                          //   )
                          // }
                          // src={
                          //   allKycDetail?.backIdUrl
                          //     ? allKycDetail?.backIdUrl
                          //     : backImage
                          // }
                          src={
                            backImage
                              ? backImage
                              : allKycDetail?.backIdUrl
                              ? allKycDetail?.backIdUrl
                              : ""
                          }
                          alt=""
                          width="100%"
                        />
                      </figure>
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body1">Back Side</Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} className={classes.applicationbox}>
          <Typography variant="h6">Applicant Information</Typography>

          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Box className="flexapplication">
                <Typography variant="body1">First Name :</Typography>
                <Typography variant="h5">
                  {auth?.userData?.firstName}
                </Typography>
              </Box>
              <Box className="flexapplication">
                <Typography variant="body1">Last Name :</Typography>
                <Typography variant="h5">{auth?.userData?.lastName}</Typography>
              </Box>
              <Box className="flexapplication">
                <Typography variant="body1">Phone Number :</Typography>
                <Typography variant="h5">{auth?.userData?.phoneNo}</Typography>
              </Box>
              <Box className="flexapplication">
                <Typography variant="body1">Email :</Typography>
                <Typography variant="h5"> {auth?.userData?.email}</Typography>
              </Box>
              <Box className="flexapplication">
                <Typography variant="body1">Full Address :</Typography>
                <Typography variant="h5">{auth?.userData?.address}</Typography>
              </Box>
              {/* <Box className="flexapplication">
                <Typography variant="body1">Company of residence</Typography>
                <Typography variant="h5">
                  {residence ? residence : "-"}
                </Typography>
              </Box> */}
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              {allKycDetail && !isResubmit && (
                <>
                  {/* <Box className="flexapplication">
                    <Typography variant="body1">
                      {" "}
                      <Typography variant="body1">Submitted by</Typography>
                    </Typography>
                    <Typography variant="h5">
                      {auth?.userData?.firstName}
                    </Typography>
                  </Box> */}
                  <Box className="flexapplication">
                    <Typography variant="body1">
                      {" "}
                      <Typography variant="body1">Submitted at :</Typography>
                    </Typography>
                    <Typography variant="h5">
                      {allKycDetail?.createTime
                        ? moment(allKycDetail?.createTime).format("lll")
                        : ""}
                    </Typography>
                  </Box>
                  <Box className="flexapplication">
                    <Typography variant="body1">
                      {" "}
                      <Typography variant="body1">Status :</Typography>
                    </Typography>
                    <Typography variant="h5">
                      {allKycDetail?.documentStatus === "PENDING" && (
                        <Typography variant="h5" style={{ color: "yellow" }}>
                          {/* {allKycDetail?.documentStatus} */}
                          Under review !
                        </Typography>
                      )}
                      {allKycDetail?.documentStatus === "REJECTED" && (
                        <Typography variant="h5" style={{ color: "red" }}>
                          {allKycDetail?.documentStatus}
                        </Typography>
                      )}
                      {allKycDetail?.documentStatus === "APPROVED" && (
                        <Typography variant="h5" style={{ color: "green" }}>
                          {allKycDetail?.documentStatus}
                        </Typography>
                      )}
                      {allKycDetail?.documentStatus === "ACCEPTED" && (
                        <Typography variant="h5" style={{ color: "green" }}>
                          {allKycDetail?.documentStatus}
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                  {allKycDetail?.documentStatus !== "PENDING" && (
                    <Box className="flexapplication">
                      <Typography variant="body1">
                        <span style={{ textTransform: "capitalize" }}>
                          {" "}
                          {allKycDetail?.documentStatus.toLowerCase()}{" "}
                        </span>{" "}
                        at :
                      </Typography>
                      <Typography variant="h5">
                        {allKycDetail?.updateTime
                          ? moment(allKycDetail?.updateTime).format("lll")
                          : ""}
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {(!allKycDetail || isResubmit) && (
        <Box display="flex" py={3}>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              style={{ padding: "8px 36px" }}
              onClick={() => BackPage()}
            >
              Back
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "8px 36px", marginLeft: "10px" }}
            onClick={kycHandler}
            // onClick={() => {
            //   kycHandler();
            //   // NextPage();
            // }}
          >
            Proceed
          </Button>
        </Box>
      )}
      {openResidenceBox && (
        <>
          <Dialog
            open={openResidenceBox}
            onClose={() => setOpenResidenceBox(false)}
            maxWidth="md"
          >
            <DialogContent>
              <img src={residenceImage} style={{ width: "100%" }} alt="" />

              <Cancel
                onClick={() => setOpenResidenceBox(false)}
                style={{
                  position: "absolute",
                  zIndex: "111111111",
                  top: "0",
                  right: "0",
                  cursor: "pointer",
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
      {openSelfieBox && (
        <>
          <Dialog
            open={openSelfieBox}
            onClose={() => setOpenSelfieBox(false)}
            maxWidth="md"
          >
            <DialogContent>
              <img src={selfieImage} style={{ width: "100%" }} alt="" />

              <Cancel
                onClick={() => setOpenSelfieBox(false)}
                style={{
                  position: "absolute",
                  zIndex: "111111111",
                  top: "0",
                  right: "0",
                  cursor: "pointer",
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
      {frontImageBox && (
        <>
          <Dialog
            open={frontImageBox}
            onClose={() => setFrontImageBox(false)}
            maxWidth="md"
          >
            <DialogContent>
              <img src={frontImageDoc} style={{ width: "100%" }} alt="" />

              <Cancel
                onClick={() => setFrontImageBox(false)}
                style={{
                  position: "absolute",
                  zIndex: "111111111",
                  top: "0",
                  right: "0",
                  cursor: "pointer",
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
      {backImageBox && (
        <>
          <Dialog
            open={backImageBox}
            onClose={() => setBackImageBox(false)}
            maxWidth="md"
          >
            <DialogContent>
              <img src={backImageDoc} style={{ width: "100%" }} alt="" />

              <Cancel
                onClick={() => setBackImageBox(false)}
                style={{
                  position: "absolute",
                  zIndex: "111111111",
                  top: "0",
                  right: "0",
                  cursor: "pointer",
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default Step5kyc;
