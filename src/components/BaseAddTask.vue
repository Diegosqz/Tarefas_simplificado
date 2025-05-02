<template>
  <div class="add-task">
    <input v-model="taskText" @keyup.enter="emitAdd" :placeholder="t('ButtonTask.New_Task_📝')" />
    <BaseTooltipButton icon="➕" :label="t('ButtonTask.Add')" @click="emitAdd" class="add-button" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseTooltipButton from './BaseTooltipButton.vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const taskText = ref('');
const showTooltip = ref(false);
const emit = defineEmits(['add']);
function emitAdd() {
  const text = taskText.value.trim();
  if (text) {
    emit('add', text);
    taskText.value = '';
  }
}
</script>

<style scoped>
.add-task {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
}

input {
  width: 100%;
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

body.dark .add-button {
  color: white;
}

body.light .add-button {
  color: black;
}


/* Tooltip estilo flutuante */
.tooltip {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
}
</style>
