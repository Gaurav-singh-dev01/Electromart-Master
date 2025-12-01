import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../headerComponent/Header.jsx";
import Footer from "../../footerComponent/Footer.jsx";
import { faChevronDown, faChevronRight, faChevronUp, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useWishlist } from "../../WishlistContext.jsx";
import Pincode from "../../Pincode.jsx";
import dicountedbanner from '/public/products/ac/discounted_banners.jpg';
// Set default baseURL for axios
axios.defaults.baseURL = "http://localhost:5000/api";

export default function ProductsPage() {

  const { slug } = useParams();
  const navigate = useNavigate();

const [alertMessage, setAlertMessage] = useState(null);
const [alertType, setAlertType] = useState("success");

  // Wishlist
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [animate, setAnimate] = useState(false);

  // Product state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(null);
  const [added, setAdded] = useState(false);

  // Pincode delivery
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  // Fetch Product
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/slug/${encodeURIComponent(slug)}`)
      .then((res) => {
        const data = res.data;
        if (!data) {
          setProduct(null);
          setLoading(false);
          return;
        }

        // Images
        const baseImage = data.image || "";
        const extras = [
          "/Products/AC/Hitachi-R32-RAS.G312PCBISS/HITACHI-SAC-RAS.G312PCBISS.png",
          "/Products/AC/Hitachi-R32-RAS.G312PCBISS/HITACHI-SAC-RAS.G312PCBISS.png",
          "/Products/AC/Hitachi-R32-RAS.G312PCBISS/HITACHI-SAC-RAS.G312PCBISS.png",
          "/Products/AC/Hitachi-R32-RAS.G312PCBISS/HITACHI-SAC-RAS.G312PCBISS.png",
          "/Products/AC/Hitachi-R32-RAS.G312PCBISS/HITACHI-SAC-RAS.G312PCBISS.png",
          "/Products/AC/Hitachi-R32-RAS.G312PCBISS/HITACHI-SAC-RAS.G312PCBISS.png",
        ];
        data.images = [baseImage, ...extras].filter(Boolean);

        setProduct(data);
        setActiveImg(baseImage || data.images[0]);

        // Check if already in cart
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        if (cartItems.find((i) => i._id === data._id)) setAdded(true);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Product Fetch Error:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [slug]);

  // Add to Cart
  const handleAddToCart = () => {
    if (!product) return;
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existing = cart.find((i) => i._id === product._id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cart));
    const count = cart.reduce((s, it) => s + (it.qty || 0), 0);
    localStorage.setItem("cartCount", count);
    window.dispatchEvent(new Event("storage"));
    setAdded(true);
  };

  // Wishlist toggle
  const isWishlisted = wishlist.some((item) => item._id === product?._id);
  const handleWishlist = () => {
    if (!product) return;
    if (isWishlisted) removeFromWishlist(product._id);
    else addToWishlist(product);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };
  // Remove from Cart
  const handleRemoveFromCart = () => {
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cart = cart.filter((i) => i._id !== product._id);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    const count = cart.reduce((s, it) => s + (it.qty || 0), 0);
    localStorage.setItem("cartCount", count);
    window.dispatchEvent(new Event("storage"));

    setAdded(false); // button wapas "Add to Cart" 
  };

useEffect(() => {
  if (!alertMessage) return;

  const timer = setTimeout(() => {
    setAlertMessage(null);
  }, 3000);

  return () => clearTimeout(timer); // cleanup previous timer
}, [alertMessage]);


  const [showMore, setShowMore] = useState(false);
  // Loading / 404
  if (loading) return <><Header /><h2 className="text-center p-4">Loading...</h2><Footer /></>;
  if (!product) return <><Header /><h2 className="text-center p-4">Product Not Found</h2><Footer /></>;

  return (
    <>
      <Header />

      <div className="container-fluid px-5 py-4">
        {/* Breadcrumb */}
        <div className="row">
          <div className="col-12">
            <div className="breadcrum">
              <ul>
                <li><Link to="/Index">Home</Link></li>
                <li><FontAwesomeIcon icon={faChevronRight} /></li>
                <li><Link to="/AirConditioners">Air Conditioners</Link></li>
                <li><FontAwesomeIcon icon={faChevronRight} /></li>
                <li><Link to="/AirConditionersCollections">All Collections</Link></li>
                <li><FontAwesomeIcon icon={faChevronRight} /></li>
                <li className="breadcrumb-item active">{product.slug}</li>
              </ul>
            </div>
          </div>
        </div>

<div className="row mb-3 p-0" style={{ display: "flex", gap: "15px" }}>
    <img src={dicountedbanner} className="img img-fluid"/>
</div>

        <div className="row detailed_product_access" style={{ display: "flex", gap: "15px" }}>

          {/* LEFT BOX */}
          <div className="col-md-4 text-center pT_99_tye left-box"
            style={{ display: "flex", flexDirection: "column" }}>

            {/* Wishlist */}
            <div className="d-flex justify-content-end gap-3 mb-2">
              <div className="all_products_wishlistBTN">
                <span onClick={handleWishlist} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon={isWishlisted ? solidHeart : regularHeart}
                    className={`wishlist-btn ${animate ? "animate" : ""}`}
                    style={{ fontSize: "20px", color: isWishlisted ? "red" : "#444" }}
                  />
                </span>
              </div>
            </div>

            {/* Main Image */}
            <img
              src={activeImg}
              className="img-fluid mb-3"
              style={{ maxHeight: "250px", objectFit: "contain", padding: "80px 0px" }}
            />

            {/* SLIDER ALWAYS BOTTOM */}
            <div style={{ marginTop: "auto" }}>
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={8}
                slidesPerView={5}
                className="mt-3 swiper-bottom"
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i} onClick={() => setActiveImg(img)}>
                    <img
                      src={img}
                      className={`img-fluid border rounded p-1 ${activeImg === img ? "border-primary" : "border-secondary"}`}
                      style={{ height: "70px", objectFit: "contain", padding: "12px 10px", cursor: "pointer" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="col-md-8 pT_99_ytuy"
            style={{ display: "flex", flexDirection: "column" }}>

            <h3>{product.name}</h3>

            {/* Rating */}
            <div className="rating mt-2 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} style={{ color: star <= (product.rating || 0) ? "#ffc107" : "#ccc", fontSize: "15px" }}>
                  ⭐
                </span>
              ))}
              <span className="ms-1" style={{ fontSize: '12px' }}>
                ({product.rating || 0} / 5)
              </span>
            </div>
            {/* PINCODE SECTION AT END */}
            <div className="PC_india">
              <div className="delivery_related my-3">
<Pincode onResult={(res) => setDeliveryInfo(res)} />
 

              </div>
            </div>

            <h2 className="text-dark fw-bold">₹{product.price}</h2>

            {product.discountPercent > 0 && (
              <p>
                <del className="id__767light">₹{Math.round((product.price * 100) / (100 - product.discountPercent))}</del>
                <span className="id__767light"> (Inclusive of all taxes) </span>
                <span className="badge text-success">{product.discountPercent}% OFF</span>
              </p>
            )}

            {added ? (
              <>
                <div className="d-inline-flex">
                  <button onClick={() => navigate("/cart")} className="goCartBtn btn btn-success me-2">
                    Go to Cart
                  </button>
                  <button onClick={handleRemoveFromCart} className="goCartBtn btn btn-danger">
                    Remove from Cart
                  </button>
                </div>
              </>
            ) : (
              <button onClick={handleAddToCart} className="addBtn btn btn-primary">
                Add to Cart
              </button>
            )}



            <div className="border-bottom mb-3"></div>

            <label style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
              Key Features
            </label>

            {/* DESCRIPTION SHOW MORE / LESS */}
            <ul style={{ listStyle: "disc", paddingLeft: "14px" }}>
              {(showMore ? product.description?.split("\n") : product.description?.split("\n").slice(0, 2)).map((line, index) => (
                <li key={index} style={{ fontSize: "13px", marginBottom: "10px" }}>
                  {line}
                </li>
              ))}
            </ul>

            {product.description?.split("\n").length > 2 && (
              <button
                className="btn p-0"
                style={{ fontSize: "14px" }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? <span className="arrow_btnshow">Show Less<FontAwesomeIcon icon={faChevronUp} /></span> : <span className="arrow_btnshow"> Show More<FontAwesomeIcon icon={faChevronDown} /></span>}
              </button>
            )}


          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}