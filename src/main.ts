import './assets/styles/reset.css'
import './assets/styles/globalstyles.css'
import './assets/styles/responsive.css'
import './assets/main.css'
import 'vue-flag-icon';
import { useDark, useToggle } from '@vueuse/core';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
import es from './locales/es.json';
import { createI18n } from 'vue-i18n'; // Importe createI18n aqui

const app = createApp(App)
const isDark = useDark({
  selector: 'html', // onde a classe 'dark' será aplicada
  attribute: 'class',
})
const toggleDark = useToggle(isDark)
const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  availableLocales: ['pt-BR','en-US', 'es'],
  messages:{
    'pt-BR': ptBR,
    'en-US': enUS,
    'es': es
  },
});

app.provide('isDark', isDark)
app.provide('toggleDark', toggleDark)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
