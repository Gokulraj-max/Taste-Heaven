import React from "react";
import "./RestaurantInfo.css";
import dish1 from "../assets/chinese.jpg";
import dish2 from "../assets/fresh.jpg";
import dish3 from "../assets/Ambiance.jpg";

const RestaurantInfo = () => {
  return (
    <section className="restaurant-info">
      <h2 className="section-title">Experience the Magic of TasteHeaven</h2>
      <div className="info-content">
        <div className="info-item">
          <img src={dish1} alt="Delicious Dish" className="info-image" />
          <div className="info-text">
            <h3>Authentic Cuisine</h3>
            <p>Experience the authentic taste of traditional and modern cuisines, crafted by our expert chefs.</p>
          </div>
        </div>
        <div className="info-item">
          <img src={dish2} alt="Fresh Ingredients" className="info-image" />
          <div className="info-text">
            <h3>Fresh Ingredients</h3>
            <p>We use only the freshest ingredients to ensure every dish bursts with flavor and quality.</p>
          </div>
        </div>
        <div className="info-item">
          <img src={dish3} alt="Ambiance" className="info-image" />
          <div className="info-text">
            <h3>Unmatched Ambiance</h3>
            <p>Dine in a warm and welcoming environment that sets the stage for unforgettable memories.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantInfo;
