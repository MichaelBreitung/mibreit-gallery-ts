import { defineConfig } from 'vite';
import svgImportPlugin from "./build/svgImportPluginVite";

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
  plugins: [svgImportPlugin()],
});
