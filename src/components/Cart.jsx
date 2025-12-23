import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footerComponent/Footer";
import Header from "./headerComponent/Header";
import "../assets/css/style.css";
import emptycart from "../assets/img/emptycart.png";
import coupon from "../assets/img/coupon.png";
import fastdlvry from "/public/Products/fast-delivery.png"
import Swal from "sweetalert2";
import { useWishlist } from "./WishlistContext.jsx";

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

  // ✅ COUNT ONLY UNIQUE PRODUCTS
  const count = cart.length;
  localStorage.setItem("cartCount", count);

  window.dispatchEvent(new Event("storage")); // header update
  setItems(cart);
};

  const increaseQty = (id) => {
    const cart = items.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    saveAndSync(cart);
  };

  const decreaseQty = (id) => {
    const cart = items.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) }
        : item
    );
    saveAndSync(cart);
  };

  const removeItem = (id) => {
    let cart = items.filter((item) => item.id !== id);

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

  
const { addToWishlist } = useWishlist();
 const handleMoveToWishlist = (item) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Product will be moved to Wishlist",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, move it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {

      // ✅ 1. Add to wishlist (context)
      addToWishlist(item);

      // ✅ 2. Remove from cart
      const updatedCart = items.filter(i => i.id !== item.id);
      saveAndSync(updatedCart);

      Swal.fire({
        icon: "success",
        title: "Moved!",
        text: "Product moved to wishlist",
        timer: 1200,
        showConfirmButton: false
      });
    }
  });
};

const handleRemoveWithAlert = (item) => {
  Swal.fire({
    title: "Remove item?",
    text: "This product will be removed from your cart",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    showClass: {
      popup: "animate__animated animate__zoomIn"
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut"
    }
  }).then((result) => {
    if (result.isConfirmed) {
      removeItem(item.id);

      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Product removed from cart",
        timer: 1000,
        showConfirmButton: false
      });
    }
  });
};

const handleClearCart = () => {
  Swal.fire({
    title: "Empty Cart?",
    text: "All items will be removed from your cart",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, empty cart",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {

      // 🔥 Clear cart completely
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartCount", 0);
      window.dispatchEvent(new Event("storage"));

      setItems([]);

      Swal.fire({
        icon: "success",
        title: "Cart Emptied",
        text: "Your cart is now empty",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  });
};

const openCouponModal = async () => {
  const couponsHTML = availableCoupons
    .map(
      (c) => `
        <div style="border:1px solid #ddd;padding:8px;border-radius:6px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <strong>${c.code}</strong>
            <p style="margin:0;font-size:12px;color:#777">${c.description}</p>
          </div>
          <button class="swal2-confirm swal2-styled"
            style="padding:4px 10px;font-size:12px"
            onclick="document.getElementById('couponInput').value='${c.code}'">
            Apply
          </button>
        </div>
      `
    )
    .join("");

  const { value: coupon } = await Swal.fire({
    title: "Apply Coupon",
    html: `
      <input
        id="couponInput"
        class="swal2-input"
        placeholder="Enter coupon code"
        value="${couponCode}"
      />
      <div style="text-align:left;margin-top:10px">
        <strong>Available Coupons</strong>
        ${couponsHTML}
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Apply Coupon",
    preConfirm: () => {
      const input = document.getElementById("couponInput").value;
      if (!input) {
        Swal.showValidationMessage("Please enter a coupon code");
      }
      return input;
    },
  });

  if (coupon) {
    setCouponCode(coupon);
    handleSubmitCoupon();
  }
};
Swal.mixin({
  heightAuto: false
});

const totalItems = items.reduce(
  (sum, item) => sum + (item.qty || 1),
  0
);

// 🔹 Total MRP (before discount)
const totalMRP = items.reduce(
  (sum, item) => sum + (item.mrp || item.price) * (item.qty || 1),
  0
);

// 🔹 Total Selling Price (after discount)
const totalSelling = items.reduce(
  (sum, item) => sum + (item.price || 0) * (item.qty || 1),
  0
);

// 🔹 Actual Discount
const totalDiscount = totalMRP - totalSelling;
  return (
    <>
      <Header />

      <div className="container-fluid px-5 py-4">
        <div className="row">

                              <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                  <div className='breadcrum'>
                                      <ul>
                                          <li> <Link to='/Index'> Home </Link></li>
                                          <li><FontAwesomeIcon icon={faChevronRight} /></li>
                                          <li>   Cart  </li>
                                          
                                      </ul>
                                  </div>
                              </div>

             
          <div className={items.length === 0 ? "col-12 d-flex justify-content-center" : "col-9 mb-5"}> 
{items.length > 0 && (
  <button onClick={handleClearCart} className="empty_cart">
    Empty Cart
  </button>
)}
            {items.length === 0 ? (
              <div className="text-center mt-5 emptyglobal">
                <img src={emptycart} alt="empty cart" width="200" className="mb-3" />
                 <h4>Your Cart is Empty</h4>
                <button className="btn btn-dark mt-3" onClick={() => navigate("/Index")}>
                  Continue Shopping <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="id__786Border bg-white px-3 py-4">
                  <div className="d-inline-flex w-100">
                  <div className="">
                    <img src={item.image} alt={item.name} width="150px" height="120px" style={{ objectFit: "cover",display:"flex" }}/>
                           <div className="d-inline-flex gap-3 w-100 mt-2 align-items-center justify-content-center">
                        <button onClick={() => decreaseQty(item.id)} className="btn btn-outline-dark btn-md">-</button>
                        <span className="fw-bold">{item.qty}</span>
                        <button onClick={() => increaseQty(item.id)} className="btn btn-outline-dark btn-md">+</button>
                      </div>
                      </div>
                    <div className="Id_cart123">
                      <h5>{item.name}</h5>
                       <h6>₹{item.price}  <span className="badge text-success">{item.discountPercent}% OFF</span></h6>

                       
                      {item.discountPercent > 0 && (
                        <p>
    <del className="id__767light">
      ₹{Math.round((item.price * 100) / (100 - item.discountPercent))}
    </del>
    <span className="id__767light"> (Inclusive of all taxes) </span><br/>
   
    <span className="checkout_cart"><img src={fastdlvry} className="img img-fluid"/> FREE Delivery by tomorrow </span>
      </p>
)} 
                    </div>
                  </div>

                  <div className="check_wish_remove">
                    <button onClick={() => handleMoveToWishlist(item)} className="check_wish"> 
                       Move to Wishlist
                    </button>
                    <button onClick={() => handleRemoveWithAlert(item)}  className="check_remove">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

             
          </div>

  {/* Coupon Modal */}
{items.length > 0 && (
  <div className="col-3 my-5 ">
    <button
      className="btn btn-link p-0 w-100"
      style={{ textDecoration: "none" }}
      onClick={openCouponModal}
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



<div className="payment-card">
  <h5 className="payment-title">Payment Summary</h5>

  <div className="payment-row">
    <span>Price ({totalItems} items)</span>
    <span>₹{totalMRP}</span>
  </div>

  <div className="payment-row discount">
    <span>Discount</span>
    <span className="text-success">-₹{totalDiscount}</span>
  </div>

  <div className="payment-row">
    <span>Delivery Charges</span>
    <span className="free">₹0</span>
  </div>

  <hr />

  <div className="payment-row total">
    <span>Total</span>
    <span>₹{totalSelling}</span>
  </div>

  <hr />

  <div className="checkout-row">
    <div>
      <strong>{totalItems} Item</strong>
      <div className="final-price">₹{totalSelling}</div>
    </div>

    <button className="checkout-btn">Checkout</button>
  </div>
</div>
 
</div>
)}
        </div>
      </div>

      <Footer /> 
    </>
  );
}