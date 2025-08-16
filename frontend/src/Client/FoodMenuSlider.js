import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FoodMenuSlider.css";
import biryaniImg from "../assets/images/Biriyani.jpg";
import Idli from "../assets/images/Idli.jpg";
import Pongal from "../assets/images/Pongal.jpg";
import Cake from "../assets/images/Cake.jpg";
import Dosa from "../assets/images/Dosa.jpg";
import Vada from "../assets/images/Vada.jpg";
import Parotta from "../assets/images/Parotta.jpg";
import Bonda from "../assets/images/Bonda.jpg";
import Paniyaram from "../assets/images/Paniyaram.jpg";
import Juice from "../assets/images/Juice.jpg";
import Khichdi from "../assets/images/Khichdi.jpg";
import Omelette from "../assets/images/Omelette.jpg";
import Pancake from "../assets/images/Pancake.jpg";
import Tea from "../assets/images/Tea.jpg";



const foodItems = [
  { name: "Biryani", img: biryaniImg },
  { name: "Idli", img: Idli },
  { name: "Pongal", img: Pongal },
  { name: "Cake", img: Cake },
  { name: "Dosa", img: Dosa },
  { name: "Vada", img: Vada },
  { name: "Parotta", img: Parotta },
  { name: "Bonda", img: Bonda },
  { name: "Paniyaram", img: Paniyaram },
  { name: "Juice", img: Juice },
  { name: "Khichdi", img: Khichdi },
  { name: "Omelette", img: Omelette },
  { name: "Pancake", img: Pancake },
  { name: "Tea", img: Tea },
];

const FoodMenuSlider = () => {
  return (
    <div className="food-slider">
      <h2>Order our best food options</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={6}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {foodItems.map((food, index) => (
          <SwiperSlide key={index}>
            <div className="food-item">
              <img src={food.img} alt={food.name} />
              <p>{food.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodMenuSlider;
