const asyncHandler = require("express-async-handler");
const Chat = require("../chat/models/ChatModel");
const User = require("../chat/models/UserModel");
const {
  notSendUserId,
  fillAllFields,
  groupMoreThenTwoUser,
  chatNotFound,
} = require("../constant/chatError");

//----------------------------------------
//            access chat
//----------------------------------------
const asseccChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log(notSendUserId);
    return res.statusCode(400);
  }

  var isChat = await Chat.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastMessage");

  isChat = await User.populate(isChat, {
    path: "lastMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroup: false,
      users: [req.user._id, userId],
    };
    try {
      const createChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

//----------------------------------------
//            fetch chat
//----------------------------------------
const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "lastMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

//----------------------------------------
//            create Group Chat
//----------------------------------------
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: fillAllFields });
  }
  var users = req.body.users;
  if (users.length < 2) {
    return res.status(400).send(groupMoreThenTwoUser);
  }
  users.push(req.user);

  const groupChat = await Chat.create({
    chatName: req.body.name,
    users: users,
    isGroup: true,
    groupAdmin: req.user,
  });

  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-passwod");

  res.status(200).json(fullGroupChat);

  try {
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

//----------------------------------------
//            rename Group
//----------------------------------------
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error(chatNotFound);
  } else {
    res.json(updatedChat);
  }
});

//----------------------------------------
//            add user to Group
//----------------------------------------
const addToGroupChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error(chatNotFound);
  } else {
    return res.json(added);
  }
});

//----------------------------------------
//            remove user from Group
//----------------------------------------
const removeGroupUser = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const reomve = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!reomve) {
    res.status(404);
    throw new Error(chatNotFound);
  } else {
    return res.json(reomve);
  }
});

module.exports = {
  asseccChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroupChat,
  removeGroupUser,
};
