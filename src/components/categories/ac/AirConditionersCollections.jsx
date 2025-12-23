import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../../products/common/filters/FilterSidebar";
import ProductList from "../../products/common/productlisting/ProductList";
import Header from "../../headerComponent/Header";
import Footer from "../../footerComponent/Footer";
 import { Link } from 'react-router-dom'
 import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AirConditionersCollections = () => {

   
    const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]); 
  useEffect(() => {
    fetchproductlisting();
  }, []);

  const fetchproductlisting = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        params: {
          category: "Air Conditioner", // Filter for AC
        },
      });

      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  return (
    <>
      <Header />
          <div className="container-fluid bg-light px-5 py-4">
      <div className="row">
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                     <div className='breadcrum'>
                                         <ul>
                                             <li> <Link to='/Index'> Home </Link></li>
                                              <li><FontAwesomeIcon icon={faChevronRight}/></li>
                                              <li> <Link to='/AirConditioners'> Air Conditioners </Link></li>
                                              <li><FontAwesomeIcon icon={faChevronRight}/></li>     
                                              <li>  All Collections </li>                  
                                         </ul>
                                     </div>
                                </div>
         <div className="col-3 bg-white border-end p-3" style={{position: "sticky",top: "160px",height: "60vh",overflowY: "auto",borderRadius: '7px',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px'}}>
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Products */}
        <div className="col-9 px-4 pb-4">
           <ProductList filters={filters} category="ac"/>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
export default AirConditionersCollections;