import React, { useState } from 'react'
import '../loginComponent/img/login-bg.png'
import '../loginComponent/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEye, faBackspace, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export default function Forget() {
  return (
    <>
    <div className="main_login_bgimg">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className='col-lg-3 col-md-3 col-sm-12 col-12 m-auto'>
              <div className='login_form'>
                <div className='loginText'>
                  <h1> Forget Password?</h1>
                  <hr/>
                </div>
                <div className="login_textarea">
                  <FontAwesomeIcon icon={faUser} size="2px" />
                  <input type="text" placeholder="Enter Username / Phone no" />
                </div>
 
                <div className="forget_rembember"> 
                  <div className='Special_forgett text-right w-100'>
                    <Link to="/Login"><FontAwesomeIcon icon={faChevronLeft} />Back to Sign in</Link>
                  </div>
                </div>
                <div className='submit_Button'>
                  <button> Submit </button>
                </div>
                                <div className='register-yourself'>
                                     <Link to='/Register'> New to 4-Brothers? Create an account</Link>
                                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
