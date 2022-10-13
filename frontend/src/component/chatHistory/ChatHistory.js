import { localUser } from "../../App";
import style from "./ChatHistory.module.css";

function ChatHistory({ messages }) {
  messages.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className={style.main}>
      {messages?.map((e) => (
        <div>
          <div
            style={{
              float: e?.sender?._id == localUser?._id ? "right" : "left",
              textAlign: e?.sender?._id == localUser?._id ? "right" : "left",
              color: e?.sender?._id == localUser?._id ? "blue" : "black",
              backgroundColor:
                e?.sender?._id == localUser?._id ? "#67F6FC" : "#CACACA",
              minWidth: "200px",
              maxWidth: "40%",
              marginTop: "5px",
              borderRadius: "10px",
              padding:
                e?.sender?._id == localUser?._id
                  ? "5px 10px 5px 5px"
                  : "5px 5px 5px 10px",
            }}
          >
            {e?.content}
            {/* <div />
            {e?.createdAt} */}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
