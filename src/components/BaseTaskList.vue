<template>
  <!-- Resumo com contagem por prioridade -->
  <div class="task-summary">
    Tarefas:
    <span class="low">Baixa: {{ lowCount }}</span>,
    <span class="medium">Média: {{ mediumCount }}</span>,
    <span class="high">Alta: {{ highCount }}</span>
  </div>

  <ul class="task-list">
    <li v-for="task in sortedTasks" :key="task.id" :class="['task-item', { completed: task.completed }]">
      <!-- 1) Texto e checkbox -->
      <div class="task-info">
        <input type="checkbox" v-model="task.completed" />
        <span class="task-text">{{ task.text }}</span>
      </div>

      <!-- 2) Seleção de prioridade -->
      <div class="task-priority">
        <label v-for="p in priorities" :key="p.value" class="priority-radio" :data-priority="p.value">
          <input type="radio" :name="'priority-' + task.id" :value="p.value" :checked="task.priority === p.value"
            @change="() => setPriority(task.id, p.value)" />
          <span class="custom-radio"></span>
          {{ p.label }}
        </label>
      </div>

      <!-- 3) Ações -->
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const priorities = [
  { label: 'Baixa', value: 'low' },
  { label: 'Média', value: 'medium' },
  { label: 'Alta', value: 'high' }
];

interface Task {
  id: number;
  text: string;
  completed: boolean;
  value: string;
  priority: 'low' | 'medium' | 'high';
}

// Props e emit
const { tasks } = defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
}>();

// Atualiza prioridade
function setPriority(id: number, priority: 'low' | 'medium' | 'high') {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.priority = priority;
  }
}

// Ordenação de tarefas por prioridade
const priorityOrder = { high: 0, medium: 1, low: 2 };
const sortedTasks = computed(() =>
  [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
);

// Contadores por prioridade
const lowCount = computed(() => tasks.filter(t => t.priority === 'low').length);
const mediumCount = computed(() => tasks.filter(t => t.priority === 'medium').length);
const highCount = computed(() => tasks.filter(t => t.priority === 'high').length);
</script>

<style scoped>
.task-summary {
  font-weight: bold;
  margin-bottom: 1rem;
}

.low {
  color: #28a745;
}

.medium {
  color: #ffc107;
}

.high {
  color: #dc3545;
}

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
}

.task-info {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.task-priority {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.priority-radio {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-left: 1.2em;
  font-size: 0.9em;
  user-select: none;
}

.priority-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1em;
  width: 1em;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 50%;
  transition: border-color 0.2s, background-color 0.2s;
}

.priority-radio input[type="radio"]:checked+.custom-radio {
  border-color: #007bff;
  background-color: #007bff;
}

.priority-radio[data-priority="low"] input[type="radio"]:checked+.custom-radio {
  background-color: #28a745;
  border-color: #28a745;
}

.priority-radio[data-priority="medium"] input[type="radio"]:checked+.custom-radio {
  background-color: #ffc107;
  border-color: #ffc107;
}

.priority-radio[data-priority="high"] input[type="radio"]:checked+.custom-radio {
  background-color: #dc3545;
  border-color: #dc3545;
}

.task-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.completed .task-text {
  text-decoration: line-through;
  color: #999;
}
</style>
