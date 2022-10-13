const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

//-------------------------------------------------
//                  user model
//-------------------------------------------------
const userModel = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    pic: {
      type: String,
      default:
        "https://filmfare.wwmindia.com/content/2022/apr/avatar241651147935.jpg",
    },
  },
  { timestamps: true }
);

//-------------------------------------------------
//                  user model
//-------------------------------------------------
userModel.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

// user model pre save bycrypt password
userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
