import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/auth/Login";
import RegisterUser from "./pages/auth/RegisterUser";

export const localUser = JSON.parse(localStorage.getItem("chat-api"));
function App() {
  const authUser = localUser;
  return (
    <div className="App">
      <Router>
        <Routes>
          {!authUser ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegisterUser />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Chat />} />
              <Route path="/chat" element={<Chat />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
