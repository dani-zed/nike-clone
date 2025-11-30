import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5011',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const register = (email,password,firstName,lastName) => 
  api.post('/api/auth/register', {email,password,firstName,lastName});

export const getProducts = (params) =>
  api.get('/api/products', { params });

export const getProduct = (id) => 
  api.get(`/api/products/${id}`);

export const updateCart = (cart) => 
  api.put('/api/auth/cart', { cart });

export const createOrder = (orderData) => 
  api.post('/orders/create', orderData);

export const verifyPayment = (paymentData) => 
  api.post('/orders/verify', paymentData);

export const getMyOrders = () => 
  api.get('/orders/my-orders');

export default api;