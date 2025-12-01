import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // ⬇ Load wishlist from localStorage on first render
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  // ⬇ Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ⬇ Add / Remove toggle
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) return prev;       // already added
      return [...prev, product];     // add new
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p._id !== id));
  };

  // ⬇ Toggle function (optional use in productPage)
  const toggleWishlist = (product) => {
    const exists = wishlist.find((p) => p._id === product._id);
    exists ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);