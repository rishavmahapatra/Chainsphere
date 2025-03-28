import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import { makeStyles } from "@material-ui/core/styles";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { toast } from "react-toastify";
import { sortAddress } from "src/utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import OrderDetailView from "src/component/OrderDetailView";
import NodatafoundImage from "src/component/NoDataFound";
import DataLoader from "src/component/DataLoader";
import { Pagination } from "@material-ui/lab";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import { AuthContext } from "src/context/Auth";
import { useHistory } from "react-router-dom";

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
  tablemain: {
    background: "rgba(255, 255, 255, 0.025)",
    borderRadius: "15px",
    padding: "20px",
    marginTop: "24px",
  },
}));

export default function OrderHistoryView({}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState("");
  const [orderlistData, setOrdeListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const auth = useContext(AuthContext);
  const UserdataId = auth?.userData ? auth?.userData : "";
  const history = useHistory();
  const handleClickOpen = (data) => {
    setOpen(true);
    setViewData(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const listOrderHistory = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.orderhistorylist,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          page: page - 1,
          pageSize: 10,
          type: "BUY_TOKEN",
          fkUserId: UserdataId?.userId,
        },
      });

      if (res.data.status === 200) {
        setOrdeListData(res.data.data.resultlist);
        setPagesCount(res.data.data.totalCount / 10);
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
    listOrderHistory();
  }, [page]);
  return (
    <Box className={classes.tablemain}>
      <Typography variant="h1">Order History</Typography>
      <Box mt={2} width="100%">
        <TableContainer>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>S. No</TableCell>
                <TableCell>Coin Type</TableCell>
                <TableCell>Txn Type</TableCell>
                <TableCell>Transaction Hash</TableCell>
                {/* <TableCell>Last Fiero Price</TableCell> */}
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderlistData &&
                orderlistData?.map((data, i) => (
                  <TableRow>
                    <TableCell>{(page - 1) * 10 + i + 1}</TableCell>
                    <TableCell>
                      {data?.coinType ? data?.coinType : "-"}
                    </TableCell>
                    <TableCell>{data?.txnType ? data?.txnType : "-"}</TableCell>
                    <TableCell>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box>
                          {data?.txnHash != "NA"
                            ? sortAddress(data?.txnHash)
                            : "-"}
                        </Box>
                        <Box>
                          {data?.txnHash != "NA" ? (
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
                    </TableCell>{" "}
                    {/* <TableCell>
                      {" "}
                      {data?.lastFieroPrice ? data?.lastFieroPrice : "-"}
                    </TableCell> */}
                    <TableCell>{data?.status ? data?.status : "-"}</TableCell>
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
        {!isLoading && orderlistData && orderlistData.length === 0 && (
          <NodatafoundImage data={"No transactions found"} />
        )}
        {orderlistData.length > 0 && (
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

        {isLoading && <DataLoader />}
        <OrderDetailView
          open={open}
          handleClose={handleClose}
          viewData={viewData}
        />
      </Box>
    </Box>
  );
}
