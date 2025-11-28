import React from 'react'
import { useState, useEffect } from "react";
import '../loginComponent/img/login-bg.png'
import '../loginComponent/login.css'
import { Link } from 'react-router-dom'
import '../footerComponent/footer.css'
import footLogo from '../footerComponent/img/Electromart-logo-2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faChevronCircleRight, faChevronCircleUp, faEnvelope, faLocation, faLocationDot, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import playStore from '../footerComponent/img/playStore.png'
import appStore from '../footerComponent/img/appStore.png'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF'
import { faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons/faSquareFacebook'
export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>

          {showButton && (
        <button
          onClick={scrollToTop}
          style={{
    position: 'fixed',
    bottom: 17,
    right: 20,
    padding: '0px 0px',
    background: 'transparent',
    color:'#0090f0',
    border: 'none',
    borderRadius: 50,
    cursor: 'pointer',
    fontSize: 30,
    zIndex:9,
}}
        >
          <FontAwesomeIcon icon={faChevronCircleUp} />
        </button>
      )}

  
      <div className="electromart-footer">

        <div className="container-fluid px-5">
          <div className='row'>
            <div className='col-12'>
              <div className='tagline-footer'>
                <h4> Smart Gadgets, Smarter Prices </h4>
                <div className='smile-bg'>
                  <Link to='#'> Subscribe us!</Link>
                </div>
              </div>
            </div>
            <div className='col-12'>
              <div className='row my-5'>
                <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                  <div className='myfootlogo'>
                    <img src={footLogo} className='img img-fluid' />
                  </div>


                </div>
                <div className='col-lg-9 col-md-9 col-sm-12 col-12'>
                  <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-12 col-12 mt-3'>
                      <div className='footer_area'>
                        <span>Popular Categories </span>
                        <ul>
                          <li><Link to=""> Air Condition </Link> </li>
                          <li><Link to=""> Washing Machines  </Link></li>
                          <li><Link to=""> Refregirators </Link> </li>
                          <li><Link to=""> Led TV </Link> </li>
                          <li><Link to=""> Micorwaves </Link> </li>
                          <li><Link to=""> Gysers </Link> </li>
                          <li><Link to=""> Water Purifier </Link> </li>
                          <li><Link to=""> Air Purifier </Link> </li>
                          <li><Link to=""> Room Heater </Link> </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 col-12 mt-3'>
                      <div className='footer_area'>
                        <span> Customer Policies </span>
                        <ul>
                          <li><Link to=""> Contact  </Link></li>
                          <li><Link to=""> Shopping Faq </Link></li>
                          <li><Link to=""> T&C </Link></li>
                          <li><Link to=""> Terms of use </Link> </li>
                          <li><Link to="">  Returns & Refunds </Link> </li>
                          <li><Link to="">  Delivery Information </Link></li>
                          <li><Link to="">  Sale Terms and condition </Link> </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-12 col-12 mt-3'>
                      <div className='footer_area'>
                        <span>Usefull Links </span>
                        <ul>
                          <li><Link to=""> Blogs  </Link></li>
                          <li><Link to=""> Career  </Link></li>
                          <li><Link to=""> Site Map </Link> </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12 mt-3'>
                      <div className='footer_area'>
                        <span>Contact us </span>
                        <ul>
                          <li>   <Link to=""> <FontAwesomeIcon icon={faPhone} />  +91 8750491010 </Link></li>
                          <li>   <Link to=""> <FontAwesomeIcon icon={faEnvelope} /> info@reliancedigitalselect.com  </Link></li>
                          <li>   <Link to=""> <FontAwesomeIcon icon={faLocationDot} />     Plot no -111, Sector 4, Vaishali, Ghaziabad, Uttar Pradesh 201019 </Link> </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12'>
              <div className='tagline-footerBottom'>
                <div className='row'>

                  <div className='col-lg-5'>
                    <div className='footer_area-applications'>
                      <span>Experience Reliance Digital Select App On Mobile</span>
                      <ul>
                        <li>

                          <img src={playStore} className='img img-fluid' /><br />
                          <span style={{ color: "#daa520" }}> ★★★★★</span> </li>
                        <li> <img src={appStore} className='img img-fluid' /> <br />
                          <span style={{ color: "#daa520" }}> ★★★★★</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-lg-4 col-12'>
                    <div className='connect'>
                      <span>Connect with us</span><br />
                      <ul>
                        <li> <Link to=""> <FontAwesomeIcon icon={faSquareFacebook} /> </Link></li>
                        <li> <Link to=""> <FontAwesomeIcon icon={faTwitterSquare} /> </Link></li>
                        <li> <Link to=""> <FontAwesomeIcon icon={faInstagramSquare} /> </Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-lg-3 col-12'>
                    <div className='newsletter_area'>
                      <span>Join our newsletter</span><br />
                      <input type="text" placeholder='Newsletter' />
                      <Link to='' ><FontAwesomeIcon icon={faChevronCircleRight} size="30px" /> </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className='col-12'>
              <div className="row mt-3">
                <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                  <div className='copyright_reserved text-start'>
                    <p>  A Reliance Digital Select Store  </p>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                  <div className='copyright_reserved text-center'>
                    <p>  Reliance Digital Select © 2025. All right reserved  </p>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                  <div className='copyright_reserved text-end'>
                    <p>  In case of any concern, <Link to='/Contact'> Contact Us </Link>  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
        
    </>
  )
}
