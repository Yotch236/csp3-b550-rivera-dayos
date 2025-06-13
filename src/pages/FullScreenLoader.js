// src/components/FullScreenLoader.js
import React from "react";
import logo from "../assets/logo.png"; // your logo file

const FullScreenLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#fff7ec", // woody brown color
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="Loading..." style={{ height: "80px" }} />
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
          color: "#593c29", // white text for contrast
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        <div>from</div>
        <div className="fw-bold fs-4">Naty's Handicraft</div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
