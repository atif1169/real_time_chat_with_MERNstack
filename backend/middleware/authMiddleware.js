const jwt = require("jsonwebtoken");
const User = require("../chat/models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decode jwt id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      throw new Error("Not authenticate, token faild");
    }
  }

  if (!token) {
    res.json(401);
    throw new Error("Not authenticate, token faild");
  }
});

module.exports = { protect };
