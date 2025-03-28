import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";

import Landing from "src/component/Landing";

import IcoCrypto from "./IcoCrypto";
import ChooseToken from "./ChooseToken";
import Tokenomics from "./Tokenomics";
import Stages from "./Stages";
import RoadMap from "./RoadMap";
import ConnectUs from "./ConnectUs";
import FAQ from "./FAQ";
import { useLocation } from "react-router-dom";
import Scroll from "react-scroll";
import Banner from "./Banner";
import Cani from "./Cani";
import Coures from "./Coures";
import Bitcoin from "./Bitcoin";
import Heading from "./Heading";
import Topics from "./Topics";
// import PresaleCard from "src/component/PresaleCard";

function Home(props) {
  const location = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
      let param = searchParams.get("id");
      const getdiv = document.getElementById(param);
      const ofsetTop = getdiv.offsetTop - 30;
      console.log(ofsetTop);
      var scroll = Scroll.animateScroll;
      scroll.scrollTo(ofsetTop, param);
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Page title="Chainsphere">
      <Box style={{ position: "relative" }}>
        <div id="home">
          {/* <Banner /> */}
        </div>
        <Landing />
        {/* <PresaleCard /> */}

        {/* <div>
          <Cani />
        </div>
        <div>
          <Coures />
        </div>
        <div>
          <Bitcoin />
        </div>

        <div>
          <Heading />
        </div>

        <div>
          <Topics />
        </div> */}
        {/* <FAQ /> */}
        {/* <Box>
          <div id="icocrypto">
            <IcoCrypto />
          </div>
          <img src="images/netwrap.png" alt="" className="shadeBoxImg" />
          <div id="choosetoken">
            <ChooseToken />
          </div>
          <div id="tokenoimics">
            <Tokenomics />
          </div>
        </Box> */}

        {/* <Stages />
        <div id="roadmap">
          <RoadMap />
        </div> */}

        {/*   <ConnectUs />
        <FAQ /> */}
      </Box>
    </Page>
  );
}

export default Home;
