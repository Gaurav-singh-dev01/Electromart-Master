import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footerComponent/Footer";
import Header from "./headerComponent/Header";
import "../assets/css/style.css";
import emptycart from "../assets/img/emptycart.png";
import coupon from "../assets/img/coupon.png";

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // 🟢 load cart on mount
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setItems(cart.filter(Boolean));
  }, []);

  // 🟢 listen for cart update events
  useEffect(() => {
    const updateCart = () => {
      let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setItems(cart.filter(Boolean));
    };
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  const saveAndSync = (cart) => {
    cart = cart.filter(Boolean);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    const count = cart.reduce((s, it) => s + (it.qty || 0), 0);
    localStorage.setItem("cartCount", count);
    window.dispatchEvent(new Event("storage")); // header update

    setItems(cart);
  };

  const increaseQty = (id) => {
    const cart = items.map((item) =>
      item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    saveAndSync(cart);
  };

  const decreaseQty = (id) => {
    const cart = items.map((item) =>
      item._id === id
        ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) }
        : item
    );
    saveAndSync(cart);
  };

  const removeItem = (id) => {
    let cart = items.filter((item) => item._id !== id);

    if (cart.length === 0) {
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartCount", 0);
      window.dispatchEvent(new Event("storage"));
      setItems([]); // show empty cart instantly
      return;
    }
if (cart.length === 0) {
  window.location.reload();
}
    saveAndSync(cart);
  };

  const total = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);

  // 🌟 Coupon System
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const availableCoupons = [
    { code: "SAVE10", description: "Get 10% OFF on your order" },
    { code: "FREESHIP", description: "Free Delivery on this order" },
    { code: "EXTRA200", description: "₹200 OFF on orders above ₹2000" },
  ];

  const handleSubmitCoupon = () => {
    if (!couponCode) return alert("Please enter a coupon code");
    alert("🎉 Coupon Applied: " + couponCode);
    setShowCouponModal(false);
  };

  return (
    <>
      <Header />

      <div className="container-fluid px-5 py-4">
        <div className="row">
  <h3>Your Cart</h3>
          <div className={items.length === 0 ? "col-12 d-flex justify-content-center" : "col-9"}>
          

            {items.length === 0 ? (
              <div className="text-center mt-5">
                <img src={emptycart} alt="empty cart" width="200" className="mb-3" />
                <h4>Your Cart is Empty</h4>
                <button className="btn btn-dark mt-3" onClick={() => navigate("/Index")}>
                  Continue Shopping <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item._id} className="bg-white px-3 py-4">
                  <div className="d-inline-flex">
                  <div className="">
                    <img src={item.image} alt={item.name} width="150px" height="120px" style={{ objectFit: "contain" }}/>
                           <div className="d-inline-flex gap-3 w-100 mt-2 justify-content-center">
                        <button onClick={() => decreaseQty(item._id)} className="btn btn-outline-dark btn-sm">-</button>
                        <span className="fw-bold">{item.qty}</span>
                        <button onClick={() => increaseQty(item._id)} className="btn btn-outline-dark btn-sm">+</button>
                      </div>
                      </div>
                    <div className="Id_cart123">
                      <h5>{item.name}</h5>
                      <p className="text-muted">{item.brand}</p>
                      <h6>₹{item.price}</h6>


                    </div>
                  </div>

                  <div className="text-end">
                    <h6>Subtotal: ₹{(item.price || 0) * (item.qty || 1)}</h6>
                    <button onClick={() => removeItem(item._id)} className="btn btn-danger btn-sm mt-2">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            {items.length > 0 && (
              <div className="text-end mt-4">
                <h4>Total: ₹{total}</h4>
                <button className="btn btn-success mt-2 px-4">Proceed to Checkout</button>
              </div>
            )}
          </div>

  {/* Coupon Modal */}
{items.length > 0 && (
  <div className="col-3">
    <button
      className="btn btn-link p-0 w-100"
      style={{ textDecoration: "none" }}
      onClick={() => setShowCouponModal(true)}
    >
      <div className="coupon_code">
        <div className="coupon_text_img">
          <img src={coupon} width="40" />
          <span> Apply coupon code</span>
        </div>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </button>

    {/* Coupon Modal */}
    {showCouponModal && (
      <>
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Apply Coupon</h5>
                <button className="btn-close" onClick={() => setShowCouponModal(false)}></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                <h6 className="fw-bold mb-2">Available Coupons</h6>
                {availableCoupons.map((c, i) => (
                  <div key={i} className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{c.code}</strong>
                      <p className="m-0 text-muted" style={{ fontSize: "13px" }}>{c.description}</p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => setCouponCode(c.code)}>
                      Apply
                    </button>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowCouponModal(false)}>Close</button>
                <button className="btn btn-success" onClick={handleSubmitCoupon}>Apply Coupon</button>
              </div>

            </div>
          </div>
        </div>

        <div className="modal-backdrop fade show"></div>
      </>
    )}
  </div>
)}
        </div>
      </div>

      <Footer /> 
    </>
  );
}