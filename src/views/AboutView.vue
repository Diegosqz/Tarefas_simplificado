<template>
  <div class="page-wrapper">
    <!-- Contêiner para idioma e tema -->
    <div class="top-controls">
      <BaseTooltipButton label="Trocar idioma" @click="toggleLanguageMenu">
        <span class="current-language">{{ getFlag(currentLanguage) }}
          <span class="arrow" :class="{ open: languageMenuVisible }">▾</span>
        </span>
      </BaseTooltipButton>
      <div v-if="languageMenuVisible" class="language-options">
        <span v-for="lang in otherLanguages" :key="lang" @click.stop="changeLanguage(lang)">
          {{ getFlag(lang) }}
        </span>
      </div>
      <BaseTooltipButton label="Alternar Tema" @click="toggleTheme">
        <div class="theme-switcher">
          <span>{{ currentTheme === 'dark' ? '🌙' : '☀️' }}</span>
        </div>
      </BaseTooltipButton>
    </div>

    <div class="task-app">
      <div class="task-content">
        <h1>{{ $t('List_of_Tasks') }}</h1>
        <div class="top-bar">
          <BaseAddTask @add="addTask" />
          <BaseTooltipButton label="Configurações" @click="openSettings">⚙️</BaseTooltipButton>
        </div>
        <BaseTaskList :tasks="filteredTasks" @edit="editTask" @delete="deleteTask" />
      </div>
    </div>

    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useI18n } from 'vue-i18n'
import BaseAddTask from '@/components/BaseAddTask.vue';
import BaseTaskList from '@/components/BaseTaskList.vue';
import BaseTooltipButton from '@/components/BaseTooltipButton.vue';
import BaseFooter from '@/components/BaseFooter.vue';

const { locale } = useI18n();

// Tema global com Pinia
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.theme);
function toggleTheme() {
  themeStore.toggleTheme();
}

// Aplicar classe do tema ao carregar e quando mudar
onMounted(() => {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(currentTheme.value);
});
watch(currentTheme, (theme) => {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
});

// Idioma local
const currentLanguage = ref('pt-BR');
const languageMenuVisible = ref(false);
const availableLanguages = ['pt-BR', 'en-US', 'es'];
const otherLanguages = computed(() => availableLanguages.filter(lang => lang !== currentLanguage.value));

function toggleLanguageMenu() {
  languageMenuVisible.value = !languageMenuVisible.value;
}
function changeLanguage(lang: string) {
  locale.value = lang;
  currentLanguage.value = lang;
  languageMenuVisible.value = false;
  console.log('Idioma alterado para:', locale.value);
}

function getFlag(lang: string): string {
  switch (lang) {
    case 'pt-BR': return '🇧🇷';
    case 'en-US': return '🇺🇸';
    case 'es': return '🇪🇸';
    default: return '🌐';
  }
}

// Tarefas
const tasks = ref<{ id: number; text: string; completed: boolean; priority: 'low' | 'medium' | 'high' }[]>([]);
const nextId = ref(1);

function addTask(text: string) {
  tasks.value.push({ id: nextId.value++, text, completed: false, priority: 'low' });
}
function deleteTask(id: number) {
  tasks.value = tasks.value.filter(task => task.id !== id);
}
function editTask(id: number) {
  const task = tasks.value.find(task => task.id === id);
  if (task) {
    const updatedText = prompt('Editar Tarefa:', task.text);
    if (updatedText?.trim()) {
      task.text = updatedText.trim();
    }
  }
}
const filteredTasks = computed(() => tasks.value);

const router = useRouter();
function openSettings() {
  router.push('/configuracoes');
}
</script>

<style scoped>
.task-app {
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: var(--box-shadow-light);
}

.task-content {
  max-width: 600px;
  margin: 0 auto;
}

.task-content h1 {
  text-align: center;
  margin-bottom: 3px;
}

.top-bar {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 3px;
  margin-left: calc(50% - 190px);
  margin-bottom: 15px;
}

.top-bar button {
  font-size: 18px;
  height: 100%;
}

.top-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
  position: absolute;
  top: 20px;
  right: 19px;
  z-index: 100;
}

.theme-switcher {
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}

.current-language {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.arrow {
  font-size: 14px;
  color: #555;
  transition: transform 0.2s ease;
  display: inline-block;
}

.arrow.open {
  transform: rotate(180deg);
}

.language-options {
  margin-top: 5px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
  z-index: 100;
}

.language-options span {
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
}

.language-options span:hover {
  background-color: #f0f0f0;
}

body.dark {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark .task-app {
  background-color: #2c2c2c;
  color: #e0e0e0;
}

.page-wrapper {
  position: relative;
}
</style>
