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


//? All Plants
router.route("/").post(adminAccess, addPlants).get(showPlants);

//!SHOW CATEGORY PLANTS------------------------------
router.get("/:Category", categoryPlants);
//? Plants Category
router.route("/:category").get(categoryPlants);

//!SHOW ONE PLANT------------------------------
router.get("/:id", onePlant);

//!DELETE PLANT-----------------------------------
router.post("/deleteplant/:id", adminAccess, deletePlant);
//? Plants id
router.route("/:id").get(onePlant).post(adminAccess, deletePlant);

module.exports = router;
