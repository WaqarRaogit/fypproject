import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/user/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/user/login', credentials);
    return response.data;
  },

  googleLogin: async (googleData) => {
    const response = await api.post('/user/google-login', googleData);
    console.log('Google login response:', response);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/user/logout');
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await api.post('/user/refresh');
    return response.data;
  }
};