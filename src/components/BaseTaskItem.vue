<template>
  <li :class="{ completed: task.completed }">
    <input type="checkbox" v-model="task.completed" />
    <span>{{ task.text }}</span>
    <baseEditTask @edit="$emit('edit')" />
    <baseDeleteTask @delete="$emit('delete')" />
  </li>
</template>

<script setup lang="ts">
import baseDeleteTask from './baseDeleteTask.vue';
import baseEditTask from './baseEditTask.vue';

defineProps<{
  task: { id: number; text: string; completed: boolean };
}>();

defineEmits(['edit', 'delete']);
</script>

<style scoped>
.completed span {
  text-decoration: line-through;
  color: #999;
}

li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}
</style>
