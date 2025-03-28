import { Box, makeStyles, Paper, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Step1Kyc from "./Step1kyc";
import Step2kyc from "./Step2kyc";
import LinearProgress from "@material-ui/core/LinearProgress";
import Step3kyc from "./Step3kyc";
import Step4kyc from "./Step4kyc";
import Step5kyc from "./Step5kyc";
import Step6kyc from "./Step6kyc";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { AuthContext } from "src/context/Auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import KycInfromation from "src/component/KycInfromation";

const useStyles = makeStyles((theme) => ({
  KycMainContainer: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "30px",
    [theme.breakpoints.down("xs")]: {
      padding: "15px",
    },
    "& h1": {
      color: "#fff",
    },
    "& h5": {
      color: "#fff",
    },
    "& .subHeadKyc": {
      padding: "20px 0px 5px",

      "& span": {
        color: "#9d9d9d",
        paddingLeft: "20px",
        fontWeight: "300",
      },
    },
    "& .componentCallBox": {
      padding: "20px 0px",
    },
    "& .mainflex": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
  },
}));
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#FFFFFF14",
  },
  bar: {
    borderRadius: 5,
    background: "#FF564D",
  },
}))(LinearProgress);
export default function () {
  const classes = useStyles();
  const [tabView, setTabView] = useState("step1");
  const [progressData, setProgressData] = useState("10");
  const [headingData, setHeadingData] = useState("Basic Information");
  const [timeData, settimeData] = useState("1");
  const [sourceIncome, setsourceIncome] = useState("");
  const [occupationType, setOccupationType] = useState("");
  const [documentType, setDocumentType] = useState("0");
  const [documentNumber, setDocumentNumber] = useState("");

  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [profileImageFront, setProfileImageFront] = useState("");
  const [frontProfileImage64, setFrontProfileImage64] = useState("");
  const [profileImageBack, setProfileImageBack] = useState("");
  const [backProfileImage64, setBackProfileImage64] = useState("");
  const [selfieImageFront, setSelfieImageFront] = useState("");
  const [selfieImage64, setSelfieImage64] = useState("");
  const [selfie, setSelfie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [residenceImage, setResidenceImage] = useState("");
  const [residenceImage64, setResidenceImage64] = useState("");
  const [residence, setResidence] = useState("");
  const [allKycDetail, setAllKycDetail] = useState("");
  const [previousDetails, setPreviousDetails] = useState("");
  const auth = useContext(AuthContext);
  const [isResubmit, SetIsResubmit] = useState(false);
  const history = useHistory();
  const [openApplicationModal, setOpenApplicationModal] = useState(false);
  const handleClose = () => {
    setOpenApplicationModal(false);
  };
  const [isUploadingImage, SetIsUploadingImage] = useState({
    back: false,
    front: false,
  });
  const props = {
    setTabView,
    setProgressData,
    setHeadingData,
    settimeData,
  };

  const handleFormSubmit = async () => {
    setIsSubmit(true);
    if (
      // sourceIncome != "" &&
      // occupationType != "" &&
      documentNumber != "" &&
      documentType != ""
    ) {
      // setIsSubmit(false);
      setTabView("step2");
      setProgressData("20");
      setHeadingData("Upload Documents");
      settimeData("2");
    }
  };

  const NextPage = () => {
    if (tabView === "step2") {
      setTabView("step3");
      setProgressData("36");
      setHeadingData("Upload selfie");
      settimeData("3");
    }
    if (tabView === "step3") {
      setTabView("step4");
      setProgressData("52");
      setHeadingData("Proof of residence");
      settimeData("4");
    }
    if (tabView === "step4") {
      setTabView("step5");
      setProgressData("68");
      setHeadingData("Application in Progress");
      settimeData("5");
    }
    if (tabView === "step5") {
      setTabView("step6");
      setProgressData("84");
      setHeadingData("Details Confirmation");
      settimeData("6");
    }
    if (tabView === "step6") {
      setTabView("step5");

      setProgressData("100");
      setHeadingData("Details Confirmation");
      settimeData("5");
    }
  };
  const handleUploadImageFront = async (file) => {
    try {
      const uploadDataImage = new FormData();
      uploadDataImage.append("file", profileImageFront);
      SetIsUploadingImage({ ...isUploadingImage, front: true });
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadfile,
        data: uploadDataImage,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setFrontImage(res.data.data);
        SetIsUploadingImage({ ...isUploadingImage, front: false });
      } else {
      }
    } catch (err) {
      console.log(err);
      SetIsUploadingImage({ ...isUploadingImage, front: false });
    }
  };
  useEffect(() => {
    if (profileImageFront) {
      handleUploadImageFront();
    }
  }, [profileImageFront]);
  const handleUploadImageBack = async (file) => {
    try {
      const uploadDataImage = new FormData();
      uploadDataImage.append("file", profileImageBack);
      SetIsUploadingImage({ ...isUploadingImage, back: true });
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadfile,
        data: uploadDataImage,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setBackImage(res.data.data);
        SetIsUploadingImage({ ...isUploadingImage, back: false });
      } else {
      }
    } catch (err) {
      console.log(err);
      SetIsUploadingImage({ ...isUploadingImage, back: false });
    }
  };
  useEffect(() => {
    if (profileImageBack) {
      handleUploadImageBack();
    }
  }, [profileImageBack]);
  const handleUploadSelfie = async (file) => {
    try {
      const uploadDataImage = new FormData();
      uploadDataImage.append("file", selfieImageFront);
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadfile,
        data: uploadDataImage,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setSelfie(res.data.data);
        setIsLoading(false);
      } else {
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (selfieImageFront) {
      handleUploadSelfie();
    }
  }, [selfieImageFront]);
  const handleUploadResidence = async (file) => {
    try {
      const uploadDataImage = new FormData();
      uploadDataImage.append("file", residenceImage);
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadfile,
        data: uploadDataImage,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setResidence(res.data.data);
        setIsLoading(false);
      } else {
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (residenceImage) {
      handleUploadResidence();
    }
  }, [residenceImage]);
  const kycHandler = async () => {
    setIsLoading(true);
    const documents = {
      document: [
        {
          backIdUrl: backImage,
          // createTime: "string",
          docIdNumber: "string",
          docName: documentType,
          documentId: 0,
          documentNumber: documentNumber.toString(),
          documentStatus: "ACCEPTED",
          frontIdUrl: frontImage,
          incomeSource: sourceIncome,
          latest: true,
          occupation: occupationType,
          reason: "string",
          residenceProof: residence,
          selfieUrl: selfie,
          // updateTime: "string",
        },
      ],
    };
    try {
      const res = await axios({
        url: ApiConfig.savekycdetails,
        method: "POST",
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        data: documents,
      });
      if (res.data.status === 200) {
        SetIsResubmit(false);
        setIsLoading(false);
        auth.getProfileHandler(sessionStorage.getItem("token"));
        setOpenApplicationModal(true);
        toast.success("Your kyc submitted successfully");
      } else {
        setIsLoading(false);
        SetIsResubmit(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      if (error) {
        toast.error(error.res.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const viewKycDetailHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getkycdetails,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });

      if (res.data.status === 200) {
        setAllKycDetail(res.data.data.document[0]);
        setPreviousDetails(
          res.data.data.document.length > 1 ? res.data.data.document[1] : false
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.userData && auth?.userData?.kyc?.kycStatus) {
      viewKycDetailHandler();
    } else {
      setAllKycDetail();
      SetIsResubmit(false);
    }
  }, [auth?.userData]);
  const kycReSubmit = () => {
    SetIsResubmit(true);
  };

  return (
    <Box className={classes.MainKycBox}>
      <Paper elevation={2} className={classes.KycMainContainer}>
        <Box className="mainflex">
          <Typography variant="h1" color="primary">
            KYC
          </Typography>
          <Box>
            {auth?.userData &&
              auth?.userData?.kyc?.document[0]?.documentStatus === "REJECTED" &&
              !isResubmit && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={kycReSubmit}
                  >
                    Re Submit
                  </Button>
                </Box>
              )}
          </Box>
        </Box>
        {auth?.userData?.kyc?.document[0]?.documentStatus !== "ACCEPTED" &&
          auth?.userData?.kyc?.document[0]?.documentStatus !== "PENDING" && (
            <>
              <Box className="subHeadKyc">
                <Typography variant="h5" color="primary">
                  {headingData}
                  <span>{timeData} of 6</span>
                </Typography>
              </Box>

              <BorderLinearProgress
                variant="determinate"
                value={progressData}
              />
            </>
          )}

        <Box mt={1} style={{ wordBreak: "break-word" }}>
          <Box>
            {auth?.userData ? (
              auth?.userData?.kyc?.document[0]?.documentStatus === "PENDING" ? (
                <Typography variant="body1" style={{ color: "#9d9d9d" }}>
                  Your KYC request is{" "}
                  <span style={{ color: "yellow" }}>under review !</span>
                </Typography>
              ) : auth?.userData?.kyc?.document[0]?.documentStatus ===
                "REJECTED" ? (
                <>
                  <Typography variant="body1" style={{ color: "#9d9d9d" }}>
                    `Your KYC request has been{" "}
                    <span style={{ color: "red" }}>rejected. </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "#9d9d9d", wordBreak: "break-word" }}
                  >
                    Reason : {allKycDetail?.reason}`
                  </Typography>
                </>
              ) : (
                <>
                  {auth?.userData?.kyc === null ? (
                    <>
                      <Typography variant="body1" style={{ color: "#9d9d9d" }}>
                        "Review your details and documents uploaded as they
                        appear in your KYC Application."
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" style={{ color: "#9d9d9d" }}>
                        Your KYC request has been{" "}
                        <span style={{ color: "green" }}>Approved!</span>
                      </Typography>
                    </>
                  )}
                </>
              )
            ) : (
              <Typography variant="body1" style={{ color: "#9d9d9d" }}>
                "Enter your details as they appear on your identification
                document."
              </Typography>
            )}
          </Box>
        </Box>
        {allKycDetail && !isResubmit ? (
          <Box className="componentCallBox">
            <Step5kyc
              NextPage={NextPage}
              {...props}
              kycHandler={kycHandler}
              allKycDetail={allKycDetail}
              frontImage={frontImage}
              documentType={documentType}
              backImage={backImage}
              residence={residence}
              occupationType={occupationType}
              sourceIncome={sourceIncome}
              documentNumber={documentNumber}
              isResubmit={isResubmit}
              selfie={selfie}
              previousDetails={previousDetails}
            />
          </Box>
        ) : (
          <>
            <Box className="componentCallBox">
              {tabView === "step1" && (
                <Step1Kyc
                  {...props}
                  isSubmit={isSubmit}
                  handleFormSubmit={handleFormSubmit}
                  sourceIncome={sourceIncome}
                  setsourceIncome={setsourceIncome}
                  occupationType={occupationType}
                  setOccupationType={setOccupationType}
                  documentType={documentType}
                  setDocumentType={setDocumentType}
                  documentNumber={documentNumber}
                  setDocumentNumber={setDocumentNumber}
                />
              )}
              {tabView === "step2" && (
                <Step2kyc
                  {...props}
                  NextPage={NextPage}
                  profileImageFront={profileImageFront}
                  setProfileImageFront={setProfileImageFront}
                  isUploadingImage={isUploadingImage}
                  frontProfileImage64={frontProfileImage64}
                  setFrontProfileImage64={setFrontProfileImage64}
                  profileImageBack={profileImageBack}
                  setProfileImageBack={setProfileImageBack}
                  backProfileImage64={backProfileImage64}
                  setBackProfileImage64={setBackProfileImage64}
                  documentType={documentType}
                />
              )}
              {tabView === "step3" && (
                <Step3kyc
                  {...props}
                  NextPage={NextPage}
                  selfieImageFront={selfieImageFront}
                  setSelfieImageFront={setSelfieImageFront}
                  selfieImage64={selfieImage64}
                  setSelfieImage64={setSelfieImage64}
                  isLoading={isLoading}
                  documentType={documentType}
                />
              )}
              {tabView === "step4" && (
                <Step4kyc
                  NextPage={NextPage}
                  {...props}
                  residenceImage={residenceImage}
                  setResidenceImage={setResidenceImage}
                  residenceImage64={residenceImage64}
                  setResidenceImage64={setResidenceImage64}
                  isLoading={isLoading}
                  documentType={documentType}
                />
              )}
              {tabView === "step5" && (
                <Step5kyc
                  NextPage={NextPage}
                  {...props}
                  kycHandler={kycHandler}
                  allKycDetail={allKycDetail}
                  frontImage={frontImage}
                  documentType={documentType}
                  backImage={backImage}
                  residence={residence}
                  occupationType={occupationType}
                  sourceIncome={sourceIncome}
                  documentNumber={documentNumber}
                  isResubmit={isResubmit}
                  selfie={selfie}
                  previousDetails={previousDetails}
                />
              )}
              {tabView === "step6" && (
                <Step6kyc NextPage={NextPage} {...props} />
              )}
            </Box>
          </>
        )}
      </Paper>
      <KycInfromation
        handleClose={handleClose}
        openApplicationModal={openApplicationModal}
      />
    </Box>
  );
}
