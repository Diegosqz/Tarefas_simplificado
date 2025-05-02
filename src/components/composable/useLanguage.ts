// components/composable/useLanguage.ts
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const availableLanguages = ['en', 'pt', 'es']; // Adicione mais se quiser
const language = ref(localStorage.getItem('lang') || 'pt');
export function useLanguage() {
  const { locale } = useI18n();
  const currentLanguage = ref(locale.value);

  // Atualiza o idioma e persiste no localStorage
  const changeLanguage = (lang: string) => {
    if (availableLanguages.includes(lang)) {
      language.value = lang;
      locale.value = lang;
      localStorage.setItem('lang', lang);
    }
  };


  // Retorna a bandeira do idioma
  const getFlag = (lang: string) => {
    switch (lang) {
      case 'pt': return '🇧🇷';
      case 'en': return '🇺🇸';
      case 'es': return '🇪🇸';
      default: return '🌐';
    }
  };

  const otherLanguages = computed(() =>
    availableLanguages.filter(l => l !== language.value)
  );

  return {
    language,
    otherLanguages,
    changeLanguage,
    getFlag,
  };
}

