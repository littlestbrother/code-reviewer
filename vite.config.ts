import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'

// When BINARY_BUILD=1, inline the entire client into a single index.html and
// emit it to dist-binary/ so it can be embedded into the standalone binary.
const isBinary = process.env.BINARY_BUILD === '1'

export default defineConfig({
  plugins: [react(), ...(isBinary ? [viteSingleFile()] : [])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: isBinary ? 'dist-binary' : 'dist',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})