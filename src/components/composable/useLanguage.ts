// components/composable/useLanguage.ts
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const availableLanguages = ['pt-BR', 'en-US', 'es'];

export function useLanguage() {
  const { locale } = useI18n();

  // Lê idioma salvo no localStorage (fallback: 'pt')
  const storedLang = localStorage.getItem('lang') || 'pt-BR';
  locale.value = storedLang;

  const changeLanguage = (lang: string) => {
    if (availableLanguages.includes(lang)) {
      locale.value = lang;
      localStorage.setItem('lang', lang);
    }
  };

  const getFlag = (lang: string) => {
    switch (lang) {
      case 'pt-BR': return '🇧🇷';
      case 'en-US': return '🇺🇸';
      case 'es': return '🇪🇸';
      default: return '🌐';
    }
  };

  const otherLanguages = computed(() =>
    availableLanguages.filter(l => l !== locale.value)
  );

  return {
    locale,            // usa diretamente o locale de vue-i18n
    otherLanguages,
    changeLanguage,
    getFlag,
  };
}
