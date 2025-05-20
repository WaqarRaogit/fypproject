import api from "./api";
export const urlService = {
  createShortUrl: async (urlData) => {
      const response = await api.post('/urlshortener/shorten', urlData);
      console.log('Create Short URL response:', response);
      return response.data;
  },
  
  getUserLinks: async () => {
      const response = await api.get('/urlshortener/user-links');
      console.log('Get User Links response:', response.data);
      return response.data;
  },
  
  getAnalytics: async (shortCode) => {
      const response = await api.get(`/urlshortener/analytics/${shortCode}`);
      console.log('Get Analytics response:', response.data);
      return response.data;
  },
  
  getOriginalUrl: async (shortCode) => {
      try {
          const response = await api.get(`/urlshortener/original/${shortCode}`);
          console.log('Get Original URL response:', response.data);
          if (response.data.success && response.data.originalUrl) {
              return response.data.originalUrl;
          }
          throw new Error('Original URL not found');
      } catch (error) {
          console.error('Error fetching original URL, falling back to redirect:', error);
          const redirectResponse = await api.get(`/urlshortener/redirect/${shortCode}`, { 
              validateStatus: () => true // Allow 302 redirects
          });
          if (redirectResponse.status === 302 && redirectResponse.headers.location) {
              return redirectResponse.headers.location;
          }
          throw error;
      }
  }
};