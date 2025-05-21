// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

/**
 * تحقّق من وجود JWT في الكوكيز وصحّته، ثم ضع بيانات المستخدم في req.user
 */
exports.protect = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "غير مصرح: الرجاء تسجيل الدخول" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "الرمز منتهي أو غير صالح" });
  }
};
