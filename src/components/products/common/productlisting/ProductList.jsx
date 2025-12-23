import React, { useState, useEffect, useRef } from "react";
import { fetchProducts } from "../api/products";
import "../../../categories/ac/AirConditioners.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCartPlus, faCartShopping, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useWishlist } from "../../../WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 


export default function ProductList({ filters = {}, category }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

   
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);


  // 🔥 VERY IMPORTANT STATE
  const [cartVersion, setCartVersion] = useState(0);
const [notifiedIds, setNotifiedIds] = useState([]);
  // 🔁 CART CHECK (now reactive)
  const isInCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    return cart.some((item) => item.id === productId);
  };

  // 🛒 ADD TO CART
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existing = cart.find((i) => i.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem(
      "cartCount",
      cart.reduce((s, i) => s + i.qty, 0)
    );

    window.dispatchEvent(new Event("storage"));

    // 🔥 FORCE RE-RENDER
    setCartVersion((v) => v + 1);
  };
 
 // 🔁 reset when filters change
  useEffect(() => {
  setProducts([]);     // 🔥 clear old
  setPage(1);          // 🔥 reset pagination
  setHasMore(true);    // 🔥 allow loading again
}, [filters]);

useEffect(() => {
  const load = async () => {
    try {
      const res = await fetchProducts({
        page: 1,
        filters,
        category,   // ✅ yahin se backend filter ho raha
      });

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Fetch products error", err);
    }
  };

  load();
}, [filters, category]);
 

const handleNotify = (product) => {
  Swal.fire({
    icon: "info",
    title: "Notify Me Enabled",
    html: `
      <label class="pro_lbl" style="margin-bottom:8px;">
        We will inform you once is available again.
      </label>
      <span  class="pro_name">${product.name}</span>
    `,
    showConfirmButton: true,
    confirmButtonText: "Got it",
    confirmButtonColor: "#28a745", 
  }).then((res) => {
    if (res.isConfirmed) {
      // 🔥 get existing notified ids
      const existing =
        JSON.parse(localStorage.getItem("notifiedProducts")) || [];

      // 🔥 avoid duplicates
      if (!existing.includes(product.id)) {
        const updated = [...existing, product.id];
        localStorage.setItem(
          "notifiedProducts",
          JSON.stringify(updated)
        );
      }

      // 🔥 update local state too
      setNotifiedIds(
        JSON.parse(localStorage.getItem("notifiedProducts"))
      );
    }
  });
};

useEffect(() => {
  const stored =
    JSON.parse(localStorage.getItem("notifiedProducts")) || [];
  setNotifiedIds(stored);
}, []);





const getNotified = () =>
  JSON.parse(localStorage.getItem("notifiedProducts")) || [];

const addNotified = (id) => {
  const list = getNotified();
  if (!list.includes(id)) {
    localStorage.setItem(
      "notifiedProducts",
      JSON.stringify([...list, id])
    );
  }
};

const removeNotified = (id) => {
  const list = getNotified().filter((x) => x !== id);
  localStorage.setItem(
    "notifiedProducts",
    JSON.stringify(list)
  );
};


useEffect(() => {
  setNotifiedIds(getNotified());
}, []);


/* =========================
   FILTER PRODUCTS FIRST
========================= */
const filteredProducts = products.filter((p) => {
  // Availability
  if (filters.available === "in_stock" && p.stock <= 0) return false;
  if (filters.available === "out_of_stock" && p.stock > 0) return false;

  // Price
  if (filters.price_min && p.price < filters.price_min) return false;
  if (filters.price_max && p.price > filters.price_max) return false;

  // Brand
  if (filters.brand && p.brand !== filters.brand) return false;

  // Rating
  if (filters.rating && p.rating < filters.rating) return false;

  return true; // ALL
});

/* =========================
   SORT → IN STOCK FIRST
========================= */
const finalProducts = [...filteredProducts].sort((a, b) => {
  // 1️⃣ Stock priority (in-stock upar)
  const aStock = Number(a.stock) > 0 ? 1 : 0;
  const bStock = Number(b.stock) > 0 ? 1 : 0;

  if (aStock !== bStock) {
    return bStock - aStock; // in-stock first
  }

  // 2️⃣ Alphabetical order (A → Z)
  return a.name.localeCompare(b.name);
});
 

  // 🔥 INFINITE SCROLL OBSERVER
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);


const getHeadingText = () => {
  switch (category) {
    case "ac":
      return "Summer Ready Sale - Air Conditioners";
    case "washingmachine":
      return "Best Deals on Washing Machines";
    default:
      return "Our Products";
  }
};

  return (
    <>
<h3 className="fw-bold mb-3 summer--sale">
  {getHeadingText()}
  <span className="length__decider"> ({products.length})</span>
</h3>

{/* EMPTY STATE */}
{products.length === 0 ? (
  <p className="text-secondary fs-5">No products found</p>
) : (
  <div className="row g-4">
    {finalProducts.map((item) => {
      const isWishlisted = wishlist.some((w) => w.id === item.id);
      const addedToCart = isInCart(item.id);

      return (
        <div
          className="col-12 col-sm-6 col-md-4 col-lg-3"
          key={item.id}
        >
          <Link
            to={`/product/${item.slug}`}
            className="text-decoration-none"
          >
            {/* OUT OF STOCK BADGE */}
            {item.stock === 0 && (
              <span className="badge bg-danger position-absolute m-2">
                Out of Stock
              </span>
            )}

            {/* ❤️ WISHLIST */}
            <div className="wishlist_ableclick">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  isWishlisted
                    ? removeFromWishlist(item.id)
                    : addToWishlist(item);
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={isWishlisted ? solidHeart : regularHeart}
                  style={{
                    color: isWishlisted ? "red" : "#444",
                    fontSize: "14px",
                  }}
                />
              </span>
            </div>

            {/* PRODUCT CARD */}
            <div className="card h-100 border-0 shadow-sm product-card">
              <div className="text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  loading="lazy"
                  style={{
                    objectFit: "contain",
                    height: "140px",
                    width: "130px",
                  }}
                />
              </div>

              <div className="card-body d-flex flex-column">
                <h6 style={{ fontSize: "13px", color: "grey" }}>
                  {item.name.length > 60
                    ? item.name.slice(0, 60) + "..."
                    : item.name}
                </h6>

                <span className="fw-bold fs-5">₹{item.price}</span>

<div className="d-flex gap-2 mt-3 position-relative">

  {/* 🔴 OUT OF STOCK CASE */}
  {item.stock === 0 ? (
    <>
      {/* UNAVAILABLE BUTTON (UNCHANGED) */}
      <button className="btn w-100 cart_btn_id" disabled>
        Unavailable
      </button>

      {/* 🔔 NOTIFY AREA */}
      <div className="position-relative w-100">
        
        {/* ❌ CROSS ICON (ABSOLUTE, SMALL) */}
        {notifiedIds.includes(item.id) && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeNotified(item.id);
              setNotifiedIds(getNotified());
            }}
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#dc3545",
              color: "#fff",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 5,
            }}
            title="Remove notification"
          >
            ✕
          </span>
        )}

        {/* NOTIFY / NOTIFIED BUTTON */}
        {notifiedIds.includes(item.id) ? (
          <button className="btn w-100 text-white bg-success w-100 notify_btn" disabled>
            Notified
          </button>
        ) : (
          <button
            className="btn w-100 btn-outline-success w-100 notify_btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addNotified(item.id);
              setNotifiedIds(getNotified());
            }}
          >
            Notify
          </button>
        )}
      </div>
    </>
  ) : (
    <>
      {/* 🟢 IN STOCK CASE (UNCHANGED) */}
      {addedToCart ? (
        <button
          className="btn w-100 ac_view"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/Cart");
          }}
        >
          View Cart
        </button>
      ) : (
        <button
          className="btn w-100 ac_cart"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(item);
          }}
        >
          Cart <FontAwesomeIcon icon={faCartShopping} />
        </button>
      )}

      <button className="btn btn-outline-primary w-100 ac_compare">
        Buy Now
      </button>
    </>
  )}
</div>
              </div>
            </div>
          </Link>
        </div>
      );
    })}
  </div>
)}
    </>
  );
}