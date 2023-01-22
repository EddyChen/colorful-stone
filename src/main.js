import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import './style.css'
import App from './App.vue'
import * as icons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/antd.css'

// import router from './router'
// import store from './store'

const app = createApp(App)

Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})
app.config.globalProperties.$icons = icons

app.use(Antd)
  //.use(router)
  //.use(store)
  .mount('#app')
