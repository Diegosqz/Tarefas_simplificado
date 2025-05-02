<template>
  <!-- Resumo com contagem por prioridade -->
  <div class="task-summary">
    Tarefas:
    <button class="filter-btn low" :class="{ active: filter === 'low' }" @click="filter = 'low'">Baixa: {{ lowCount
      }}</button>,
    <button class="filter-btn medium" :class="{ active: filter === 'medium' }" @click="filter = 'medium'">Média: {{
      mediumCount }}</button>,
    <button class="filter-btn high" :class="{ active: filter === 'high' }" @click="filter = 'high'">Alta: {{ highCount
      }}</button>,
    <button class="filter-btn all" :class="{ active: filter === 'all' }" @click="filter = 'all'">Todas</button>,
    <button class="filter-btn completed" :class="{ active: filter === 'completed' }"
      @click="filter = 'completed'">Completas: {{ completedCount }}</button>,
    <button class="filter-btn deleted" :class="{ active: filter === 'deleted' }" @click="filter = 'deleted'">Excluídas:
      {{ deletedCount }}</button>
  </div>

  <transition-group name="fade" tag="ul" class="task-list">
    <li v-for="task in sortedTasks" :key="task.id"
      :class="['task-item', { completed: task.completed, deleted: task.deleted }]">
      <!-- 1) Texto e checkbox -->
      <div class="task-info">
        <input type="checkbox" v-model="task.completed" @change="updateTaskState(task)" :disabled="task.deleted" />

        <span v-if="editingTask !== task.id" @click="!task.completed && !task.deleted && startEditing(task)"
          class="task-text">
          {{ task.text }}
        </span>

        <input v-else v-model="editedText" @blur="saveEdit(task)" @keyup.enter="saveEdit(task)" class="edit-input" />
      </div>

      <!-- 2) Seleção de prioridade -->
      <div class="task-priority">
        <label v-for="p in priorities" :key="p.value" class="priority-radio" :data-priority="p.value">
          <input type="radio" :name="'priority-' + task.id" :value="p.value" :checked="task.priority === p.value"
            @change="() => setPriority(task.id, p.value)" :disabled="filter === 'completed' || filter === 'deleted'" />
          <span class="custom-radio"></span>
          {{ p.label }}
        </label>
      </div>

      <!-- 3) Ações -->
      <div class="task-actions">
        <template v-if="task.deleted">
          <button class="restore-btn" @click="restoreTask(task.id)" title="Restaurar tarefa">♻️</button>
        </template>
        <template v-else-if="!task.completed">
          <baseEditTask @edit="() => emit('edit', task.id)" />
          <baseDeleteTask @delete="() => deleteTask(task.id)" />
        </template>
      </div>
    </li>
  </transition-group>
</template>

<script setup lang="ts">
import BaseEditTask from './BaseEditTask.vue';
import BaseDeleteTask from './BaseDeleteTask.vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const priorities = [
  { label: '', value: 'low' },
  { label: '', value: 'medium' },
  { label: '', value: 'high' }
];

interface Task {
  id: number;
  text: string;
  completed: boolean;
  deleted: boolean;
  priority: 'low' | 'medium' | 'high';
}

const { tasks } = defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
}>();

const filter = ref<'low' | 'medium' | 'high' | 'all' | 'completed' | 'deleted'>('all');

const editingTask = ref<number | null>(null);
const editedText = ref<string>('');

// Impede completar se estiver excluído
function updateTaskState(task: Task) {
  if (task.deleted) return;
  if (task.completed) task.deleted = false;
}

// Marca como excluída
function deleteTask(id: number) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.deleted = true;
    task.completed = false;
  }
}

// Restaura uma tarefa excluída
function restoreTask(id: number) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.deleted = false;
  }
}

// Inicia edição, se permitido
function startEditing(task: Task) {
  if (task.completed || task.deleted) return;
  editingTask.value = task.id;
  editedText.value = task.text;
}

function saveEdit(task: Task) {
  if (editingTask.value === task.id && editedText.value !== task.text) {
    task.text = editedText.value;
  }
  editingTask.value = null;
}

function setPriority(id: number, priority: 'low' | 'medium' | 'high') {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.priority = priority;
  }
}

const priorityOrder = { high: 0, medium: 1, low: 2 };

const filteredTasks = computed(() => {
  if (filter.value === 'completed') return tasks.filter(t => t.completed);
  if (filter.value === 'deleted') return tasks.filter(t => t.deleted);
  if (filter.value === 'all') return tasks.filter(t => !t.completed && !t.deleted);
  return tasks.filter(t => t.priority === filter.value && !t.completed && !t.deleted);
});

const sortedTasks = computed(() =>
  [...filteredTasks.value].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
);

const lowCount = computed(() => tasks.filter(t => t.priority === 'low' && !t.completed && !t.deleted).length);
const mediumCount = computed(() => tasks.filter(t => t.priority === 'medium' && !t.completed && !t.deleted).length);
const highCount = computed(() => tasks.filter(t => t.priority === 'high' && !t.completed && !t.deleted).length);
const completedCount = computed(() => tasks.filter(t => t.completed).length);
const deletedCount = computed(() => tasks.filter(t => t.deleted).length);
</script>

<style scoped>
.task-summary {
  font-weight: bold;
  margin-bottom: 1rem;
}

.filter-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0 0.25rem;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
}

.filter-btn.low {
  color: #28a745;
}

.filter-btn.medium {
  color: #ffc107;
}

.filter-btn.high {
  color: #dc3545;
}

.filter-btn.all {
  color: #007bff;
}

.filter-btn.completed {
  color: #6c757d;
}

.filter-btn.deleted {
  color: #dc3545;
}

.filter-btn.active {
  font-weight: bold;
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

.priority-radio input[type='radio'] {
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

.priority-radio input[type='radio']:checked+.custom-radio {
  border-color: #007bff;
  background-color: #007bff;
}

.priority-radio[data-priority='low'] input[type='radio']:checked+.custom-radio {
  background-color: #28a745;
  border-color: #28a745;
}

.priority-radio[data-priority='medium'] input[type='radio']:checked+.custom-radio {
  background-color: #ffc107;
  border-color: #ffc107;
}

.priority-radio[data-priority='high'] input[type='radio']:checked+.custom-radio {
  background-color: #dc3545;
  border-color: #dc3545;
}

.task-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.task-text {
  transition: all 0.4s ease;
}

.completed .task-text {
  text-decoration: line-through;
  color: #999;
}

.deleted .task-text {
  color: #ccc;
  text-decoration: line-through;
  font-style: italic;
}

.restore-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #28a745;
}

.edit-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  margin-left: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
