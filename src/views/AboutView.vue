<template>
  <div class="page-wrapper">
    <!-- Contêiner para idioma e tema -->
    <div class="top-controls">
      <!-- Seletor de idioma no canto superior direito -->
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

      <!-- Botão de alternância de tema com tooltip -->
      <BaseTooltipButton label="Alternar Tema" @click="toggleTheme">
        <div class="theme-switcher">
          <span>{{ currentTheme === 'dark' ? '🌙' : '☀️' }}</span>
        </div>
      </BaseTooltipButton>
    </div>

    <div class="task-app">
      <h1>{{ $t('List_of_Tasks') }}</h1>

      <!-- Linha com botão de adicionar e configurações lado a lado -->
      <div class="top-bar">
        <baseAddTask @add="addTask" />
        <BaseTooltipButton label="Configurações" @click="openSettings">
          ⚙️
        </BaseTooltipButton>
      </div>

      <!-- Lista de tarefas -->
      <baseTaskList :tasks="tasks" @edit="editTask" @delete="deleteTask" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import baseAddTask from '@/components/BaseAddTask.vue';
import baseTaskList from '@/components/BaseTaskList.vue';
import BaseTooltipButton from '@/components/BaseTooltipButton.vue';

const tasks = ref<{ id: number; text: string; completed: boolean }[]>([]);
const nextId = ref(1);
const router = useRouter();
const currentLanguage = ref('pt');
const languageMenuVisible = ref(false);
const availableLanguages = ['en', 'pt', 'es'];

const currentTheme = ref(localStorage.getItem('theme') || 'light'); // Recupera o tema salvo ou usa 'light' como padrão

// Função para alternar entre os temas
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('dark-theme', currentTheme.value === 'dark'); // Adiciona a classe para o body
  localStorage.setItem('theme', currentTheme.value); // Salva a escolha no localStorage
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(currentTheme.value);
}

// Função para mudar o idioma
function toggleLanguageMenu() {
  languageMenuVisible.value = !languageMenuVisible.value;
}

const otherLanguages = computed(() =>
  availableLanguages.filter(lang => lang !== currentLanguage.value)
);

function changeLanguage(lang: string) {
  currentLanguage.value = lang;
  languageMenuVisible.value = false;
  console.log(`Idioma trocado para: ${lang}`);
}

function getFlag(lang: string): string {
  switch (lang) {
    case 'pt':
      return '🇧🇷';
    case 'en':
      return '🇺🇸';
    case 'es':
      return '🇪🇸';
    default:
      return '🌐';
  }
}

function addTask(text: string) {
  tasks.value.push({ id: nextId.value++, text, completed: false });
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

function openSettings() {
  router.push('/configuracoes');
}

onMounted(() => {
  if (currentTheme.value === 'dark') {
    document.body.classList.add('dark-theme');
  }
});
</script>

<style scoped>
.task-app {
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: var(--box-shadow-light);
}

.top-bar {
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin-bottom: 14px;
}

.top-bar button {
  font-size: 18px;
  height: 100%;
}

/* Contêiner para idioma e tema */
.top-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* Diminuir o gap para aproximar os ícones de idioma e tema */
  gap: 6px;
  /* Ajuste para reduzir a distância entre eles */
  position: absolute;
  top: 20px;
  right: 19px;
  z-index: 100;
}

/* Estilos para o botão de tema */
.theme-switcher {
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}

/* Estilos do tooltip */
.language-switcher {
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

body.dark-theme {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark-theme .task-app {
  background-color: #2c2c2c;
  color: #e0e0e0;
}

.page-wrapper {
  position: relative;
}
</style>
