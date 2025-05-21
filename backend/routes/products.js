// backend/routes/products.js

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET /api/products          → list all products
// POST /api/products         → create new product (protected)
router.route("/").get(getProducts).post(protect, createProduct);

// GET /api/products/:id      → get one product
// PUT /api/products/:id      → update product (protected)
// DELETE /api/products/:id   → delete product (protected)
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
