const { Router } = require("express");
const PotsSchema = require("../Model/PotsSchema");
const router = Router();
const { adminAccess } = require("../ManageAccess/adminAuth");

//! Methods-----------------------------
const {
  addPots,
  showPots,
  onePot,
  categoryPots,
  deletePot,
} = require("../Controller/PotsController");

// ! Routers----------------------------
router.post("/addpot", adminAccess, addPots);

router.get("/", showPots);

router.get("/:Category", categoryPots);

router.get("/:id", onePot);

router.post("/deletepot/:id", adminAccess, deletePot);

module.exports = router;
