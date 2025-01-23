import { BallTriangle } from "react-loader-spinner";
import Lottie from "lottie-react";
import React from "react";
// import datajson from "../../../assets/loading.json";
import datajson from "../../assets/loading.json";
const Loader = () => {
  return (
    <>
      {/* <div
        style={{
          height: '100vh',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 10000000000,
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '35px',
        }}
      >
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </div> */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#181919",
          overflow: "hidden",
          // backgroundColor: isDark ? "#050505" : "#fffff",
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
        <div className="lottieIcon">
          <Lottie animationData={datajson} loop={true} />
        </div>
      </div>
    </>
  );
};

export default Loader;
