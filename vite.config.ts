import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
