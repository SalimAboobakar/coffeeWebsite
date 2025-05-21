// src/components/AuthForm.jsx
import React, { useState } from "react";
import API from "../axios";

export default function AuthForm({ mode = "login", onSuccess }) {
  // mode = "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // حدد المسار بناءً على الوضع
    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";

    try {
      const res = await API.post(endpoint, { email, password });
      // إذا نجح، ترسل النتائج للوالد (مثلاً لتخزين التوكن)
      onSuccess && onSuccess(res.data);
    } catch (err) {
      console.error(`❌ authUser failed:`, err.response || err);
      // حاول قراء رسالة الخطأ من الـ response
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "حدث خطأ في الاتصال بالخادم";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div>
        <label>البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">{mode === "login" ? "دخول" : "تسجيل"}</button>
    </form>
  );
}
