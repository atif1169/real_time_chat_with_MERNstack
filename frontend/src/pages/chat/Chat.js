import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/header/Header";
import ChatBox from "../components/chatBox/ChatBox";

const localUser = JSON.parse(localStorage.getItem("chat-api"));

function Chat() {
  // useStates
  const [activeUser, setActiveUser] = useState({});
  let active = activeUser?._id;

  // console.log(active);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <Sidebar setActiveUser={setActiveUser} active={active} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <Header />
          <ChatBox activeUser={activeUser} active={active} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
