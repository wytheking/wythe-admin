import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
// import installElementPlus from './plugins/element'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 初始化样式表
import '@/styles/index.scss'
// 导入 SvgIcon
import installIcons from '@/icons'
// 路由鉴权
import './permission'

import * as EleIcons from '@element-plus/icons-vue'

// filter
import installFilter from '@/filter'

const app = createApp(App)
// installElementPlus(app)
installIcons(app)
installIcons(app)
installFilter(app)

for (const name in EleIcons) {
  app.component(name, EleIcons[name])
}

app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .mount('#app')
