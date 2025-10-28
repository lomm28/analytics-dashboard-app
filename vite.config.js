import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces (needed for Docker)
    port: 3000,
    open: true,
    watch: {
      usePolling: true // Enable polling for file changes in Docker
    }
    ,
    proxy: {
      // Proxy API requests during development to the FastAPI backend
      '/api': 'http://dashboard-backend-service:8000'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});

