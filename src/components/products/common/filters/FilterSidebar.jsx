import { useState } from "react";
import { Collapse } from "react-bootstrap";
import "../filters/Filter.css";

export default function FilterSidebar({ filters, onChange }) {
  const [open, setOpen] = useState({
    availability: true,
    price: true,
    brand: true,
    rating: true,
  });

  const clearFilters = () => onChange({});

  const handleChange = (key, value) => {
    if (value === "" || value === undefined) {
      const f = { ...filters };
      delete f[key];
      onChange(f);
    } else {
      onChange({ ...filters, [key]: value });
    }
  };

  return (
    <>
      {/* HEADER */}
      <h4 className="fw-bold d-flex align-items-center justify-content-between summer--sale">
        Filters
        <button className="btn btn-sm text-danger" onClick={clearFilters}>
          Clear All
        </button>
      </h4>
      <hr />

      {/* AVAILABILITY */}
      <div className="mb-3">
        <h6
          className="fw-semibold filter-toggle"
          onClick={() =>
            setOpen((prev) => ({
              ...prev,
              availability: !prev.availability,
            }))
          }
        >
          Availability ▾
        </h6>

        <Collapse in={open.availability}>
          <div>
            <select
              className="form-select"
              value={filters.available ?? ""}
              onChange={(e) =>
                handleChange("available", e.target.value)
              }
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
          onClick={() =>
            setOpen((prev) => ({ ...prev, price: !prev.price }))
          }
        >
          Price ▾
        </h6>

        <Collapse in={open.price}>
          <div className="d-flex gap-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min ₹"
              value={filters.price_min ?? ""}
              onChange={(e) =>
                handleChange(
                  "price_min",
                  e.target.value ? Number(e.target.value) : ""
                )
              }
            />

            <input
              type="number"
              className="form-control"
              placeholder="Max ₹"
              value={filters.price_max ?? ""}
              onChange={(e) =>
                handleChange(
                  "price_max",
                  e.target.value ? Number(e.target.value) : ""
                )
              }
            />
          </div>
        </Collapse>
      </div>

      {/* BRAND */}
      <div className="mb-3">
        <h6
          className="fw-semibold filter-toggle"
          onClick={() =>
            setOpen((prev) => ({ ...prev, brand: !prev.brand }))
          }
        >
          Brand ▾
        </h6>

        <Collapse in={open.brand}>
          <div>
            <select
              className="form-select"
              value={filters.brand ?? ""}
              onChange={(e) =>
                handleChange("brand", e.target.value)
              }
            >
              <option value="">All</option>
              <option value="CARRIER">Carrier</option>
              <option value="DAIKIN">Daikin</option>
              <option value="VOLTAS">Voltas</option>
              <option value="BPL">BPL</option>
              <option value="BLUESTAR">Bluestar</option>
            </select>
          </div>
        </Collapse>
      </div>

      {/* RATING */}
      <div className="mb-3">
        <h6
          className="fw-semibold filter-toggle"
          onClick={() =>
            setOpen((prev) => ({ ...prev, rating: !prev.rating }))
          }
        >
          Rating ▾
        </h6>

        <Collapse in={open.rating}>
          <div>
            <select
              className="form-select"
              value={filters.rating ?? ""}
              onChange={(e) =>
                handleChange("rating", Number(e.target.value))
              }
            >
              <option value="">All</option>
              <option value="4">4★ & above</option>
              <option value="3">3★ & above</option>
              <option value="2">2★ & above</option>
            </select>
          </div>
        </Collapse>
      </div>
    </>
  );
}