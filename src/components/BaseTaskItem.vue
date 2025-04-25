<template>
  <li :class="{ completed: task.completed }">
    <div class="task-info">
      <input type="checkbox" v-model="task.completed" />
      <span>{{ task.text }}</span>
    </div>
    <baseEditTask @edit="$emit('edit')" />
    <baseDeleteTask @delete="$emit('delete')" />
  </li>
</template>


<script setup lang="ts">
import baseDeleteTask from './baseDeleteTask.vue';
import BaseEditTask from './BaseEditTask.vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
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
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.task-info {
  align-items: center;
  /* controla espaço só entre checkbox e texto */
}

.completed span {
  text-decoration: line-through;
  color: #999;
}
</style>
