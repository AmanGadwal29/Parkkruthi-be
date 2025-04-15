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

router.get("/showpots", adminOrUserAccess, showPots);

router.get("/showpots/:Category", adminOrUserAccess, categoryPots);

router.get("/showpot/:id", adminOrUserAccess, onePot);

module.exports = router;
