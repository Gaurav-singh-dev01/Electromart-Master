import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-3 rounded-lg shadow hover:shadow-md transition">
      <img src={product.thumbnail || "/placeholder.png"}  className="w-full h-40 object-contain"/>
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.brand}</p>
      <p className="text-blue-600 font-bold">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;