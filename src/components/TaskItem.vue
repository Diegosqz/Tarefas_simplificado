<template>
  <li :class="{ completed: task.completed }">
    <input type="checkbox" v-model="task.completed" />
    <span>{{ task.text }}</span>
    <EditButton @edit="handleEdit" />
    <DeleteButton @delete="handleDelete" />
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';


const props = defineProps<{
  task: { id: number; text: string; completed: boolean };
}>();

const emit = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
}>();

function handleEdit() {
  emit('edit', props.task.id);
}

function handleDelete() {
  emit('delete', props.task.id);
}
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.completed span {
  text-decoration: line-through;
  color: #999;
}
</style>
