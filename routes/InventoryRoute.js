const express = require("express");
const router = express.Router();

const {
  getInventories,
  getInventory,
  createInventory,
  updateInventoryProfile,
  updateInventoryCount,
  deleteInventory,
} = require("../controllers/InventoryControllers");
const { Authenticated, AuthorizeEmployeeRole } = require("../middleware/Authorization");

router.get("/", getInventories);
router.get("/:identifier", getInventory);
router.put("/inventory-count/:id", updateInventoryCount);
router.post("/", createInventory);

router.put("/inventory-profile/:id", Authenticated, AuthorizeEmployeeRole, updateInventoryProfile);
router.delete("/:id", Authenticated, AuthorizeEmployeeRole, deleteInventory);

module.exports = router;
