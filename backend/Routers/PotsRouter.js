const { Router } = require("express");
const router = Router();

//! Admin Auth Middleware -------------------------------------------
const { adminAccess } = require("../ManageAccess/adminAuth");

//! Route Handlers -------------------------------------------
const {
  addPots,
  showPots,
  onePot,
  categoryPots,
  deletePot,
} = require("../Controller/PotsController");

//! Routes -------------------------------------------
//? All Pots
router.route("/").post(adminAccess, addPots).get(showPots);

//? Pots Category
router.route("/:category").get(categoryPots);

//? Pots id
router.route("/Pot/:id").get(onePot).post(adminAccess, deletePot);

module.exports = router;
