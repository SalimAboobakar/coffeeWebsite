// src/pages/ProductsPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import ProductCard from "../components/ProductCard";
import { Spinner } from "reactstrap";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <Spinner className="m-5" />;
  if (status === "failed")
    return <p className="text-danger text-center">Error: {error}</p>;
  if (!list.length)
    return <p className="text-center mt-5">No products found.</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {list.map((product) => (
          <div key={product._id} className="col-md-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
