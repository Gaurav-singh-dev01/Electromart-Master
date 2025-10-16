import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/loginComponent/Login'
import Forget from './components/loginComponent/forget'
import Register from './components/loginComponent/Register'
import Index from './components/Index'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/Footer'



function App() { 
const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>     

            <BrowserRouter>
             {isLoggedIn && <Header />}
             <Routes>
            <Route path="/" element={isLoggedIn ? <Index /> : <Navigate to="/Login" />} />
            <Route path="/Login"  element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/Forget' element={<Forget />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Index' element={<Index />} />
          </Routes> 
           {isLoggedIn && <Footer />}
        </BrowserRouter>

         
    </>
  )
}

export default App
