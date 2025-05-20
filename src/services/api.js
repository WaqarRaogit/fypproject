import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const API_URL = 'https://minifyurl.runasp.net/api';
// export const API_URL = 'https://localhost:44320/api';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let refreshTimeout;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method.toUpperCase(), config.url, 'Token:', token);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    scheduleTokenRefresh();
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log('401 Unauthorized, attempting to refresh token');
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${API_URL}/user/refresh`, {}, { withCredentials: true });
        if (response.data.success) {
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          console.log('Token refreshed, retrying request');
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Instead of calling useAuthStore directly, redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const scheduleTokenRefresh = () => {
  clearTimeout(refreshTimeout);
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const payload = jwtDecode(token);
      const expiry = new Date(payload.exp * 1000);
      const now = new Date();
      const timeToRefresh = expiry - now - 2 * 60 * 1000; // Refresh 2 minutes before expiry

      if (timeToRefresh > 0) {
        refreshTimeout = setTimeout(async () => {
          console.log('Attempting proactive token refresh');
          try {
            const response = await api.post('/user/refresh', {}, { withCredentials: true });
            if (response.data.success) {
              localStorage.setItem('accessToken', response.data.data.accessToken);
              console.log('Token refreshed proactively');
            } else {
              throw new Error('Token refresh failed');
            }
          } catch (error) {
            console.error('Proactive token refresh failed:', error);
            // Instead of calling useAuthStore directly, redirect to login
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
          }
        }, timeToRefresh);
      } else {
        console.log('Token expired, redirecting to login');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
  }
};


export default api;