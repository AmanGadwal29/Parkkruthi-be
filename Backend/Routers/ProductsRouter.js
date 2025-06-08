const express = require("express");
const multer = require("multer");
const router = express.Router({ mergeParams: true });
const upload = multer({ dest: "uploads/" });

//! Controller -------------------------------------------
const controller = require("../Controller/ProductsController");

//! Routes -------------------------------------------
//"/"
router.route("/").get(controller.allProductsCatalogue);

//"/:productType"
router
  .route("/:productType")
  .post(upload.array("images"), controller.addProduct)
  .get(controller.showAllProducts)
  .delete(controller.deleteAllProducts);

//"/:productType/category/:category"
router.get("/:productType/category/:category", controller.showCategoryProducts);

//"/:productType/:id"
router
  .route("/:productType/:id")
  .get(controller.showOneProduct)
  .patch(upload.none(), controller.editProduct)
  .delete(controller.deleteOneProduct);

module.exports = router;
