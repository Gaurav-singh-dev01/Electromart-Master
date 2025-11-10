import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faUser, faKey, faEye, faEyeSlash, faChevronRight, faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import Footer from './footerComponent/Footer'
import Header from './headerComponent/Header'
import '../assets/css/style.css'
import emptycart from '../assets/img/emptycart.png'
export default function Cart() {
  return (
<>
    <Header/>
      <div className='container-fluid px-5 py-1 mb-5'>
         <div className='row'>
                      <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                           <div className='breadcrum'>
                               <ul>
                                   <li> <Link to='/Index'> Home </Link></li>
                                    <li><FontAwesomeIcon icon={faChevronRight}/></li>
                                   <li> Cart </li>                         
                               </ul>
                           </div>
                      </div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
              <div className='heading__cart'>
                <h1> My Cart </h1>
              </div>
            </div>
          <div className='col-lg-5 col-md-5 col-sm-12 col-12 m-auto'>
              <div className='display__cart__area'>
                   <img src={emptycart} className='img img-fluid'/>
                   <h2> Empty Cart </h2>
                   <h3> Browse items and add them to your cart </h3>
                   <Link to='/Index'> Continue Shopping</Link>
              </div>
            </div>
         </div>
     </div>
    <Footer/>
</>
  )
}

