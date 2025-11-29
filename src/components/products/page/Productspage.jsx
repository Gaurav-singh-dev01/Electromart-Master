import React, { useState, useEffect } from "react";
import FilterSidebar from "../airconditioner/filters/FilterSidebar";
import ProductList from "../airconditioner/acproducts/ProductList";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductsPage() {
  const { id } = useParams(); // 🔥 सबसे ऊपर — सबसे पहले URL ID ले लो

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🎯 Single product API
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.log("Product Fetch Error:", err));
  }, [id]);

  // 🔹 Agar data loaded nahi hua
  if (loading) return <h2 className="text-center p-4">Loading...</h2>;
  if (!product) return <h2 className="text-center p-4">Product Not Found</h2>;

  // 🔥 Products list + filtering
  const [filters, setFilters] = useState({
    category: "all",
    limit: 20,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters]);

  return (
    <>
      {/* ⭐ Single Product Detail Section */}
      <div className="container py-4">
        <div className="row">
          {/* IMAGE */}
          <div className="col-md-5 text-center">
            <img src={product.image} className="img-fluid mb-3" alt={product.name} />
          </div>

          {/* DETAILS */}
          <div className="col-md-7">
            <h3>{product.name}</h3>
            <p className="text-muted">{product.brand}</p>

            <h2 className="text-primary fw-bold">₹{product.price}</h2>

            {/* Discount */}
            {product.discountPercent > 0 && (
              <p>
                <del>
                  ₹{Math.round((product.price * 100) / (100 - product.discountPercent))}
                </del>
                <span className="badge bg-success ms-2">
                  {product.discountPercent}% OFF
                </span>
              </p>
            )}

            <p className="mt-3">{product.description}</p>

            <button className="btn btn-primary btn-lg mt-3">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* ⭐ All Products + Filters */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>
          <div className="col-md-9">
            <ProductList filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
}