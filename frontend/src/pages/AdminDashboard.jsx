// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import api from "../api/axios";
import { Button, Table, Spinner } from "reactstrap";
import ProductForm from "../components/ProductForm";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { list: products, status } = useSelector((state) => state.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner className="m-5" />;
  }

  const toggle = () => setModalOpen((open) => !open);

  const onAdd = () => {
    setProduct(null);
    toggle();
  };
  const onEdit = (p) => {
    setProduct(p);
    toggle();
  };
  const onDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    dispatch(fetchProducts());
  };
  const onSave = () => dispatch(fetchProducts());

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <Button color="success" onClick={onAdd} className="mb-3">
        Add Product
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>${prod.price.toFixed(2)}</td>
              <td>
                <Button size="sm" color="primary" onClick={() => onEdit(prod)}>
                  Edit
                </Button>{" "}
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => onDelete(prod._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ProductForm
        isOpen={modalOpen}
        toggle={toggle}
        product={selectedProduct}
        onSave={onSave}
      />
    </div>
  );
}
