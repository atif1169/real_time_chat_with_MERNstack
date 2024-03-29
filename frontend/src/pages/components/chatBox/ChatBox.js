import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrlApi, localUser } from "../../../App";
import ChatBoxHeader from "../../../component/chatBoxHeader/ChatBoxHeader";
import ChatFooter from "../../../component/chatFooter/ChatFooter";
import ChatHistory from "../../../component/chatHistory/ChatHistory";
import styleChat from "./styleChat.module.css";
import io from "socket.io-client";
import { localStorageKey } from "../../../constant/Constant";

// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://real-time-chat-mongodb.herokuapp.com/";
var socket, selectedChatCompare;

function ChatBox({ activeUser, active }) {
  const [messageTxt, setMessageTxt] = useState("");
  const [messages, setmessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  // connection socket io
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", localUser);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  // fetch messages function
  const fetchData = async () => {
    try {
      const a = await axios.get(`${baseUrlApi}/api/message/${active}`, {
        headers: {
          Authorization: `Bearer ${localUser?.token}`,
        },
      });
      setmessages(a.data);

      socket.emit("join chat", active);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  // fetch messages function call
  useEffect(() => {
    active && fetchData();

    selectedChatCompare = active;
  }, [active]);

  // message recieved with socket io
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
        // give notification
      } else {
        setmessages([...messages, newMessageRecieved]);
      }
    });
  });

  // send message function
  const sendMessage = async () => {
    try {
      const { data } =
        messageTxt &&
        (await axios.post(
          `${baseUrlApi}/api/message/`,
          { chatId: active, content: messageTxt },
          {
            headers: {
              Authorization: `Bearer ${localUser?.token}`,
            },
          }
        ));
      console.log(data);
      setMessageTxt("");
      setmessages([...messages, data]);
      socket.emit("new message", data);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  const activeUserName = activeUser?.users?.filter(
    (e) => e?._id !== JSON.parse(localStorage.getItem(localStorageKey))._id
  );

  return (
    <div className={styleChat.main}>
      <ChatBoxHeader name={activeUserName && activeUserName[0]?.name} />
      <ChatHistory messages={messages} />
      {active && (
        <ChatFooter
          active={active}
          messageTxt={messageTxt}
          setMessageTxt={setMessageTxt}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}

export default ChatBox;
