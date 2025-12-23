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
import loadingif from '../../../assets/img//loading.gif';
import Swal from "sweetalert2";
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
// 🔥 SAVE RECENTLY VIEWED PRODUCT
localStorage.setItem(
  "recentProduct",
  JSON.stringify({
    id: data.id,
    name: data.name,
    slug: data.slug,
    image: data.image,
    articleId: data.articleId
  })
);
// 🔥 safest main image resolver
let mainImg = null;

if (Array.isArray(data.images?.thumbnails)) {
  // 1️⃣ main-* image
  mainImg = data.images.thumbnails.find(img =>
    img.toLowerCase().includes("main")
  );

  // 2️⃣ fallback: first thumbnail
  if (!mainImg && data.images.thumbnails.length > 0) {
    mainImg = data.images.thumbnails[0];
  }
}

// 3️⃣ fallback: DB image
if (!mainImg && data.image) {
  mainImg = data.image;
}

// 4️⃣ final safety (never undefined)
if (!mainImg) {
  mainImg = "/Products/no-image.png"; // 🔥 default placeholder
}

setActiveImg(data.mainImage);

        // Check if already in cart
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        if (cartItems.find((i) => i.id === data.id)) setAdded(true);

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
    const existing = cart.find((i) => i.id === product.id);
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
const isWishlisted = wishlist.some(
  (item) => item.id === product?.id
);

const handleWishlist = () => {
  if (!product) return;

  if (isWishlisted) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};
  // Remove from Cart
  const handleRemoveFromCart = () => {
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cart = cart.filter((i) => i.id !== product.id);
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




const CATEGORY_CONFIG = {
  ac: {
    label: "Air Conditioners",
    listPath: "/AirConditioners",
    collectionPath: "/AirConditionersCollections",
  },
  washingmachine: {
    label: "Washing Machine",
    listPath: "/WashingMachine",
    collectionPath: "/WashingMachineCollection",
  },
};
const categoryKey = product?.category;
const categoryData = CATEGORY_CONFIG[categoryKey];

const [showMore, setShowMore] = useState(false);
const lines = product?.description?.split("\n") || [];
const visibleLines = showMore ? lines : lines.slice(0, 3);

 const [showRelatedImages, setShowRelatedImages] = useState(true);
 const [showSpecs, setShowSpecs] = useState(false);

 const MAIN_SECTIONS = [
  "GENERAL INFORMATION",
  "OPERATIONS",
  "TECHNICAL SPECIFICATIONS",
  "CONTROLS & CONVENIENCE",
  "PHYSICAL DIMENSIONS", 
  "FEATURES",
  "INDICATORS & ALARMS",
  "CERTIFICATES & RATINGS",
  "POWER DETAILS",
  "IN THE BOX & WARRANTY",
  "MANUFACTURING & PACKING INFORMATION",
];


const [notified, setNotified] = useState(false);

useEffect(() => {
  const stored =
    JSON.parse(localStorage.getItem("notifiedProducts")) || [];

  if (product?.id) {
    setNotified(stored.includes(product.id));
  }
}, [product]);


 


const handleNotifyMe = () => {
  const existing =
    JSON.parse(localStorage.getItem("notifiedProducts")) || [];

  if (!existing.includes(product.id)) {
    const updated = [...existing, product.id];
    localStorage.setItem(
      "notifiedProducts",
      JSON.stringify(updated)
    );
  }

  setNotified(true);

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
  });
};


  // Loading / 404
  if (loading) return <><Header /><h2 className="text-center p-4"><img src={loadingif} className="img img-fluid"/></h2><Footer /></>;
  if (!product) return <><Header /><h2 className="text-center p-4">Product Not Found</h2><Footer /></>;

  // 🔥 STEP 1: thumbnails nikaalo
const thumbnails = Array.isArray(product.images?.thumbnails)
  ? product.images.thumbnails
  : [];

// 🔥 STEP 2: last thumbnail ko upar lao
const orderedThumbnails =
  thumbnails.length > 1
    ? [thumbnails[thumbnails.length - 1], ...thumbnails.slice(0, -1)]
    : thumbnails;

  return (
    <>
      <Header />

      <div className="container-fluid px-5 py-4">
        {/* Breadcrumb */}
<div className="row">
  <div className="col-12">
    <div className="breadcrum">
      <ul>
        <li>
          <Link to="/Index">Home</Link>
        </li>

        {categoryData && (
          <>
            <li><FontAwesomeIcon icon={faChevronRight} /></li>

            <li>
              <Link to={categoryData.listPath}>
                {categoryData.label}
              </Link>
            </li>

            <li><FontAwesomeIcon icon={faChevronRight} /></li>

            <li>
              <Link to={categoryData.collectionPath}>
                All Collections
              </Link>
            </li>
          </>
        )}

        <li><FontAwesomeIcon icon={faChevronRight} /></li>

        <li className="breadcrumb-item active">
          {product.name}
        </li>
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
  <div style={{height: "427px",margin:'auto' }}>
    <Swiper
      modules={[Navigation]}
      direction="vertical"
      navigation
      spaceBetween={10}
      slidesPerView={6}
      style={{ height: "100%" }}
      className="thumbnail-swiper"
    >
      
{Array.isArray(product.images?.thumbnails) &&
 product.images.thumbnails.length > 0 ? (
orderedThumbnails.map((img, index) => (
  <SwiperSlide key={index} onClick={() => setActiveImg(img)}>
    <img
      src={img}
      alt="thumbnail"
      className="thumbnail-image"
      style={{
        height: "50px",
        objectFit: "cover",
        cursor: "pointer",
        border:
          activeImg === img
            ? "2px solid #007bff"
            : "1px solid #ccc",
      }}
    />
  </SwiperSlide>
))
) : (
  <p>No thumbnails found</p>
)}
    </Swiper>
  </div>

  {/* 🔥 Main Image + Wishlist */}
  <div style={{ flexGrow: 1, position: "relative", textAlign: "center",  margin: 'auto 0px' }}>
    {/* Main Image */}
    <img
     src={activeImg}
  onError={(e) => {
    e.target.src = "/Products/no-image.png";
  }}
      className="img-fluid"
      style={{width: "100%"}}
    />
        {/* Wishlist button */}
    <div style={{ position: "absolute", right: "5px", top: "5px", zIndex: 10 }}>
      <span onClick={handleWishlist} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon
  icon={isWishlisted ? solidHeart : regularHeart}
  style={{
    fontSize: "22px",
    color: isWishlisted ? "red" : "#444",
    cursor: "pointer"
  }}
/>
      </span>
    </div>

  </div>
</div>


  </div>

          {/* RIGHT BOX */}
          <div className="col-md-8 pT_99_ytuy" style={{ display: "flex", flexDirection: "column" }}>

            <h3>{product.name}</h3>

            {/* Rating */}
<div className="rating mt-2 mb-3">
  {[...Array(product.rating || 0)].map((_, index) => (
    <span
      key={index}
      style={{ color: "#ffc107", fontSize: "15px" }}
    >
      ⭐
    </span>
  ))}

  <span className="ms-1" style={{ fontSize: "12px" }}>
    ({product.rating || 0} / 5)
  </span>
</div>
            {/* PINCODE SECTION AT END */}




<>
<div className="d-inline-flex justify-content-between"> 
   <div className="id__123Element"> 
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
               
{product.stock > 0 ? (
  <div className="d-flex">
    <button
      onClick={handleAddToCart}
      className="addBtn btn btn-primary"
    >
      Add to Cart
    </button>

    &nbsp;&nbsp;

    <button
      onClick={handleAddToCart}
      className="buynow_btn btn btn-success"
    >
      Buy Now
    </button>
  </div>
) : (
    <div className="d-flex">
      <button
        className="outofstock_btn btn btn-secondary"
        disabled
        style={{ cursor: "not-allowed" }}
      >
        Out of Stock
      </button>

      &nbsp;&nbsp;

<button
className={`btn ${
    notified ? "btn-success" : "btn-outline-success"
  } notify_btn`}
  disabled={notified}
  onClick={handleNotifyMe}
>
  {notified ? "Notification Enabled" : "Notify Me"}
</button>
    </div>
)}
               
              </>
            )}
     </div> 
        <div className="id__123Element">  
              <div className="delivery_related my-3">
                  <Pincode onResult={(res) => setDeliveryInfo(res)} />
              </div> 
        </div> 
  </div>


</>

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
  <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",cursor: "pointer",marginBottom: "10px"}}onClick={() => setShowRelatedImages(!showRelatedImages)}>
  <p className="fw-bold mb-0">Description</p>
  <FontAwesomeIcon icon={showRelatedImages ? faChevronUp : faChevronDown} style={{ fontSize: "16px" }}/>
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
{Array.isArray(product.images?.description) &&
 product.images.description.length > 0 ? (
  product.images.description.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`desc-${index}`}
      style={{
        borderRadius: "8px",
        background: "#fff",
        objectFit: "contain",
        padding: "6px",
        width: "70%",
        margin: "auto"
      }}
    />
  ))
) : (
  <p>{product.name}</p>
)}

  </div>
)}
</div>


<div className="Specifications_ID098 mt-4">
<div style={{display: "flex",alignItems: "center",justifyContent: "space-between",cursor: "pointer",marginBottom: "10px",}}onClick={() => setShowSpecs(!showSpecs)}>
  <p className="fw-bold mb-0">Product Specifications</p>
  <FontAwesomeIcon icon={showSpecs ? faChevronUp : faChevronDown} style={{ fontSize: "16px", cursor: "pointer" }}/>
</div>

{showSpecs && (
  <table className="table table-bordered" style={{ fontSize: "14px" }}>
    <tbody>
      {(() => {
        const MAIN_SECTIONS = [
  "GENERAL INFORMATION",
  "OPERATIONS",
  "TECHNICAL SPECIFICATIONS",
   "CONTROLS & CONVENIENCE",
  "FEATURES",
  "PHYSICAL DIMENSIONS",
  "CERTIFICATES & RATINGS",
  "POWER DETAILS",
  "INDICATORS & ALARMS",
  "IN THE BOX & WARRANTY",
  "MANUFACTURING & PACKING INFORMATION",
        ];

        const rows = [];
        const lines =
          product.specifications
            ?.split("\n")
            .map(l => l.trim())
            .filter(Boolean) || [];

        let i = 0;

        while (i < lines.length) {
          const line = lines[i];

          // 🔹 SECTION HEADING
          if (MAIN_SECTIONS.includes(line.toUpperCase())) {
            rows.push(
              <tr key={`section-${i}`}>
                <td
                  colSpan={2}
                  className="product_specifictaion_tabeldata"
                  style={{
                    fontWeight: "700",
                    background: "#f1f3f5",
                    textTransform: "uppercase",
                  }}
                >
                  {line}
                </td>
              </tr>
            );
            i++;
            continue;
          }

          // 🔹 KEY (remove trailing colon if exists)
          let key = line.replace(/:$/, "").trim();
          let value = "";

          // CASE 1: "Key: Value"
          if (line.includes(":") && line.split(":")[1].trim()) {
            const parts = line.split(":");
            key = parts[0].trim();
            value = parts.slice(1).join(":").trim();
            i++;
          }
          // CASE 2: "Key:" on this line, value on next line
          else if (line.endsWith(":") && lines[i + 1]) {
            value = lines[i + 1];
            i += 2;
          }
          // CASE 3: "Key" on this line, value on next line
          else if (lines[i + 1] && !MAIN_SECTIONS.includes(lines[i + 1].toUpperCase())) {
            value = lines[i + 1];
            i += 2;
          }
          else {
            i++;
            continue;
          }

          rows.push(
            <tr key={`kv-${i}`}>
              <td style={{ width: "40%", fontWeight: "600" }}>{key}</td>
              <td>{value}</td>
            </tr>
          );
        }

        return rows;
      })()}
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