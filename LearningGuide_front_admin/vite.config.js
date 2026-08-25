import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/adm': { //获取路径中包含了/adm的请求
        target: 'http://localhost:3000', //后台服务所在的源
        changeOrigin: true //修改源
        //rewrite: (path)=>path.replace(/^\/adm/, '/adm')   // /api替换为''
      }
    }
  }
})
