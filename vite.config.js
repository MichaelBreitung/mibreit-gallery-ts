import { defineConfig } from 'vite';
import strip from '@rollup/plugin-strip';
import svgImportPlugin from './build/svgImportPluginVite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    poolOptions: {
      threads: {
        singleThread: true, // because we are interacting with the browser
      },
    },
  },
  css: {
    modules: {
      generateScopedName: 'mbg__[local]', // mbg prefix for mibreit gallery
    },
  },
  build: {
    rollupOptions: {
      preserveEntrySignatures: true,
      input: 'src/index.wc.ts',
      output: {
        dir: 'lib-iife',
        format: 'iife',
        name: 'mibreitGalleryTs',
        entryFileNames: 'mibreitGalleryTs.min.js',
        exports: 'named',
      },
      plugins: [
        strip({
          include: ['src/**/*.ts', 'node_modules/mibreit-lazy-loader/**/*.js'],
          functions: ['console.*'],
        }),
      ],
    },
  },
  plugins: [svgImportPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
