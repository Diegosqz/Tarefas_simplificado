<template>
  <div class="page-wrapper">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import baseAddTask from '@/components/BaseAddTask.vue';
import baseTaskList from '@/components/BaseTaskList.vue';
import BaseTooltipButton from '@/components/BaseTooltipButton.vue';
import AboutView from '@/views/AboutView.vue';
const tasks = ref<{ id: number; text: string; completed: boolean }[]>([]);
const nextId = ref(1);
const router = useRouter();
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
  router.push('/configuracoes');}
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


</style>
