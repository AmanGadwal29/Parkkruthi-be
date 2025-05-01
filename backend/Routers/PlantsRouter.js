const { Router } = require("express");
const PlantsSchema = require("../Model/PlantsSchema");
const router = Router();
const { adminAccess } = require("../ManageAccess/adminAuth");
const { userAccess } = require("../ManageAccess/userAuth");
const adminOrUserAccess = require("../ManageAccess/adminUserAccess");

//! Methods-----------------------------
const {
  addPlants,
  showPlants,
  onePlant,
  categoryPlants,
  deletePlant,
} = require("../Controller/PlantsController");

//!ADD PLANTS------------------------------
router.post("/addplant", adminAccess, addPlants);

//!SHOW PLANTS------------------------------
router.get("/", showPlants);

//!SHOW CATEGORY PLANTS------------------------------
router.get("/:Category", categoryPlants);

//!SHOW ONE PLANT------------------------------
router.get("/:id", onePlant);

//!DELETE PLANT-----------------------------------

//!SHOW ONE PLANT------------------------------
router.post("/deleteplant/:id", adminAccess, deletePlant);

module.exports = router;
