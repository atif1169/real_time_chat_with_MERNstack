import axios from "axios";
import { RegisterApi } from "../../../apis/Apis";

const RegisterSubmit = async (user, setisLoading) => {
  try {
    setisLoading(true);
    console.log(user.name);
    console.log(user.email);
    console.log(user.password);

    const { data } = await axios.post(RegisterApi, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    console.log(data);
    console.log(data?.data);
    setisLoading(false);
    return;
  } catch (err) {
    console.log(err);
    setisLoading(false);
    if (err?.response?.status === 500) {
      return alert(err?.response?.data?.message);
    }
    return alert(err?.message);
  }
};

export default RegisterSubmit;
