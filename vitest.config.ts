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
      reporter: ['text', 'json', 'json-summary', 'html'],
      exclude: [
        '*.ts',
        '*.tsx',
        '*.js',
        'node_modules/',
        'src/*.ts',
        'src/*.tsx',
        'src/pages/**',
        'dist/**',
      ],
    },
  },
} as ViteUserConfig)
