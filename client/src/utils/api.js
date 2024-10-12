import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const addFunds = (amount) => api.post('/user/add-funds', { amount });
export const openChest = (chestType) => api.post('/chests/open', { chestType });
export const createPayment = (amount) => api.post('/payments/create', { amount });

export default api;
