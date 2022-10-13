import axios from "axios";
import React, { useEffect, useState } from "react";
import { localUser } from "../../App";
import style from "./chatFooter.module.css";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

function ChatFooter({ active, messageTxt, setMessageTxt, sendMessage }) {
  // const [message, setmessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  // const [socketConnected, setSocketConnected] = useState(false);

  // const sendMessage = async () => {
  //   try {
  //     setisLoading(true);
  //     const { data } =
  //       message &&
  //       (await axios.post(
  //         `http://localhost:5000/api/message/`,
  //         { chatId: active, content: message },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localUser?.token}`,
  //           },
  //         }
  //       ));
  //     setisLoading(false);
  //     setmessage("");
  //     console.log(data);

  //     socket.emit("new message", data);
  //   } catch (err) {
  //     setisLoading(false);
  //     console.log(err.message);
  //     alert(err.message);
  //   }
  // };

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("connected");
  //   socket.on("connection", () => setSocketConnected(true));
  // }, []);

  return (
    <div className={style.main}>
      <input
        type="text"
        className={style.input}
        placeholder="Enter Message"
        // value={message}
        value={messageTxt}
        onChange={(e) => {
          setMessageTxt(e.target.value);
          // setmessage(e.target.value);
        }}
      />
      <button className={style.button} onClick={() => sendMessage()}>
        {isLoading ? "..." : "Send"}
      </button>
    </div>
  );
}

export default ChatFooter;
