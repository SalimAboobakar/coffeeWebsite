// src/pages/CartPage.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import { removeFromCart, clearCart } from "../slices/cartSlice";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = items
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const handleCheckout = async () => {
    if (!items.length) return;
    // send only product IDs and quantities
    await api.post("/orders", {
      items: items.map((i) => ({ product: i._id, quantity: i.quantity })),
      total: parseFloat(total),
    });
    dispatch(clearCart());
    alert("Order placed!");
    navigate("/");
  };

  if (!items.length) {
    return (
      <div className="container mt-5 text-center">
        <h4>Your cart is empty</h4>
        <Button color="primary" onClick={() => navigate("/")}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>${i.price.toFixed(2)}</td>
              <td>{i.quantity}</td>
              <td>${(i.price * i.quantity).toFixed(2)}</td>
              <td>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => handleRemove(i._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end mb-3">
        <strong>Total: ${total}</strong>
      </div>
      <div className="text-end">
        <Button color="success" onClick={handleCheckout}>
          Confirm Purchase
        </Button>
      </div>
    </div>
  );
}
