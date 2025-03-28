import React, { useState, Fragment, useEffect } from "react";
import {
  Box,
  makeStyles,
  Grid,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { getEmbedId, URLTester } from "src/utils";
import DataLoader from "src/component/DataLoader";
import ReactPlayer from "react-player";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
const useStyles = makeStyles((theme) => ({
  videosDetailsBox: {
    position: "relative",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.02)",
    borderRadius: "15px",
    margin: "15px 0px",
    zIndex: 1,
    "& .ContentSection": {
      padding: "20px 0px",
      "& .ContentBox": {
        paddingTop: "15px",
        "& h6": {
          color: "rgba(255, 255, 255, 0.6)",
          marginTop: "35px",
          fontSizeL: "14px",
        },
      },
    },
  },
  imgbox: {
    textAlign: "center",
    width: "100%",
    backgroundColor: "#0000",
    boxSizing: "border-box",
    borderImageSlice: "1",
    // overflow: "hidden",
    position: "relative",
  },
  videobox: {
    width: "100%",
    position: "relative",
    zIndex: "9",
    height: "100%",
    background: "#000",
  },
}));

function VideosDetails() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [newsData, setNewsData] = useState("");
  function URLTester(videoURL) {
    console.log(" ----- videoURL ", videoURL.videoUrl);
    try {
      const isWatch = videoURL?.videoUrl?.includes("watch?v=");
      console.log(" ----- videoURL ", isWatch);
      if (isWatch) {
        const splittedURL = videoURL?.videoUrl?.split("watch?v=");
        const newUrl = `${splittedURL[0]}embed/${splittedURL[1]}`;
        console.log(" ----- videoURL newUrl ", newUrl);
        return newUrl;
      } else {
        return videoURL;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // const videoId = getId(`${newsData?.videoUrl}`);
  const [userWalletData, setUserWalletData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [page, setpage] = useState(0);
  const [pageSize, setperpage] = useState(10);
  //academyList

  const getWalletHandler = async (idd) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getTutorial,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          id: idd,
        },
      });

      if (res.data.status === 200) {
        const fileterData = res.data.data;
        setUserWalletData(fileterData);
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
    let idd = window.location.search.split("?")[1];
    getWalletHandler(idd);
  }, [window.location.search]);
  return (
    <Box className={classes.videosDetailsBox}>
      <Box className={classes.imgbox}>
        {/* <video
          controls="true"
          autoplay="true"
          loop
          //   muted
          playsinline="true"
          className={classes.videobox}
          // style={{ width: "100%", height: "400px" }}
        >
          <source src={userWalletData.videoUrl} type="video/mp4" />
        </video> 
        {/* <iframe
          // className={classes.videobox}
          width="100%"
          height="600px"
          frameborder="0"
          src={userWalletData?.videoUrl ? URLTester(userWalletData) : ""}
        ></iframe> */}
        {/* <Button
          className={
            video?.mediaUrl?.toLowerCase() === data?.mediaUrl?.toLowerCase()
              ? classes.btnActive
              : classes.btnNotActive
          }
          onClick={() => setVideo(data)}
        >
          Part {i + 1} 
        </Button>*/}
        <Box style={{ position: "relative" }}>
          <ReactPlayer
            id="myvideo"
            url={userWalletData.videoUrl}
            playing={true}
            height="660px"
            width="100%"
            muted={false}
            controls={true}
          />
          {/* <IconButton
            variant="contained"
            color="primary"
            style={{
              position: "absolute",
              right: "0px",
              top: "0px",
            }}
          >
            <FullscreenIcon fontSize="large" />
          </IconButton> */}
        </Box>

        {/* )} */}
      </Box>
      <Box className="ContentSection">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="headingBox">
              <Typography variant="h3">{userWalletData?.title}</Typography>
            </Box>
            <Box className="ContentBox">
              <Typography variant="body2">
                <div
                  className="textEllysis1"
                  dangerouslySetInnerHTML={{
                    __html: userWalletData?.description,
                  }}
                />
              </Typography>
            </Box>

            <Box align="left" mt={2}>
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                // onClick={() => downloadPdfHandler(newsData?.pdfLink)}
                onClick={() => window.open(userWalletData.link)}
              >
                Videos Link
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default VideosDetails;
