import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import { makeStyles } from "@material-ui/core/styles";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { AuthContext } from "src/context/Auth";
import { Pagination } from "@material-ui/lab";
import Axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { toast } from "react-toastify";
import { sortAddress } from "src/utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
const useStyles = makeStyles((theme) => ({
  table: {
    overflow: "auto",
  },
  tableRow1: {
    "& td": {
      whiteSpace: "nowrap",
      color: "#000",
    },
    "& th": {
      whiteSpace: "pre",
      color: "#000",
    },
  },
  arrowup: {
    backgroundColor: "#4be62e",
    color: "#ffffff",
    width: " 38px",
    height: " 38px",
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },
  arrowup1: {
    backgroundColor: "#f1c232",
    color: "#fff",
    width: " 38px",
    height: " 38px",
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },
  arrowup2: {
    backgroundColor: "#1a5b1f",
    color: "#fff",
    width: " 38px",
    height: " 38px",
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },
  arrowup3: {
    backgroundColor: "#6aa84f",
    color: "#fff",
    width: " 38px",
    height: " 38px",
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },

  arrowdown: {
    backgroundColor: "#20BFA9",
    color: "#fff",
    width: " 38px",
    height: " 38px",
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },
  tablemain: {},
}));

export default function TransactionTable(props) {
  const {
    listTransactionData,
    isLoading,
    data,
    pagesCount,
    page,
    setPage,
    currentvalue,
    pStatus,
  } = props;
  const moreRef = useRef(null);
  const auth = useContext(AuthContext);
  // const userdata = auth?.userData ? auth?.userData : "";
  // const [coinWithWalletAddress, setCoinWithWalletAddress] = useState([]);
  const classes = useStyles();

  // const AllCoinWithWalletAddress = async (id) => {
  //   // setIsLoading(true);

  //   try {
  //     const res = await Axios.get(ApiConfig.getAllCoinWithWalletAddress, {
  //       headers: {
  //         authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
  //       },
  //       params: {
  //         fkUserId: userdata?.userId,
  //       },
  //     });
  //     if (res.data.status === 200) {
  //       setCoinWithWalletAddress(res.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (userdata?.userId) {
  //     AllCoinWithWalletAddress();
  //   }
  // }, [userdata?.userId]);
  return (
    <Box className={classes.tablemain}>
      <Box mt={2} width="100%">
        <TableContainer>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Type</TableCell>
                <TableCell>Transaction ID</TableCell>
                {pStatus && <TableCell>Transaction Hash</TableCell>}{" "}
                <TableCell>Amount(Chainsphere)</TableCell>
                {/* {currentvalue !== "CLAIM" && (
                  <TableCell>Last Fiero Price (In USD)</TableCell>
                )} */}
                <TableCell>Coin Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(pStatus)}
              {listTransactionData &&
                listTransactionData?.map((data, i) => (
                  <TableRow>
                    <TableCell>{data?.txnType ? data?.txnType : "-"}</TableCell>
                    {pStatus && (
                      <TableCell>{data?.txnId ? data?.txnId : "-"}</TableCell>
                    )}
                    <TableCell>
                      <Box style={{ display: "flex" }}>
                        <Box>
                          {data?.txnHash ? sortAddress(data?.txnHash) : "-"}
                        </Box>
                        <Box>
                          {data?.txnHash ? (
                            <CopyToClipboard text={data?.txnHash}>
                              <BiCopy
                                style={{
                                  color: "rgb(255, 86, 77)",
                                  fontSize: " 14px",
                                  cursor: "pointer",
                                  marginLeft: "5px",
                                }}
                                onClick={() =>
                                  toast.success("Copied successfully")
                                }
                              />
                            </CopyToClipboard>
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell> {data?.amount ? data?.amount : "0"}</TableCell>
                    {/* {currentvalue !== "CLAIM" && (
                      <TableCell>
                        {data?.transactionType === "NEW"
                          ? data?.lastFieroPrice
                          : data?.lastFieroPrice
                          ? parseFloat(
                              1 / Number(data?.lastFieroPrice)
                            ).toFixed(2)
                          : "-"}
                      </TableCell>
                    )} */}
                    <TableCell>
                      <Box style={{ textTransform: "uppercase" }}>
                        {data?.coinType === "TRX" ? (
                          "REH"
                        ) : (
                          <>
                            {data?.status === "SUCCESS"
                              ? "REH"
                              : data?.coinType}
                          </>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {" "}
                      {data?.status === "CONFIRM" ? (
                        "CONFIRMED"
                      ) : (
                        <>
                          {data?.status === "SUCCESS" ? (
                            "SUCCESSFUL"
                          ) : (
                            <>{data?.status === "PENDING" ? "PENDING" : ""}</>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {data?.txnTime ? moment(data.txnTime).format("lll") : "0"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
        {isLoading && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <DataLoader />
          </Box>
        )}
        {!isLoading &&
          listTransactionData &&
          listTransactionData.length === 0 && (
            <Box pt={2}>
              <NodatafoundImage data={"No transactions found"} />
            </Box>
          )}
        {listTransactionData.length > 0 && (
          <>
            <Box
              mb={2}
              mt={2}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Pagination
                count={Math.ceil(pagesCount)}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
