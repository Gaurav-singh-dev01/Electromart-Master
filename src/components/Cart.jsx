import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Footer from './footerComponent/Footer';
import Header from './headerComponent/Header';
import '../assets/css/style.css';
import emptycart from '../assets/img/emptycart.png';

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Load cart once
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cart = cart.filter(Boolean); // remove nulls
    setItems(cart);
  }, []);

  // Save, update quantity and sync with header
  const saveAndSync = (cart) => {
    cart = cart.filter(Boolean);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    const count = cart.reduce((s, it) => s + (it.qty || 0), 0);
    localStorage.setItem("cartCount", count);
    window.dispatchEvent(new Event("storage")); // header count refresh

    setItems(cart);
  };

  const increaseQty = (id) => {
    let cart = [...items];
    cart = cart.map(item =>
      item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    saveAndSync(cart);
  };

  const decreaseQty = (id) => {
    let cart = [...items];
    cart = cart.map(item =>
      item._id === id
        ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) }
        : item
    );
    saveAndSync(cart);
  };

  const removeItem = (id) => {
    let cart = items.filter(item => item._id !== id);
    saveAndSync(cart);
  };

  const total = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);

  return (
    <>
      <Header />

      <div className='container-fluid px-5 pt-3 mb-5'>
        <h3>Your Cart</h3>

        {items.length === 0 ? (
          <div className="text-center mt-5">
            <img src={emptycart} alt="empty cart" width="200" className="mb-3" />
            <h4>Your Cart is Empty</h4>
            <button className="btn btn-dark mt-3" onClick={() => navigate("/Index")}>
              Continue Shopping <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        ) : (
          items.filter(Boolean).map((item) => (
            <div key={item._id} className="d-flex justify-content-between border-bottom py-3">
              <div className="d-flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  width="90"
                  height="90"
                  style={{ objectFit: "contain" }}
                />
                <div>
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.brand}</p>
                  <h6>₹{item.price}</h6>

                  <div className="d-flex gap-2 mt-2">
                    <button onClick={() => decreaseQty(item._id)} className="btn btn-outline-dark btn-sm">-</button>
                    <span className="fw-bold">{item.qty}</span>
                    <button onClick={() => increaseQty(item._id)} className="btn btn-outline-dark btn-sm">+</button>
                  </div>
                </div>
              </div>

              <div className="text-end">
                <h6>Subtotal: ₹{(item.price || 0) * (item.qty || 1)}</h6>
                <button onClick={() => removeItem(item._id)} className="btn btn-danger btn-sm mt-2">Remove</button>
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

      <Footer />
    </>
  );
}