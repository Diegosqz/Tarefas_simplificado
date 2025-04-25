import './assets/styles/reset.css'
import './assets/styles/globalstyles.css'
import './assets/styles/responsive.css'
import './assets/main.css'
import 'vue-flag-icon';
import { useDark, useToggle } from '@vueuse/core'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from '@/locales/i18n'
const app = createApp(App)
const isDark = useDark({
  selector: 'html', // onde a classe 'dark' será aplicada
  attribute: 'class',
})
const toggleDark = useToggle(isDark)

app.provide('isDark', isDark)
app.provide('toggleDark', toggleDark)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
