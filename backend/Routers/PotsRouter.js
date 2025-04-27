const { Router } = require("express");
const PotsSchema = require("../Model/PotsSchema");
const router = Router();
const { userAccess } = require("../ManageAccess/userAuth");
const { adminAccess } = require("../ManageAccess/adminAuth");
const adminOrUserAccess = require("../ManageAccess/adminUserAccess");

//! Methods-----------------------------
const {
  addPots,
  showPots,
  onePot,
  categoryPots,
} = require("../Controller/PotsController");

// ! Routers----------------------------
router.post("/addpot", adminAccess, addPots);

router.get("/", showPots);

router.get("/:Category", categoryPots);

router.get("/:id", onePot);

module.exports = router;
