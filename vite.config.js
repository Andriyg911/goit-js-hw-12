import { defineConfig } from 'vite';
import { resolve } from 'path';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  
  root: resolve(__dirname, 'src'),

  
  base: '/goit-js-hw-12/',

  build: {
    
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },

  
  define: {
    global: 'globalThis',
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, 
        }),
      ],
    },
  },

  server: {
    port: 3000,
    open: true, 
  },
});