import React, { useState } from 'react'
import '../loginComponent/img/login-bg.png'
import '../loginComponent/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEye, faBackspace,faEyeSlash, faChevronLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export default function Register() {
    const[passeye,setpasseye] = useState(false)
  return (
    <>
          <div className="main_login_bgimg">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className='col-lg-3 col-md-3 col-sm-12 col-12 m-auto'>
              <div className='login_form'>
                <div className='loginText'>
                  <h1> Create Account</h1>
                  <hr/>
                </div>
                <div className="login_textarea">
                  <FontAwesomeIcon icon={faUser} size="2px" />
                  <input type="text" placeholder="Enter username" />
                </div>
                 <div className='login_passwordarea'>
                  <FontAwesomeIcon icon={faKey} size="2px" />
                  <input type={passeye ? "faEye" : "password" } placeholder="Enter Password" />
   
                </div>
                 <div className='login_passwordarea'>
                  <FontAwesomeIcon icon={faKey} size="2px" />
                  <input type={passeye ? "faEye" : "password" } placeholder="Enter Confirm Password" />
                      <div className="eye-Relativemotion">
                          <FontAwesomeIcon icon={passeye ? faEye : faEyeSlash} onClick={()=> setpasseye(!passeye)} className="eye_Font" size="2px"/>
                      </div>
                </div>
             
                <div className='submit_Button mt-4'>
                  <button> Continue </button>
                </div>
                <div className='register-yourself'>
                     <Link to="/Login"><FontAwesomeIcon icon={faChevronLeft} />Back to Login</Link> <br/>
                      <Link to="/Index"><FontAwesomeIcon icon={faHome} /> Visit Reliance Digital Select</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
