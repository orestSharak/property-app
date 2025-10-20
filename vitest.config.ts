import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.tsx',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
    include: ['src/**/*.test.tsx'],
  },
})
