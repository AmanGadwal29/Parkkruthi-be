const { Router } = require("express");
const router = Router();

//! Router Handlers----------------------------
const { addAdmin, adminLogin } = require("../Controller/AdminController");

//! Routers----------------------------
//? Sign Up
router.post("/signup", addAdmin);

//? Log In
router.post("/login", adminLogin);

module.exports = router;
