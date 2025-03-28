import React from "react";
import { Box, Typography } from "@material-ui/core";
const DotComp = ({ value, activeIndex, index }) => {
  return (
    <div className={activeIndex == index ? "dotBox1" : "dotBox"}>
      {activeIndex == index && (
        <>
          <img
            src="images/logo_road.png"
            alt="logo"
            style={{ width: "34px" }}
          />
          <>
            <Box>
              {" "}
              <Typography
                variant="body2"
                color="primary"
                className="textroadBox"
              >
                {value.year}
              </Typography>
            </Box>
          </>
        </>
      )}
    </div>
  );
};

export default DotComp;
