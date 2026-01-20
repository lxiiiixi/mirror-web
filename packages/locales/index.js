import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhHant from './zh-hant.json'

const i18n = createI18n({
  legacy: false,
  locale: uni.getStorageSync('user-lang') || uni.getLocale(),
  messages: {
    en,
    'zh-hant': zhHant,
  },
})

export default i18n
