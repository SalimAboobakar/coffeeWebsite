// backend/controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * @route   POST /api/auth/register
 * @desc    سجل مستخدم جديد وأرسل JWT في كوكي
 */
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // تأكد أن البريد غير مسجل مسبقاً
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "هذا البريد مسجل مسبقاً" });
    }

    // أنشئ المستخدم وخزّنه
    user = new User({ email, password });
    await user.save();

    // اصنع التوكن
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // أضف الكوكي وأرسل الاستجابة
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
      })
      .status(201)
      .json({
        message: "تم تسجيل المستخدم بنجاح",
        user: { id: user._id, email: user.email },
      });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    سجّل دخول مستخدم موجود وأرسل JWT في كوكي
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ابحث عن المستخدم وتحقق من كلمة المرور
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
    }

    // اصنع التوكن
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // أضف الكوكي وأرسل الاستجابة
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "تم تسجيل الدخول بنجاح",
        user: { id: user._id, email: user.email },
      });
  } catch (err) {
    next(err);
  }
};
