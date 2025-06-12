const express = require("express");
const router = express.Router();

const { userAccess } = require("../Middlewares/userAuth");

const controller = require("../Controller/CartController");

router.use(userAccess);

// Get all cart items / Add product to cart

router.get("/", controller.getCart);
router.post("/", controller.addToCart);
router.put("/", controller.updateProductQuantity);
router.delete("/", controller.removeFromCart);

module.exports = router;
