import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/mocks/router.ts', './tests/setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
    },
    exclude: [
      '*.stories.ts',
      '*.stories.tsx',
      '**/node_modules/**',
      '.storybook',
      '.next',
      '.husky',
      '.github',
      'coverage',
    ],
  },
  resolve: {
    alias: {
      hooks: path.resolve(__dirname, './hooks'),
      utils: path.resolve(__dirname, './utils'),
      store: path.resolve(__dirname, './store'),
      variables: path.resolve(__dirname, './variables'),
      'variables/icons': path.resolve(__dirname, './variables/icons'),
      assets: path.resolve(__dirname, './assets'),
      tests: path.resolve(__dirname, './tests'),
      context: path.resolve(__dirname, './context'),
      components: path.resolve(__dirname, './components'),
      'components/molecules': path.resolve(__dirname, './components/molecules'),
      'components/lib': path.resolve(__dirname, './components/lib'),
    },
  },
});
