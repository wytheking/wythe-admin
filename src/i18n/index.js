import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import store from '@/store'

const messages = {
  en,
  zh
}

function getLanguage () {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  // 使用 composition API
  legacy: false,
  // 全局使用 t 函数
  globalInjection: true,
  locale: getLanguage() || 'zh',
  messages
})

export default i18n
