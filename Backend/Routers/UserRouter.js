const { Router } = require("express");
const router = Router();

//! Route Handlers-----------------------------
const { addUser, userLogin } = require("../Controller/UserController");

//! Routes-----------------------------
//? Sign Up
router.post("/signup", addUser);

//? Log In
router.post("/login", userLogin);

module.exports = router;
