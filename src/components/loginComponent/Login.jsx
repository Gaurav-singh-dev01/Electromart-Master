import React, { useState } from 'react' 
import { useNavigate } from "react-router-dom";
import '../loginComponent/img/login-bg.png'
import '../loginComponent/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export default function Login() {
  const [passeye, setpasseye] = useState(false)
 const navigate = useNavigate(); // navigation ke liye

  // Step 1: username aur password ke liye state banao
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const correctUser = "admin";
  const correctPass = "12345";


  const handleLogin = (e) => {
    e.preventDefault(); // page reload mat karo

    // trim() spaces hata deta hai (agar galti se extra space daal diya ho)
    if (
      username.trim() === correctUser &&
      password.trim() === correctPass
    ) {
       setMessage("");
      navigate("/Index");
    } else {
      setMessage("❌ Wrong username or password!");
    }
  };


  return (
    <>
      <form className='h-100' onSubmit={handleLogin}>
        <div className="main_login_bgimg">
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className='col-lg-3 col-md-3 col-sm-12 col-12 m-auto'>
                <div className='login_form'>
                  <div className='loginText'>
                    <p>{message}</p>
                    <h1> Sign in</h1>
                    <hr />
                  </div>
                  <div className="login_textarea">
                    <FontAwesomeIcon icon={faUser} size="2px" />
                    <input
                      type="text"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className='login_passwordarea'>
                    <FontAwesomeIcon icon={faKey} size="2px" />
                    <input type={passeye ? "faEye" : "password"} placeholder="Enter Password" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="eye-Relativemotion">
                      <FontAwesomeIcon icon={passeye ? faEye : faEyeSlash} onClick={() => setpasseye(!passeye)} className="eye_Font" size="2px" />
                    </div>
                  </div>
                  <div className="forget_rembember">
                    <div className='Special_remember'>
                      <input type="checkbox" />
                      <span> Remember me </span>
                    </div>
                    <div className='Special_forgett'>
                      <Link to='/Forget'> Forgett Password?</Link>
                    </div>
                  </div>
                  <div className='submit_Button'>
                    <button type="submit"><Link to='/Index' className="text-decoration-none text-white"> Login </Link></button>
                  </div>
                  <div className='register-yourself'>
                    <Link to='/Register'> New to 4-Brothers? Create an account</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
