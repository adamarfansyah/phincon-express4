const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryControllers");
const { Authenticated, AuthorizeEmployeeRole } = require("../middleware/Authorization");

router.get("/", Authenticated, AuthorizeEmployeeRole, getCategories);
router.get("/:id", Authenticated, AuthorizeEmployeeRole, getCategory);
router.post("/", Authenticated, AuthorizeEmployeeRole, createCategory);
router.put("/:id", Authenticated, AuthorizeEmployeeRole, updateCategory);
router.delete("/:id", Authenticated, AuthorizeEmployeeRole, deleteCategory);

module.exports = router;
