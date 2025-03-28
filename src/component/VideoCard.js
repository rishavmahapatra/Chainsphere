import { Box, Typography, makeStyles, IconButton } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
const useStyles = makeStyles((theme) => ({
  VideoCardsBox: {
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "10px",
    height: "100%",
    position: "relative",
    transition: "0.5s",
    "&:hover": {
      transform: "translateY(-5px)",
    },
    "& .videocontentBox": {
      padding: "20px",
    },

    "& .description": {
      "& .textEllysis1": {
        height: "25px",
      },

      "& >*": {
        color: "#fff !important",
        wordBreak: "break-word",
        padding: 0,
        margin: 0,
      },
      "& h4": {
        background: "unset !important",
        color: "#fff !important",
        width: "100% !important",
        maxWidth: "100% !important",
        lineHeight: "22px !important",
        padding: 0,
        margin: 0,
      },
      "& h5": {
        background: "unset !important",
        color: "#fff !important",
        width: "100% !important",
        maxWidth: "100% !important",
        lineHeight: "22px !important",
        fontSize: "14px !important",
        padding: 0,
        margin: 0,
      },
      "& h1": {
        background: "unset !important",
        color: "#fff !important",
        width: "100% !important",
        maxWidth: "100% !important",
        lineHeight: "22px  !important",
        fontSize: "14px !important",
        padding: 0,
        margin: 0,
      },
      "& h2": {
        background: "unset !important",
        color: "#fff !important",
        width: "100% !important",
        maxWidth: "100% !important",
        lineHeight: "22px  !important",
        fontSize: "14px !important",
        fontWeight: "400!important",
        padding: 0,
        margin: 0,
      },
      "& h6": {
        background: "unset !important",
        color: "#fff !important",
        width: "100% !important",
        maxWidth: "100% !important",
        lineHeight: "22px  !important",
        fontSize: "14px !important",
        padding: 0,
        margin: 0,
      },
      "& h3": {
        background: "unset !important",
        color: "#fff !important",
        width: "100% !important",
        maxWidth: "100% !important",
        lineHeight: "22px",
        fontSize: "14px !important",
        padding: 0,
        margin: 0,
      },
      "& span": { background: "unset !important", color: "#fff !important" },
      "& p": {
        // height: "105px",
        background: "unset !important",
        color: "#fff !important",
        width: "100% !important",
        maxWidth: "100% !important",
        lineHeight: "22px !important",
        fontSize: "14px !important",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "pre",
        padding: 0,
        margin: 0,
        [theme.breakpoints.down("sm")]: {
          fontSize: "13px !important",
          lineHeight: "21px !important",
        },
      },
    },
  },
  mainimg: {
    width: "100%",
    paddingTop: "15px",
    overflow: "hidden",
    height: "150px !important",
    position: "relative",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
  },
}));

export default function VideoCards({ value, index }) {
  const classes = useStyles();
  const history = useHistory();

  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };

  useEffect(() => {
    updateDimensions();
  }, [value, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <Box
      className={classes.VideoCardsBox}
      onClick={() =>
        history.push({
          pathname: "/videos-details",
          search: value?.id.toString(),
        })
      }
    >
      {/* {value?.imageUrl ? ( */}
      <Box
        id={`imagecard${index}`}
        className={classes.mainimg}
        style={{
          background: "url(" + value?.imageUrl + ")",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!value?.imageUrl && <img alt="" src="images/videos1.png" />}
      </Box>
      {/*    ) : (
        <>
          {value?.videoUrl && (
            <Box style={{ position: "relative" }}>
        <ReactPlayer
                id="myvideo1"
                // url={"https://vimeo.com/819599960?share=copy"}
                url={value?.videoUrl}
                playing={false}
                height="660px"
                width="100%"
                muted={false}
              /> 
            </Box>
          )}
        </>
      )}*/}

      <Box className="videocontentBox">
        <Box mt={1} mb={1}>
          <Typography variant="h5" color="primary" style={{ color: "#fff" }}>
            {value?.title}{" "}
            <span style={{ fontSize: "14px" }}>({value?.language})</span>
          </Typography>
        </Box>
        {value?.description === "" ? (
          ""
        ) : (
          <Typography
            variant="body1"
            style={{ color: "rgba(255, 255, 255, 0.25)", fontSize: "14px" }}
            // className="dmMono"
            className="description"
          >
            <div
              className="textEllysis1"
              dangerouslySetInnerHTML={{
                __html: value?.description,
              }}
            />
          </Typography>
        )}
      </Box>
    </Box>
  );
}
