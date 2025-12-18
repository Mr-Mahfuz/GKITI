import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import i18n from './locales'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')

// Initialize AOS globally
AOS.init({
    duration: 800,
    easing: 'slide',
    once: true,
})
