// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Products.css"; // Create and style as needed

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     oldPrice: "",
//     discount: "",
//     image: "",
//     category: "",
//     description: ""
//   });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   // Fetch products on mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     axios.get("/api/products")
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingProduct) {
//       // Update product
//       axios.put(`/api/products/${editingProduct._id}`, formData)
//         .then((res) => {
//           setMessage("Product updated successfully!");
//           setEditingProduct(null);
//           setFormData({
//             name: "",
//             price: "",
//             oldPrice: "",
//             discount: "",
//             image: "",
//             category: "",
//             description: ""
//           });
//           fetchProducts();
//         })
//         .catch((err) => {
//           console.error("Error updating product:", err);
//           setMessage("Error updating product");
//         });
//     } else {
//       // Add new product
//       axios.post("/api/products", formData)
//         .then((res) => {
//           setMessage("Product added successfully!");
//           setFormData({
//             name: "",
//             price: "",
//             oldPrice: "",
//             discount: "",
//             image: "",
//             category: "",
//             description: ""
//           });
//           fetchProducts();
//         })
//         .catch((err) => {
//           console.error("Error adding product:", err);
//           setMessage("Error adding product");
//         });
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       price: product.price,
//       oldPrice: product.oldPrice || "",
//       discount: product.discount || "",
//       image: product.image,
//       category: product.category,
//       description: product.description
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="products-page">
//       <h2>Products Management</h2>
//       {message && <p className="message">{message}</p>}
      
//       <form className="product-form" onSubmit={handleSubmit}>
//         <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
//         <div className="form-group">
//           <label>Name:</label>
//           <input 
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Price:</label>
//           <input 
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleInputChange}
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Old Price:</label>
//           <input 
//             type="number"
//             name="oldPrice"
//             value={formData.oldPrice}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Discount:</label>
//           <input 
//             type="text"
//             name="discount"
//             value={formData.discount}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Image URL:</label>
//           <input 
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleInputChange}
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Category:</label>
//           <input 
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Description:</label>
//           <textarea 
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             required 
//           />
//         </div>
//         <button type="submit">
//           {editingProduct ? "Update Product" : "Add Product"}
//         </button>
//       </form>

//       <hr />

//       {loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <div className="products-list">
//           <h3>Existing Products</h3>
//           <table className="products-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Old Price</th>
//                 <th>Discount</th>
//                 <th>Category</th>
//                 <th>Description</th>
//                 <th>Image</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(prod => (
//                 <tr key={prod._id}>
//                   <td>{prod.name}</td>
//                   <td>${prod.price}</td>
//                   <td>{prod.oldPrice ? `$${prod.oldPrice}` : "N/A"}</td>
//                   <td>{prod.discount || "N/A"}</td>
//                   <td>{prod.category}</td>
//                   <td>{prod.description}</td>
//                   <td>
//                     <img src={prod.image} alt={prod.name} width="50" height="50" />
//                   </td>
//                   <td>
//                     <button onClick={() => handleEdit(prod)}>Edit</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css"; // Create and style as needed

function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    discount: "",
    image: "",
    category: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      // Update product
      axios.put(`/api/products/${editingProduct._id}`, formData)
        .then((res) => {
          setMessage("Product updated successfully!");
          setEditingProduct(null);
          setFormData({
            name: "",
            price: "",
            oldPrice: "",
            discount: "",
            image: "",
            category: "",
            description: ""
          });
          fetchProducts();
        })
        .catch((err) => {
          console.error("Error updating product:", err);
          setMessage("Error updating product");
        });
    } else {
      // Add new product
      axios.post("/api/products", formData)
        .then((res) => {
          setMessage("Product added successfully!");
          setFormData({
            name: "",
            price: "",
            oldPrice: "",
            discount: "",
            image: "",
            category: "",
            description: ""
          });
          fetchProducts();
        })
        .catch((err) => {
          console.error("Error adding product:", err);
          setMessage("Error adding product");
        });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice || "",
      discount: product.discount || "",
      image: product.image,
      category: product.category,
      description: product.description
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`/api/products/${productId}`)
        .then((res) => {
          setMessage("Product deleted successfully!");
          fetchProducts(); // Refresh the product list
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          setMessage("Error deleting product");
        });
    }
  };

  return (
    <div className="products-page">
      <h2>Products Management</h2>
      {message && <p className="message">{message}</p>}
      
      <form className="product-form" onSubmit={handleSubmit}>
        <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input 
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Old Price:</label>
          <input 
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Discount:</label>
          <input 
            type="text"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input 
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input 
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required 
          />
        </div>
        <button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      <hr />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-list">
          <h3>Existing Products</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Old Price</th>
                <th>Discount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>${prod.price}</td>
                  <td>{prod.oldPrice ? `$${prod.oldPrice}` : "N/A"}</td>
                  <td>{prod.discount || "N/A"}</td>
                  <td>{prod.category}</td>
                  <td>{prod.description}</td>
                  <td>
                    <img src={prod.image} alt={prod.name} width="50" height="50" />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(prod)}>Edit</button>
                    <button onClick={() => handleDelete(prod._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Products;