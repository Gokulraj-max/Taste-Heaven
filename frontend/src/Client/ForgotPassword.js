
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';
import './SignInSignUp.css';
import Taste from '../assets/images/TasteH.png';

const SignInSignUp = () => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  const onSignInChange = (e) => setSignInData({ ...signInData, [e.target.name]: e.target.value });
  const onSignUpChange = (e) => setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

  const togglePage = () => {
    setIsSignIn((prev) => !prev);
    setSignInData({ email: '', password: '' });
    setSignUpData({ name: '', email: '', password: '' });
  };

  const isValidName = (name) => name.trim().length > 0;
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidName(signUpData.name)) {
      toast.error("Username is required", { autoClose: 2000 });
      return;
    }
    if (!isValidEmail(signUpData.email)) {
      toast.error("Invalid email address", { autoClose: 2000 });
      return;
    }
    if (!isValidPassword(signUpData.password)) {
      toast.error("Password must be at least 6 characters", { autoClose: 2000 });
      return;
    }

    try {
      const result = await register(signUpData.name, signUpData.email, signUpData.password);
      console.log('Register API Response:', result);

      if (result.success) {
        toast.success('Registration successful!', { autoClose: 2000 });
      } else {
        toast.error(result.message || "Registration failed!", { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Something went wrong. Please try again.", { autoClose: 2000 });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail(signInData.email)) {
      toast.error("Invalid email address", { autoClose: 2000 });
      return;
    }
    if (!isValidPassword(signInData.password)) {
      toast.error("Password must be at least 6 characters", { autoClose: 2000 });
      return;
    }

    try {
      const result = await login(signInData.email, signInData.password);
      console.log('Login API Response:', result);

      if (result.success) {
        toast.success('Login successful!', { autoClose: 2000 });
      } else {
        toast.error(result.message || "Login failed!", { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Something went wrong. Please try again.", { autoClose: 2000 });
    }
  };

  return (
    <>
      <center>
        <div className="regist-LoginAndRegister">
          <div className="regist-split-screen">
            <div className="regist-left-side">
              <div className="regist-logo-container">
                <img src={Taste} alt="TasteHeaven Logo" className="regist-logo-image" />
              </div>
              <div className="regist-animation">
                <h2>Welcome to TasteHeaven</h2>
              </div>
            </div>

            <div className="regist-right-side">
              <div className="regist-container">
                <div className="regist-form-container">
                  {isSignIn ? (
                    <div className="regist-signin">
                      <form onSubmit={handleLogin} className="regist-form-sign-in">
                        <h1>Sign In</h1>
                        <input
                          type="email"
                          name="email"
                          value={signInData.email}
                          placeholder="Email"
                          onChange={onSignInChange}
                        />
                        <input
                          type="password"
                          name="password"
                          value={signInData.password}
                          placeholder="Password"
                          onChange={onSignInChange}
                        />
                        <button type="submit" className="regist-btn btn-form">SIGN IN</button>
                        <button type="button" className="regist-forgot-password" onClick={() => navigate('/forgot-password')}>
                          Forgot your password?
                        </button>
                      </form>
                      <button type="button" className="regist-btn btn-toggle" onClick={togglePage}>
                        Don't have an account? Sign Up
                      </button>
                    </div>
                  ) : (
                    <div className="signup">
                      <form onSubmit={handleRegister} className="regist-form-sign-up">
                        <h1>Sign Up</h1>
                        <input
                          type="text"
                          name="name"
                          value={signUpData.name}
                          placeholder="Username"
                          onChange={onSignUpChange}
                        />
                        <input
                          type="email"
                          name="email"
                          value={signUpData.email}
                          placeholder="Email"
                          onChange={onSignUpChange}
                        />
                        <input
                          type="password"
                          name="password"
                          value={signUpData.password}
                          placeholder="Password"
                          onChange={onSignUpChange}
                        />
                        <button type="submit" className="regist-btn btn-form">SIGN UP</button>
                        <button type="button" className="regist-btn btn-toggle" onClick={togglePage}>
                          Already have an account? Sign In
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </center>
    </>
  );
};

export default SignInSignUp;