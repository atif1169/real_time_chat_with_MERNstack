const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// user Routes
router.post("/signin", loginUser);
router.route("/signup").post(registerUser);
router.route("/getUsers").get(protect, getAllUsers);

module.exports = router;
