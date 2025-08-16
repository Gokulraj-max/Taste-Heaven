// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../Client/Navbar1';
import Footer from '../Client/Footer';
import Order from '../Client/OrderPage';

const Orders = () => {
    return (
      <div>
        <Header />
        <Order/>
        <Footer />
      </div>
    );
  }

export default Orders;
