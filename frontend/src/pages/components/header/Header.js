import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrlApi, localUser } from "../../../App";
import ConfirmBox from "../../../component/alert/ConfirmBox";
import { localStorageKey } from "../../../constant/Constant";
import header from "./header.module.css";

function Header() {
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [addnewUser, setAddnewUser] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const a = await axios.get(
        `${baseUrlApi}/api/user/getUsers?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localUser?.token}`,
          },
        }
      );
      console.log(a.data);
      setGetUsers(a.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      return alert(err.message);
    }
  };
  useEffect(() => {
    if (search) {
      fetchData();
    }
  }, [search]);

  // create Chat
  const createChat = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.post(
        `${baseUrlApi}/api/chat/`,
        { userId: id },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
          },
        }
      );
      console.log(data);
      window.location.reload(false);
    } catch (err) {
      console.log(err.message);
      return alert(err.message);
    }
  };

  function logoutFunc() {
    // ConfirmBox();
    localStorage.removeItem(localStorageKey);
    window.location.href = "/";
  }

  return (
    <>
      <div className={header.main}>
        <div className={header.main_box}>
          <div>
            {addnewUser ? (
              <div>
                <input
                  className={header.header_search}
                  type="search"
                  required
                  placeholder="add user"
                  // value={searchText}
                  onChange={(e) => setsearch(e.target.value)}
                />
                <b
                  className={header.crossIcon}
                  onClick={() => {
                    setsearch("");
                    setAddnewUser(false);
                  }}
                >
                  X
                </b>
              </div>
            ) : (
              <div
                className={header.plusIcon}
                onClick={() => setAddnewUser(true)}
              >
                +
              </div>
            )}
          </div>
          <div className={header.logout_button} onClick={() => logoutFunc()}>
            Logout
          </div>
        </div>
      </div>
      {search && (
        <div className={header.search_user}>
          <ul type="none">
            <li className={header.sidebar_li}>{isLoading && "Loading ..."}</li>
            {getUsers?.map((e) => (
              <li
                className={header.sidebar_li}
                onClick={() => {
                  createChat(e._id);
                }}
              >
                <div className={header.sidebar_user_list}>
                  <img src="https://www.w3schools.com/css/paris.jpg" alt="I" />
                  <div>
                    <div>{e?.name}</div>
                    <div style={{ fontSize: "13px" }}>{e?.email}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
