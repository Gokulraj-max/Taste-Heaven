// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim()) {
        try {
          const response = await axios.get(`/api/products?search=${query}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    // Debounce for better performance
    const debounceFetch = setTimeout(fetchData, 300);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${query}`);
  };

  return (
    <div className="search-bar-containeraaaaa">
      <form onSubmit={handleSubmit} className="search-bar-formaaa">
        <input
          type="text"
          placeholder="Search for restaurants and food"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <span role="img" aria-label="search">🔍</span>
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions-listaaa">
          {suggestions.map((item, index) => (
            <li 
              key={index}
              onClick={() => {
                setQuery(item.name);
                navigate(`/login/${item.id}`);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
