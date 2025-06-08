const express = require("express");
const router = express.Router();

const { userAccess } = require("../Middlewares/userAuth");

const controller = require("../Controller/CartController");

router.use(userAccess);

// Get all cart items / Add product to cart
router
  .route("/")
  .get(controller.getCart)
  .post(controller.addToCart)
  .put(controller.updateProductQuantity)
  .delete(controller.removeFromCart);

module.exports = router;
