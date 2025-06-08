const { Router } = require("express");
const router = Router();

//! Route Handlers-----------------------------
const { addUser, userLogin } = require("../Controller/UserController");
const { saveSubscription } = require("../Controller/SubscriptionController");

//! Routes-----------------------------
//? Sign Up
router.post("/signup", addUser);

//? Log In
router.post("/login", userLogin);

//?Subscribe
router.post("/subscribe", saveSubscription);

module.exports = router;
