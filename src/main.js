import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import './style.css'
import App from './App.vue'
import * as icons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/antd.css'

// import router from './router'
// import store from './store'

import { marked } from 'marked'
import hljs from 'highlight.js'
import { S3 } from "@aws-sdk/client-s3"

const app = createApp(App)

Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})
app.config.globalProperties.$icons = icons

const s3 = new S3({
  endpoint: 'https://endpoint.4everland.co',
  signatureVersion: "v4",
  credentials: {
    accessKeyId: '8U6J9HO0SMC5N00Q8AOS',
    secretAccessKey: 'PpWjKvsG5tBoe4w4L036RN4z7t9aKMDC2GzDbvFt',
    sessionToken: '',
  },
  region: "us-west-2",
})
app.config.globalProperties.$s3 = s3

app.use(Antd)
  //.use(router)
  //.use(store)
  .mount('#app')
