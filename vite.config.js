import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works on Vercel, Docker and any sub path.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'three', test: /node_modules[\\/]three/ },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
  },
})
