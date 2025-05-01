const { Router } = require("express");
const router = Router();

//! Admin Auth Middleware-----------------------------
const { adminAccess } = require("../ManageAccess/adminAuth");

//! Route Handlers-----------------------------
const {
  addPots,
  showPots,
  onePot,
  categoryPots,
  deletePot,
} = require("../Controller/PotsController");

//! Routers-----------------------------
//? All Pots
router.route("/").post(adminAccess, addPots).get(showPots);

//? Pots Category
router.route("/:category").get(categoryPots);

//? Pots id
router.route("/pot/:id").get(onePot).post(adminAccess, deletePot);

router.post("/deletepot/:id", adminAccess, deletePot);
module.exports = router;
