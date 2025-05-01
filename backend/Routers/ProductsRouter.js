const { Router } = require("express");
const router = Router();
const ProductsSchema = require("../Model/ProductsSchema");
const { adminAccess } = require("../ManageAccess/adminAuth");

const {
  addItem,
  getAllItems,
  getItemsByCategory,
  getOneItem,
  deleteItem,
} = require("../Controller/ProductsController");


router.post("/additem", adminAccess, addItem);

// Get all items of a type
router.get("/", getAllItems);

// Get by subcategory
router.get("/:category", getItemsByCategory);

// Get one item by ID
router.get("/:id", getOneItem);

// Delete item
router.post("/delete/:id", adminAccess, deleteItem);

module.exports = router;
