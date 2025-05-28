import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/bootcamp-react-next',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
