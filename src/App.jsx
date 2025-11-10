import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/loginComponent/Login'
import Register from './components/loginComponent/Register'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from './components/footerComponent/Footer'
import Header from './components/headerComponent/Header'
import Forget from './components/loginComponent/Forget'
import Cart from './components/cart'
import Index from './components'
import Contact from './components/Contact'
import Order from './components/Order'
import AirConditioners from './components/products/ac/airconditioners'
 
 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Header />}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Forget" element={<Forget />} />
          <Route path="/Register" element={<Register />} /> 
           <Route path="/Index" element={<Index />} />
           <Route path="/Cart" element={<Cart />} />
           <Route path="/Contact" element={<Contact />} />
           <Route path="/Order" element={<Order />} />    
                   <Route path="/AirConditioners" element={<AirConditioners />} />  
        </Routes>
        {isLoggedIn && <Footer />}
      </BrowserRouter>
    </>
  )
}

export default App
