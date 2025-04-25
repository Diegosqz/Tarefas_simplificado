<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.id" :class="['task-item', { completed: task.completed }]">
      <!-- 1) bloco de texto + checkbox -->
      <div class="task-info">
        <input type="checkbox" v-model="task.completed" />
        <span class="task-text">{{ task.text }}</span>
      </div>

      <!-- 2) bloco de ações, colado no texto -->
      <div class="task-actions">
        <baseEditTask @edit="() => emit('edit', task.id)" />
        <baseDeleteTask @delete="() => emit('delete', task.id)" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import BaseEditTask from './BaseEditTask.vue';
import BaseDeleteTask from './BaseDeleteTask.vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
interface Task {
  id: number
  text: string
  completed: boolean
}

// Desestrutura "tasks" diretamente para uso no template
const { tasks } = defineProps<{ tasks: Task[] }>()

// Emissão de eventos edit/delete com o id
const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()
</script>

<style scoped>
.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  gap: 0.5rem;
  /* espaço entre texto/checkbox e ícones */
}

/* 3) Checkbox e texto inline, coladinhos */
.task-info {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* 4) Ações também inline, sem espaço extra */
.task-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

/* 5) Riscado quando completa */
.completed .task-text {
  text-decoration: line-through;
  color: #999;
}
</style>
