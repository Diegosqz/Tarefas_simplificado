import { createI18n } from 'vue-i18n';

// Importar os arquivos de tradução (pt.json, en.json, es.json)
import pt from './pt.json';
import en from './en.json';
import es from './es.json';

// Criar a instância do Vue I18n
const i18n = createI18n({
  locale: 'pt', // Idioma padrão
  messages: {
    en,
    pt,
    es,
  },
});

export default i18n;
