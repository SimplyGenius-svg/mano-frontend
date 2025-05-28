// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const login = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  
  const response = await api.post('/token', formData);
  return response.data;
};

// Query the database
export const queryDatabase = async (query) => {
  const response = await api.post('/api/query', { query });
  return response.data;
};

// Get dashboard metrics
export const getDashboardMetrics = async () => {
  const response = await api.get('/api/dashboard/metrics');
  return response.data;
};

export default api;