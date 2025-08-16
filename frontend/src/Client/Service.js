// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import './service.css';
// import serviceImage1 from '../assets/images/birthday.jpg';
// import serviceImage2 from '../assets/images/catering.jpg';
// import serviceImage3 from '../assets/images/dining.jpg';
// import serviceImage4 from '../assets/images/wedding.jpg';

// const servicesData = [
//   { id: 1, title: "Birthday Party", img: serviceImage1, description: "Celebrate your special day with us! Customized birthday party packages available.", type: "birthday", rating: 4 },
//   { id: 2, title: "Catering Services", img: serviceImage2, description: "Let us bring the taste of our restaurant to your event with our catering services.", type: "catering", rating: 5 },
//   { id: 3, title: "Family Dining", img: serviceImage3, description: "Enjoy a warm and cozy family dining experience with delicious meals.", type: "family", rating: 3 },
//   { id: 4, title: "Wedding Events", img: serviceImage4, description: "Plan your dream wedding with our elegant catering and venue services.", type: "wedding", rating: 4 }
// ];

// const Service = () => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();
//   const { user, loading } = useAuth(); // Ensuring authentication check

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login");
//     }
//   }, [user, loading, navigate]);

//   const filteredServices = servicesData.filter(service =>
//     service.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const renderStars = (rating) => {
//     return "★".repeat(rating) + "☆".repeat(5 - rating);
//   };

//   const handleBookNow = (serviceType) => {
//     if (user) {
//       navigate(`/booking/${serviceType}`);
//     }
//   };

//   if (loading) return <p className="loading-text">Checking authentication...</p>;

//   return (
//     <div>
//       <section>
//         <div className="a1-searchContainer">
//           <form onSubmit={(e) => e.preventDefault()} className="a1-searchForm">
//             <input 
//               type="text" 
//               placeholder="Search for services" 
//               value={search}
//               onChange={(e) => setSearch(e.target.value)} 
//               className="a1-searchInput"
//             />
            
//           </form>
//         </div>
//       </section>

//       <div className="a1-pageContainer">
//         <h1 className="a1-pageTitle">OUR SERVICES</h1>
//         <div className="a1-cardContainer">
//           {filteredServices.length > 0 ? (
//             filteredServices.map((service) => (
//               <div className="a1-card" key={service.id}>
//                 <div className="a1-cardContent">
//                   <img src={service.img} alt={service.title} className="a1-cardImage" />
//                   <h2 className="a1-cardTitle">{service.title}</h2>
//                   <p className="a1-cardDescription">{service.description}</p>
//                   <button 
//                     className="a1-bookButton" 
//                     onClick={() => handleBookNow(service.type)}
//                     style={{ border: '2px solid blue' }}
//                   >
//                     Book Now
//                   </button>
//                   <div className="a1-cardRating">
//                     {renderStars(service.rating)}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="a1-noResult">No services found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Service;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import './service.css';
// import serviceImage1 from '../assets/images/birthday.jpg';
// import serviceImage2 from '../assets/images/catering.jpg';
// import serviceImage3 from '../assets/images/dining.jpg';
// import serviceImage4 from '../assets/images/wedding.jpg';

// const servicesData = [
//   { id: 1, title: "Birthday Party", img: serviceImage1, description: "Celebrate your special day with us! Customized birthday party packages available.", type: "birthday", rating: 4 },
//   { id: 2, title: "Catering Services", img: serviceImage2, description: "Let us bring the taste of our restaurant to your event with our catering services.", type: "catering", rating: 5 },
//   { id: 3, title: "Family Dining", img: serviceImage3, description: "Enjoy a warm and cozy family dining experience with delicious meals.", type: "family", rating: 3 },
//   { id: 4, title: "Wedding Events", img: serviceImage4, description: "Plan your dream wedding with our elegant catering and venue services.", type: "wedding", rating: 4 }
// ];

// const Service = () => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();
//   const { user, loading } = useAuth(); // Ensuring authentication check

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login");
//     }
//   }, [user, loading, navigate]);

//   const filteredServices = servicesData.filter(service =>
//     service.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const renderStars = (rating) => {
//     return "★".repeat(rating) + "☆".repeat(5 - rating);
//   };

//   const handleBookNow = (serviceType) => {
//     if (user) {
//       navigate(`/booking/${serviceType}`);
//     }
//   };

//   if (loading) return <p className="service-loading-text">Checking authentication...</p>;

//   return (
//     <div>
//       <section>
//         <div className="service-searchContainer">
//           <form onSubmit={(e) => e.preventDefault()} className="service-searchForm">
//             <input 
//               type="text" 
//               placeholder="Search for services" 
//               value={search}
//               onChange={(e) => setSearch(e.target.value)} 
//               className="service-searchInput"
//             />
//           </form>
//         </div>
//       </section>

//       <div className="service-pageContainer">
//         <h1 className="service-pageTitle">OUR SERVICES</h1>
//         <div className="service-cardContainer">
//           {filteredServices.length > 0 ? (
//             filteredServices.map((service) => (
//               <div className="service-card" key={service.id}>
//                 <div className="service-cardContent">
//                   <img src={service.img} alt={service.title} className="service-cardImage" />
//                   <h2 className="service-cardTitle">{service.title}</h2>
//                   <p className="service-cardDescription">{service.description}</p>
//                   <button 
//                     className="service-bookButton" 
//                     onClick={() => handleBookNow(service.type)}
//                   >
//                     Book Now
//                   </button>
//                   <div className="service-cardRating">
//                     {renderStars(service.rating)}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="service-noResult">No services found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Service;



import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './service.css';
import serviceImage1 from '../assets/images/birthday.jpg';
import serviceImage2 from '../assets/images/catering.jpg';
import serviceImage3 from '../assets/images/dining.jpg';
import serviceImage4 from '../assets/images/wedding.jpg';

const servicesData = [
  { id: 1, title: "Birthday Party", img: serviceImage1, description: "Celebrate your special day with us! Customized birthday party packages available.", type: "birthday", rating: 4 },
  { id: 2, title: "Catering Services", img: serviceImage2, description: "Let us bring the taste of our restaurant to your event with our catering services.", type: "catering", rating: 5 },
  { id: 3, title: "Family Dining", img: serviceImage3, description: "Enjoy a warm and cozy family dining experience with delicious meals.", type: "family", rating: 3 },
  { id: 4, title: "Wedding Events", img: serviceImage4, description: "Plan your dream wedding with our elegant catering and venue services.", type: "wedding", rating: 4 }
];

const Service = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Ensuring authentication check

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const filteredServices = servicesData.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const handleBookNow = (serviceType) => {
    if (user) {
      navigate(`/booking/${serviceType}`);
    }
  };

  if (loading) return <p className="service-loading-text">Checking authentication...</p>;

  return (
    <div>
      <section>
        <div className="service-search-container">
          <form onSubmit={(e) => e.preventDefault()} className="service-search-form">
            <input 
              type="text" 
              placeholder="Search for services" 
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
              className="service-search-input"
            />
          </form>
        </div>
      </section>

      <div className="service-page-container">
        <h1 className="service-page-title">OUR SERVICES</h1>
        <div className="service-card-container">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-card-content">
                  <img src={service.img} alt={service.title} className="service-card-image" />
                  <h2 className="service-card-title">{service.title}</h2>
                  <p className="service-card-description">{service.description}</p>
                  <button 
                    className="service-book-button" 
                    onClick={() => handleBookNow(service.type)}
                  >
                    Book Now
                  </button>
                  <div className="service-card-rating">
                    {renderStars(service.rating)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="service-no-result">No services found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Service;