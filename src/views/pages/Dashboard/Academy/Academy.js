import VideoCard from "src/component/VideoCard";
import { Box, makeStyles, Typography, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import Pagination from "@material-ui/lab/Pagination";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { AuthContext } from "src/context/Auth";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  academyBox: {
    position: "relative",
    "& .MuiInputLabel-outlined": {
      color: "#fff",
    },
    "& .MuiSelect-iconOutlined": {
      color: "#fff",
    },
  },
}));

export default function Academy() {
  const classes = useStyles();
  const [userWalletData, setUserWalletData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [pageSize, setperpage] = useState(1);
  const [filttervideo, setFiltterViedo] = useState(undefined);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const handleChange = (event) => {
    setpage(1);
    setFiltterViedo(event.target.value);
  };
  //academyList
  console.log(" ====== auth?.userData?.status && ", auth?.userData?.status);
  const getWalletHandler = async () => {
    setIsLoading(true);
    if (!auth?.userData?.status) {
      return;
    }
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.academyList,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },

        params: {
          language: filttervideo === "undefined" ? undefined : filttervideo,
          page: page - 1,
          pageSize: 8,
        },
      });

      if (res.data.status === 200) {
        const fileterData = res.data.data.List;
        setUserWalletData(fileterData);
        setperpage(res.data.data.Count / 8);
        console.log("fusfxysfxysu", res.data.data.Count);
        setIsLoading(false);
      } else {
        setUserWalletData([]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getWalletHandler();
  }, [filttervideo, page]);
  const pageCheck = page === 0 ? 10 : 0;
  return (
    <>
      <Box className={classes.academyBox}>
        <Box mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="h1">Videos</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              {auth?.userData?.status && (
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.forminput}
                >
                  {" "}
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Select language
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={filttervideo}
                    onChange={handleChange}
                    label="Select language"
                  >
                    {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                <MenuItem value={"defalut"}>Select language</MenuItem> */}
                    <MenuItem value={"undefined"}>All</MenuItem>
                    <MenuItem value={"English"}>English</MenuItem>
                    <MenuItem value={"Italian"}>Italian</MenuItem>
                    <MenuItem value={"Spanish; Castilian"}>
                      Spanish; Castilian
                    </MenuItem>
                    <MenuItem value={"French"}>French</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Grid>
          </Grid>
        </Box>
        {auth?.userData?.status ? (
          <>
            {" "}
            <Grid container spacing={2}>
              {userWalletData &&
                userWalletData.map((value, index) => (
                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <VideoCard value={value} index={index} />
                  </Grid>
                ))}
              <Box mb={3} display="flex" width={"100%"} justifyContent="center">
                {isLoading && userWalletData.length === 0 && <DataLoader />}
                {!isLoading && userWalletData.length === 0 && (
                  <NodatafoundImage data="No data found" />
                )}
              </Box>
            </Grid>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              {userWalletData.length !== 0 &&
                userWalletData.length >= pageCheck && (
                  <Pagination
                    // count={pageSize}
                    // page={page}
                    // onChange={(e, value) => setpage(value)}
                    count={Math.ceil(pageSize)}
                    page={page}
                    onChange={(e, value) => setpage(value)}
                    s
                  />
                )}
            </Box>
          </>
        ) : (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "65vh",
            }}
          >
            <Typography
              variant="body1"
              style={{
                color: "rgba(255, 255, 255, 0.77)",
                fontSize: "16px",
                paddingBottom: "8px",
              }}
              // className="dmMono"
              className="description"
            >
              To access Fieres Academy, please buy Fiero
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => history.push("/dashboard")}
            >
              Buy Fiero
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
