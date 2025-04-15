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
router.get("/showplants", adminOrUserAccess, showPlants);

//!SHOW CATEGORY PLANTS------------------------------
router.get("/showplants/:Category", adminOrUserAccess, categoryPlants);

//!SHOW ONE PLANT------------------------------
router.get("/showplant/:id", adminOrUserAccess, onePlant);

//!DELETE PLANT-----------------------------------

//!SHOW ONE PLANT------------------------------
// router.delete("/deleteplant/:id", adminAccess, deletePlant);
router.post("/deleteplant/:id", adminAccess, deletePlant);

module.exports = router;
