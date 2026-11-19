import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import fs from 'fs';

function copyToRootPlugin() {
  return {
    name: 'copy-to-root',
    writeBundle() {
      if (fs.existsSync('dist/simple-eink-collection-cards.js')) {
        fs.copyFileSync('dist/simple-eink-collection-cards.js', 'simple-eink-collection-cards.js');
        console.log('✓ Copied bundle to simple-eink-collection-cards.js in root');
      }
    }
  };
}

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/simple-eink-collection-cards.js',
    format: 'es',
    inlineDynamicImports: true,
    sourcemap: false
  },
  plugins: [
    resolve(),
    json(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    terser({
      format: {
        comments: false
      }
    }),
    copyToRootPlugin()
  ]
};
