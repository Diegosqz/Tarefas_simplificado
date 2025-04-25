import './assets/styles/reset.css'
import './assets/styles/globalstyles.css'
import './assets/styles/responsive.css'
import './assets/main.css'
import 'vue-flag-icon';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from '@/locales/i18n'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
