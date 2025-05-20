import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { Agent } from 'https';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:44320',
        changeOrigin: true,
        secure: false,
        agent: new Agent({
          rejectUnauthorized: false,
        }),
      },
      // Proxy short URLs (alphanumeric paths)
      '^/[a-zA-Z0-9]+$': {
        target: 'https://localhost:44320',
        changeOrigin: true,
        rewrite: (path) => `/api/urlshortener/redirect${path}`,
        secure: false,
        agent: new Agent({
          rejectUnauthorized: false,
        }),
      },
    },
  },
});