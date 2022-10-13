const asyncHandler = require("express-async-handler");
const User = require("../chat/models/UserModel");
const generateToken = require("../config/generateToken");
const {
  userNotExist,
  passwordNotMatch,
  enterAllFields,
  userAlreadyExist,
  failedCreateUser,
} = require("../constant/userError");
const { loginSuccess } = require("../constant/userSuccess");

//---------------------------------------------------------
//                     Register User
//---------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // check null field
  if (!name || !email || !password) {
    res.status(500);
    throw new Error(enterAllFields);
  }

  // check user exist or not
  const userExists = await User.findOne({ email });

  // if exist
  if (userExists) {
    res.status(500);
    throw new Error(userAlreadyExist);
  }

  // if not exist
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error(failedCreateUser);
  }
});

//---------------------------------------------------------
//                     Login User
//---------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // if user not exist
    if (!user) {
      return res.status(500).json({
        success: false,
        message: userNotExist,
      });
    }

    console.log(user.matchPassword(password));
    if (user && (await user.matchPassword(password))) {
      return res.status(201).json({
        success: true,
        message: loginSuccess,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        },
      });
    }
    return res.status(500).json({
      success: false,
      message: passwordNotMatch,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//---------------------------------------------------------
//                     get all Users api
//---------------------------------------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.json(user);
});

module.exports = { registerUser, loginUser, getAllUsers };
