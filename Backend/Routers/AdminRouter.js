const { Router } = require("express");
const router = Router();

//! Router Handlers----------------------------
const controller = require("../Controller/AdminController");

//! Routers----------------------------
//? Sign Up
router.post("/signup", controller.addAdmin);

//? Log In
router.post("/login", controller.adminLogin);

module.exports = router;
