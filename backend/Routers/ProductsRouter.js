const { Router } = require("express");
const router = Router({ mergeParams: true });

//! Admin Auth Middleware -------------------------------------------
const { adminAccess } = require("../ManageAccess/adminAuth");

//! Route Handlers -------------------------------------------
const {
  addProduct,
  showAllProducts,
  showCategoryProducts,
  showOneProduct,
  editProduct,
  deleteAllProducts,
  deleteOneProduct,
} = require("../Controller/ProductsController");

//! Routes -------------------------------------------
//? All Products
router
  .route("/")
  .get(showAllProducts)
  .post(adminAccess, addProduct)
  .delete(adminAccess, deleteAllProducts);

//? Products Category
router.route("/:category").get(showCategoryProducts);

//? Products id
router
  .route("/id/:id")
  .get(showOneProduct)
  .post(adminAccess, deleteOneProduct)
  .put(adminAccess, editProduct);

module.exports = router;
