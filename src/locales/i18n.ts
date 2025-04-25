import { createI18n } from 'vue-i18n';
import pt from './pt-BR.json';
import en from './en-US.json';
import es from './es.json';

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  messages: {
    'pt-BR': pt['pt-BR'],
    'en-US': en['en-US'],
    'es': es['es']
  }
});

export default i18n;
