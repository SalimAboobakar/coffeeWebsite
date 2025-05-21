// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

/**
 * Protect routes by validating JWT from the "token" cookie.
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
    return res
      .status(401)
      .json({ message: "الرمز منتهي الصلاحية أو غير صالح" });
  }
};
