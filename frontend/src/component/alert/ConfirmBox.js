import React from "react";

function ConfirmBox() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "gray",
        zIndex: "100",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "50px",
        }}
      >
        <div>message</div>
        <button>Delete</button>
        <button>No</button>
      </div>
    </div>
  );
}

export default ConfirmBox;
