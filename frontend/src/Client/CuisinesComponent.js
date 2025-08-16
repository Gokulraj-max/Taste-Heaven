// import React from 'react';
// import './CuisinesComponent.css';
// import biryaniImg from "../assets/images/Biriyani.jpg";
// import Idli from "../assets/images/Idli.jpg";
// import Pongal from "../assets/images/Pongal.jpg";
// import Cake from "../assets/images/Cake.jpg";
// import Dosa from "../assets/images/Dosa.jpg";
// import Vada from "../assets/images/Vada.jpg";
// import Parotta from "../assets/images/Parotta.jpg";
// import Bonda from "../assets/images/Bonda.jpg";
// import Paniyaram from "../assets/images/Paniyaram.jpg";
// import Juice from "../assets/images/Juice.jpg";
// import Khichdi from "../assets/images/Khichdi.jpg";
// import Omelette from "../assets/images/Omelette.jpg";
// import Pancake from "../assets/images/Pancake.jpg";
// import Tea from "../assets/images/Tea.jpg";



// const cuisines = [
//   { name: "Biryani", img: biryaniImg },
//   { name: "Idli", img: Idli },
//   { name: "Pongal", img: Pongal },
//   { name: "Cake", img: Cake },
//   { name: "Dosa", img: Dosa },
//   { name: "Vada", img: Vada },
//   { name: "Parotta", img: Parotta },
//   { name: "Bonda", img: Bonda },
//   { name: "Paniyaram", img: Paniyaram },
//   { name: "Juice", img: Juice },
//   { name: "Khichdi", img: Khichdi },
//   { name: "Omelette", img: Omelette },
//   { name: "Pancake", img: Pancake },
//   { name: "Tea", img: Tea },
// ];

// const CuisinesComponent = () => {
//   return (
//     <div className="cuisines-container">
//       <h2 className="cuisines-title">Popular Cuisines</h2>
//       <div className="cuisines-grid">
//         {cuisines.map((cuisine, index) => (
//           <div key={index} className="cuisine-item">
//             <img src={cuisine.image} alt={cuisine.name} className="cuisine-image" />
//             <p className="cuisine-name">{cuisine.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CuisinesComponent;
import React from 'react';
import './CuisinesComponent.css';
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

const cuisines = [
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

const CuisinesComponent = () => {
  return (
    <div className="cuisines-container">
      <h2 className="cuisines-title">Popular Cuisines</h2>
      <div className="cuisines-grid">
        {cuisines.map((cuisine, index) => (
          <div key={index} className="cuisine-item">
            <img src={cuisine.img} alt={cuisine.name} className="cuisine-image" />
            <p className="cuisine-name">{cuisine.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuisinesComponent;
