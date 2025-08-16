// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext"; // Adjust path as needed
// import { useAuth } from "../contexts/AuthContext";   // Adjust path as needed
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ProductPage.css";

// export default function ProductPage() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("none");
//   const [priceRange, setPriceRange] = useState(null);
//   const [products, setProducts] = useState([]);
  
//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch products from the backend
//     fetch("/api/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);


//    const handleAddToCart = (product) => {
//       if (!user) {
//         toast.info("Please log in to add products to your cart.");
//         navigate("/login");
//         return;
//       }
//       addToCart({ ...product, quantity: 1 });
//       toast.success(`${product.name} successfully added to cart!`);
//     };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleCategoryChange = (selectedCategory) => {
//     setCategory(selectedCategory);
//   };

//   const handleSortChange = (sortOption) => {
//     setSortBy(sortOption);
//   };

//   const handlePriceRangeChange = (range) => {
//     setPriceRange(range);
//   };

//   const filteredProducts = products
//     .filter((p) =>
//       search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
//     )
//     .filter((p) => (category !== "All" ? p.category === category : true))
//     .filter((p) =>
//       priceRange ? p.price >= priceRange[0] && p.price <= priceRange[1] : true
//     )
//     .sort((a, b) => {
//       if (sortBy === "name-asc") return a.name.localeCompare(b.name);
//       if (sortBy === "name-desc") return b.name.localeCompare(a.name);
//       if (sortBy === "price-asc") return a.price - b.price;
//       if (sortBy === "price-desc") return b.price - a.price;
//       return 0;
//     });

//   return (
//     <div className="a1b1c1-ordersContainer">
//       <div className="a1b1c1-homeContainer">
//         <div className="a1b1c1-productPage">

//           {/* Search Bar */}
//           <form onSubmit={(e) => e.preventDefault()} className="a1b1c1-searchBarForm">
//             <input
//               type="text"
//               placeholder="Search food here..!"
//               value={search}
//               onChange={handleSearchChange}
//               className="a1b1c1-searchInput"
//             />
//             <button type="submit" className="a1b1c1-searchButton">
//               <FaSearch className="a1b1c1-searchIcon" />
//             </button>
//           </form>

//           {/* Filter Bar */}
//           <div className="a1b1c1-filterBar">
//             <select onChange={(e) => handleCategoryChange(e.target.value)}>
//               <option value="All">All Categories</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Burger">Burger</option>
//               <option value="Drinks">Drinks</option>
//             </select>
//             <select
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value === "null") {
//                   handlePriceRangeChange(null);
//                 } else {
//                   try {
//                     const parsed = JSON.parse(value);
//                     handlePriceRangeChange(parsed);
//                   } catch (err) {
//                     console.error("Price range parsing error:", err);
//                     handlePriceRangeChange(null);
//                   }
//                 }
//               }}
//             >
//               <option value="null">All Prices</option>
//               <option value="[0, 100]">₹0 - ₹100</option>
//               <option value="[101, 500]">₹101 - ₹500</option>
//               <option value="[501, 1000]">₹501 - ₹1000</option>
//             </select>
//             <select onChange={(e) => handleSortChange(e.target.value)}>
//               <option value="none">Sort By</option>
//               <option value="name-asc">Name (A-Z)</option>
//               <option value="name-desc">Name (Z-A)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>

//           <div className="a1b1c1-productList">
//             <div className="a1b1c1-gridContainer">
//               {filteredProducts.map((product) => (
//                 <div key={product._id} className="a1b1c1-productCard">
//                   <img src={product.image} alt={product.name} className="a1b1c1-productImage" />
//                   <h3 className="a1b1c1-productTitle">{product.name}</h3>
//                   <p className="a1b1c1-productDescription">{product.description}</p>
//                   <p className="a1b1c1-price">₹{product.price}</p>
//                   <button className="a1b1c1-addToCart" onClick={() => handleAddToCart(product)}>
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext"; // Adjust path as needed
// import { useAuth } from "../contexts/AuthContext";   // Adjust path as needed
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ProductPage.css";

// export default function ProductPage() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("none");
//   const [priceRange, setPriceRange] = useState(null);
//   const [products, setProducts] = useState([]);
  
//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch products from the backend
//     fetch("/api/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);


//    const handleAddToCart = (product) => {
//       if (!user) {
//         toast.info("Please log in to add products to your cart.");
//         navigate("/login");
//         return;
//       }
//       addToCart({ ...product, quantity: 1 });
//       toast.success(`${product.name} successfully added to cart!`);
//     };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleCategoryChange = (selectedCategory) => {
//     setCategory(selectedCategory);
//   };

//   const handleSortChange = (sortOption) => {
//     setSortBy(sortOption);
//   };

//   const handlePriceRangeChange = (range) => {
//     setPriceRange(range);
//   };

//   const filteredProducts = products
//     .filter((p) =>
//       search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
//     )
//     .filter((p) => (category !== "All" ? p.category === category : true))
//     .filter((p) =>
//       priceRange ? p.price >= priceRange[0] && p.price <= priceRange[1] : true
//     )
//     .sort((a, b) => {
//       if (sortBy === "name-asc") return a.name.localeCompare(b.name);
//       if (sortBy === "name-desc") return b.name.localeCompare(a.name);
//       if (sortBy === "price-asc") return a.price - b.price;
//       if (sortBy === "price-desc") return b.price - a.price;
//       return 0;
//     });

//   return (
//     <div className="ordersContainer-tp">
//       <div className="homeContainer-tp">
//         <div className="productPage-tp">

//           {/* Search Bar */}
//           <form onSubmit={(e) => e.preventDefault()} className="searchBarForm-tp">
//             <input
//               type="text"
//               placeholder="Search food here..!"
//               value={search}
//               onChange={handleSearchChange}
//               className="searchInput-tp"
//             />
//             {/* <button type="submit" className="searchButton-tp">
//               <FaSearch className="searchIcon-tp" />
//             </button> */}
//           </form>

//           {/* Filter Bar */}
//           <div className="filterBar-tp">
//             <select onChange={(e) => handleCategoryChange(e.target.value)}>
//               <option value="All">All Categories</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Burger">Burger</option>
//               <option value="Drinks">Drinks</option>
//             </select>
//             <select
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value === "null") {
//                   handlePriceRangeChange(null);
//                 } else {
//                   try {
//                     const parsed = JSON.parse(value);
//                     handlePriceRangeChange(parsed);
//                   } catch (err) {
//                     console.error("Price range parsing error:", err);
//                     handlePriceRangeChange(null);
//                   }
//                 }
//               }}
//             >
//               <option value="null">All Prices</option>
//               <option value="[0, 100]">₹0 - ₹100</option>
//               <option value="[101, 500]">₹101 - ₹500</option>
//               <option value="[501, 1000]">₹501 - ₹1000</option>
//             </select>
//             <select onChange={(e) => handleSortChange(e.target.value)}>
//               <option value="none">Sort By</option>
//               <option value="name-asc">Name (A-Z)</option>
//               <option value="name-desc">Name (Z-A)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>

//           <div className="productList-tp">
//             <div className="gridContainer-tp">
//               {filteredProducts.map((product) => (
//                 <div key={product._id} className="productCard-tp">
//                   <img src={product.image} alt={product.name} className="productImage-tp" />
//                   <h3 className="productTitle-tp">{product.name}</h3>
//                   <p className="productDescription-tp">{product.description}</p>
//                   <p className="price-tp">₹{product.price}</p>
//                   <button className="addToCart-tp" onClick={() => handleAddToCart(product)}>
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Adjust path as needed
import { useAuth } from "../contexts/AuthContext";   // Adjust path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductPage.css";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [priceRange, setPriceRange] = useState(null);
  const [products, setProducts] = useState([]);
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.info("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} successfully added to cart!`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const filteredProducts = products
    .filter((p) =>
      search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((p) => (category !== "All" ? p.category === category : true))
    .filter((p) =>
      priceRange ? p.price >= priceRange[0] && p.price <= priceRange[1] : true
    )
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="ordersContainer-tp">
      <div className="homeContainer-tp">
        <div className="productPage-tp">
          {/* Search Bar */}
          <form onSubmit={(e) => e.preventDefault()} className="searchBarForm-tp">
            <input
              type="text"
              placeholder="Search food here..!"
              value={search}
              onChange={handleSearchChange}
              className="searchInput-tp"
            />
          </form>

          {/* Filter Bar */}
          <div className="filterBar-tp">
            <select onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Drinks">Drinks</option>
            </select>
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value === "null") {
                  handlePriceRangeChange(null);
                } else {
                  try {
                    const parsed = JSON.parse(value);
                    handlePriceRangeChange(parsed);
                  } catch (err) {
                    console.error("Price range parsing error:", err);
                    handlePriceRangeChange(null);
                  }
                }
              }}
            >
              <option value="null">All Prices</option>
              <option value="[0, 100]">₹0 - ₹100</option>
              <option value="[101, 500]">₹101 - ₹500</option>
              <option value="[501, 1000]">₹501 - ₹1000</option>
            </select>
            <select onChange={(e) => handleSortChange(e.target.value)}>
              <option value="none">Sort By</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>

          {/* Product List */}
          <div className="productList-tp">
            <div className="gridContainer-tp">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id} className="productCard-tp">
                    <img src={product.image} alt={product.name} className="productImage-tp" />
                    <h3 className="productTitle-tp">{product.name}</h3>
                    <p className="productDescription-tp">{product.description}</p>
                    <p className="price-tp">₹{product.price}</p>
                    <button className="addToCart-tp" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))
              ) : (
                <p className="noProductsMessage">No products available at the moment.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
