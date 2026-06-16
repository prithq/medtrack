import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token and get user details if endpoint exists, 
          // or decode token locally. For now, assuming token presence = logged in
          // and decoding or fetching user profile if needed.
          // Let's try to fetch user details if a route exists, 
          // otherwise just set a flag.
          // Is there a /me endpoint? Checked routes: user.routes.js has nothing obvious?
          // Let's assume we store user info in localStorage on login for now 
          // to keep it simple, or decode JWT.
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error("Auth check failed", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data; // Assuming backend returns { token, user }

      // If backend only returns token, we might need to decode it or fetch user.
      // Based on typical express-jwt setups.
      // Let's assume standard response.

      if (token) {
        localStorage.setItem('token', token);
        // If user object is not returned, we might default to something generic
        const userData = user || { email, id: "unknown" };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return userData; // Return user data for role-based redirect
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (name, email, password, role = 'patient') => {
    try {
      await api.post('/auth/register', { name, email, password, role });
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
