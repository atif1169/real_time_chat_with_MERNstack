import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requireAllFields } from "../../../constant/Constant";
import LoginSubmit from "../submitHandel/LoginSubmit";
import style from "./style.module.css";

function LoginForm() {
  // states
  const [user, setuser] = useState({ email: "", password: "" });
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      return alert(requireAllFields);
    }
    await LoginSubmit(user, setisLoading);
    window.location.href = "/chat";
  };

  return (
    <form onSubmit={handleSubmit} className={style.main}>
      <div className={style.mainDiv}>
        <h2> Sign In</h2>
        <input
          type="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setuser({ email: e.target.value, password: user.password })
          }
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setuser({ email: user.email, password: e.target.value })
          }
        />
        <div
          className={style.button}
          role="button"
          tabIndex={0}
          type="submit"
          onMouseDown={handleSubmit}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </div>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "green", fontSize: "14px" }}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
