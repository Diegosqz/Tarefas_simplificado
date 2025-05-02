// stores/theme.ts
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light' | 'dark'>('light');

  // Sincroniza o tema com o localStorage e aplica a classe no <html>
  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Alterna entre os temas
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }

  // Inicializa o tema com base no localStorage ou na preferência do sistema
  function initializeTheme() {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      theme.value = storedTheme;
    } else {
      // Detecta a preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
  }

  // Chama a função de inicialização
  initializeTheme();

  return { theme, toggleTheme };
});
