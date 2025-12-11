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
    axios.get(`/products/slug/${encodeURIComponent(slug)}`)
      .then((res) => {
        const data = res.data;
        if (!data) {
          setProduct(null);
          setLoading(false);
          return;
        }

        // Images
        const baseImage = data.image || "";
setProduct(data);
setActiveImg(data?.images?.length ? data.images[0] : data.image);

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
const lines = product?.description?.split("\n") || [];
const visibleLines = showMore ? lines : lines.slice(0, 3);

 const [showRelatedImages, setShowRelatedImages] = useState(true);
 const [showSpecs, setShowSpecs] = useState(true);
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
  <div className="col-md-4 pT_99_tye left-box">

<div className="d-inline-flex">
  {/* 🔥 Vertical Thumbnail Slider */}
  <div style={{height: "320px" }}>
    <Swiper
      modules={[Navigation]}
      direction="vertical"
      navigation
      spaceBetween={10}
      slidesPerView={4}
      style={{ height: "100%" }}
      className="thumbnail-swiper"
    >
{Array.isArray(product.images) && product.images.length > 0 ? (
  product.images.map((img, i) => (
    <SwiperSlide key={i} onClick={() => setActiveImg(img)}>
      <img
        src={img}
        style={{
          width: "100%",
          height: "50px",
          objectFit: "cover",
          borderRadius: "6px",
          cursor: "pointer",
          border: activeImg === img ? "2px solid #007bff" : "1px solid #ccc",
          background: "#fff",
          padding: "1px",
        }}
      />
    </SwiperSlide>
  ))
) : (
  <p>No images found</p>
)}
    </Swiper>
  </div>

  {/* 🔥 Main Image + Wishlist */}
  <div style={{ flexGrow: 1, position: "relative", textAlign: "center",  margin: 'auto 0px' }}>
    {/* Wishlist button */}
    <div style={{ position: "absolute", right: "5px", top: "5px", zIndex: 10 }}>
      <span onClick={handleWishlist} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon
          icon={isWishlisted ? solidHeart : regularHeart}
          className={`wishlist-btn ${animate ? "animate" : ""}`}
          style={{ fontSize: "22px", color: isWishlisted ? "red" : "#444" }}
        />
      </span>
    </div>

    {/* Main Image */}
    <img
      src={activeImg}
      className="img-fluid"
      style={{width: "100%"}}
    />
  </div>
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
              <>
              <div className="d-flex">
              <button onClick={handleAddToCart} className="addBtn btn btn-primary">
                Add to Cart
              </button> &nbsp; &nbsp;&nbsp; 
              <button onClick={handleAddToCart} className="buynow_btn btn btn-success">
                Buy Now
              </button>
              </div>
              </>
            )}



            <div className="border-bottom mb-3"></div>

            <label style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
              About this item
            </label>

<div className="about_this_prouct">
            {/* DESCRIPTION SHOW MORE / LESS */}
<ul>
  {visibleLines.map((line, index) => (
    <li key={index}>{line}</li>
  ))}
</ul>

{lines.length > 3 && (
  <button className="more_less" onClick={() => setShowMore(!showMore)}>
    {showMore ? (
      <>
        Show Less
        <FontAwesomeIcon icon={faChevronUp}/>        
      </>
    ) : (
      <> 
        Show More
        <FontAwesomeIcon icon={faChevronDown} />
      </>
    )}
  </button>
)}
</div>

<div className="border-bottom my-3"></div>

<div className="notice-issue">
    <p> Notice any issue? <Link to="/contact"> Report Here</Link> </p>
</div>

<div className="Description_ID098 mt-4">
  <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    marginBottom: "10px"
  }}
  onClick={() => setShowRelatedImages(!showRelatedImages)} // toggle
>
  <p className="fw-bold mb-0">Description</p>
  <FontAwesomeIcon
    icon={showRelatedImages ? faChevronUp : faChevronDown}
    style={{ fontSize: "16px" }}
  />
</div>
{showRelatedImages && (
  <div
    style={{
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      justifyContent: "flex-start",
    }}
  >
{Array.isArray(product.descriptionImages) && product.descriptionImages.length > 0 ? (
  product.descriptionImages.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`desc-img-${index}`}
      style={{ 
        borderRadius: "8px",  
        background: "#fff",
        objectFit: "contain",
        padding: "6px",
        width: '70%',
         margin: 'auto'
      }}
    />
  ))
) : (
  <p className="text-muted">No description images available.</p>
)}
  </div>
)}
</div>


<div className="Specifications_ID098 mt-4">
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      marginBottom: "10px",
    }}
    onClick={() => setShowSpecs(!showSpecs)}
  >
    <p className="fw-bold mb-0">Product Specifications</p>
    <FontAwesomeIcon icon={showSpecs ? faChevronUp : faChevronDown} style={{ fontSize: "16px" }} />
  </div>

{showSpecs && (
  <table className="table table-bordered" style={{ fontSize: "14px" }}>
    <tbody>
      {product.specifications?.split("\n").map((line, index) => {
        const parts = line.split(":");
        const key = parts.shift(); // Pehla part
        const value = parts.join(":"); // Baaki jod denge
        return (
          <tr key={index}>
            <td style={{ width: "40%", fontWeight: "600" }}>{key}</td>
            <td>{value}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}
</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}