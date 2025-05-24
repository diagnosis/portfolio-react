import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import TanStackRouterVite from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({
    target: 'react',
    autoCodeSplitting: true,
  }), react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Allows access from network
    port: 5173,
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  }
})