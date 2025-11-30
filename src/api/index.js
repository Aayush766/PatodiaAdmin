// src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
});

// Products
export const getProducts = () => API.get('/products');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) =>
  API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Messages
export const getMessages = () => API.get('/contact');
export const deleteMessage = (id) => API.delete(`/contact/${id}`);

// Auth
export const loginUser = (credentials) => API.post('/auth/login', credentials);

// First-time admin setup
export const initialSetup = (data) => API.post('/auth/initial-setup', data);

// Forgot password via EMAIL (send OTP)
export const forgotPassword = (payload) =>
  API.post('/auth/forgot-password', payload);

// Verify OTP
export const verifyResetOtp = (payload) =>
  API.post('/auth/verify-reset-otp', payload);

// Reset password after OTP verified
export const resetPasswordWithOtp = (payload) =>
  API.post('/auth/reset-password', payload);

// ✅ NEW: set initial password for logged-in user (first login)
export const setPassword = (payload) =>
  API.post('/users/set-password', payload);  // this hits backend user route

export default API;
