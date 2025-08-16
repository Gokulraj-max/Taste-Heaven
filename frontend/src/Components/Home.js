// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../Client/Navbar1';
import Footer from '../Client/Footer';
import Carousel from '../Client/Carousel';
import Restaurant from '../Client/RestaurantInfo';
import FoodMenuSlider from '../Client/FoodMenuSlider';
import Headers1 from '../Client/ZomatoStylePage';


const Home = () => {
    return (
      <div>
        {/* <Header /> */}
        <Headers1 />

       
        <Restaurant />
        {/* <Carousel/> */}
        <FoodMenuSlider />
        <Footer />
      </div>
    );
  };
  
  export default Home;


  // import { useEffect, useState } from "react";
  // import Headers1 from "../Client/ZomatoStylePage";
  // import Restaurant from "../Client/RestaurantInfo";
  // import FoodMenuSlider from "../Client/FoodMenuSlider";
  // import Footer from "../Client/Footer";
  
  // // Sample reviews
  // const reviews = [
  //   "Amazing food! 🍽️",
  //   "Best restaurant experience ever! ⭐⭐⭐⭐⭐",
  //   "Delicious biryani, must try! 🍛",
  //   "Service was top-notch! 💯",
  //   "Highly recommend the desserts! 🍰",
  // ];
  
  // const Home = () => {
  //   const [flyingComments, setFlyingComments] = useState([]);
  
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const newComment = {
  //         id: Math.random(),
  //         text: reviews[Math.floor(Math.random() * reviews.length)],
  //         position: Math.random() * 50 + 10, // Random top position
  //       };
  //       setFlyingComments((prev) => [...prev, newComment]);
  
  //       // Remove comment after 4s
  //       setTimeout(() => {
  //         setFlyingComments((prev) => prev.filter((c) => c.id !== newComment.id));
  //       }, 4000);
  //     }, 2000);
  
  //     return () => clearInterval(interval);
  //   }, []);
  
  //   return (
  //     <div className="relative overflow-hidden">
  //       <Headers1 />
  //       <Restaurant />
  //       <FoodMenuSlider />
  
  //       {/* Floating Comments */}
  //       <div className="absolute left-5 top-1/3 space-y-4">
  //         {flyingComments.map((comment) => (
  //           <div
  //             key={comment.id}
  //             className="absolute left-0 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md animate-fade-out"
  //             style={{ top: `${comment.position}%` }}
  //           >
  //             {comment.text}
  //           </div>
  //         ))}
  //       </div>
  
  //       {/* Customer Reviews Section */}
  //       <div className="bg-gray-100 py-10 text-center">
  //         <h2 className="text-2xl font-semibold mb-5">What Our Customers Say</h2>
  //         <div className="flex flex-wrap justify-center gap-6">
  //           {reviews.map((review, index) => (
  //             <div key={index} className="bg-white p-4 rounded-xl shadow-md max-w-xs">
  //               <p className="text-gray-800">{review}</p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  
  //       <Footer />
  //     </div>
  //   );
  // };
  
  // export default Home;
  