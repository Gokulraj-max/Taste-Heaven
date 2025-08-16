// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../Client/Navbar1';
import Footer from '../Client/Footer';
import ServiceOrders from "../Client/ServiceOrders";

const FoodOrders = () => {
    return (
        <div>
            <Header />
            <ServiceOrders />
            <Footer />
        </div>
    );

}

export default FoodOrders;