import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
      buffer: "node_modules/buffer/index.js" // add buffer
    },
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['zero-md'].includes(tag)
      }
    }
  })]
})
