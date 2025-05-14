const multer = require("multer");
// const { Router } = require("express");
// const router = Router({ mergeParams: true });
const router = require("express").Router({ mergeParams: true });

//! Admin Auth Middleware -------------------------------------------
const { adminAccess } = require("../ManageAccess/adminAuth");

//! Image Insertion Configuration -------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//! Handler Functions -------------------------------------------
const {
  addProduct,
  showAllProducts,
  showCategoryProducts,
  showOneProduct,
  editProduct,
  deleteAllProducts,
  deleteOneProduct,
  getProductImage,
} = require("../Controller/ProductsController");

//! Routes -------------------------------------------
//? Image Route
router.get("/images/id/:id", getProductImage);

//? All Products
router
  .route("/")
  .get(showAllProducts)
  .post(adminAccess, upload.single("Image"), addProduct)
  .delete(adminAccess, deleteAllProducts);

//? Products Category
router.route("/:category").get(showCategoryProducts);

//? Products id
router
  .route("/id/:id")
  .get(showOneProduct)
  .post(adminAccess, deleteOneProduct)
  .put(adminAccess, upload.single("Image"), editProduct);

module.exports = router;
