const express = require("express");
const router = express.Router();

const userRoute = require("./UserRoute");
const inventoryRoute = require("./InventoryRoute");
const categoryRoute = require("./CategoryRoute");

router.use("/user", userRoute);
router.use("/inventory", inventoryRoute);
router.use("/category", categoryRoute);

module.exports = router;
