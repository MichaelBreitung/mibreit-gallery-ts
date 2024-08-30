import { build } from 'vite';
import strip from '@rollup/plugin-strip';

// First build
build({
  build: {
    rollupOptions: {
      preserveEntrySignatures: true,
      input: 'src/index.wc.ts',
      output: [
        {
          dir: 'lib-iife',
          format: 'iife',
          name: 'mibreitGalleryTs',
          entryFileNames: 'mibreitGalleryTs.min.js',
          exports: 'named',
        },
      ],
      plugins: [
        strip({
          include: ['src/**/*.ts', 'node_modules/mibreit-lazy-loader/**/*.js'],
          functions: ['console.*'],
        }),
      ],
    },
  },
});
