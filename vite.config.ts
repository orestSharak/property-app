/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
    include: ['src/**/*.test.tsx'],
  },
  define: {
    'process.env': process.env,
  },
})
