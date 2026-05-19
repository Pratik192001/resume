import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Required for SharedArrayBuffer (used by the 1 kHz scheduler worker).
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  worker: { format: 'es' },
});
