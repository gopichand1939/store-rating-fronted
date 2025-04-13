import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Disable root workspace lookup that causes tsconfig issue
export default defineConfig({
  plugins: [react()],
  root: '.',
  clearScreen: false
})
