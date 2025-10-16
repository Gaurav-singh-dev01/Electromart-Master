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
      <Header/>
            
      <Footer />
  
    </>
  )
}
