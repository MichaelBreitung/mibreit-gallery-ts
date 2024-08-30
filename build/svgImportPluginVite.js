import { createFilter } from '@rollup/pluginutils';
import fs from 'fs';

export default function svgImportPlugin() {
    const filter = createFilter();
    return {
      name: 'svg-import',
      transform: async (code, id) => {
        if (!filter(id) || !id.endsWith('.svg')) {
          return null;
        }
  
        // For consistency between build and dev, we read the SVG file
        // and ignore the code part of this transform hook. We don't use
        // the load hook, because Vite handles assets diffrently in development
        // and only the transform hook is called
        const content = await fs.promises.readFile(id, 'utf-8');
  
        return {
          code: `export default ${JSON.stringify(content)};`,
          map: { mappings: '' },
        };
      },
    };
  };