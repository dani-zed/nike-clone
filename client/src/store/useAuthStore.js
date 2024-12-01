import { create } from 'zustand';
import { login, register } from '../lib/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  login: async (email, password) => {
    const { data } = await login(email, password);
    localStorage.setItem('token', data.token);
    set({ user: data.user, token: data.token });
  },
  register: async (email,password,firstName,lastName) => {
    const { data } = await register(email,password,firstName,lastName);
    localStorage.setItem('token', data.token);
    set({ user: data.user, token: data.token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));