<template>
    <BaseTooltipButton icon="🗑️" label="Excluir" @click="$emit('delete')" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseTooltipButton from './BaseTooltipButton.vue';
defineEmits(['delete']);
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #e74c3c;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
}
</style>
