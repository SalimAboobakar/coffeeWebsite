// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public home */}
        <Route path="/" element={<ProductsPage />} />

        {/* Auth page (login/register) */}
        <Route
          path="/auth"
          element={
            !user ? (
              <LoginRegisterPage />
            ) : (
              // توجيه بناءً على isAdmin بدل role
              <Navigate to={user.isAdmin ? "/admin" : "/"} replace />
            )
          }
        />

        {/* Admin-only */}
        <Route
          path="/admin"
          element={
            user?.isAdmin ? <AdminDashboard /> : <Navigate to="/auth" replace />
          }
        />

        {/* Cart (must be logged in) */}
        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/auth" replace />}
        />

        {/* Catch-all redirects home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
