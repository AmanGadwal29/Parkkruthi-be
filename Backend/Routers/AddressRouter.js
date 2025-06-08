const express = require("express");
const router = express.Router();

const { userAccess } = require("../Middlewares/userAuth");
const controller = require("../Controller/AddressController");

// Protect all routes with userAccess middleware
router.use(userAccess);

// Add new address
router.post("/", controller.addAddress);

// Get address
router.get("/", controller.getAddress);

// Update existing address by ID
router.put("/:id", controller.updateAddress);

// Delete address by ID
router.delete("/:id", controller.deleteAddress);

module.exports = router;
