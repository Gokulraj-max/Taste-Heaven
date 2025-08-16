// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../Client/Navbar1';
import Footer from '../Client/Footer';
import Product from '../Client/ProductPage';

const Products = () => {
    return (
      <div>
        <Header />
        <Product/>
        <Footer />
      </div>
    );
  };
export default Products;