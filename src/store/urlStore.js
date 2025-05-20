import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './authStore';
import { urlService } from '../services/urlService';

const FRONTEND_BASE_URL = 'https://minifyuri.netlify.app';
// const FRONTEND_BASE_URL = 'http://localhost:5173';

const useUrlStore = create(
  persist(
    (set, get) => ({
      userLinks: [],
      currentLink: null,
      analytics: null,
      isLoading: false,
      error: null,
      
      createShortUrl: async (urlData) => {
        set({ isLoading: true, error: null });
        try {
          const requestBody = {
            OriginalUrl: urlData.originalUrl,
            CustomCode: urlData.customCode || undefined,
            ExpiresAt: urlData.expiresAt ? new Date(urlData.expiresAt).toISOString() : undefined,
            ActiveTimeZone: urlData.activeTimeZone || undefined,
            ActiveStartHour: urlData.activeStartHour || undefined,
            ActiveEndHour: urlData.activeEndHour || undefined,
            Encrypt: false
          };

          const data = await urlService.createShortUrl(requestBody);

          const shortUrl = data.shortUrl || data.ShortUrl || data.short_url;
          if (!shortUrl) {
            throw new Error('Invalid response format: shortUrl is missing. Response: ' + JSON.stringify(data));
          }

          const newLink = {
            ...data,
            shortCode: shortUrl.split('/').pop(),
            displayShortUrl: `${FRONTEND_BASE_URL}/${shortUrl.split('/').pop()}`,
          };

          set(state => ({ 
            userLinks: [newLink, ...state.userLinks],
            currentLink: newLink,
            isLoading: false
          }));
          return newLink;
        } catch (error) {
          console.error('Error in createShortUrl:', error);
          set({ 
            error: error.message || 'Failed to create short URL. Please try again.',
            isLoading: false 
          });
          throw error;
        }
      },
      
      getUserLinks: async () => {
        set({ isLoading: true, error: null });
        try {
          const links = await urlService.getUserLinks();

          const updatedLinks = links.map(link => {
            const shortUrl = link.shortUrl || link.ShortUrl || link.short_url;
            return {
              ...link,
              shortCode: shortUrl ? shortUrl.split('/').pop() : '',
              displayShortUrl: shortUrl ? `${FRONTEND_BASE_URL}/${shortUrl.split('/').pop()}` : '',
            };
          });

          set({ userLinks: updatedLinks, isLoading: false });
          return updatedLinks;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to fetch links', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      getAnalytics: async (shortCode) => {
        set({ isLoading: true, error: null });
        try {
          const analytics = await urlService.getAnalytics(shortCode);
          console.log('Analytics data:', analytics);
          set({ analytics, isLoading: false });
          return analytics;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to fetch analytics', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      getOriginalUrl: async (shortCode) => {
        set({ isLoading: true, error: null });
        try {
          const originalUrl = await urlService.getOriginalUrl(shortCode);
          set({ isLoading: false });
          return originalUrl; // Directly return the string
        } catch (error) {
          console.error('Error fetching original URL:', error);
          set({ error: error.message || 'Failed to fetch original URL', isLoading: false });
          throw error;
        }
      },
      
      clearCurrentLink: () => {
        set({ currentLink: null });
      }
    }),
    {
      name: 'url-storage',
      partialize: (state) => ({ userLinks: state.userLinks }),
    }
  )
);

export default useUrlStore;


// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import useAuthStore from './authStore';
// import { urlService } from '../services/urlService';

// const FRONTEND_BASE_URL = 'https://minifyuri.netlify.app';
// // const FRONTEND_BASE_URL = 'http://localhost:5173';
// const useUrlStore = create(
//   persist(
//     (set, get) => ({
//       userLinks: [],
//       currentLink: null,
//       analytics: null,
//       isLoading: false,
//       error: null,
      
//       createShortUrl: async (urlData) => {
//         set({ isLoading: true, error: null });
//         try {
//           const requestBody = {
//             OriginalUrl: urlData.originalUrl,
//             CustomCode: urlData.customCode || undefined,
//             ExpiresAt: urlData.expiresAt ? new Date(urlData.expiresAt).toISOString() : undefined,
//             ActiveTimeZone: urlData.activeTimeZone || undefined,
//             ActiveStartHour: urlData.activeStartHour || undefined,
//             ActiveEndHour: urlData.activeEndHour || undefined,
//             Encrypt: false
//           };

//           const data = await urlService.createShortUrl(requestBody);

//           const shortUrl = data.shortUrl || data.ShortUrl || data.short_url;
//           if (!shortUrl) {
//             throw new Error('Invalid response format: shortUrl is missing. Response: ' + JSON.stringify(data));
//           }

//           const newLink = {
//             ...data,
//             shortCode: shortUrl.split('/').pop(),
//             displayShortUrl: `${FRONTEND_BASE_URL}/${shortUrl.split('/').pop()}`,
//           };

//           set(state => ({ 
//             userLinks: [newLink, ...state.userLinks],
//             currentLink: newLink,
//             isLoading: false
//           }));
//           return newLink;
//         } catch (error) {
//           console.error('Error in createShortUrl:', error);
//           set({ 
//             error: error.message || 'Failed to create short URL. Please try again.',
//             isLoading: false 
//           });
//           throw error;
//         }
//       },
      
//       getUserLinks: async () => {
//         set({ isLoading: true, error: null });
//         try {
//           const links = await urlService.getUserLinks();

//           const updatedLinks = links.map(link => {
//             const shortUrl = link.shortUrl || link.ShortUrl || link.short_url;
//             return {
//               ...link,
//               shortCode: shortUrl ? shortUrl.split('/').pop() : '',
//               displayShortUrl: shortUrl ? `${FRONTEND_BASE_URL}/${shortUrl.split('/').pop()}` : '',
//             };
//           });

//           set({ userLinks: updatedLinks, isLoading: false });
//           return updatedLinks;
//         } catch (error) {
//           set({ 
//             error: error.message || 'Failed to fetch links', 
//             isLoading: false 
//           });
//           throw error;
//         }
//       },
      
//       getAnalytics: async (shortCode) => {
//         set({ isLoading: true, error: null });
//         try {
//           const analytics = await urlService.getAnalytics(shortCode);
//           console.log('Analytics data:', analytics);
//           set({ analytics, isLoading: false });
//           return analytics;
//         } catch (error) {
//           set({ 
//             error: error.message || 'Failed to fetch analytics', 
//             isLoading: false 
//           });
//           throw error;
//         }
//       },
      
//       getOriginalUrl: async (shortCode) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await urlService.getOriginalUrl(shortCode); // New endpoint or method in urlService
//           const originalUrl = response.originalUrl || response.OriginalUrl;
//           if (!originalUrl) {
//             throw new Error('Original URL not found');
//           }
//           set({ isLoading: false });
//           return originalUrl;
//         } catch (error) {
//           console.error('Error fetching original URL:', error);
//           set({ error: error.message || 'Failed to fetch original URL', isLoading: false });
//           throw error;
//         }
//       },
      
//       clearCurrentLink: () => {
//         set({ currentLink: null });
//       }
//     }),
//     {
//       name: 'url-storage',
//       partialize: (state) => ({ userLinks: state.userLinks }),
//     }
//   )
// );

// export default useUrlStore;