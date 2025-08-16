// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../Client/Navbar1';
import Footer from '../Client/Footer';
import CartPage from '../Client/CartPage';
const Cart = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '20px' }}> {/* Adjust the value as needed */}
        <CartPage />
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
