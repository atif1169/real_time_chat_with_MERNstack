import React from "react";
import { myStyle } from "./Login";
import login from "../../assests/login.jpg";
import RegisterForm from "./form/RegisterForm";

function RegisterUser() {
  return (
    <div style={{ position: "relative" }}>
      <img src={login} style={myStyle} />
      <RegisterForm />
    </div>
  );
}

export default RegisterUser;
