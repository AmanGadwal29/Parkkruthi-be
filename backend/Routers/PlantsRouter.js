const { Router } = require("express");
const router = Router();

//! Admin Auth Middleware-----------------------------
const { adminAccess } = require("../ManageAccess/adminAuth");

//! Route Handlers-----------------------------
const {
  addPlants,
  showPlants,
  onePlant,
  categoryPlants,
  deletePlant,
} = require("../Controller/PlantsController");

//! Routes-----------------------------
//? All Plants
router.route("/").post(adminAccess, addPlants).get(showPlants);

//!SHOW CATEGORY PLANTS------------------------------
router.get("/:Category", categoryPlants);
//? Plants Category
router.route("/:category").get(categoryPlants);

//!SHOW ONE PLANT------------------------------
router.get("/:id", onePlant);

//!DELETE PLANT-----------------------------------

//!SHOW ONE PLANT------------------------------
router.post("/deleteplant/:id", adminAccess, deletePlant);
//? Plants id
router.route("/plant/:id").get(onePlant).post(adminAccess, deletePlant);

module.exports = router;
