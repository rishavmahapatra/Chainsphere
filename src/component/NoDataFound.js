import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function NodatafoundImage({ data }) {
  return (
    <Box align="center" mt={4} width="100%">
      <img
        src="/images/DataNotFoundImage.png"
        alt=""
        style={{ maxWidth: "160px" }}
      />
      <Box mt={3} mb={3}>
        {/* <Typography variant="h1">No data</Typography> */}
        <Typography variant="h5" style={{ color: "#8a8e91" }}>
          {data}
        </Typography>
      </Box>
    </Box>
  );
}
