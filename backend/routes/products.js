// backend/routes/products.js

const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public listing
router.route("/").get(getProducts);

// Admin-only create
router.route("/").post(protect, admin, createProduct);

// Public read-one
router.route("/:id").get(getProductById);

// Admin-only update & delete
router
  .route("/:id")
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
