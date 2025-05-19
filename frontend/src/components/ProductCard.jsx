// src/components/ProductCard.jsx
import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { _id, name, price, imageUrl } = product;

  const handleAdd = () => {
    dispatch(addToCart({ _id, name, price, imageUrl, quantity: 1 }));
  };

  return (
    <Card className="mb-4">
      {imageUrl && <CardImg top src={imageUrl} alt={name} />}
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardText>${price.toFixed(2)}</CardText>
        <Button color="primary" onClick={handleAdd}>
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
}
