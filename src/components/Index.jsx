import React, { useState } from 'react' 
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Footer from './footerComponent/Footer';
import Header from './headerComponent/header';
 

export default function Index() {
 

  return (
    <>
       <Header />
        <div id="element--0891--rollon">
           <div className='container'>
               <div className='row'>
                   <div className='col-lg-12 col-md-12 col-ms-12 col-12'>
  
 
                   </div>
               </div> 
           </div>

        </div>
       <Footer />
    </>
  )
}
