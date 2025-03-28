import React from "react";
import Loader from "react-js-loader";
export default function DataLoader() {
  return (
    <div>
      <Loader
        fon
        type="bubble-spin"
        fontFamily={"'Sora', sans-serif"}
        bgColor={"rgb(255, 86, 77)"}
        title={"Loading..."}
        color={"rgb(255, 86, 77)"}
        size={60}
      />
    </div>
  );
}
