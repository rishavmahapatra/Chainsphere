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
}));

export default function OrderHistoryTable({
  orderlistData,
  isLoading,
  pagesCount,
  page,
  setPage,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState("");
  const history = useHistory();

  const handleClickOpen = (data) => {
    setOpen(true);
    setViewData(data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.tablemain}>
      <Box mt={2} width="100%">
        <TableContainer>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell textAlign="start">S. No</TableCell>
                <TableCell textAlign="start">Transaction Id</TableCell>
                <TableCell textAlign="start">Coin Type</TableCell>
                <TableCell textAlign="start">Play Type</TableCell>
                <TableCell textAlign="start">Txn Type</TableCell>
                <TableCell textAlign="start">Transaction Hash</TableCell>
                <TableCell textAlign="start">
                  Last Chainsphere Price (In USD)
                </TableCell>
                <TableCell textAlign="start">Status</TableCell>
                <TableCell textAlign="start">Txn Date & Time</TableCell>
                <TableCell textAlign="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderlistData &&
                orderlistData?.slice(0, 10).map((data, i) => (
                  <TableRow>
                    <TableCell textAlign="start">
                      {(page - 1) * 10 + i + 1}
                    </TableCell>
                    <TableCell>
                      {data?.randomId ? data?.randomId : "-"}
                    </TableCell>
                    <TableCell>
                      {data?.coinType ? data?.coinType : "-"}
                    </TableCell>
                    <TableCell>
                      {data &&
                        data.planData &&
                        data.planData.planName &&
                        data.planData.planName}
                    </TableCell>
                    <TableCell textAlign="start">
                      {data?.txnType ? data?.txnType : "-"}
                    </TableCell>

                    <TableCell textAlign="start">
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "start",
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
                    </TableCell>
                    <TableCell>
                      {" "}
                      {data?.transactionType == "NEW"
                        ? data?.lastFieroPrice
                        : data?.lastFieroPrice
                        ? parseFloat(1 / Number(data?.lastFieroPrice)).toFixed(
                            2
                          )
                        : "-"}
                    </TableCell>
                    <TableCell textAlign="start">
                      {data?.status
                        ? data?.status == "CONFIRM"
                          ? "CONFIRMED"
                          : data?.status
                        : "-"}
                    </TableCell>
                    <TableCell style={{ textTransform: "uppercase" }}>
                      {data?.txnTime
                        ? moment(data?.txnTime).format("lll")
                        : "-"}
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      onClick={() => handleClickOpen(data)}
                      style={{
                        textDecoration: "underline",
                        color: "rgb(255, 86, 77)",
                        cursor: "pointer",
                        fontSize: "16px",
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
        {/* {orderlistData.length > 0 && (
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
        )} */}

        {isLoading && orderlistData && orderlistData.length === 0 && (
          <DataLoader />
        )}
        <OrderDetailView
          open={open}
          handleClose={handleClose}
          viewData={viewData}
        />
        {orderlistData && orderlistData.length >= 10 && (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={3}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/order-history")}
            >
              View More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
