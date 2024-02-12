import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  worker: {
    plugins: () => [react()]
  },
  server: {
    port: 3000
  },
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@react-three/offscreen': path.resolve(__dirname, './src/packages/react-three-fiber')
    }
  }
})
