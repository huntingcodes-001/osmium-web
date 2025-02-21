import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {  // Add this server configuration
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Or your server's port
        changeOrigin: true,
      },
    },
  },
});