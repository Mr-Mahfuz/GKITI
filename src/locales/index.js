import { createI18n } from 'vue-i18n'
import en from './en.json'
import bn from './bn.json'

const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        bn
    }
})

export default i18n
