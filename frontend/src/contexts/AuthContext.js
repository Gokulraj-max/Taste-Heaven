import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (err) {
          console.error("🚨 Error parsing user data:", err);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } else {
        if (location.pathname !== "/login" && location.pathname !== "/register") {
          navigate("/login");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate, location.pathname]);

  // useEffect(() => {
  //   if (loading || !user) return;

  //   const fetchOrders = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) throw new Error("Token missing. Please log in again.");

  //       const { data } = await axios.get(`${API_URL}/api/orders`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       console.log("✅ Orders fetched:", data);
  //       setOrders(data);
  //     } catch (err) {
  //       console.error("🚨 Orders Fetch Error:", err.response?.data || err.message);
  //       setError(err.response?.data?.message || "Failed to load orders.");
  //     }
  //   };

  //   fetchOrders();
  // }, [loading, user]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      if (!data.token) {
        console.error("🚨 No token received from backend");
        return { success: false, message: "Authentication failed" };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);

      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/products");//"/services");
      return { success: true };
    } catch (err) {
      console.error("🚨 Login error:", err.response?.data || err);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });

      if (!data.success) return { success: false, message: "Registration failed" };

      // Automatically log in the user after successful registration
      const loginResponse = await login(email, password);

      if (loginResponse.success) {
        return { success: true, message: "Registration and login successful!" };
      } else {
        return { success: false, message: "Registration successful, but login failed. Please log in manually." };
      }
    } catch (err) {
      console.error("🚨 Registration error:", err);
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, orders, setUser, error, login, register, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};   


export const useAuth = () => useContext(AuthContext);
// #####################################################

// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const API_URL = "http://localhost:5000";

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       const storedUser = localStorage.getItem("user");

//       if (token && storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         } catch (err) {
//           console.error("🚨 Error parsing user data:", err);
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//         }
//       } else {
//         if (location.pathname !== "/login" && location.pathname !== "/register") {
//           navigate("/login");
//         }
//       }

//       setLoading(false);
//     };

//     checkAuth();
//   }, [navigate, location.pathname]);

//   useEffect(() => {
//     if (loading || !user) return;

//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Token missing. Please log in again.");

//         const { data } = await axios.get(`${API_URL}/api/orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("✅ Orders fetched:", data);
//         setOrders(data);
//       } catch (err) {
//         console.error("🚨 Orders Fetch Error:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Failed to load orders.");
//       }
//     };

//     fetchOrders();
//   }, [loading, user]);

//   // const login = async (email, password) => {
//   //   try {
//   //     const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });

//   //     if (!data.token) {
//   //       console.error("🚨 No token received from backend");
//   //       return { success: false, message: "Authentication failed" };
//   //     }

//   //     localStorage.setItem("token", data.token);
//   //     localStorage.setItem("user", JSON.stringify(data.user));
//   //     axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
//   //     setUser(data.user);

//   //     navigate(data.user.role === "admin" ? "/admin/dashboard" : "/services");
//   //     return { success: true };
//   //   } catch (err) {
//   //     console.error("🚨 Login error:", err.response?.data || err);
//   //     return { success: false, message: err.response?.data?.message || "Login failed" };
//   //   }
//   // };
// const login = async (email, password) => {
//   try {
//     console.log("Attempting to log in with email:", email);

//     const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });

//     if (!data.token) {
//       console.error("🚨 No token received from backend");
//       return { success: false, message: "Authentication failed" };
//     }

//     console.log("Login successful, user data:", data.user);

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
//     setUser(data.user);

//     // Redirect based on user role
//     if (data.user.role === "admin") {
//       console.log("Redirecting to /admin/dashboard");
//       navigate("/admin/dashboard");
//     } else {
//       console.log("Redirecting to /services");
//       navigate("/services");
//     }

//     return { success: true };
//   } catch (err) {
//     console.error("🚨 Login error:", err.response?.data || err);
//     return { success: false, message: err.response?.data?.message || "Login failed" };
//   }
// };
//   const register = async (name, email, password) => {
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });

//       if (!data.success) return { success: false, message: "Registration failed" };

//       const loginResponse = await login(email, password);

//       if (loginResponse.success) {
//         return { success: true, message: "Registration and login successful!" };
//       } else {
//         return { success: false, message: "Registration successful, but login failed. Please log in manually." };
//       }
//     } catch (err) {
//       console.error("🚨 Registration error:", err);
//       return { success: false, message: err.response?.data?.message || "Registration failed" };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, orders, setUser, error, login, register, logout, isAuthenticated: !!user, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
//######################################################################################################################

// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const API_URL = "http://localhost:5000";

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       const storedUser = localStorage.getItem("user");

//       if (token && storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         } catch (err) {
//           console.error("🚨 Error parsing user data:", err);
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//         }
//       } else {
//         if (location.pathname !== "/login" && location.pathname !== "/register") {
//           navigate("/login");
//         }
//       }

//       setLoading(false);
//     };

//     checkAuth();
//   }, [navigate, location.pathname]);

//   useEffect(() => {
//     if (loading || !user) return;

//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Token missing. Please log in again.");

//         const { data } = await axios.get(`${API_URL}/api/orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("✅ Orders fetched:", data);
//         setOrders(data);
//       } catch (err) {
//         console.error("🚨 Orders Fetch Error:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Failed to load orders.");
//       }
//     };

//     fetchOrders();
//   }, [loading, user]);

//   const login = async (email, password) => {
//     try {
//       console.log("Attempting to log in with email:", email);

//       const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });

//       if (!data.token) {
//         console.error("🚨 No token received from backend");
//         return { success: false, message: "Authentication failed" };
//       }

//       console.log("Login successful, user data:", data.user);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
//       setUser(data.user);

//       // Redirect based on user role
//       if (data.user.role === "admin") {
//         console.log("Redirecting to /admin/dashboard");
//         navigate("/admin/dashboard");
//       } else {
//         console.log("Redirecting to /services");
//         navigate("/services");
//       }

//       return { success: true };
//     } catch (err) {
//       console.error("🚨 Login error:", err.response?.data || err);
//       return { success: false, message: err.response?.data?.message || "Login failed" };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });

//       if (!data.success) return { success: false, message: "Registration failed" };

//       const loginResponse = await login(email, password);

//       if (loginResponse.success) {
//         return { success: true, message: "Registration and login successful!" };
//       } else {
//         return { success: false, message: "Registration successful, but login failed. Please log in manually." };
//       }
//     } catch (err) {
//       console.error("🚨 Registration error:", err);
//       return { success: false, message: err.response?.data?.message || "Registration failed" };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, orders, setUser, error, login, register, logout, isAuthenticated: !!user, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


//#######################################################################################################################
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const API_URL = "http://localhost:5000";

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       const storedUser = localStorage.getItem("user");

//       if (token && storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         } catch (err) {
//           console.error("🚨 Error parsing user data:", err);
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//         }
//       } else {
//         if (location.pathname !== "/login" && location.pathname !== "/register") {
//           navigate("/login");
//         }
//       }

//       setLoading(false);
//     };

//     checkAuth();
//   }, [navigate, location.pathname]);

//   useEffect(() => {
//     if (loading || !user) return;

//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Token missing. Please log in again.");

//         const { data } = await axios.get(`${API_URL}/api/orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("✅ Orders fetched:", data);
//         setOrders(data);
//       } catch (err) {
//         console.error("🚨 Orders Fetch Error:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Failed to load orders.");
//       }
//     };

//     fetchOrders();
//   }, [loading, user]);

//   const login = async (email, password) => {
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });

//       if (!data.token) {
//         console.error("🚨 No token received from backend");
//         return { success: false, message: "Authentication failed" };
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
//       setUser(data.user);

//       // Redirect based on user role
//       if (data.user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/services");
//       }

//       return { success: true };
//     } catch (err) {
//       console.error("🚨 Login error:", err.response?.data || err);
//       return { success: false, message: err.response?.data?.message || "Login failed" };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });

//       if (!data.success) return { success: false, message: "Registration failed" };

//       // Automatically log in the user after successful registration
//       const loginResponse = await login(email, password);

//       if (loginResponse.success) {
//         return { success: true, message: "Registration and login successful!" };
//       } else {
//         return { success: false, message: "Registration successful, but login failed. Please log in manually." };
//       }
//     } catch (err) {
//       console.error("🚨 Registration error:", err);
//       return { success: false, message: err.response?.data?.message || "Registration failed" };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, orders, setUser, error, login, register, logout, isAuthenticated: !!user, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };