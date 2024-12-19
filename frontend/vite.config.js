import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/

console.log('Vite Env - ALGOLIA_APP_ID:', process.env.VITE_ALGOLIA_APP_ID);
console.log('Vite Env - ALGOLIA_SEARCH_API_KEY:', process.env.VITE_ALGOLIA_SEARCH_API_KEY);

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    },
    open: true
  }
}));
