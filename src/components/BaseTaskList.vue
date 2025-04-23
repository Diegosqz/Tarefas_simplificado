<template>
  <ul class="task-list">
    <baseTaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="$emit('edit', task.id)"
      @delete="$emit('delete', task.id)"
    />
  </ul>
</template>

<script setup lang="ts">
import baseTaskItem from '@/components/BaseTaskItem.vue';

defineProps<{
  tasks: { id: number; text: string; completed: boolean }[];
}>();

defineEmits(['edit', 'delete']);
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
}
</style>
