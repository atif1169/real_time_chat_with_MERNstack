import axios from "axios";
import React from "react";
import { loginApi } from "../../../apis/Apis";
import { localStorageKey } from "../../../constant/Constant";

const LoginSubmit = async (user, setisLoading) => {
  try {
    console.log(user.email);
    console.log(user.password);
    setisLoading(true);
    const { data } = await axios.post(loginApi, {
      email: user.email,
      password: user.password,
    });
    console.log(data);
    console.log(data?.data);
    localStorage.setItem(localStorageKey, JSON.stringify(data?.data));
    setisLoading(false);
    return;
  } catch (err) {
    setisLoading(false);
    if (err?.response?.status === 500) {
      return alert(err?.response?.data?.message);
    }
    return alert(err?.message);
  }
};

export default LoginSubmit;
