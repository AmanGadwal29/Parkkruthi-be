// const { Router } = require("express");
// const router = Router();

// //! Admin Auth Middleware -------------------------------------------
// const { adminAccess } = require("../ManageAccess/adminAuth");

// //! Route Handlers -------------------------------------------
// const {
//   addPlants,
//   showPlants,
//   onePlant,
//   categoryPlants,
//   deletePlant,
// } = require("../Controller/PlantsController");

// //! Routes -------------------------------------------
// //? All Plants
// router.route("/").post(adminAccess, addPlants).get(showPlants);

// //? Plants Category
// router.route("/:category").get(categoryPlants);

// //? Plants id
// router.route("/Plant/:id").get(onePlant).post(adminAccess, deletePlant);

// module.exports = router;
