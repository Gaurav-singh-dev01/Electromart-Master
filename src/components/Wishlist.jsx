import React from "react"; 
import { useWishlist } from "./WishlistContext.jsx";
import Header from "./headerComponent/Header.jsx";
import Footer from "./footerComponent/Footer.jsx";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/style.css';
import { Link, useNavigate } from "react-router-dom";
import emptywish from '../assets/img/emptywish.png'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate(); // 🔥 NAVIGATE TO INDEX 
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    cart = cart.map(item =>
      item.id === product.id
        ? { ...item, qty: (item.qty || 1) + 1 }
        : item
    );
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));

  const count = cart.reduce((s, it) => s + (it.qty || 0), 0);
  localStorage.setItem("cartCount", count);
  window.dispatchEvent(new Event("storage"));
};

const handleMoveToCart = (item) => {
  Swal.fire({
    title: "Move to Cart?",
    text: "Product will be removed from wishlist",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, move",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {

      // 1️⃣ Add to cart
      addToCart(item);

      // 2️⃣ Remove from wishlist
      removeFromWishlist(item.id);

      Swal.fire({
        icon: "success",
        title: "Moved!",
        text: "Product moved to cart",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  });
};

const handleRemoveFromWishlist = (id) => {
  Swal.fire({
    title: "Remove item?",
    text: "This product will be removed from your wishlist",
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
      removeFromWishlist(id);

      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Product removed from wishlist",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  });
};
  return (
    <> 
    <Header/>
      <div className="container-fluid px-5 py-4">
       



        <div className="row">
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                  <div className='breadcrum'>
                                      <ul>
                                          <li> <Link to='/Index'> Home </Link></li>
                                          <li><FontAwesomeIcon icon={faChevronRight} /></li>
                                          <li>   Wishlist  </li>
                                          
                                      </ul>
                                  </div>
                              </div>
                                      {wishlist.length === 0 && (
                       <div className="text-center mt-5 emptyglobal">
                         <img src={emptywish} alt="empty cart" width="200" className="mb-3" />
                          <h4>Your Wishlist is Empty</h4>
                         <button className="btn btn-dark mt-3" onClick={() => navigate("/Index")}>
                           Continue Shopping <FontAwesomeIcon icon={faChevronRight} />
                         </button>
                       </div>
        )}
{wishlist.map((item) => (
  <div className="col-md-2 mb-4" key={item.id}>
    <div className="card p-2 wishlist_7765">
      <img src={item.image} className="card-img-top" height="180" />
      <h5 className="mt-2">{item.name}</h5>
      <p className="fw-bold">₹{item.price}</p>

<div className="d-inline-flex common__8798_id">
      <button onClick={() => handleRemoveFromWishlist(item.id)}>
        Remove
      </button>

      <button onClick={() => handleMoveToCart(item)}>
        Move to Cart
      </button>
      </div>
    </div>
  </div>
))}
        </div>
      </div>
 <Footer/>
    </>
  );
}