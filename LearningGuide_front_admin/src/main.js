import './assets/main.scss'

import { createApp } from 'vue' //导入vue
import ElementPlus from 'element-plus'  //导入element-plus
import 'element-plus/dist/index.css'    //导入element-plus的样式
import App from './App.vue' //导入App.vue
import locale from 'element-plus/dist/locale/zh-cn.js'
import router from '@/router'   //默认会找到index.js
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'

const app = createApp(App)  //创建应用实例
const pinia = createPinia()
const persist = createPersistedState()

pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus,{locale})    //使用element-plus
app.mount('#app')   //控制html元素