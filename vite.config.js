import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  // Make sure we can do @/components/xxx style imports
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  // Enable library mode: only create ES builds
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // highlight.js is externalised so the consuming application bundles
      // only the core and the languages actually imported, and shares a
      // single copy of highlight.js with anything else that uses it.
      external: [/^highlight\.js(\/.*)?$/],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps.
        // I think this is unnecessary as I am only building 'es'.
        globals: {},
      },
    },
  },
})
