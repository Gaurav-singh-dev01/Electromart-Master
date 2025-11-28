import React, { useState, useEffect } from "react";
import FilterSidebar from "../airconditioner/filters/FilterSidebar";
import ProductList from "../airconditioner/acproducts/ProductList";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: "all",
    limit: 20,
  });

  // Reset scroll when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters]);

  return (
    <div className="flex">
      <div className="w-72">
        <FilterSidebar filters={filters} onChange={setFilters} />
      </div>

      <div className="flex-1 p-4">
        <ProductList filters={filters} />
      </div>
    </div>
  );
}