// backend/controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * POST /api/auth/register
 * سجّل مستخدم جديد وأرسل JWT وكائن المستخدم مع isAdmin
 */
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // تحقق من عدم وجود المستخدم مسبقاً
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "هذا البريد مسجل مسبقاً" });
    }

    // أنشئ المستخدم
    user = new User({ email, password });
    await user.save();

    // شكّل التوكن متضمّناً isAdmin
    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // أرسل الكوكي والاستجابة
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "تم تسجيل المستخدم بنجاح",
        user: { id: user._id, email: user.email, isAdmin: user.isAdmin },
      });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * سجّل دخول مستخدم موجود وأرسل JWT وكائن المستخدم مع isAdmin
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ابحث عن المستخدم وتحقق من كلمة المرور
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
    }

    // شكّل التوكن متضمّناً isAdmin
    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // أرسل الكوكي والاستجابة
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "تم تسجيل الدخول بنجاح",
        user: { id: user._id, email: user.email, isAdmin: user.isAdmin },
      });
  } catch (err) {
    next(err);
  }
};
