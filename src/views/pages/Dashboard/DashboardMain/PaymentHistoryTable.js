import React, { useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
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

import { useHistory } from "react-router-dom";
import PaymentDetailView from "src/component/PaymentDetailView";

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

export default function PaymentHistoryTable({
  paymentHistoryData,
  isLoading1,
  pagesCount1,
  page1,
  setPage1,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewData1, setViewData1] = useState("");

  const handleClickOpen = (data) => {
    setOpen(true);
    setViewData1(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(true);

  return (
    <Box className={classes.tablemain}>
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
                <TableCell>Price Amount </TableCell>
                <TableCell>Price Currency</TableCell>
                <TableCell>Created Date & Time</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistoryData &&
                paymentHistoryData?.slice(0, 10).map((data, i) => (
                  <TableRow>
                    <TableCell>{(page1 - 1) * 10 + i + 1}</TableCell>
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
                    <TableCell style={{ textTransform: "uppercase" }}>
                      {data?.paymentStatus ? data?.paymentStatus : "-"}
                    </TableCell>
                    <TableCell>
                      {data?.priceAmount ? data?.priceAmount : "-"}
                    </TableCell>
                    <TableCell style={{ textTransform: "uppercase" }}>
                      {data?.priceCurrency ? data?.priceCurrency : "-"}
                    </TableCell>
                    <TableCell style={{ textTransform: "uppercase" }}>
                      {data?.createDate
                        ? moment(data?.createDate).format("lll")
                        : "-"}
                    </TableCell>

                    <TableCell
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
        {isLoading1 &&
          paymentHistoryData &&
          paymentHistoryData.length === 0 && <DataLoader />}
        {!isLoading1 &&
          paymentHistoryData &&
          paymentHistoryData.length === 0 && (
            <NodatafoundImage data={"No transactions found"} />
          )}

        <PaymentDetailView
          open={open}
          handleClose={handleClose}
          viewData1={viewData1}
        />
        {paymentHistoryData && paymentHistoryData.length >= 10 && (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={3}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/payment-history")}
            >
              View More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
