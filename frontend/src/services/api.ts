import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const user = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (data: { name: string; schoolId?: string }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
};

export const transactions = {
  create: async (data: { wasteTypeId: string; weight: number }) => {
    const response = await api.post('/transactions', data);
    return response.data;
  },
  getMyTransactions: async () => {
    const response = await api.get('/transactions/my');
    return response.data;
  },
  verify: async (id: string) => {
    const response = await api.post(`/transactions/${id}/verify`);
    return response.data;
  },
};

export const waste = {
  getTypes: async () => {
    const response = await api.get('/waste/types');
    return response.data;
  },
};

export const education = {
  getModules: async () => {
    const response = await api.get('/education/modules');
    return response.data;
  },
  getModule: async (id: string) => {
    const response = await api.get(`/education/modules/${id}`);
    return response.data;
  },
};

export default api;
