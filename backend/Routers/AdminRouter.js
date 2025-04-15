const { Router } = require("express");
const AdminSchema = require("../Model/AdminSchema");
const router = Router();
const { addAdmin, adminLogin } = require("../Controller/AdminController");
router.post("/addadmin", addAdmin);
router.post("/adminlogin", adminLogin);

module.exports = router;
