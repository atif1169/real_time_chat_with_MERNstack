const asyncHandler = require("express-async-handler");
const Chat = require("../chat/models/ChatModel");
const Message = require("../chat/models/MessageModel");
const User = require("../chat/models/UserModel");
const { fillAllFields } = require("../constant/chatError");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log(fillAllFields);
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message,
    });

    res.json(message);
  } catch (err) {
    res.sendStatus(400);
    throw new Error(err.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    var messages = await Message.find({ chat: req.params.chatId })
      .sort({ createdAt: "-1" })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (err) {
    res.sendStatus(400);
    throw new Error(err.message);
  }
});

module.exports = { sendMessage, allMessages };
