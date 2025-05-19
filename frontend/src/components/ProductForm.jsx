// src/components/ProductForm.jsx
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import api from "../api/axios";

export default function ProductForm({ isOpen, toggle, product, onSave }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
      });
    } else {
      setForm({ name: "", price: "", imageUrl: "", description: "" });
    }
  }, [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        const res = await api.put(`/products/${product._id}`, form);
        onSave(res.data);
      } else {
        const res = await api.post("/products", form);
        onSave(res.data);
      }
      toggle();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {product ? "Edit Product" : "Add Product"}
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">Image URL</Label>
            <Input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
