"use client";
// components/Loader.jsx
import React from "react";

function Loader({ content }) {
  return (
    <div
      style={{
        backgroundColor: "#0a1725",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#9fc3e9",
        fontSize: "1.5rem",
        flexDirection: "column",
      }}
    >
      <div className="loader"></div>
      <p style={{ marginTop: "20px" }}>{content}...</p>
    </div>
  );
}

export default Loader;
