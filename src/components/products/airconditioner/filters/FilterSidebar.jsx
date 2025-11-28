import { useState } from "react"; 
import { Collapse } from "react-bootstrap";
export default function FilterSidebar({ filters, onChange }) {
  const [open, setOpen] = useState({
    availability: true,
    price: true,
    brand: true,
    rating: true
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    onChange(updated);
  };

  const clearFilters = () => {
    onChange({});
  };

  return (
    <>
      {/* HEADER */}
      <h4 className="fw-bold d-flex justify-content-between">
        Filters
        <button className="btn btn-sm btn-outline-danger" onClick={clearFilters}>
          Clear All
        </button>
      </h4>
      <hr />

      {/* AVAILABILITY */}
      <div className="mb-3">
        <h6
          className="fw-semibold filter-toggle"
          onClick={() => setOpen({ ...open, availability: !open.availability })}
        >
          Availability ▾
        </h6>
        <Collapse in={open.availability}>
          <div>
            <select
              className="form-select"
              value={filters.available || ""}
              onChange={(e) => handleChange("available", e.target.value)}
            >
              <option value="">All</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </Collapse>
      </div>

      {/* PRICE */}
      <div className="mb-3">
        <h6
          className="fw-semibold filter-toggle"
          onClick={() => setOpen({ ...open, price: !open.price })}
        >
          Price ▾
        </h6>
        <Collapse in={open.price}>
          <div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              className="form-range"
              value={filters.price || 50000}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <span className="badge bg-primary">₹ {filters.price || 50000}</span>
          </div>
        </Collapse>
      </div>

      {/* BRAND */}
      <div className="mb-3">
        <h6
          className="fw-semibold filter-toggle"
          onClick={() => setOpen({ ...open, brand: !open.brand })}
        >
          Brand ▾
        </h6>
        <Collapse in={open.brand}>
          <div>
            <select
              className="form-select"
              value={filters.brand || ""}
              onChange={(e) => handleChange("brand", e.target.value)}
            >
              <option value="">All</option>
              <option value="Samsung">Samsung</option>
              <option value="LG">LG</option>
              <option value="Sony">Sony</option>
              <option value="Whirlpool">Whirlpool</option>
            </select>
          </div>
        </Collapse>
      </div>

      {/* RATING */}
      <div className="mb-3">
        <h6
          className="fw-semibold filter-toggle"
          onClick={() => setOpen({ ...open, rating: !open.rating })}
        >
          Rating ▾
        </h6>
        <Collapse in={open.rating}>
          <div>
            <select
              className="form-select"
              value={filters.rating || ""}
              onChange={(e) => handleChange("rating", e.target.value)}
            >
              <option value="">All</option>
              <option value="4">4★ & above</option>
              <option value="3">3★ & above</option>
              <option value="2">2★ & above</option>
            </select>
          </div>
        </Collapse>
      </div>

      {/* APPLY BUTTON FOR MOBILE */}
      <button className="btn btn-primary w-100 d-md-none mt-3" onClick={() => {}}>
        Apply Filters
      </button>
    </>
  );
}