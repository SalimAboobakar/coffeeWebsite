// frontend/src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import API from "../axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch products on mount
  useEffect(() => {
    API.get("/products")
      .then(({ data }) => setProducts(data))
      .catch(() => setError("فشل في جلب المنتجات"));
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || "خطأ في الحذف";
      setError(msg);
    }
  };

  return (
    <div>
      <h1>لوحة الإدارة</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} – {p.price}$
            <button onClick={() => handleDelete(p._id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
