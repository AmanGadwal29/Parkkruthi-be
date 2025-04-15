const { Router } = require("express");
const UserSchema = require("../Model/UserSchema");
const router = Router();
const { addUser, userLogin } = require("../Controller/UserController");
router.post("/adduser", addUser);
router.post("/userlogin", userLogin);

module.exports = router;
