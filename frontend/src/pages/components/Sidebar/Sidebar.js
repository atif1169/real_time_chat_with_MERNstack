import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrlApi, localUser } from "../../../App";
import { localStorageKey } from "../../../constant/Constant";
import style from "./sidebar.module.css";

const searchLocalUser = (searchText, users) => {
  if (searchText) {
    return users.filter(
      (item) =>
        item &&
        sidebarUserName(item.users)
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
  }
  return users;
};

function Sidebar({ setActiveUser, active }) {
  const [searchText, setsearchText] = useState("");
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const a = await axios.get(`${baseUrlApi}/api/chat/`, {
        headers: {
          Authorization: `Bearer ${localUser?.token}`,
        },
      });

      const user = a?.data?.map((e) => ({ ...e, isSelected: false }));
      setUsers(user);
      console.log(a.data);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filterLocalUser = searchLocalUser(searchText, users);

  return (
    <div className={style.sidebar_main}>
      {/* Search user */}
      <center>
        <div className={style.localUser}>
          <img
            src={localUser?.pic}
            alt="P"
            className={style.localUser_profile}
          />
          <div className={style.localUser_name}>{localUser?.name}</div>
          <div className={style.localUser_email}>{localUser?.email}</div>
        </div>
        <input
          className={style.sidebar_search}
          type="search"
          required
          placeholder="search user"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
      </center>

      {/* user listing */}
      <div className={style.users_li}>
        {filterLocalUser?.map((e) => (
          <div
            className={style.sidebar_user_list}
            style={{
              backgroundColor: e._id === active && "#f9c9c9b9",
              color: e._id === active && "green",
              fontWeight: e._id === active && "700",
            }}
            onClick={() => setActiveUser(e)}
          >
            <img src="https://www.w3schools.com/css/paris.jpg" alt="I" />
            <div>
              <div className={style.users_list_name}>
                {sidebarUserName(e?.users)}
              </div>
              <div className={style.lastMessage}>
                {e?.lastMessage?.content ?? "Start chat with this user"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

export const sidebarUserName = (array) => {
  const activeUserName = array?.filter(
    (e) => e?._id !== JSON.parse(localStorage.getItem(localStorageKey))._id
  );
  return activeUserName[0]?.name;
};
