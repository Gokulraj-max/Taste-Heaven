import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Pages/Navbar1';
import Footer from '../Pages/Footer';
import Food from '../Pages/ProductPage';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path as needed

const Foods = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Optionally, while loading show a spinner or similar
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Food />
      <Footer />
    </div>
  );
}

export default Foods;
