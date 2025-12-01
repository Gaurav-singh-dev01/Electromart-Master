import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../loginComponent/img/login-bg.png'
import { Link } from 'react-router-dom'
import '../headerComponent/header.css'
import electromartLogo from '../headerComponent/img/Electromart-logo.png'
import { Input } from 'antd';
import { HeartOutlined, LoginOutlined, ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons';
import Refrigerator from '../headerComponent/img/Refrigerator.png'
import AC from '../headerComponent/img/aC.png'
import Washingmachine from '../headerComponent/img/Washingmachine.png'
import TV from '../headerComponent/img/TV.png'
import microwave from '../headerComponent/img/microwave.png';
import kitchen from '../headerComponent/img/kitchen.png'
import Gyser from '../headerComponent/img/geyser.png'
import Speakers from '../headerComponent/img/speakers.png'
export default function Header() {

const [cartCount, setCartCount] = useState(
  Number(localStorage.getItem("cartCount")) || 0
);
useEffect(() => {
  const updateCount = () => {
    setCartCount(Number(localStorage.getItem("cartCount")) || 0);
  };
  window.addEventListener("storage", updateCount);
  return () => window.removeEventListener("storage", updateCount);
}, []);
  return (
    <>
    <div className='header__relative'>
    <div className='header__function'>
      <div className='color_blue'>
        <div className='container-fluid'>
          <div className='row'>

            <div className='col-lg-12 col-md-12 col-12'>
              <div className='header-minitext text-end'>
                <ul>
                  <li> <Link to="/Order"> Order</Link></li> &nbsp; &nbsp; &nbsp; &nbsp;
                  <li> <Link to="/Contact"> Contact us</Link></li>&nbsp; &nbsp; &nbsp; &nbsp;
                  <li> <Link to=""> Resource Center</Link></li> &nbsp; &nbsp; &nbsp; &nbsp;
                  <li> <Link to=""> Find a Store</Link></li>                  
                </ul>
              </div>
            </div> 
          </div>
        </div>
      </div>
      <div className='main_header_fixedItems'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
              <div className='header-Electromart_logo'>
                <Link to='/Index'> <img src={electromartLogo} className='img img-fluid' /></Link>
                <span> Powering Your World <br/>with Innovation </span>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12 align-self-center'>
              <div className='header-Electromart_search'>
                <Input.Search placeholder="Search for products, brands and more" className="custom-search-input" size='large' variant="filled" />
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 col-12 align-content-center'>
              <div className='megamenu-list'>
                <ul> 
                  <li> <span> {cartCount > 0 && (
    <span className="badge bg-danger ms-1 cC_098">{cartCount}</span>
  )}
  <ShoppingCartOutlined style={{ color:'white'}}/></span> <Link to='/Cart'>  Cart </Link></li>
                  <li> <span> <HeartOutlined style={{ color:'white'}}/></span> <Link to='/Wishlist'> Wishlist </Link></li>
                  <li> <span> <UserAddOutlined style={{ color:'white'}}/></span> <Link to='/Register'> Sign up </Link></li>
                  <li> <span> <LoginOutlined style={{ color:'white'}}/></span> <Link to='/Login'> Login </Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div className="box-shdw"> 
        <div className="container-fluid">
          <div className="row">
              <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
              <div className='myNav'>
                <div className="wrapper">

                  <input type="radio" name="slider" id="menu-btn" />
                  <input type="radio" name="slider" id="close-btn" />
                  <ul className="nav-links">
                    <label for="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>

                    <li>
                      <Link to='/AirConditioners' className="desktop-item"><img src={AC} className='img img-fluid' style={{width:'32px'}}/> Air Conditioners</Link> 
                    </li>
                    <li>
                      <Link to='' className="desktop-item"><img src={TV} className='img img-fluid' style={{width:'32px'}}/> Televisions</Link> 
                    </li>
                    <li>
                      <Link to='' className="desktop-item"><img src={Washingmachine} className='img img-fluid' style={{width:'32px'}}/> Washing Machines</Link> 
                    </li>
                    <li>
                      <Link to='' className="desktop-item"><img src={Refrigerator} className='img img-fluid' style={{width:'32px'}}/> Refrigerators</Link> 
                    </li>
                    <li>
                      <Link to='' className="desktop-item"> <img src={microwave} className='img img-fluid' style={{width:'32px'}}/> Microwaves</Link>
                      
                    </li>
                    <li>
                      <Link to='' className="desktop-item"> <img src={kitchen} className='img img-fluid' style={{width:'32px'}}/> Kitchen Acessories</Link> 
                    </li> 
                    <li>
                      <Link to='' className="desktop-item"> <img src={Gyser} className='img img-fluid' style={{width:'32px'}}/> Gyser </Link>
                       
                    </li>   
                     <li>
                      <Link to='' className="desktop-item"> <img src={Speakers} className='img img-fluid' style={{width:'32px'}}/> Speakers </Link>    
                    </li>                                        
                  </ul>
                  <label for="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
                </div>
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
