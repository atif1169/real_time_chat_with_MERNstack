const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "chat-app-with-Atif", { expiresIn: "10d" });
};

module.exports = generateToken;
