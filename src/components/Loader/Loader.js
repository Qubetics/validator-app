import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div
      style={{
        height: "20vh",
        width: "80%",
        backgroundColor: "#000000",
        zIndex: 10000000000,
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "35px",
      }}
    >
      <CircularProgress color="secondary" size={40} />
    </div>
  );
};

export default Loader;
