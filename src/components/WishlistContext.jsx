import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Add product (NO overwrite)
const addToWishlist = (product) => {
  setWishlist((prev) => {
    const exists = prev.some((item) => item.id === product.id);
    if (exists) return prev;
    return [...prev, product];
  });
};

  // ✅ Remove product
const removeFromWishlist = (id) => {
  setWishlist((prev) => prev.filter((item) => item.id !== id));
};

  // ✅ Persist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);