const express = require("express");
const {
  asseccChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroupChat,
  removeGroupUser,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, asseccChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/groupRename").put(protect, renameGroup);
router.route("/groupAdd").put(protect, addToGroupChat);
router.route("/groupRemove").put(protect, removeGroupUser);

module.exports = router;
