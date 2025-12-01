import React from "react"; 
import { useWishlist } from "./WishlistContext.jsx";
import Header from "./headerComponent/Header.jsx";
import Footer from "./footerComponent/Footer.jsx";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <> 
    <Header/>
      <div className="container my-4">
        <h2>My Wishlist ❤️</h2>

        {wishlist.length === 0 && (
          <p className="text-center mt-5">No items added to wishlist</p>
        )}

        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-3 mb-4" key={item._id}>
              <div className="card p-2">
                <img src={item.image} className="card-img-top" height="180" />
                <h5 className="mt-2">{item.name}</h5>
                <p className="fw-bold">₹{item.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
 <Footer/>
    </>
  );
}