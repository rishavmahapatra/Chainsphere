import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
export default function CommonToolTip({ title }) {
  return (
    <Tooltip title={title} interactive>
      <InfoIcon />
    </Tooltip>
  );
}
