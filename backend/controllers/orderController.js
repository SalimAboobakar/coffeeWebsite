// backend/controllers/orderController.js

const Order = require("../models/Order");

/**
 * GET /api/orders
 * اعرض جميع الطلبات الخاصة بالمستخدم الحالي
 */
exports.getOrders = async (req, res, next) => {
  try {
    // req.user.id حُدد في الـ authMiddleware
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/orders
 * أنشئ طلباً جديداً للمستخدم الحالي
 */
exports.createOrder = async (req, res, next) => {
  try {
    const { items, total } = req.body;
    const order = new Order({
      user: req.user.id,
      items,
      total,
      createdAt: Date.now(),
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
