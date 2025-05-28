// src/utils/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      const userEmail = localStorage.getItem('userEmail');
      setUser({ email: userEmail });
    }
    setLoading(false);
  }, []);
  
  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userEmail', email);
      setUser({ email });
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);