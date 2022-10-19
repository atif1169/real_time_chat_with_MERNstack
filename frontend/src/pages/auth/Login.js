import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./form/LoginForm";
// import login from "../../assests/login.png";
import login from "../../assests/login.jpg";

// css
export const myStyle = {
  backgroundSize: "cover",
  height: "100vh",
  backgroundRepeat: "no-repeat",
  opacity: 0.65,
  filter: " brightness(70%)",
  zIndex: "-1",
  position: "absolute",
  width: "100%",
};

function Login() {
  return (
    <div style={{ position: "relative" }}>
      <img src={login} style={myStyle} />
      <LoginForm />
    </div>
  );
}

export default Login;
