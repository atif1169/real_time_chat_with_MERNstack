import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [user, setuser] = useState({ email: "", password: "" });
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      console.log(user.email);
      console.log(user.password);

      const { data } = await axios.post("/api/user/signin", {
        email: user.email,
        password: user.password,
      });
      console.log(data);
      console.log(data?.data);
      localStorage.setItem("chat-api", JSON.stringify(data?.data));
      setisLoading(false);
      window.location.href = "/chat";
    } catch (err) {
      setisLoading(false);
      if (err?.response?.status === 500) {
        return alert(err?.response?.data?.message);
      }
      return alert(err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "10%",
          gap: 20,
        }}
      >
        <h2> Sign In</h2>
        <div>
          <input
            style={{
              padding: 10,
              minWidth: 230,
              width: "100%",
              borderRadius: 20,
              backgroundColor: "#F0F0F0",
              letterSpacing: 2.5,
              fontSize: 15,
              border: 0,
              paddingLeft: 10,
            }}
            type="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setuser({ email: e.target.value, password: user.password })
            }
          />
        </div>
        <div>
          <input
            style={{
              padding: 10,
              minWidth: 230,
              width: "100%",
              borderRadius: 20,
              backgroundColor: "#F0F0F0",
              letterSpacing: 2.5,
              fontSize: 15,
              border: 0,
              paddingLeft: 10,
            }}
            type="password"
            required
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setuser({ email: user.email, password: e.target.value })
            }
          />
        </div>
        <div>
          <button
            style={{
              padding: 10,
              minWidth: 260,
              marginLeft: 10,
              width: "100%",
              borderRadius: 20,
              backgroundColor: "#B7F655",
              letterSpacing: 2.5,
              fontSize: 15,
              fontWeight: "bold",
              color: "#747474",
              border: 0,
              textAlign: "center",
              cursor: "pointer",
            }}
            type="submit"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#9C9C9C", fontSize: "14px" }}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}

export default Login;
