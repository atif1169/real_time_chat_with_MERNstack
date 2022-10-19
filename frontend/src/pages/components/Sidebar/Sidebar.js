import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrlApi, localUser } from "../../../App";
import { localStorageKey } from "../../../constant/Constant";
import style from "./sidebar.module.css";

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

  return (
    <div className={style.sidebar_main}>
      {/* Search user */}
      <center>
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
      <ul type="none" className={style.sidebar_user_list_ul}>
        {users?.map((e) => (
          <li className={style.sidebar_li} onClick={() => setActiveUser(e)}>
            {console.log(e)}
            <div
              className={style.sidebar_user_list}
              style={{
                backgroundColor: e._id === active && "#f9c9c9b9",
                color: e._id === active && "#ce3ff5dc",
              }}
            >
              <img src="https://www.w3schools.com/css/paris.jpg" alt="I" />
              <div>
                <div>{sidebarUserName(e?.users)}</div>
                <div className={style.lastMessage}>
                  {e?.lastMessage?.content}
                </div>
                {/* <div>Last message</div> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
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
