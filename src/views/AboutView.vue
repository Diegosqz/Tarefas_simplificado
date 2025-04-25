<template>
  <div class="page-wrapper">
    <!-- Seletor de idioma no canto superior direito -->
    <div class="language-switcher" @click="toggleLanguageMenu">
      <span class="current-language">{{ getFlag(currentLanguage) }}
        <span class="arrow" :class="{ open: languageMenuVisible }">▾</span> </span>
      <div v-if="languageMenuVisible" class="language-options">
        <span v-for="lang in otherLanguages" :key="lang" @click.stop="changeLanguage(lang)"> {{ getFlag(lang) }}
        </span>
      </div>
    </div>
    <!-- Botão de alternância de tema -->
    <div class="theme-switcher" @click="toggleTheme">
      <span>{{ currentTheme === 'dark' ? '🌙' : '☀️' }}</span>
    </div>
    <div class="task-app">
      <h1>Lista de Tarefas</h1>

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
import { useI18n } from 'vue-i18n'
import baseAddTask from '@/components/BaseAddTask.vue';
import baseTaskList from '@/components/BaseTaskList.vue';
import BaseTooltipButton from '@/components/BaseTooltipButton.vue';
const tasks = ref<{ id: number; text: string; completed: boolean }[]>([]);
const nextId = ref(1);
const router = useRouter();
const { locale } = useI18n();
const currentLanguage = ref('pt');
const languageMenuVisible = ref(false);
const availableLanguages = ['en', 'pt', 'es'];

const currentTheme = ref(localStorage.getItem('theme') || 'light'); // Recupera o tema salvo ou usa 'light' como padrão
// Função para alternar entre os temas
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('dark-theme', currentTheme.value === 'dark'); // Adiciona a classe para o body
  localStorage.setItem('theme', currentTheme.value); // Salva a escolha no localStorage
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
  // Aqui você pode integrar com i18n ou outra lógica de troca
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
// Aplique o tema assim que o componente for montado
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
  margin-bottom: 20px;
}

.top-bar button {
  font-size: 18px;
  height: 100%;
}

.theme-switcher {
  position: absolute;
  top: 32px;
  right: 75px;
  cursor: pointer;
  user-select: none;
}

.language-switcher {
  position: absolute;
  top: 30px;
  right: 40px;
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
