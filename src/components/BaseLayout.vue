<template>
  <div class="page-wrapper">
    <header class="header">
    </header>

    <main>
      <slot />
    </main>

    <footer class="footer">
      <BaseFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLanguage } from './composable/useLanguage';
import BaseFooter from './BaseFooter.vue';

const { currentLanguage, changeLanguage } = useLanguage();

const currentTheme = ref(localStorage.getItem('theme') || 'light');

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('dark-theme', currentTheme.value === 'dark');
  localStorage.setItem('theme', currentTheme.value);
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(currentTheme.value);
}

function onChangeLanguage(event: Event) {
  const select = event.target as HTMLSelectElement;
  changeLanguage(select.value);
}

onMounted(() => {
  if (currentTheme.value === 'dark') {
    document.body.classList.add('dark-theme');
  }
});
</script>

<style scoped>
.page-wrapper {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: var(--page-padding);
  background: var(--neutral-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-light);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  font-weight: 600;
}

.nav-links a.active {
  text-decoration: underline;
}

.language-theme-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-theme-controls select {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
}

.theme-toggle {
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: white;
}

main {
  flex-grow: 1;
  padding: 1rem;
  background: var(--neutral-bg);
  color: var(--text-color);
}

.footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}
</style>
