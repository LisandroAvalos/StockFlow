import axios from 'axios';
import { AUTH_ENDPOINTS } from './endpoints';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url === AUTH_ENDPOINTS.LOGIN;

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosClient;