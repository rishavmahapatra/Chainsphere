import {
  Box,
  Typography,
  makeStyles,
  Divider,
  IconButton,
  Grid,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
const useStyles = makeStyles((theme) => ({
  WhitepaperBox: {
    "& h1": {
      textAlign: "center",
    },
    "& .whiteminBox1": {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      padding: "60px 20px 1px",
      marginRight: "25px",
      height: "auto",
      minHeight: "122px",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0px",
      },
      "& img": {
        width: "100%",
        maxWidth: "50px",
      },
    },
    "& .displayBox": {
      display: "flex",
      alignItems: "center",
    },
    "& .typoBox": {
      padding: "0px 80px 0px 50px",
    },
    "& .topBox": {
      paddingTop: "50px",
    },
  },
}));
const whitePaperCard = [
  {
    img1: "images/whitepaper1.png",
    language: "English",
  },
  {
    img1: "images/whitepaper2.png",
    language: "French",
  },
];
export default function Whitepaper() {
  const classes = useStyles();
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const whitePaperDataList = async () => {
    setIsLoading(true);

    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.listWhitepaper,
      });

      if (res.data.status === 200) {
        setListData(res.data.data);
        setIsLoading(false);
      }
      if (res.data.status === 205) {
        setIsLoading(false);
        setListData([]);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    whitePaperDataList();
  }, []);

  return (
    <Box className="paperBox">
      <Box className={classes.WhitepaperBox}>
        <Typography variant="h1">Whitepaper</Typography>
        <Box align="center" className="topBox">
          <Box style={{ maxWidth: "900px" }}>
            <Grid container spacing={5}>
              {listData &&
                listData.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={6}>
                      <Box height="100%">
                        <Box className="whiteminBox1">
                          <Box className="displayBox">
                            <img src={data?.img1} alt="" />
                            <Box className="typoBox">
                              <Typography variant="h4">
                                {data?.language}
                              </Typography>
                            </Box>
                          </Box>

                          <Box mt={2}>
                            <Divider
                              style={{ background: "rgba(255, 255, 255, 0.2)" }}
                            />
                          </Box>
                          <a
                            href={data?.file}
                            target="_blank"
                            style={{ width: "100%" }}
                          >
                            <IconButton>
                              <BsDownload style={{ color: "#FF564D" }} />
                            </IconButton>
                          </a>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
            {!isLoading && listData && listData.length === 0 && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <NodatafoundImage data={"No data found"} />
              </Box>
            )}
            {isLoading && <DataLoader />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
