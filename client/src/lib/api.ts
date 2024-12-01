import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => api.post('/auth/register', userData);

export const getProducts = (params?: { category?: string; search?: string }) =>
  api.get('/products', { params });

export const getProduct = (id: string) => api.get(`/products/${id}`);

export const updateCart = (cart: any[]) => api.put('/auth/cart', { cart });

export const createOrder = (orderData: {
  items: any[];
  shippingAddress: any;
  totalAmount: number;
}) => api.post('/orders/create', orderData);

export const verifyPayment = (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => api.post('/orders/verify', paymentData);

export const getMyOrders = () => api.get('/orders/my-orders');

export default api;