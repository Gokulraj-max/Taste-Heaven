// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../Client/Navbar1';
import Footer from '../Client/Footer';
import Foods from '../Client/FoodOrders';

const FoodsOrders = () => {
    return (
        <div>
            <Header />
            <Foods />
            <Footer />
        </div>
    );
}

export default FoodsOrders;