import React, { useState, useEffect } from "react";
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
const useStyles = makeStyles(() => ({
  mainTermsContainer: {
    padding: "50px 0px",
    "& p": {
      padding: "6px 0px",
      color: "#fff",
      wordBreak: "break-word",
    },
  },
}));
export default function RiskDisclosure() {
  const classes = useStyles();
  const [privacyData, setPrivacyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPrivacyDataHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getstaticpage,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          pageKey: "Risk_Disclouser",
        },
      });
      if (res.data.status === 200) {
        setPrivacyData(res.data.data);
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
    getPrivacyDataHandler();
  }, []);
  return (
    <Box className={classes.mainTermsContainer}>
      <Container>
        <Box className="paperBox">
          {!isLoading && privacyData && privacyData.length === 0 && (
            <Typography variant="h1">Risk Disclosure</Typography>
          )}

          {isLoading ? (
            <Box>
              <DataLoader />
            </Box>
          ) : (
            <>
              {!isLoading && privacyData && privacyData.length === 0 ? (
                <Box mt={1}>
                  <NodatafoundImage />
                </Box>
              ) : (
                <>
                  <Box>
                    <Typography variant="h1">
                      {privacyData?.pageKey == "Risk_Disclouser"
                        ? "Risk Disclosure"
                        : "-"}
                    </Typography>
                  </Box>
                  <Box pt={2}>
                    <Typography variant="body1">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: privacyData?.pageData,
                        }}
                      />
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
