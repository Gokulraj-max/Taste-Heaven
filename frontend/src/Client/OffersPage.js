// import React, { useState, useEffect, useCallback } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useAuth } from "../contexts/AuthContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./OffersPage.css";

// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// export default function OffersPage() {
//   const [search, setSearch] = useState("");
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [category, setCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState(null);
//   const [sortBy, setSortBy] = useState("none");

//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const fetchOffers = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(`${API_URL}/api/offers`);
//       if (!response.ok) throw new Error("Failed to fetch offers");

//       const data = await response.json();
//       if (!Array.isArray(data)) throw new Error("Invalid response format");

//       setOffers(data);
//     } catch (err) {
//       console.error("❌ Error fetching offers:", err);
//       setError(err.message || "Could not load offers. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOffers();
//   }, [fetchOffers]);

//   const handleAddToCart = (product) => {
//     if (!user) {
//       toast.info("Please log in to add products to your cart.");
//       navigate("/login");
//       return;
//     }
//     addToCart({ ...product, quantity: 1 });
//     toast.success(`${product.name} successfully added to cart!`);
//   };

//   // 🏷️ **Filter & Sort Offers**
//   const filteredOffers = offers.filter((offer) => {
//     const matchesSearch = search
//       ? offer.name.toLowerCase().includes(search.toLowerCase())
//       : true;
//     const matchesCategory = category === "All" || offer.category === category;
//     const matchesPrice =
//       !priceRange || (offer.price >= priceRange[0] && offer.price <= priceRange[1]);

//     return matchesSearch && matchesCategory && matchesPrice;
//   });

//   const sortedOffers = filteredOffers.sort((a, b) => {
//     if (sortBy === "name-asc") return a.name.localeCompare(b.name);
//     if (sortBy === "name-desc") return b.name.localeCompare(a.name);
//     if (sortBy === "price-asc") return a.price - b.price;
//     if (sortBy === "price-desc") return b.price - a.price;
//     return 0;
//   });

//   return (
//     <div className="offersContainer">
//       <div className="homeContainer">
//         <div className="offersPage">
//           {/* 🔍 Search Bar */}
//           <form onSubmit={(e) => e.preventDefault()} className="searchForm">
//             <input
//               type="text"
//               placeholder="Search offers here..!"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="searchInput"
//             />
//             <button type="submit" className="searchButton">
//               <FaSearch className="searchIcon" />
//             </button>
//           </form>

//           {/* 🏷️ Filters */}
//           <div className="filterBar">
//             <select onChange={(e) => setCategory(e.target.value)}>
//               <option value="All">All Categories</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Burger">Burger</option>
//               <option value="Drinks">Drinks</option>
//             </select>

//             <select
//               onChange={(e) => {
//                 try {
//                   setPriceRange(e.target.value === "null" ? null : JSON.parse(e.target.value));
//                 } catch {
//                   setPriceRange(null);
//                 }
//               }}
//             >
//               <option value="null">All Prices</option>
//               <option value="[0, 100]">₹0 - ₹100</option>
//               <option value="[101, 500]">₹101 - ₹500</option>
//               <option value="[501, 1000]">₹501 - ₹1000</option>
//             </select>

//             <select onChange={(e) => setSortBy(e.target.value)}>
//               <option value="none">Sort By</option>
//               <option value="name-asc">Name (A-Z)</option>
//               <option value="name-desc">Name (Z-A)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>

//           {/* 📢 Offers List */}
//           <div className="offersList">
//             <div className="gridContainer">
//               {loading ? (
//                 <p>Loading offers...</p>
//               ) : error ? (
//                 <p className="noOffers">{error}</p>
//               ) : sortedOffers.length > 0 ? (
//                 sortedOffers.map((product) => (
//                   <div key={product._id} className="offerCard">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="offerImage"
//                     />
//                     <div className="cardContent">
//                       <h3 className="offerTitle">{product.name}</h3>
//                       <p className="offerDescription">{product.description}</p>
//                       <p className="price">
//                         ₹{product.price}
//                         <span className="oldPrice">₹{product.originalPrice}</span>
//                       </p>
//                       <button
//                         className="addToCart"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="noOffers">No offers available at the moment.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./OffersPage.css";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function SpecialDeals() {
  const [search, setSearch] = useState("");
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState("none");

  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/offers`);
      if (!response.ok) throw new Error("Failed to fetch deals");

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid response format");

      setDeals(data);
    } catch (err) {
      console.error("❌ Error fetching deals:", err);
      setError(err.message || "Could not load deals. Try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.info("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} successfully added to cart!`);
  };

  // 🏷️ **Filter & Sort Deals**
  const filteredDeals = deals.filter((deal) => {
    const matchesSearch = search
      ? deal.name.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = category === "All" || deal.category === category;
    const matchesPrice =
      !priceRange || (deal.price >= priceRange[0] && deal.price <= priceRange[1]);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedDeals = filteredDeals.sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

//   return (
//     <div className="dealsContainer">
//       <div className="homeWrapper">
//         <div className="specialDealsPage">
//           {/* 🔍 Search Bar */}
//           <form onSubmit={(e) => e.preventDefault()} className="searchPanel">
//             <input
//               type="text"
//               placeholder="Search deals here..!"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="searchBox"
//             />
           
//           </form>

//           {/* 🏷️ Filters */}
//           <div className="filterOptions">
//             <select onChange={(e) => setCategory(e.target.value)}>
//               <option value="All">All Categories</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Burger">Burger</option>
//               <option value="Drinks">Drinks</option>
//             </select>

//             <select
//               onChange={(e) => {
//                 try {
//                   setPriceRange(e.target.value === "null" ? null : JSON.parse(e.target.value));
//                 } catch {
//                   setPriceRange(null);
//                 }
//               }}
//             >
//               <option value="null">All Prices</option>
//               <option value="[0, 100]">₹0 - ₹100</option>
//               <option value="[101, 500]">₹101 - ₹500</option>
//               <option value="[501, 1000]">₹501 - ₹1000</option>
//             </select>

//             <select onChange={(e) => setSortBy(e.target.value)}>
//               <option value="none">Sort By</option>
//               <option value="name-asc">Name (A-Z)</option>
//               <option value="name-desc">Name (Z-A)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>

//           {/* 📢 Deals List */}
//           <div className="dealsSection">
//             <div className="gridWrapper">
//               {loading ? (
//                 <p>Loading deals...</p>
//               ) : error ? (
//                 <p className="noDeals">{error}</p>
//               ) : sortedDeals.length > 0 ? (
//                 sortedDeals.map((product) => (
//                   <div key={product._id} className="dealCard">
//   {/* {product.isSpecialOffer && <div className="specialOfferBanner">Special Offer</div>} */}

//  <div className="specialOfferBanner">Special Offer</div>

//   <img
//     src={product.image}
//     alt={product.name}
//     className="dealImage"
//   />
//   <div className="cardDetails">
//     <h3 className="dealTitle">{product.name}</h3>
//     <p className="dealDescription">{product.description}</p>
//     <p className="dealPrice">
//       ₹{product.price}
//       <span className="oldPrice">₹{product.originalPrice}</span>
//     </p>
//     <button
//       className="addDealToCart"
//       onClick={() => handleAddToCart(product)}
//     >
//       Add to Cart
//     </button>
//   </div>
// </div>
//                 ))
//               ) : (
//                 <p className="noDeals">No deals available at the moment.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

return (
  <div className="offer-dealsContainer">
    <div className="offer-homeWrapper">
      <div className="offer-specialDealsPage">
        {/* 🔍 Search Bar */}
        <form onSubmit={(e) => e.preventDefault()} className="offer-searchPanel">
          <input
            type="text"
            placeholder="Search deals here..!"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="offer-searchBox"
          />
        </form>

        {/* 🏷️ Filters */}
        <div className="offer-filterOptions">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Drinks">Drinks</option>
          </select>

          <select
            onChange={(e) => {
              try {
                setPriceRange(e.target.value === "null" ? null : JSON.parse(e.target.value));
              } catch {
                setPriceRange(null);
              }
            }}
          >
            <option value="null">All Prices</option>
            <option value="[0, 100]">₹0 - ₹100</option>
            <option value="[101, 500]">₹101 - ₹500</option>
            <option value="[501, 1000]">₹501 - ₹1000</option>
          </select>

          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">Sort By</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>

        {/* 📢 Deals List */}
        <div className="offer-dealsSection">
          <div className="offer-gridWrapper">
            {loading ? (
              <p>Loading deals...</p>
            ) : error ? (
              <p className="offer-noDeals">{error}</p>
            ) : sortedDeals.length > 0 ? (
              sortedDeals.map((product) => (
                <div key={product._id} className="offer-dealCard">
                  <div className="offer-specialOfferBanner">Special Offer</div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="offer-dealImage"
                  />
                  <div className="offer-cardDetails">
                    <h3 className="offer-dealTitle">{product.name}</h3>
                    <p className="offer-dealDescription">{product.description}</p>
                    <p className="offer-dealPrice">
                      ₹{product.price}
                      <span className="offer-oldPrice">₹{product.originalPrice}</span>
                    </p>
                    <button
                      className="offer-addDealToCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="offer-noDeals">No deals available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
