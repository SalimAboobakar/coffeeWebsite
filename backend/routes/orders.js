// backend/routes/orders.js

const express = require("express");
const { getOrders, createOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// جميع مسارات /api/orders محمية
router.use(protect);

router
  .route("/")
  .get(getOrders) // GET /api/orders
  .post(createOrder); // POST /api/orders

module.exports = router;
