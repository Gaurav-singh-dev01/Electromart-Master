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

  return (
    <>
    <div className='header__function'>
      <div className='color_blue'>
        <div className='container-fluid'>
          <div className='row'>

            <div className='col-lg-12 col-md-12 col-12'>
              <div className='header-minitext text-end'>
                <ul>
                  <li> <Link to=""> Order</Link></li> &nbsp; &nbsp; &nbsp; &nbsp;
                  <li> <Link to=""> Contact us</Link></li>&nbsp; &nbsp; &nbsp; &nbsp;
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
                <img src={electromartLogo} className='img img-fluid' />
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
                  <li> <span> <UserAddOutlined style={{ color:'white'}}/></span> <Link to='/Register'> Sign up </Link></li>
                  <li> <span> <LoginOutlined style={{ color:'white'}}/></span> <Link to='/Login'> Login </Link></li>
                  <li> <span> <ShoppingCartOutlined style={{ color:'white'}}/></span> <Link to={''}> Cart </Link></li>
                  <li> <span> <HeartOutlined style={{ color:'white'}}/></span> <Link to={''}> Wishlist </Link></li>
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
                <div class="wrapper">

                  <input type="radio" name="slider" id="menu-btn" />
                  <input type="radio" name="slider" id="close-btn" />
                  <ul class="nav-links">
                    <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>

                    <li>
                      <a href="#" class="desktop-item"><img src={AC} className='img img-fluid' style={{width:'40px'}}/> Air Conditioners</a> 
                    </li>
                    <li>
                      <a href="#" class="desktop-item"><img src={TV} className='img img-fluid' style={{width:'40px'}}/> Televisions</a> 
                    </li>
                    <li>
                      <a href="#" class="desktop-item"><img src={Washingmachine} className='img img-fluid' style={{width:'40px'}}/> Washing Machines</a> 
                    </li>
                    <li>
                      <a href="#" class="desktop-item"><img src={Refrigerator} className='img img-fluid' style={{width:'40px'}}/> Refrigerators</a> 
                    </li>
                    <li>
                      <a href="#" class="desktop-item"> <img src={microwave} className='img img-fluid' style={{width:'40px'}}/> Microwaves</a>
                      
                    </li>
                    <li>
                      <a href="#" class="desktop-item"> <img src={kitchen} className='img img-fluid' style={{width:'40px'}}/> Kitchen Acessories</a> 
                    </li> 
                    <li>
                      <a href="#" class="desktop-item"> <img src={Gyser} className='img img-fluid' style={{width:'40px'}}/> Gyser </a>
                       
                    </li>   
                                        <li>
                      <a href="#" class="desktop-item"> <img src={Speakers} className='img img-fluid' style={{width:'40px'}}/> Speakers </a>    
                    </li>                                        
                  </ul>
                  <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
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
