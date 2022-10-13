import React from "react";
import style from "./ChatBoxHeader.module.css";

function ChatBoxHeader({ name }) {
  return <div className={style.main}>{name ?? "-"}</div>;
}

export default ChatBoxHeader;
