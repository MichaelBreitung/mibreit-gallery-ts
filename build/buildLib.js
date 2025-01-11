import { build }from 'vite';
import strip from '@rollup/plugin-strip';

// First build
build({
  build: {
    rollupOptions: {
      preserveEntrySignatures: true,
      input: 'src/index.ts',
      output: [
        {
          format: 'esm',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
        }
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
