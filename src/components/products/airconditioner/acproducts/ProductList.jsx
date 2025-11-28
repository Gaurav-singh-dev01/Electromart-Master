import { useState , useRef, useEffect } from "react";  
import { fetchProducts } from '../api/products';
import '../AirConditioners.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEye, faEyeSlash, faChevronRight, faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function ProductList({ filters }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts({ page: 1, filters });
      setProducts(res.products);
    } catch (err) {
      console.error("API Error:", err);
    }
  };
  
  const [liked, setLiked] = useState([false, false, false, false, false, false, false]);
  const toggleLike = (index) => {
    const updated = [...liked];
    updated[index] = !updated[index];
    setLiked(updated);
  };

  return (
    <>
      <h3 className="fw-bold mb-3 summer--sale">Summer Ready Sale - AC <span className="length__decider"> ({products.length}) </span></h3>

      <div className="row g-4">
        {products.length === 0 ? (
          <p className="text-secondary fs-5">No products found</p>
        ) : (
          products.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <div className="card h-100 border-0 shadow-sm product-card">
                <div className="position-relative">
                    <div className="wishlist_ableclick">
                                             <span onClick={() => toggleLike(0)} style={{ cursor: "pointer" }}>
                                               <FontAwesomeIcon
                                                 icon={liked[0] ? solidHeart : regularHeart}
                                                 style={{ color: liked[0] ? "red" : "#444", fontSize: "20px" }}
                                               />
                                             </span>
                      </div>
                  <img
                    src={`${item.image}?v=${Date.now()}`} // 🟢 prevents image cache
                    className="card-img-top p-3"
                    style={{ objectFit: "contain", height: "210px" }}
                    alt={item.name}
                  />
                  {item.stock === 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold text-dark card-title">
                    {item.name.length > 42 ? item.name.slice(0, 42) + "..." : item.name}
                  </h6>
                  <p className="text-muted small mb-1">{item.brand}</p>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-primary fw-bold fs-5">₹{item.price}</span>
<div className="text-warning fw-semibold">
  {item.rating
    ? "⭐".repeat(Math.floor(item.rating)) + (item.rating % 1 !== 0 ? "✰" : "")
    : "No Rating"}
</div>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-auto"
                    disabled={item.stock === 0}
                  >
                    {item.stock === 0 ? "Unavailable" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}