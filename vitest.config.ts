import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import type { ViteUserConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/main.tsx',
        'src/types.ts',
        'src/vite-env.d.ts',
        'eslint.config.js',
        'vitest.config.ts',
        'vite.config.ts',
        'dist/**',
      ],
    },
  },
} as ViteUserConfig)
