import { useState, useEffect } from "react";
import { fetchProducts } from '../api/products';
import '../AirConditioners.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function ProductList({ filters }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState([]);

  // Fetch products whenever filters change
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts({ page: 1, filters });
        setProducts(res.products || []);
        setLiked(Array(res.products?.length || 0).fill(false)); // initialize wishlist
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    loadProducts();
  }, [filters]);

  const toggleLike = (index) => {
    setLiked(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  return (
    <>
      <h3 className="fw-bold mb-3 summer--sale">
        Summer Ready Sale - AC <span className="length__decider">({products.length})</span>
      </h3>

      <div className="row g-4">
        {products.length === 0 ? (
          <p className="text-secondary fs-5">No products found</p>
        ) : (
          products.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <Link to={`/product/${item.slug}`} className="text-decoration-none">
                {item.stock === 0 && (
                  <div className="position-relative">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                      Out of Stock
                    </span>
                  </div>
                )}

                <div className="wishlist_ableclick">
                  <span
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(index); }}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={liked[index] ? solidHeart : regularHeart}
                      style={{ color: liked[index] ? "red" : "#444", fontSize: "14px" }}
                    />
                  </span>
                </div>

                <div className="card h-100 border-0 shadow-sm product-card">
                  <div className="position-relative text-center">
                    <img
                      src={`${item.image}?v=${Date.now()}`} // prevents cache
                      className="card-img-top"
                      style={{ objectFit: "contain", height: "140px", width: '130px' }}
                      alt={item.name}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h6 style={{ fontSize: '13px', color: 'grey', fontWeight: 400, marginBottom: '15px' }}>
                      {item.name.length > 42 ? item.name.slice(0, 62) + "..." : item.name}
                    </h6>

                    <div className="d-flex align-items-center mb-1">
                      <span className="text-primary text-dark fw-bold fs-5">₹{item.price}</span>
                      {item.discountPercent > 0 && (
                        <span className="badge text-success ms-2">{item.discountPercent}% OFF</span>
                      )}
                    </div>

                    {item.discountPercent > 0 && (
                      <div className="d-flex justify-content-between">
                        <span className="text-muted text-decoration-line-through">
                          ₹{Math.round((item.price * 100) / (100 - item.discountPercent))}
                        </span>
                        <div className="text-warning fw-semibold mb-2">
                          {item.rating ? "⭐".repeat(Math.floor(item.rating)) + (item.rating % 1 !== 0 ? "✰" : "") : "No Rating"}
                        </div>
                      </div>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <button className="btn btn-primary w-100 mt-auto cart_btn_id" disabled={item.stock === 0}>
                        {item.stock === 0 ? "Unavailable" : "Add to Cart"}
                      </button>
                      <button className="btn btn-primary w-100 mt-auto cart_btn_id" disabled={item.stock === 0}>
                        {item.stock === 0 ? "Unavailable" : "Compare"}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}