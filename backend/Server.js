const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
app.use(express.json()); // accept json data

dotenv.config();

// connect database
connectDB();

app.use(cors({ origin: true, credentials: true }));

// Running on Port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server starting on PORT ${5000}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
// socket io connect
io.on("connection", (socket) => {
  console.log("connected to socket io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    console.log(chat);

    if (chat?.users?.length === 0) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

// test api
// app.get("/test", (req, res) => {
//   return res.json({ Success: true, message: "Running Successfully" });
// });

//  User Routes
app.use("/api/user", userRoutes);

//  User Routes
app.use("/api/chat", chatRoutes);

// Message Routes
app.use("/api/message", messageRoutes);

// Route Not found
app.use(notFound);
app.use(errorHandler);
