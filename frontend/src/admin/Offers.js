import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import "./Offers.css";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    originalPrice: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const slideIn = useSpring({
    transform: showForm ? "translateX(0%)" : "translateX(-100%)",
    opacity: showForm ? 1 : 0,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/offers")
      .then((response) => setOffers(response.data))
      .catch((err) => console.error("Error fetching offers:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:5000/api/offers/${editingOffer._id}`, formData)
        .then((response) => {
          setOffers((prevOffers) =>
            prevOffers.map((offer) =>
              offer._id === editingOffer._id ? response.data : offer
            )
          );
          setIsEditing(false);
          setEditingOffer(null);
          setFormData({ name: "", description: "", image: "", price: "", originalPrice: "" });
          setShowForm(false);
        })
        .catch((err) => console.error("Error updating offer:", err));
    } else {
      axios.post("http://localhost:5000/api/offers", formData)
        .then((response) => {
          setOffers([...offers, response.data]);
          setFormData({ name: "", description: "", image: "", price: "", originalPrice: "" });
          setShowForm(false);

          // Send Email notification
          axios.post("http://localhost:5000/api/send-email", {
            email: "user_email@example.com", // Replace with actual user email
            offerName: formData.name,
          })
          .then(() => console.log("Email sent successfully"))
          .catch((err) => console.error("Error sending email:", err));
        })
        .catch((err) => console.error("Error adding offer:", err));
    }
  };

  const handleEdit = (offer) => {
    setFormData({
      name: offer.name,
      description: offer.description,
      image: offer.image,
      price: offer.price,
      originalPrice: offer.originalPrice,
    });
    setIsEditing(true);
    setEditingOffer(offer);
    setShowForm(true);
  };

  const handleDelete = (offerId) => {
    axios.delete(`http://localhost:5000/api/offers/${offerId}`)
      .then(() => {
        setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== offerId));
      })
      .catch((err) => console.error("Error deleting offer:", err));
  };

  const toggleForm = () => {
    setIsEditing(false);
    setEditingOffer(null);
    setFormData({ name: "", description: "", image: "", price: "", originalPrice: "" });
    setShowForm(!showForm);
  };

  return (
    <div className="offers-container">
      <h2>Manage Offers</h2>
      <button className="btn btn-primary" onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add New Offer"}
      </button>

      {showForm && (
        <animated.div style={slideIn} className="offer-form">
          <h3>{isEditing ? "Edit Offer" : "Add New Offer"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input 
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input 
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Original Price</label>
              <input 
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required 
              />
            </div>
            <button type="submit" className="btn btn-success">
              {isEditing ? "Update Offer" : "Add Offer"}
            </button>
          </form>
        </animated.div>
      )}

      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer._id} className="offer-item">
            <img src={offer.image} alt={offer.name} />
            <div>
              <h4>{offer.name}</h4>
              <p>{offer.description}</p>
              <p>
                <strong>${offer.price}</strong>
                <span className="original-price">${offer.originalPrice}</span>
              </p>
              <button className="btn btn-warning" onClick={() => handleEdit(offer)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(offer._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;