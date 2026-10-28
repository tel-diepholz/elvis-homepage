import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Zwei Seiten: Startseite und Statusseite (/status, Daten vom Relay)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html'), status: resolve(__dirname, 'status/index.html') },
    },
  },
});
