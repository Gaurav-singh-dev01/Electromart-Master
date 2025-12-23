import { useState } from 'react'
import './App.css'
import Login from './components/loginComponent/Login'
import Register from './components/loginComponent/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Forget from './components/loginComponent/Forget' 
import Index from './components'
import Contact from './components/Contact'
import Order from './components/Order'
import AirConditioners from './components/categories/ac/AirConditioners' 
import Header from './components/headerComponent/Header'
import Footer from './components/footerComponent/Footer'
import AirConditionersCollections from './components/categories/ac/AirConditionersCollections'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsPage from './components/products/page/Productspage';
import Wishlist from './components/Wishlist'; 
import Excel from './components/Excel';
import Cart from './components/Cart';
import ScrollToTop from './ScrollToTop'; 
import WashingMachine from './components/categories/washingmachine/WashingMachine';
import WashingMachineCollection from './components/categories/washingmachine/WashingMachineCollection';
 

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
          <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <ScrollToTop/> 
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
              <Route path="/Excel" element={<Excel />} />

            {/* Products */}
            <Route path="/AirConditioners" element={<AirConditioners />} />
            <Route path="/AirConditionersCollections" element={<AirConditionersCollections />} />
        
            <Route path="/WashingMachine" element={<WashingMachine />} />
            <Route path="/WashingMachineCollection" element={<WashingMachineCollection />} />


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
