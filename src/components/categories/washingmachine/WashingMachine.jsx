import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEye, faEyeSlash, faChevronRight, faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { fetchProducts } from "../../products/common/api/products"; // path check
import { Link } from 'react-router-dom'
import '../../../assets/css/style.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-multi-carousel/lib/styles.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../headerComponent/Header';
import Footer from '../../footerComponent/Footer';
import './WashingMachine.css';
import acbanner1 from '../../products/common/acimages/acbanner1.avif'
import acbanner2 from '../../products/common/acimages/acbanner2.avif'
import acbanner3 from '../../products/common/acimages/acbanner3.avif'
import acbanner4 from '../../products/common/acimages/acbanner4.avif' 
import ac1 from '../../../assets/img/ac1.avif'
import ac2 from '../../../assets/img/ac2.avif'
import ac3 from '../../../assets/img/ac3.avif'
import ac4 from '../../../assets/img/ac4.avif'
import ac5 from '../../../assets/img/ac5.avif'
import ac6 from '../../../assets/img/ac6.avif'
import smallcat from '../../products/common/acimages/Size-Up-Your-Room-1.jpg'
import midcat from '../../products/common/acimages/Size-Up-Your-Room-1.5-Ton.jpg'
import largecat from '../../products/common/acimages/Size-Up-Your-Room-Living-Room.jpg'
import budgetmin from '../../products/common/acimages/For-Your-Budget-below-30000.jpg'
import budgetuppermin from '../../products/common/acimages/For-Your-Budget-below-30001-40000.jpg'
import budgetmid from '../../products/common/acimages/For-Your-Budget-below-40001-50000.jpg'
import budgetlarge from '../../products/common/acimages/For-Your-Budget-Above-50000.jpg'
import splitac from '../../products/common/acimages/Choose-Your-Type-Split-AC.jpg'
import windowac from '../../products/common/acimages/Choose-Your-Type-Window-AC.jpg'
import aircooler from '../../products/common/acimages/Choose-Your-Type-Cooler.jpg'
import inverterac from '../../products/common/acimages/Inverter-AC-Type.jpg'
import conciousone from '../../products/common/acimages/For-The-Energy-Conscious-You-3-Star.png'
import concioustwo from '../../products/common/acimages/For-The-Energy-Conscious-You-5-Star.png'
import bannerfooter from '../../products/common/acimages/ac-banner-footer.avif'
import Table from 'react-bootstrap/Table';

export default function WashingMachine() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
  const loadProducts = async () => {
    try {
      const res = await fetchProducts({
        category: "washingmachine",
      });

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Washing Machine slider error", err);
    }
  };

  loadProducts();
}, []);
      const navigate = useNavigate();
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
    const [acliked, setacliked] = useState([false, false, false, false, false, false, false]);
    const toggleacliked = (index) => {
        const updated = [...acliked];
        updated[index] = !updated[index];
        setacliked(updated);
    };

    return (
        <>
            <Header />
            <div className='acpage__banner'>
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
                        <img alt="" src={acbanner1} />
                    </div>
                    <div>
                        <img alt="" src={acbanner2} />
                    </div>
                    <div>
                        <img alt="" src={acbanner3} />
                    </div>
                    <div>
                        <img alt="" src={acbanner4} />
                    </div>

                </Carousel>
            </div>
            <div className='deals__sections'>
                <div className='container-fluid px-5'>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
                            <div className='element__08976Id'>
                                <div className='lhs__98se'>
                                    <h1> Best Deals on Washing Machines </h1>
                                    <p> Get upto 10% Instant Bank Discount* </p>
                                </div>
                                <div className='rhs__98se'>
                                    <Link to='/WashingMachineCollection'> View All <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, marginLeft: 10 }} /></Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-ms-12 col-12'>

                            <div>
<Slider {...settings}>
  {products.map((item, index) => (
    <div className="trendingproducts" key={item.id}>
      
      {/* Wishlist */}
      <span style={{ cursor: "pointer" }}>
        <FontAwesomeIcon
          icon={acliked[index] ? solidHeart : regularHeart}
          onClick={() => toggleacliked(index)}
          style={{
            color: acliked[index] ? "red" : "#444",
            fontSize: "20px",
          }}
        />
      </span>

      {/* Product Image */}
      <div className="products__img">
        <Link to={`/product/${item.slug}`}>
          <img
            src={item.image}
            alt={item.name}
            className="img img-fluid"
            onError={(e) => {
              e.target.src = "/Products/no-image.png";
            }}
          />
        </Link>
      </div>

      {/* Product Name */}
      <p>
        {item.name.length > 45
          ? item.name.slice(0, 45) + "..."
          : item.name}
      </p>

      {/* Price */}
      <span className="fw-bold">₹{item.price}</span>
    </div>
  ))}
</Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='aircondition'>
                <div className='container-fluid px-5'>
                    <div className='row'>
                        <div className='ac__category'>
                            <h2> Size Up Your Room</h2>
                            <p> Get upto 10% Instant Bank Discount* </p>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                            <div className='room__size__category'>
                                <Link to={''}>
                                    <img src={smallcat} className='img img-fluid' />
                                    <div className='above_margin'>
                                        <span className='span__category'>1 Ton ACs </span><br />
                                        <span className='span__category'> For rooms up to 110 sq ft' </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 col-12'>

                            <div className='room__size__category'>
                                <Link to={''}>
                                    <img src={midcat} className='img img-fluid' />
                                    <div className='above_margin'>
                                        <span className='span__category'>1.5 Ton ACs </span><br />
                                        <span className='span__category'> For rooms up to 111 sq ft' to 150 sq ft' </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 col-12'>

                            <div className='room__size__category'>
                                <Link to={''}>
                                    <img src={largecat} className='img img-fluid' />
                                    <div className='above_margin'>
                                        <span className='span__category'>2 Ton ACs </span><br />
                                        <span className='span__category'> For rooms up to 151 sq ft' to 200 sq ft' </span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='ac__budget'>
                            <h3> For Your Budget </h3>
                            <p> Get upto 10% Instant Bank Discount* </p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                            <div className='room__size__category'>
                                <div className='relative__priceTag'>
                                    <span className='absolute_pricing'>Below<br /> 30000 </span>
                                </div>
                                <Link to={''}> <img src={budgetmin} className='img img-fluid' />
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                            <div className='room__size__category'>
                                <div className='relative__priceTag'>
                                    <span className='absolute_pricing'>Below<br /> 30000 </span>
                                </div>
                                <Link to={''}><img src={budgetuppermin} className='img img-fluid' />
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                            <div className='room__size__category'>
                                <div className='relative__priceTag'>
                                    <span className='absolute_pricing'>Below<br /> 30000 </span>
                                </div>
                                <Link to={''}> <img src={budgetmid} className='img img-fluid' />
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                            <div className='room__size__category'>
                                <div className='relative__priceTag'>
                                    <span className='absolute_pricing'>Below<br /> 30000 </span>
                                </div>
                                <Link to={''}><img src={budgetlarge} className='img img-fluid' />
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
                                    <h1> Best Selling AC </h1>
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



            <div className='aircondition'>
                <div className='container-fluid px-5'>
                    <div className='row'>
                        <div className='ac__category'>
                            <h2> Choose Your Type</h2>
                            <p> Select the type of AC </p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                            <div className='room__size__category'>
                                <Link to={''}>
                                    <img src={splitac} className='img img-fluid' />
                                    <div className='ac-r5-tg2'>
                                        <span>Split AC </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>

                            <div className='room__size__category'>
                                <Link to={''}>
                                    <img src={windowac} className='img img-fluid' />
                                    <div className='ac-r5-tg2'>
                                        <span>Window AC </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>

                            <div className='room__size__category'>
                                <Link to={''}>
                                    <img src={aircooler} className='img img-fluid' />
                                    <div className='ac-r5-tg2'>
                                        <span>Air Cooler </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>

                            <div className='room__size__category'>
                                <Link to={''}>
                                    <img src={inverterac} className='img img-fluid' />
                                    <div className='ac-r5-tg2'>
                                        <span>Inverter AC </span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className='ac__budget'>
                            <h3> For The Energy Concious You </h3> <br />
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                            <div className='concious__sectionrt63-2'>

                                <Link to={''}> <img src={conciousone} className='img img-fluid' />
                                </Link>
                                <div className='concious__t334'>
                                    <span>Maximum Energy Efficiency </span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                            <div className='concious__sectionrt63-2'>
                                <Link to={''}><img src={concioustwo} className='img img-fluid' />
                                </Link>
                                <div className='concious__t334'>
                                    <span> High Energy Efficiency </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='ac-banner-footer'>
                    <img src={bannerfooter} className='img img-fluid' />
                </div>
            </div>

            <div className='container-fluid px-5'>
                <div className='row pt-5'>
                    <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                        <div className='Seo-tg87-paragraph'>
                            <h4> Buy AC Online – Explore the Best Air Conditioners in India for Every Room </h4>
                            <p> With the ever-increasing heat intensity of Indian summers every year, air conditioners have become a staple of comfort. A good AC system will make you feel comfortable at home, allow you to enjoy playing with family, and entertain your visitors in the summer. Air conditioners serve different climatic conditions, from combating humidity in coastal cities to providing relief from the dry heat in the north.

                                <br /><br />
                                If you are planning to buy an AC online, you will find the best air conditioners in India at Reliance Digital. Order air conditioners online now!</p>
                            <h5> Types of Air Conditioners – Find the Right Fit for Your Space  </h5>
                            <span> Split ACs – Ideal for Stylish, Silent, and Efficient Cooling</span>
                            <p> The reason why Indian residents prefer to use split ACs is related to their attractive appearance and soundless functioning. These air conditioners are ideal in bedrooms, living rooms, and even in an office setup, as it has an indoor and an outdoor unit.

                                <br /><br />
                                The best split ACs in India today include 4-way airflow, turbo cooling and inverter technology, which is faster to cool and consumes less energy. A split AC is the best when it comes to aesthetics, comfort, and performance ratio, something that you should consider in case you are looking to buy an air conditioner online.

                            </p>
                            <span>Window ACs -Smaller and Affordable Air Conditioners for Small Rooms </span>
                            <p> Window ACs serve a smaller room and are characterised by size compared to easy installation. They can be inserted into a window frame and provide effective cooling without the need to consume additional wall space. If you are looking for a practical and affordable solution for your bedroom or study, buy window AC from leading brands like Voltas and Hitachi available at great prices on Reliance Digital.</p>

                            <span>Inverter ACs – Smart Cooling with Energy Savings </span>
                            <p> When energy efficiency is a priority, inverter ACs come out on top. They adjust compressor speed based on room temperature, which helps save electricity and maintain a consistent temperature indoors. These air conditioners are longer-lasting and more efficient than traditional models.

                            </p>

                            <span>Portable ACs – Moveable Comfort for Flexible Cooling Needs</span>
                            <p>Perfect for renters or homes without permanent AC installations, portable ACs are mobile and easy to operate. Just plug them in and position the exhaust pipe through a window, no drilling required. They’re ideal for temporary setups, guest rooms, or areas with limited space.</p>

                            <span>Smart ACs – Intelligent Cooling at Your Fingertips</span>
                            <p> With Wi-Fi connectivity, app-based controls, and voice command compatibility, smart ACs offer convenience like never before. Adjust temperatures, monitor energy usage, or schedule timers directly from your phone. Brands like Samsung offer smart AC models that bring the connected home experience full circle.</p>



                            <span>Hot and Cold ACs – All-Season Comfort in One Appliance</span>
                            <p>Tired of using separate appliances for summer and winter? Hot and cold ACs can both cool and heat your space, making them perfect for cities with fluctuating temperatures. These models are energy-efficient and cost-saving, offering all-year usage in a single unit.</p>

                            <h4> Choose the Right AC for Optimal Cooling </h4>
                            <p> Selecting the correct AC size is essential for effective and energy-efficient cooling. Here’s how to pick the right one: </p>
                            <ul>
                                <li>1 Ton AC –- Suitable for rooms up to 120 sq ft. Ideal for small bedrooms, kids' rooms, or study areas.</li>


                                <li>1.5 Ton AC-–  Perfect for medium-sized rooms (120–180 sq ft). Offers faster and balanced cooling. </li>


                                <li>2 Ton AC and Above-–  Best for large living rooms, conference rooms, or open halls. Ensures uniform cooling even in spacious areas.</li>

                            </ul>

                            <h5> Understanding BEE Star Ratings: 3-Star AC vs 5-Star AC</h5>
                            <p>When buying an air conditioner, energy efficiency is a critical factor, and that’s where BEE star ratings matter. The Bureau of Energy Efficiency (BEE) assigns star ratings to ACs based on their power-saving capabilities.

                                <br /><br />
                                A 3-star AC is an energy-efficient option for moderate usage. It strikes a balance between upfront cost and electricity savings, making it ideal for households with limited daily cooling needs.
                                <br /> <br />

                                On the other hand, a 5-star AC offers superior energy savings. These models consume significantly less power over time, making them perfect for frequent use or larger spaces. Though slightly higher in price, a 5-star air conditioner can lower electricity bills substantially in the long run.
                            </p>
                            <h5> Buy Air Conditioners Online from the Best AC Brands in India  </h5>
                            <span> Buy Voltas AC </span>
                            <p> Voltas has long been one of the most preferred air conditioner brands in India. Known for its reliability and cost-effective pricing, Voltas ACs deliver excellent cooling performance even in extreme weather. With a wide variety of models, ranging from 1-ton inverter ACs to 2-ton hot and cold units, Voltas is trusted by Indian families as one of the best ACs in India for both quality and service. </p>
                            <span> Buy Samsung AC </span>
                            <p> Samsung brings innovation and style to the air conditioning segment. With features like WindFree Cooling, AI Auto Cooling, and SmartThings app integration, Samsung ACs offer technically advanced solutions for modern households. Whether you need a split, inverter, or smart AC, Samsung is one of the best AC brands in India that delivers efficient performance with a premium look.
                            </p>

                            <span> Buy Daikin AC </span>
                            <p>Daikin is known for its energy-efficient inverter ACs and great after-sales service. Their air conditioners operate quietly while maintaining precise temperature control. Popular for both home and commercial use, Daikin ACs are one of the best ACs in India, especially appreciated for air purification and power-saving features.</p>

                            <span> Buy LG AC </span>
                            <p> LG air conditioners are equipped with dual inverter technology, low-noise operation, and AI cooling for personalised comfort.</p>

                            <span> Buy Blue Star AC </span>
                            <p> Blue Star offers a comprehensive lineup of residential and commercial ACs. Equipped with anti-corrosive protection, turbo cooling, and self-diagnosis, Blue Star air conditioners are durable and dependable and offer the best 1.5 ton split AC prices. They’re also a popular choice in offices and hospitals due to their reliable cooling and low maintenance. </p>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <div className='rc-10'>
                            <Table responsive="sm">
                                <caption className='tbl__caption'>
                                    Air Conditioner Price List
                                </caption>
                                <thead>
                                    <tr>
                                        <th>S.no</th>
                                        <th>Products</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td> <Link to={''}>
                                            LG 2 Ton 3 Star 6 in 1 Convertible Inverter Split AC, TS-Q24ENXE (4 Way Swing, Viraat Mode, Smart)</Link></td>
                                        <td>₹53,990.00</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td> <Link to={''}>
                                            Haier 1 Ton 5 Star Split Inverter AC with Supersonic in 10 sec, Cooling in 10 Sec, HEXA Inverter, Frost Self</Link></td>
                                        <td>₹35,490.00</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <Link to={''}>Haier 1 Ton 5 Star Split Inverter AC with Supersonic in 10 sec, Cooling in 10 Sec, HEXA Inverter, Frost Self </Link></td>
                                        <td>₹35,490.00</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td> <Link to={''}>
                                            LG 2 Ton 3 Star 6 in 1 Convertible Inverter Split AC, TS-Q24ENXE (4 Way Swing, Viraat Mode, Smart) </Link></td>
                                        <td>₹53,990.00</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td> <Link to={''}>
                                            Haier 1 Ton 5 Star Split Inverter AC with Supersonic in 10 sec, Cooling in 10 Sec, HEXA Inverter, Frost Self </Link></td>
                                        <td>₹35,490.00</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td> <Link to={''}>
                                            Haier 1 Ton 5 Star Split Inverter AC with Supersonic in 10 sec, Cooling in 10 Sec, HEXA Inverter, Frost Self </Link></td>
                                        <td>₹35,490.00</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td> <Link to={''}>
                                            LG 2 Ton 3 Star 6 in 1 Convertible Inverter Split AC, TS-Q24ENXE (4 Way Swing, Viraat Mode, Smart) </Link></td>
                                        <td>₹53,990.00</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td> <Link to={''}>
                                            Haier 1 Ton 5 Star Split Inverter AC with Supersonic in 10 sec, Cooling in 10 Sec, HEXA Inverter, Frost Self </Link></td>
                                        <td>₹35,490.00</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td> <Link to={''}>
                                            Haier 1 Ton 5 Star Split Inverter AC with Supersonic in 10 sec, Cooling in 10 Sec, HEXA Inverter, Frost Self </Link></td>
                                        <td>₹35,490.00</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td> <Link to={''}>
                                            Haier 1 Ton 5 Star Split Inverter AC with Supersonic in 10 sec, Cooling in 10 Sec, HEXA Inverter, Frost Self </Link> </td>
                                        <td>₹35,490.00</td>
                                    </tr>
                                </tbody>
                                <caption className='tbl__caption_btm'>
                                    Products Price List updated on 13-11-2025
                                </caption>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
