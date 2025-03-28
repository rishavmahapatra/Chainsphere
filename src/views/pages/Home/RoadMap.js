import React from "react";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  mainroad: {
    "& .timlineBox": {
      "& p": {
        color: "#fafafa",
      },
    },
    "& h5": {
      color: "rgba(255, 255, 255, 0.87)",
      fontWeight: "300",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px !important",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px !important",
      },
    },
    "& h3": {
      fontSize: "16px",
      fontWeight: "600",
      fontFamily: "Good Times W00 Bold",
      color: " rgba(255, 255, 255, 0.6)",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px !important",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px !important",
      },
    },
  },
  roadmapboxes: {
    position: "relative",
    zIndex: "9",
    "& h1": {
      marginBottom: "16px",
      fontSize: "30px",
    },
    "& .timlineBox": {
      "& p": {
        color: "#fafafa",
      },
    },
    "& p": {
      fontWeight: "300",
      fontSize: "16px",
      color: "#fff",
      width: "100%",
      maxWidth: "651px",
      marginBottom: "100px",
    },
  },
}));
function RoadMap(props) {
  const classes = useStyles();
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    className: "recomended",
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
    ],
  };
  return (
    <Box className={classes.mainroad}>
      <Box className="roadmappage" pt={5} pb={6}>
        <Container maxWidth="lg">
          <Box className={classes.roadmapboxes} mb={5}>
            <Typography variant="h1">See the roadmap of fieres</Typography>
            {/* <Typography variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. galley of type and scrambled it to make a type specimen
              book.
            </Typography> */}
          </Box>
          <Slider {...settings} className="roadmapslider">
            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 3</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2023
                  </Typography>
                </Box>

                <Typography variant="body2">
                  Launch of Fieres Blockchain
                </Typography>
                <Typography variant="body2">Blockchain website</Typography>
                <Typography variant="body2">Exchange listing</Typography>
                {/* <Typography variant="body2">ICO platform</Typography>
                <Typography variant="body2">White paper launch</Typography> */}
                {/* <Typography variant="body2">
                  Cross-chain bridge application
                </Typography>
                <Typography variant="body2">Exchange listing</Typography> */}
              </div>
            </div>
            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 2</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2023
                  </Typography>
                </Box>
                <Typography variant="body2">NFT Marketplace</Typography>
                <Typography variant="body2">ICO Platform</Typography>
              </div>
            </div>

            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 1</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2024
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Cross-chain bridge application
                </Typography>
              </div>
            </div>

            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 4</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2023
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  style={{
                    marginTop: "5px",
                  }}
                >
                  DEX launch with GraphQL, token creator,staking and IDO
                  launchpad
                </Typography>
                <Typography variant="body2">Stablecoin</Typography>
                <Typography variant="body2">
                  Decentralised Affiliate/Referral Marketing Platform based
                  rewards system linked with all other applications created in
                  the fieres ecosystem.
                </Typography>
              </div>
            </div>

            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 3</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2024
                  </Typography>
                </Box>

                <Typography variant="body2">
                  Play 2 Earn Game launch (Racing and strategy-based game
                  utilising all NFT collections) created and sold as Generattive
                  NFTS)
                </Typography>
                <Typography variant="body2">Centralised Exchange</Typography>
                <Typography variant="body2">
                  Web3 Domains and Identitiies Decentralised Wallet
                </Typography>
              </div>
            </div>

            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 2</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2024
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Metaverse virtual store platform with over 1000 templates for
                  businesses to sell their physical items.
                </Typography>
              </div>
            </div>
            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 1</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2025
                  </Typography>
                </Box>

                <Typography variant="body2">
                  Metaverse meeting/convention platform enabled wit hVR
                  compatibility.
                </Typography>
              </div>
            </div>
            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 4</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2024
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Metaverse Music platform
                </Typography>
              </div>
            </div>

            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 3 </Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2025
                  </Typography>
                </Box>

                <Typography variant="body2">
                  Remittance-based application utilising stablecoin created on
                  Fieres Blockchain for easing creoss-border remittances.
                  continued ...
                </Typography>
              </div>
            </div>

            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 2 </Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2025
                  </Typography>
                </Box>
                <Typography variant="body2">Tbc</Typography>
              </div>
            </div>

            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 2</Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2023
                  </Typography>
                </Box>

                <Typography variant="body2">Tbc</Typography>
              </div>
            </div>
            <div className="sliderBox">
              <Box className="circle circle1"></Box>
              <div className="timlineBox">
                <Box className="year-text">
                  <Typography variant="h3">QUARTER 4 </Typography>
                  <Box className="line"></Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Good Times W00 Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    2025
                  </Typography>
                </Box>
                <Typography variant="body2">NFT Marketplace</Typography>
                <Typography variant="body2">ICO Platform</Typography>
              </div>
            </div>
          </Slider>
        </Container>
      </Box>
    </Box>
  );
}

export default RoadMap;
