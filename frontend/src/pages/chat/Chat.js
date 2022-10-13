import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/header/Header";
import ChatBox from "../components/chatBox/ChatBox";

const localUser = JSON.parse(localStorage.getItem("chat-api"));

function Chat() {
  // useStates
  const [activeUser, setActiveUser] = useState({});
  let active = activeUser?._id;

  console.log(active);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", height: "87vh" }}>
        <Sidebar setActiveUser={setActiveUser} active={active} />
        <ChatBox activeUser={activeUser} active={active} />
      </div>
    </div>
  );
}

export default Chat;
