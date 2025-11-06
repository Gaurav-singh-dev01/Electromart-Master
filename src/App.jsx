import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/loginComponent/Login'
import Register from './components/loginComponent/Register'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from './components/footerComponent/Footer'
import Header from './components/headerComponent/Header'
import Index from './components'
import Forget from './components/loginComponent/Forget'



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
        </Routes>
        {isLoggedIn && <Footer />}
      </BrowserRouter>
    </>
  )
}

export default App
