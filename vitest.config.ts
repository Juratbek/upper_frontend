import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
  resolve: {
    alias: {
      hooks: path.resolve(__dirname, './hooks'),
      utils: path.resolve(__dirname, './utils'),
      store: path.resolve(__dirname, './store'),
      variables: path.resolve(__dirname, './variables'),
      assets: path.resolve(__dirname, './assets'),
      context: path.resolve(__dirname, './context'),
      components: path.resolve(__dirname, './components'),
      'components/molecules': path.resolve(__dirname, './components/molecules'),
      'components/lib': path.resolve(__dirname, './components/lib'),
    },
  },
});
