import { useState } from 'react'
import './App.css'
import Login from './components/loginComponent/Login'
import Register from './components/loginComponent/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Forget from './components/loginComponent/Forget'
import Cart from './components/cart'
import Index from './components'
import Contact from './components/Contact'
import Order from './components/Order'
import AirConditioners from './components/products/airconditioner/AirConditioners'
import Header from './components/headerComponent/Header'
import Footer from './components/footerComponent/Footer'
import AirConditionersCollections from './components/products/airconditioner/AirConditionersCollections'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsPage from './components/products/page/Productspage';
import Wishlist from './components/Wishlist';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
          <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {isLoggedIn && <Header />}

          <Routes>

            {/* Home */}
            <Route path="/" element={<Index />} />
            <Route path="/Index" element={<Index />} />

            {/* Auth */}
            <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/Forget" element={<Forget />} />
            <Route path="/Register" element={<Register />} />

            {/* Cart / Contact / Orders */}
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Order" element={<Order />} />
             <Route path="/Wishlist" element={<Wishlist />} />
            {/* Products */}
            <Route path="/AirConditioners" element={<AirConditioners />} />
            <Route path="/AirConditionersCollections" element={<AirConditionersCollections />} />

            {/* ✅ Pagination Routes */} 
           <Route path="/product/:slug" element={<ProductsPage />} />
             
          </Routes>

          {isLoggedIn && <Footer />}
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
