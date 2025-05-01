const { Router } = require("express");
const router = Router();

//! Admin Auth Middleware-----------------------------
const { adminAccess } = require("../ManageAccess/adminAuth");

//! Route Handlers-----------------------------
const {
  addFertilizers,
  showFertilizers,
  oneFertilizer,
  categoryFertilizers,
  deleteFertilizer,
} = require("../Controller/FertilizersController");

//! Routes-----------------------------
//? All Fertilizers
router.route("/").post(adminAccess, addFertilizers).get(showFertilizers);

//? Fertilizers Category
router.route("/:category").get(categoryFertilizers);
router.route("/:id").get(oneFertilizer);

//? Fertilizers id
router
  .route("/fertilizer/:id")
  .get(oneFertilizer)
  .post(adminAccess, deleteFertilizer);

module.exports = router;
