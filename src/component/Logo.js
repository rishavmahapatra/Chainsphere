import React from "react";
import { Typography } from "@material-ui/core";

const Logo = (props) => {
  return (
    <div className="flex cursor-pointer justify-center p-3 items-center gap-5 font-serif">
      <img
      // className="w-10 h-10"
        src="/images/logo.svg"
        alt=""
      />
      <Typography variant="h5">Chainsphere</Typography>
    </div>
  );
};

export default Logo;
