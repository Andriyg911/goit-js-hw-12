import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    // Inject a global or _global object depending on dev vs. build
    define: {
      [isDev ? 'global' : '_global']: {},
    },

    root: 'src',
    base: isDev ? '' : '/goit-js-hw-12/',

    server: {
      fs: {
        allow: ['..']
      }
    },

    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        // Explicit multi-page input
        input: {
          index:   resolve(__dirname, 'src/index.html'),
          timer:   resolve(__dirname, 'src/1-timer.html'),
          snackbar: resolve(__dirname, 'src/2-snackbar.html'),
        },
        output: {
          // Vendors in a separate chunk
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },

          // Keep file names predictable
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      }
    },

    plugins: []
  };
});