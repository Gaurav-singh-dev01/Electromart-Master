import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEye, faEyeSlash, faChevronRight, faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom'
import Footer from './footerComponent/Footer';
import offerbanner from '../assets/img/offerbanner.jpg';
import Header from './headerComponent/Header';
import '../assets/css/style.css'
import of1 from '../assets/img/offer-1.avif'
import of2 from '../assets/img/offer-2.avif'
import of3 from '../assets/img/offer-3.avif'
import of4 from '../assets/img/offer-4.avif'
import of5 from '../assets/img/offer-5.avif'
import of6 from '../assets/img/offer-6.avif'
import of7 from '../assets/img/offer-7.avif'
import of8 from '../assets/img/offer-8.avif'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-multi-carousel/lib/styles.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import product1 from "../assets/img/tab.avif"
import product2 from "../assets/img/tab-2.avif"

import fridge1 from "../assets/img/fridge-1.avif"
import fridge2 from "../assets/img/fridge-2.avif"
import fridge3 from "../assets/img/fridge-3.avif"
import fridge4 from "../assets/img/fridge-4.avif"
import seller1 from "../assets/img/seller-1.avif"
import seller2 from "../assets/img/seller-2.avif"
import seller3 from "../assets/img/seller-3.avif"
import seller4 from "../assets/img/seller-4.avif"
import getittoday from '../assets/img/getittoday.avif'
import gd1 from '../assets/img/great-deal-1.avif'
import gd2 from '../assets/img/great-deal-2.avif'
import gd3 from '../assets/img/great-deal-3.avif'
import gd4 from '../assets/img/great-deal-4.avif'
import gd5 from '../assets/img/great-deal-5.avif'
import gd6 from '../assets/img/great-deal-6.avif'
import gd7 from '../assets/img/great-deal-7.avif'
import gd8 from '../assets/img/great-deal-8.avif'

import tv1 from '../assets/img/tv1.avif'
import tv2 from '../assets/img/tv2.avif'
import tv3 from '../assets/img/tv3.avif'
import tv4 from '../assets/img/tv4.avif'
import tv5 from '../assets/img/tv5.avif'

import mobile1 from '../assets/img/mobile1.avif'
import mobile2 from '../assets/img/mobile2.avif'
import mobile3 from '../assets/img/mobile3.avif'
import mobile4 from '../assets/img/mobile4.avif'
import mobile5 from '../assets/img/mobile5.avif'

import laptop1 from '../assets/img/laptop1.avif'
import laptop2 from '../assets/img/laptop2.avif'
import laptop3 from '../assets/img/laptop3.avif'
import laptop4 from '../assets/img/laptop4.avif'
import laptop5 from '../assets/img/laptop5.avif'
import laptop6 from '../assets/img/laptop6.avif'

import ad1 from '../assets/img/ad1.avif'
import ad2 from '../assets/img/ad2.avif'
import ad3 from '../assets/img/ad3.avif'
import ad4 from '../assets/img/ad4.avif'
import ad5 from '../assets/img/ad5.avif'

import ac1 from '../assets/img/ac1.avif'
import ac2 from '../assets/img/ac2.avif'
import ac3 from '../assets/img/ac3.avif'
import ac4 from '../assets/img/ac4.avif'
import ac5 from '../assets/img/ac5.avif'
import ac6 from '../assets/img/ac6.avif'

import kitchenapp1 from '../assets/img/kitchenapp1.avif'
import kitchenapp2 from '../assets/img/kitchenapp2.avif'
import kitchenapp3 from '../assets/img/kitchenapp3.avif'
import kitchenapp4 from '../assets/img/kitchenapp4.avif'
import kitchenapp5 from '../assets/img/kitchenapp5.avif'
import kitchenapp6 from '../assets/img/kitchenapp6.avif'

import frontload1 from '../assets/img/frontload1.avif'
import frontload2 from '../assets/img/frontload2.avif'
import frontload3 from '../assets/img/frontload3.avif'
import frontload4 from '../assets/img/frontload4.avif'
import frontload5 from '../assets/img/frontload5.avif'
import frontload6 from '../assets/img/frontload6.avif'
export default function Index() {

  const settings = {
    dots: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style, display: "block", backgroundColor: '#000',
          borderRadius: '50%'
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style, display: "block", backgroundColor: '#000',
          borderRadius: '50% '
        }}
        onClick={onClick}
      />
    );
  }


  const [liked, setLiked] = useState([false, false, false, false, false, false, false]);
  const toggleLike = (index) => {
    const updated = [...liked];
    updated[index] = !updated[index];
    setLiked(updated);
  };

    const [fridgeliked, setfridgeliked] = useState([false, false, false, false, false, false, false]);
  const togglefridgeliked = (index) => {
    const updated = [...fridgeliked];
    updated[index] = !updated[index];
    setfridgeliked(updated);
  };

      const [sellerliked, setsellerliked] = useState([false, false, false, false, false, false, false]);
  const togglesellerliked = (index) => {
    const updated = [...sellerliked];
    updated[index] = !updated[index];
    setsellerliked(updated);
  };

  const [tvliked, settvliked] = useState([false, false, false, false, false, false, false]);
  const toggletvliked = (index) => {
    const updated = [...tvliked];
    updated[index] = !updated[index];
    settvliked(updated);
  };

    const [mobileliked, setmobileliked] = useState([false, false, false, false, false, false, false]);
  const togglemobileliked = (index) => {
    const updated = [...mobileliked];
    updated[index] = !updated[index];
    setmobileliked(updated);
  };
  
      const [laptopliked, setlaptopliked] = useState([false, false, false, false, false, false, false]);
  const togglelaptopliked = (index) => {
    const updated = [...laptopliked];
    updated[index] = !updated[index];
    setlaptopliked(updated);
  };

        const [acliked, setacliked] = useState([false, false, false, false, false, false, false]);
  const toggleacliked = (index) => {
    const updated = [...acliked];
    updated[index] = !updated[index];
    setacliked(updated);
  };

          const [kitchenappliked, setkitchenappliked] = useState([false, false, false, false, false, false, false]);
  const togglekitchenappliked = (index) => {
    const updated = [...kitchenappliked];
    updated[index] = !updated[index];
    setkitchenappliked(updated);
  };

          const [frontloadliked, setfrontloadliked] = useState([false, false, false, false, false, false, false]);
  const togglefrontloadliked = (index) => {
    const updated = [...frontloadliked];
    updated[index] = !updated[index];
    setfrontloadliked(updated);
  };
  return (
    <>
      <Header />
      <div id="element--0891--rollon">
        <div className='offer__banner'>
          <img src={offerbanner} className='img img-fluid' />
        </div>
        <div className='offer__banner'>
          <Carousel autoPlay stopOnHover infiniteLoop={true} showThumbs={false} showStatus={true} renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  left: 15,
                  transform: 'translateY(-50%)',
                  background: '#ffffff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  fontSize: 11,
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )
          }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '50%',
                    right: 15,
                    transform: 'translateY(-50%)',
                    background: '#ffffff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    fontSize: 11,
                    cursor: 'pointer'
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )
            }
          >
            <div>
              <img alt="" src={of1} />
            </div>
            <div>
              <img alt="" src={of2} />
            </div>
            <div>
              <img alt="" src={of3} />
            </div>
            <div>
              <img alt="" src={of4} />
            </div>
            <div>
              <img alt="" src={of5} />
            </div>
            <div>
              <img alt="" src={of6} />
            </div>
            <div>
              <img alt="" src={of7} />
            </div>
            <div>
              <img alt="" src={of8} />
            </div>
          </Carousel>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Blockbuster Deals on Latest Tablets </h1>
                    <p> Up to Rs.3000 Off | 9m NCEMI on HDFC & ICICI* </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                  <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggleLike(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[0] ? solidHeart : regularHeart}
                          style={{ color: liked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleLike(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[1] ? solidHeart : regularHeart}
                          style={{ color: liked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggleLike(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[2] ? solidHeart : regularHeart}
                          style={{ color: liked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggleLike(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[3] ? solidHeart : regularHeart}
                          style={{ color: liked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleLike(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[4] ? solidHeart : regularHeart}
                          style={{ color: liked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleLike(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[5] ? solidHeart : regularHeart}
                          style={{ color: liked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleLike(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[6] ? solidHeart : regularHeart}
                          style={{ color: liked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleLike(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={liked[7] ? solidHeart : regularHeart}
                          style={{ color: liked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={product2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Your Kitchen’s Coolest Upgrade </h1>
                    <p> Refrigerators | Up To 45% Off </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                  <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglefridgeliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[0] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefridgeliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[1] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglefridgeliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[2] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglefridgeliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[3] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefridgeliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[4] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefridgeliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[5] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefridgeliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[6] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefridgeliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={fridgeliked[7] ? solidHeart : regularHeart}
                          style={{ color: fridgeliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={fridge4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Stay Powered Up Anywhere, Anytime! </h1>
                    <p> Here are the Best Sellers | Up To 65% Off </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                  <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglesellerliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[0] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglesellerliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[1] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglesellerliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[2] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglesellerliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[3] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglesellerliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[4] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglesellerliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[5] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglesellerliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[6] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglesellerliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={sellerliked[7] ? solidHeart : regularHeart}
                          style={{ color: sellerliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={seller4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='getittoday'>



          <img src={getittoday} className='img img-fluid' />



        </div>
        <div className='deals__sections'>

          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='element__08976Id'>
                <div className='lhs__98se'>
                  <h1> Great Deals on Electronics </h1>
                  <p> All Items | Up To 35% Off </p>
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <Link to={''}>
                    <img src={gd1} className='img img-fluid' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <Link to={''}>
                    <img src={gd2} className='img img-fluid' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <Link to={''}>
                    <img src={gd3} className='img img-fluid' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <Link to={''}>
                    <img src={gd4} className='img img-fluid' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <Link to={''}>
                    <img src={gd5} className='img img-fluid' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <Link to={''}>
                    <img src={gd6} className='img img-fluid' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <img src={gd7} className='img img-fluid' />
                </div>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 mb-4'>
                <div className='great__deals'>
                  <Link to={''}>
                    <img src={gd8} className='img img-fluid' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Best in Televisions </h1>
                    <p> Get upto 10% Instant Bank Discount* </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                  <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggletvliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[0] ? solidHeart : regularHeart}
                          style={{ color: tvliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggletvliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[1] ? solidHeart : regularHeart}
                          style={{ color: tvliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggletvliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[2] ? solidHeart : regularHeart}
                          style={{ color: tvliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggletvliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[3] ? solidHeart : regularHeart}
                          style={{ color: tvliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggletvliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[4] ? solidHeart : regularHeart}
                          style={{ color: tvliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv5} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggletvliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[5] ? solidHeart : regularHeart}
                          style={{ color: tvliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggletvliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[6] ? solidHeart : regularHeart}
                          style={{ color: tvliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggletvliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={tvliked[7] ? solidHeart : regularHeart}
                          style={{ color: tvliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={tv3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Best Mobile Deals </h1>
                    <p> Get upto 8% Instant Bank Discount* </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                  <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglemobileliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[0] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglemobileliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[1] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglemobileliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[2] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglemobileliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[3] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglemobileliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[4] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile5} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglemobileliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[5] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglemobileliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[6] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglemobileliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={mobileliked[7] ? solidHeart : regularHeart}
                          style={{ color: mobileliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={mobile3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Best Deals on Windows Laptops </h1>
                    <p> Upto 7,500 instant cashback* </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>
                 <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglelaptopliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[0] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglelaptopliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[1] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglelaptopliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[2] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglelaptopliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[3] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglelaptopliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[4] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop5} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglelaptopliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[5] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop6} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglelaptopliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[6] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglelaptopliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={laptopliked[7] ? solidHeart : regularHeart}
                          style={{ color: laptopliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={laptop2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='offer__banner'>
          <Carousel autoPlay stopOnHover infiniteLoop={true} showThumbs={false} showStatus={true} renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  left: 15,
                  transform: 'translateY(-50%)',
                  background: '#ffffff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  fontSize: 11,
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )
          }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '50%',
                    right: 15,
                    transform: 'translateY(-50%)',
                    background: '#ffffff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    fontSize: 11,
                    cursor: 'pointer'
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )
            }
          >
            <div>
              <img alt="" src={ad1} className='img img-fluid' />
            </div>
            <div>
              <img alt="" src={ad2} className='img img-fluid' />
            </div>
            <div>
              <img alt="" src={ad3} className='img img-fluid' />
            </div>
            <div>
              <img alt="" src={ad4} className='img img-fluid' />
            </div>
            <div>
              <img alt="" src={ad5} className='img img-fluid' />
            </div>
          </Carousel>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Air Conditioners Starting from ₹24,990* </h1>
                    <p> Get upto 10% Instant Bank Discount* </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                 <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggleacliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[0] ? solidHeart : regularHeart}
                          style={{ color: acliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleacliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[1] ? solidHeart : regularHeart}
                          style={{ color: acliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggleacliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[2] ? solidHeart : regularHeart}
                          style={{ color: acliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => toggleacliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[3] ? solidHeart : regularHeart}
                          style={{ color: acliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleacliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[4] ? solidHeart : regularHeart}
                          style={{ color: acliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac5} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleacliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[5] ? solidHeart : regularHeart}
                          style={{ color: acliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac6} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleacliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[6] ? solidHeart : regularHeart}
                          style={{ color: acliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => toggleacliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={acliked[7] ? solidHeart : regularHeart}
                          style={{ color: acliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={ac2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Great Deals on Kitchen Appliances </h1>
                    <p> 5% Additional Discount on UPI Payments </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                 <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglekitchenappliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[0] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglekitchenappliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[1] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglekitchenappliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[2] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglekitchenappliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[3] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglekitchenappliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[4] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp5} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglekitchenappliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[5] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp6} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglekitchenappliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[6] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglekitchenappliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={kitchenappliked[7] ? solidHeart : regularHeart}
                          style={{ color: kitchenappliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={kitchenapp2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className='deals__sections'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                <div className='element__08976Id'>
                  <div className='lhs__98se'>
                    <h1> Top Offers on Front Load Washing Machines! </h1>
                    <p> Starting From 28890* </p>
                  </div>
                  <div className='rhs__98se'>
                    <Link to={''}> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                  </div>
                </div>
              </div>
              <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                <div>

                 <Slider {...settings}>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglefrontloadliked(0)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[0] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[0] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefrontloadliked(1)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[1] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[1] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglefrontloadliked(2)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[2] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[2] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload3} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span className='additional_line'>Flat ₹4K CB + 6M*</span>
                      <span onClick={() => togglefrontloadliked(3)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[3] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[3] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload4} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefrontloadliked(4)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[4] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[4] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload5} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 11th Gen</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefrontloadliked(5)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[5] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[5] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload6} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefrontloadliked(6)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[6] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[6] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload1} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                    <div className="trendingproducts">
                      <span onClick={() => togglefrontloadliked(7)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={frontloadliked[7] ? solidHeart : regularHeart}
                          style={{ color: frontloadliked[7] ? "red" : "#444", fontSize: "20px" }}
                        />
                      </span>
                      <div className='products__img'>
                        <img src={frontload2} className='img img-fluid' />
                      </div>
                      <p>Apple iPad A16 2025</p>
                    </div>
                  </Slider>
                </div>


              </div>
            </div>
          </div>
        </div>

        <div className='additional__details0096'>
          <div className='container-fluid px-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                <div className='reliance__text998Select'>
                  <h2> Reliance Digital Select: India’s Leading Online Electronics Store</h2>
                  <p> Looking for an online store that has the best electronics? What better way to shop than being in the comfort of your home and having all your electronic requirements at Reliance Digital Select? Being one of the biggest online electronic storehouses, we have a wider collection of the latest technologies in gadgets, appliances and tech accessories, and you have them all in front of you through our website.</p>
                  <h3> Why Shop at Reliance Digital Online?</h3>
                  <ul>
                    <li> <b>Best Online Electronics Store in India:</b> With competitive pricing and detailed specifications, it’s easier than ever to compare and purchase the best electronics options from the best electronics website in India. Buy gadgets online with authentic products and warranties. </li>
                    <li> <b>Broad Product Offering:</b> Reliance Digital offers everything on its online electronics store, whether it is television sets, laptops, smart devices, and kitchenware and appliances. </li>
                    <li> <b>On Professional Recommendations:</b> Buy electronics online with the help of detailed buying guides and customer feedback, helping you select the right electronics for your needs. </li>
                    <li> <b> Comfort:</b> Shop from the comfort of your own living room and securely pay online to have your electronics delivered fast and conveniently.</li>
                  </ul>
                  <h3> Exclusive Reliance Digital Offers & Seasonal Sales </h3>
                  <p> Enjoy great discounts in online electronics shopping in India, as exciting offers, festival discounts, and brand tie-ups are available on Reliance Digital. Throughout the entire year, we have the best electronics deals online on the leading brands in the various categories: </p>
                  <ul>
                    <li>Flat discounts and instant bank offers</li>

                    <li>Cashback and exchange deals</li>

                    <li>Flash sales and festive specials</li>

                    <li>Student & business-exclusive pricing</li>
                  </ul>
                  <p> Our seasonal sales make us the best online electronics store for budget-conscious shoppers. </p>
                  <h4> EMI Options: No Cost EMI, Flexible Payments & More </h4>
                  <p>With easy EMI and finance plans, online electronics shopping in India is more accessible than ever. At Reliance Digital, we offer a wide range of payment options for buying electronic items online: </p>
                  <ul>
                    <li><b> No Cost EMI:</b> Spread your payments across easy monthly instalments without any extra charges. </li>

                    <li><b>Flexible Tenure: </b>Choose from 3, 6, 9, 12-month plans as per your budget. </li>

                    <li><b>Debit/Credit Card EMI:</b> All major bank cards are supported for EMI conversion. </li>

                    <li> <b>Buy Electronics Online </b>with financing partners like HDFC, Bajaj Finserv, and ICICI. </li>

                  </ul>



                  <h4> Fast Delivery, Easy Returns & ResQ Service Guarantee </h4>
                  <p>Reliance Digital ensures that your order arrives safely and on time with: </p>
                  <ul>
                    <li><b> Fast Nationwide Delivery: </b>Get your online electronics delivered within 24-72 hours in most locations. </li>

                    <li><b>Easy Return Policy: </b>Enjoy hassle-free returns on eligible items </li>

                    <li><b>ResQ Service Guarantee:</b> Get installation, repair, and after-sales support from our certified technicians. </li>


                  </ul>
                  <h4> Shop by Category at Reliance Digital </h4>
                  <p> Explore our broad range of electronics and gadgets online, sorted by category for your convenience: </p>

                  <h4> Mobile Phones, Tablets & Mobile Accessories </h4>
                  <p>Stay connected with the 5G mobiles, Android tablets, and the latest mobiles online. </p>

                  <p>Whether you're looking for the latest iPhones, powerful Android devices, or sleek iPads, Reliance Digital’s online electronics store has you covered. </p>

                  <p>Shop top brands like Samsung, Apple, OnePlus, Google, Xiaomi, Vivo, Oppo, Motorola, and Realme at the best prices.</p>

                  <p>Complete your purchase with must-have mobile phone accessories like phone cases, screen protectors, chargers, wireless power banks, and USB cables.</p>
                  <h4> Laptops & Computing Devices </h4>
                  <p> Browse a vast collection of personal and business laptops, desktops, monitors, and computer accessories. From high-performance gaming laptops to compact business ultrabooks, Reliance Digital features top models from HP, Dell, Lenovo, ASUS, Acer, Apple, and more.</p>

                  <h4> Televisions & Home Entertainment </h4>
                  <p> Bring the theatre home with smart LED TVs, 4K televisions, OLED panels, and Android TVs. Explore the best smart TVs in India from Sony, LG, Samsung, TCL, Xiaomi (Mi), and more, to enjoy crystal-clear visuals and immersive sound.</p>

                  <h4> Home Appliances </h4>
                  <p> Make your space more efficient and comfortable with our range of smart home appliances. Upgrade your home with top-brand refrigerators, front/top-load washing machines, and split/window air conditioners. Choose from brands like LG, Samsung, Whirlpool, Haier, Voltas, Panasonic, and more.</p>

                  <h4> Kitchen Appliances & Cookware Essentials </h4>
                  <p> Impress your friends with your culinary skills with our range of kitchen appliances and gadgets. At Reliance Digital, you'll find the latest kitchen essentials, such as Microwave Ovens, Mixer Grinders, to help you cook like a pro and keep your kitchen looking sleek and modern. Some of the top brands include Philips, Samsung, LG, Prestige, Morphy Richards, Panasonic, and Bajaj.</p>

                  <h4> Audio Devices: Speakers, Headphones & More </h4>
                  <p> Upgrade your audio experience with the finest sound systems, portable speakers, soundbars, wireless headphones, and earbuds available online. Choose from premium audio brands like Sony, JBL, boAt, Skullcandy, Bose, and Sennheiser. </p>

                  <h4>Personal Care & Grooming Gadgets </h4>
                  <p> Keep yourself well-groomed with a wide selection of personal care appliances available for online electronics shopping. Choose from trimmers, hair dryers, epilators, and electric toothbrushes by trusted brands like Philips, Braun, Syska, Vega, and more. </p>

                  <h4>Cameras & Photography Gear </h4>
                  <p> Whether you're a professional photographer or someone who likes to click pictures as a hobby, our online electronics store brings you the best cameras and accessories. Shop DSLRs, mirrorless cameras, point and shoot cameras, action cams, and more from renowned brands like Canon, Nikon, GoPro, and Sony. Explore camera accessories like camera lenses, tripods, and bags under one roof.  </p>

                  <h4>Smart Devices & Tech Accessories </h4>
                  <p> Make your home more stylish with smart devices and accessories from our electronics store online. Browse smartwatches, fitness bands, voice-controlled speakers, smart home assistants, and tech essentials like chargers and routers. Brands such as Google, Apple, Realme, Fire-Boltt, Amazfit, TP-Link, etc., are available for secure gadget online shopping at Reliance Digital. </p>

                  <h4>Top Brands You’ll Find at Reliance Digital </h4>
                  <p> Reliance Digital brings you a comprehensive lineup of the best electronic brands in India under one roof. Some of the top names include: </p>

                  <ul>
                    <li> <b>Apple:</b> Premium iPhones, iPads, MacBooks, and wearables</li>

                    <li> <b>Samsung:</b> From smartphones to smart TVs, ACs to home appliances</li>

                    <li> <b>Sony:</b> High-quality TVs, sound systems, and cameras</li>

                    <li> <b>LG:</b> Reliable TVs, refrigerators, and washing machines</li>

                    <li> <b>HP, Dell, Lenovo:</b> Laptops and computing gear for personal and business use</li>

                    <li> <b>Mi, Realme, OnePlus: </b>Budget-friendly tech and smart devices</li>

                    <li> <b>Philips:</b> Personal care, grooming gadgets, and kitchen appliances</li>

                    <li> <b>Whirlpool, Haier, Voltas, Godrej, Blue Star:</b> Cooling and laundry solutions</li>

                    <li> <b>boAt, JBL, Sennheiser, Noise:</b> Headphones, speakers, and wearables </li>

                    <li> <b>Canon, Nikon, GoPro:</b> Photography and videography tools </li>

                  </ul>
                  <p> With so many reliable options, Reliance Digital is the best destination for buying electronics online across product categories.</p>
                  <h4> Buy Gadgets Online from the Best Online Electronics Store in India </h4>
                  <p> Start your journey with Reliance Digital today, the most trusted name in online electronics shopping in India. From gadgets online shopping to home appliances online, we combine great prices, genuine products, and dependable service to deliver an unmatched digital shopping experience. Whether you're upgrading your lifestyle or gifting a loved one, Reliance Digital is the best electronic store for all your tech needs.<br />

                    Join the millions of satisfied customers who trust Reliance Digital for their electronic shopping needs. Download our app or browse our online store to experience the best in technology and customer service.</p>

                  <p className='text-dark'> <b>Most Searched on Reliance Digital: </b> <Link to={''}> iPhone 16  </Link>| <Link to={''}> iPhone 16 Plus </Link>| <Link to={''}> iPhone 16 Pro </Link> | <Link to={''}>  iPhone 16 Pro Max </Link> | <Link to={''}> HP 15 </Link>| <Link to={''}> Dell Inspiron 15 </Link>|<Link to={''}> Asus VivoBook Go </Link>|<Link to={''}>  Macbook Air M4</Link>| <Link to={''}> Lenovo IdeaPad Slim </Link>| <Link to={''}> Budget Laptops</Link> | <Link to={''}> Oneplus Nord CE</Link> | <Link to={''}> Samsung Galaxy S25 </Link>| <Link to={''}> Redmi 14C</Link> | <Link to={''}> Google Pixel 9a </Link>|<Link to={''}> Vivo T4 Lite </Link>| <Link to={''}>POCO Phones </Link>|<Link to={''}> Samsung TV </Link>| <Link to={''}> Sony TV </Link>|<Link to={''}> Insta360 Go 2 32 GB Action Camera </Link>| <Link to={''}>Sony Alpha ILCE 6600M </Link>|<Link to={''}> Projectors </Link>| <Link to={''}> Soundbars</Link> | <Link to={''}>Smart Devices </Link>| <Link to={''}>Personal Care </Link>|<Link to={''}> Smartwatches</Link> | <Link to={''}>Computer Accessories </Link>| <Link to={''}>FAQs about Reliance Digital </Link>| <Link to={''}>Cancellation & Return Policy </Link> | <Link to={''}>Reliance Digital Gift Cards </Link>| <Link to={''}>Contact us </Link>| <Link to={''}>Corporate Enquiries </Link>| <Link to={''}> ResQ Assured Buyback Plan for Smartphones </Link>|</p>

                  <p className='text-dark'> <b>Mobiles:</b><Link to={''}>  iPhone 15  </Link>|<Link to={''}> iPhone 15 & 15 Plus </Link> | <Link to={''}> iPhone 15 Pro </Link> | <Link to={''}>iPhone 15 Pro Max  </Link>| <Link to={''}> iPhone 16e |<Link to={''}> Google Pixel Phones </Link>| Oppo 13X </Link>| <Link to={''}> Realme Phones </Link>| <Link to={''}> Jio Phones</Link> | <Link to={''}> Redmi Phones</Link> | <Link to={''}> Mobile phones under 20000 </Link>| <Link to={''}> Oneplus Phones </Link>| <Link to={''}> Mobile cases & Covers </Link>| <Link to={''}> Mobile Screen Protectors</Link>| <Link to={''}> Mobile chargers & Adaptors </Link></p>

                  <p className='text-dark'> <b>Laptops & Computers:</b><Link to={''}> Intel Core i9 laptops </Link>|<Link to={''}> Samsung Galaxy Book 4 </Link>| <Link to={''}> HP Victus </Link>| <Link to={''}> Asus VivoBook Go 15 </Link>| <Link to={''}> MacBook Pro </Link>|  <Link to={''}>Asus TUF A15 </Link>|  <Link to={''}> Microsoft Surface 7 </Link>|  <Link to={''}> Acer Aspire Lite </Link>| <Link to={''}> HP Laptops </Link>| <Link to={''}> Dell Laptops </Link>| <Link to={''}> Lenovo Laptops </Link>| <Link to={''}> Gaming Laptops </Link>| <Link to={''}> 2 in 1 Laptops </Link>| <Link to={''}> Touchscreen Laptops </Link>| <Link to={''}> Laptop Bags </Link>|  <Link to={''}>Laptop Stands </Link>|  <Link to={''}>Routers </Link>| </p>

                  <p className='text-dark'> <b>Televisions:</b> <Link to={''}> 32 Inch TVs  </Link>| <Link to={''}> 65 Inch & Above  </Link>|<Link to={''}> 4K Ultra HD  </Link>|<Link to={''}> 8K Ultra HD  </Link>| <Link to={''}>OLED / QLED / Mini LED  </Link>| <Link to={''}>Android TVs  </Link>|<Link to={''}> Google TV  </Link>|<Link to={''}> Mi TV  </Link>|<Link to={''}> Kodak TV  </Link>|<Link to={''}> Toshiba TV  </Link>|<Link to={''}> Samsung TV  </Link>|<Link to={''}> Sansui TV  </Link>|<Link to={''}> Hyundai TV  </Link>|<Link to={''}> LG TV  </Link>|<Link to={''}> OnePlus TV  </Link>| <Link to={''}>Philips TV  </Link>| <Link to={''}> TCL TV  </Link>|<Link to={''}> Onida TV  </Link>|<Link to={''}> Akai TV  </Link>|<Link to={''}> Hisense TV  </Link>|<Link to={''}> Realme TV  </Link>|<Link to={''}> Itel TV  </Link>|<Link to={''}> BPL TV   </Link>|<Link to={''}> Iffalcon TV  </Link>|<Link to={''}> Haier TV  </Link>|  </p>

                  <p className='text-dark'> <b>Large Appliances:</b> <Link to={''}> Dishwasher  </Link>|<Link to={''}>  Double-Door Refrigerators  </Link>| <Link to={''}> Side-by-Side Refrigerators  </Link>| <Link to={''}> Front Load Washing Machines  </Link>| <Link to={''}> Top Load Washing Machines  </Link> </p>

                  <p className='text-dark'> <b>Home Care Appliances:</b> <Link to={''}> Air Purifiers </Link>| <Link to={''}> Air Coolers </Link>|<Link to={''}>  Fans </Link>| <Link to={''}> Room Heaters </Link>| <Link to={''}> Vacuum Cleaners </Link>| <Link to={''}> Garment Care </Link>|<Link to={''}>  Home Safety & Security </Link>| <Link to={''}> Stabilizers </Link></p>

                  <p className='text-dark'> <b>Kitchen Appliances:</b> <Link to={''}> Microwaves & Ovens </Link> | <Link to={''}>  Water Purifiers </Link>|<Link to={''}>  Water Dispensers </Link>| <Link to={''}> Air Fryer </Link>|<Link to={''}>  Gas Stoves </Link>|<Link to={''}>  Popup Toasters </Link>| <Link to={''}> Sandwich Makers </Link>| <Link to={''}> Electric Kettles </Link>| <Link to={''}> Coffee Makers </Link>| <Link to={''}> Chimneys </Link></p>

                  <p className='text-dark'> <b>Best Selling on Reliance Digital:</b> <Link to={''}> Televisions </Link> | <Link to={''}>  Refrigerators </Link>|  <Link to={''}>  Vivo Mobiles </Link> |  <Link to={''}>  1 Ton AC </Link>|  <Link to={''}>  1.5 Ton AC </Link> |  <Link to={''}> Washing Machines </Link>|  <Link to={''}> Air Conditioners </Link>|  <Link to={''}>  Air Coolers </Link>|  <Link to={''}>  Daikin AC </Link>|  <Link to={''}> Apple iPhones </Link> | <Link to={''}> 5 Star AC </Link>| <Link to={''}> Samsung Mobiles </Link>| <Link to={''}>  DSLR Cameras </Link> | <Link to={''}> Motorola Mobiles </Link>|<Link to={''}>  Laptops </Link>| <Link to={''}>  55 Inch TV </Link>|<Link to={''}>  65 Inch TV </Link>| <Link to={''}>  43 Inch TV </Link> |<Link to={''}>  Water Purifiers </Link>| <Link to={''}> Computer Monitors </Link>| <Link to={''}> Fans </Link>|<Link to={''}>  Pendrives </Link> </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
