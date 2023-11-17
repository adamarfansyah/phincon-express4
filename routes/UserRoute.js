const {
  getUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserRole,
  updateUserPassword,
  deleteUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/UserController");
const { Authenticated, AuthorizeAdminRole } = require("../middleware/Authorization");

const express = require("express");

const router = express.Router();

router.get("/user-profile", Authenticated, getUserProfile);
router.get("/", Authenticated, AuthorizeAdminRole, getUsers);
router.get("/:identifier", Authenticated, AuthorizeAdminRole, getUser);

router.post("/", Authenticated, AuthorizeAdminRole, createUser);
router.put("/user-role/:id", Authenticated, AuthorizeAdminRole, updateUserRole);
router.delete("/:id", Authenticated, AuthorizeAdminRole, deleteUser);

router.put("/user-profile/:id", Authenticated, updateUserProfile);
router.put("/user-password/:id", Authenticated, updateUserPassword);

router.post("/user-login", loginUser);
router.post("/user-logout", Authenticated, logoutUser);

module.exports = router;
