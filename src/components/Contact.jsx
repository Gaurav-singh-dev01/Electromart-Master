import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faUser, faKey, faEye, faEyeSlash, faChevronRight, faChevronLeft, faHeart, faBuilding, faStore, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Footer from './footerComponent/Footer'
import Header from './headerComponent/Header'
import '../assets/css/style.css'
import emptycart from '../assets/img/emptycart.png'
import contactus from '../assets/img/contact.gif';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
export default function Contact() {
  return (
 <>
     <Header/>
       <div className='container-fluid px-5 pt-3 mb-5'>
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                 <div className='breadcrum'>
                     <ul>
                         <li> <Link to='/Index'> Home </Link></li>
                          <li><FontAwesomeIcon icon={faChevronRight}/></li>
                         <li> Contact </li>                         
                     </ul>
                 </div>
            </div>
             <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                 <div  className='contact__us'>
                    <div className='contact__text'>
                     <h1> We would love to help you </h1>
                     <p> We’d love to hear from you. Whether you have a question <br/>about features, pricing, or need assistance — our team is ready to help. </p>
                     </div>
                     <div className='contact__img'>
                     <img src={contactus} className='img img-fluid' />
                     </div>
                 </div>
  
  <div className='relative__section'>
    <div className='absolute__mailDetails'>
                           <div className='row align-items-center'>
                               <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                                    <div className='office__contacts'>
                                        <FontAwesomeIcon icon={faBuilding}/> <br/>
                                        <span> For E-Commerce Related </span><br/>
                                        <Link to=''>  1800 889 1055 </Link> 
                                        <label> (11:00 AM to 09:00 PM, All days) </label>
                                    </div>
                               </div>
                               <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                                    <div className='office__contacts'>
                                        <FontAwesomeIcon icon={faStore}/> <br/>
                                        <span> For Store Related Queries </span><br/>
                                        <Link to=''> 1800 889 1044 </Link> 
                                       <label> (11:00 AM to 09:00 PM, All days) </label>
                                    </div>
                               </div>
                               <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                                    <div className='office__contacts'>
                                        <FontAwesomeIcon icon={faWhatsapp}/> <br/>
                                        <span> Send a Hi! on WhatsApp </span><br/>
                                        <Link to=''> +91 8750491010 </Link> 
                                        <label> or Click here to start </label>
                                    </div>
                               </div>
                               <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                                    <div className='office__contacts'>
                                        <FontAwesomeIcon icon={faEnvelope}/> <br/> 
                                        <span> Send us Email </span><br/>
                                        <Link to=''> info@reliancedigitalselect.com </Link> 
                                         <label> (11:00 AM to 09:00 PM, All days) </label>
                                    </div>
                               </div>                                                                                             
                           </div> 
                           </div>
                           </div>


             </div>
          </div>
          <div className='heade__customerCall'>
                        <div className='row'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                    <div className='concerns'>
                                        <h3> Concerns not Addressed? </h3>
                                        <p> It is our priority to positively respond and address any concerns you may have at the earliest. To ensure this, our team is continuously working to provide you the best of support though a few concern/issues that are complex in nature may require additional time to resolve.<br/><br/>
In the unlikely event that your concerns are not addressed satisfactorily, you could communicate directly to higher authorities. To facilitate and better manage this we have aligned a structure to aid communication.</p>
                                    </div>
                                </div>    
                                <div className='add_structure'>
                                <p> Communication structure for concerns not addressed satisfactorily:</p>
                                </div>
                             <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                   <div className='levele-1'>
                                        <span> Level 1</span>
                                        <h4> Head of Customer Support </h4>
                                        <Link to=''> <FontAwesomeIcon icon={faEnvelope}/> info@reliancedigitalselect.com </Link>
                                        <ul>
                                         <li>  Through this channel you could communicate directly to the head of Customer Support</li>
<li>While writing, please do quote original date of raising the issue and allied resolution offered by our customer support team</li>
<li>We value every communication sent and look forward to speedily resolve it.</li>
<li>Please allow 24-48 hours for a resolution</li>
                                                                                      
                                        </ul>
                                   </div>
                                </div>    
                             <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                   <div className='levele-1'>
                                        <span> Level 2</span>
                                        <h4> Chief Executive Officer (CEO) </h4>
                                        <Link to=''> <FontAwesomeIcon icon={faEnvelope}/> info@reliancedigitalselect.com </Link>
                                        <ul>
                                         <li>This is the final level to redress grievances that have already been conveyed to the head of customer support</li>
<li>While writing we encourage you to quote the communication and allied resolution offered in earlier stages so that we get a holistic view</li>
<li>We value your time and are committed to ensure your satisfaction in all your interactions with us</li>
<li>Please allow 24-48 hours for a resolution</li>
                                                                                      
                                        </ul>
                                   </div>
                                </div>                                    
                           </div>
       </div>
       </div>
      <Footer/>       
 
 </>
  )
}
