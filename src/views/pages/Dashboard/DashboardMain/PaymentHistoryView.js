import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { sortAddress } from "src/utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
import { Pagination } from "@material-ui/lab";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import PaymentDetailView from "src/component/PaymentDetailView";

const useStyles = makeStyles((theme) => ({
  tablemain: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    marginTop: "24px",
  },
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
  tableboxmain: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    marginTop: "24px",
  },
}));

export default function PaymentHistoryView({}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewData1, setViewData1] = useState("");
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [page1, setPage1] = useState(1);
  const [pagesCount1, setPagesCount1] = useState(1);

  const handleClickOpen = (data) => {
    setOpen(true);
    setViewData1(data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getpaymentlistHandler = async () => {
    setIsLoading1(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getpaymentlist,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          page: page1 - 1,
          pageSize: 10,
        },
      });

      if (res.data.status === 200) {
        setPaymentHistoryData(res.data.data.list);
        setPagesCount1(res.data.data.count / 10);
        setIsLoading1(false);
      } else {
        setIsLoading1(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading1(false);
    }
  };
  useEffect(() => {
    getpaymentlistHandler();
  }, [page1]);

  return (
    <Box className={classes.tablemain}>
      <Typography variant="h1">Payment History</Typography>

      <Box mt={2} width="100%">
        <TableContainer>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>S. No</TableCell>

                <TableCell>Asset Amount</TableCell>

                <TableCell>Pay Address</TableCell>
                <TableCell>Pay Currency</TableCell>
                <TableCell>Payment Id</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>
                  Price Amount{" "}
                  {/* <SwapVertIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => sortAmountHandler(paymentHistoryData)}
                  /> */}
                </TableCell>
                <TableCell>Price Currency</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistoryData &&
                paymentHistoryData?.map((data, i) => (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      {data?.assetAmont ? data?.assetAmont : "-"}
                    </TableCell>

                    <TableCell>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box>
                          {data?.payAddress
                            ? sortAddress(data?.payAddress)
                            : "-"}
                        </Box>
                        <Box>
                          {data?.payAddress ? (
                            <CopyToClipboard text={data?.payAddress}>
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
                    <TableCell style={{ textTransform: "uppercase" }}>
                      {data?.payCurrency ? data?.payCurrency : "-"}
                    </TableCell>
                    <TableCell>
                      {data?.paymentId ? data?.paymentId : "-"}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {data?.paymentStatus ? data?.paymentStatus : "-"}
                    </TableCell>
                    <TableCell>
                      {data?.priceAmount ? data?.priceAmount : "-"}
                    </TableCell>
                    <TableCell style={{ textTransform: "uppercase" }}>
                      {data?.priceCurrency ? data?.priceCurrency : "-"}
                    </TableCell>

                    <TableCell
                      onClick={() => handleClickOpen(data)}
                      style={{
                        textDecoration: "underline",
                        color: "rgb(255, 86, 77)",
                        cursor: "pointer",
                      }}
                    >
                      view
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading1 && <DataLoader />}
        {!isLoading1 &&
          paymentHistoryData &&
          paymentHistoryData.length === 0 && (
            <NodatafoundImage data={"No transactions found"} />
          )}
        {paymentHistoryData.length > 0 && (
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
                count={Math.ceil(pagesCount1)}
                page={page1}
                onChange={(e, value) => setPage1(value)}
              />
            </Box>
          </>
        )}
        <PaymentDetailView
          open={open}
          handleClose={handleClose}
          viewData1={viewData1}
        />
      </Box>
    </Box>
  );
}
