import React, { useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import RegisterSubmit from "../submitHandel/RegisterSubmit";
import { requireAllFields } from "../../../constant/Constant";

function RegisterForm() {
  // useStates
  const [user, setuser] = useState({ name: "", email: "", password: "" });
  const [isLoading, setisLoading] = useState(false);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       setisLoading(true);
  //       console.log(user.name);
  //       console.log(user.email);
  //       console.log(user.password);

  //       const { data } = await axios.post("/api/user/signup", {
  //         name: user.name,
  //         email: user.email,
  //         password: user.password,
  //       });
  //       console.log(data);
  //       console.log(data?.data);
  //       setisLoading(false);
  //       window.location.href = "/";
  //     } catch (err) {
  //       console.log(err);
  //       setisLoading(false);
  //       if (err?.response?.status === 500) {
  //         return alert(err?.response?.data?.message);
  //       }
  //       return alert(err?.message);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      return alert(requireAllFields);
    }
    await RegisterSubmit(user, setisLoading);
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit} className={style.main}>
      <div className={style.mainDiv}>
        <h2> Sign Up</h2>
        <input
          type="text"
          required
          placeholder="Name"
          value={user.name}
          onChange={(e) =>
            setuser({
              name: e.target.value,
              password: user.password,
              email: user.email,
            })
          }
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setuser({
              email: e.target.value,
              password: user.password,
              name: user.name,
            })
          }
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setuser({
              email: user.email,
              password: e.target.value,
              name: user.name,
            })
          }
        />
        <div
          className={style.button}
          role="button"
          tabIndex={0}
          type="submit"
          onMouseDown={handleSubmit}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </div>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "green", fontSize: "14px" }}
        >
          Sign In
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
