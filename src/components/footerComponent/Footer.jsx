import React from 'react'
import '../loginComponent/img/login-bg.png'
import '../loginComponent/login.css'
import { Link } from 'react-router-dom'
import '../footerComponent/footer.css'
import footLogo from '../footerComponent/img/Electromart-logo-2.png' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faEnvelope, faLocation } from '@fortawesome/free-solid-svg-icons'
import playStore from '../footerComponent/img/playStore.png'
import appStore from '../footerComponent/img/appStore.png' 
export default function Footer() {
  return (
    <>
     
        <div className="electromart-footer">

          <div className="container">
            <div className='row'>
              <div className='col-12'>
                          <div className='tagline-footer'>
               <h4> Smart Gadgets, Smarter Prices </h4>
               <div className='smile-bg'>
               <Link to ='#'> Subscribe us!</Link>
               </div>
          </div>
              </div>
              <div className='col-12'>
                <div className='row my-5'>
                   <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                      <div className='myfootlogo'>
                          <img src={footLogo} className='img img-fluid'/>
                      </div>

 
                   </div>
                                      <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                       <div className='row'>
                                         <div className='col-lg-3 col-md-3 col-sm-12 col-12 mt-3'>
                <div className='footer_area'>
                  <span>Popular Categories </span>
                    <ul>
                         <li><Link to=""> Air Condition </Link> </li>
                         <li><Link to=""> Washing Machines  </Link></li>
                         <li><Link to=""> Refregirators </Link> </li>
                         <li><Link to=""> Led TV </Link> </li>                                                  
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
                         <li>   <Link to=""> <FontAwesomeIcon icon={faEnvelope} /> Electromartestore@gmail.com  </Link></li>
                         <li>   <Link to=""> <FontAwesomeIcon icon={faLocation} />     Plot no -111, Sector 4, Vaishali, Ghaziabad, Uttar Pradesh 201019 </Link> </li>                                           
                    </ul>
                </div>
              </div>               
               </div>
                   </div>
                   </div>
              </div>
             <div className='col-12'> 
              <div className='row'> 
                  <div className='tagline-footerBottom'>
                 <div className='col-lg-6'>
                 <div className='footer_area'>
                  <span>Experience Electromart App On Mobile</span>
                    <ul>
                         <li> <img src={playStore} className='img img-fluid'/> 
                         <img src={appStore} className='img img-fluid'/>  </li>          
                    </ul>
                </div>
                        </div>

                        <div className='col-lg-6'>

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
