<template>
  <div class="tabs">
    <button v-for="tab in tabs" :key="tab.key" class="tab-button" :class="{ active: activeKey === tab.key }"
      @click="$emit('update:activeKey', tab.key)" :aria-label="tab.label">
      <component :is="tab.icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  tabs: { key: string; icon: any; label: string }[];
  activeKey: string;
}>();
const emit = defineEmits<['update:activeKey', string]>();
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
}

.tab-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-color);
  transition: color 0.2s, background 0.2s;
}

.tab-button.active {
  color: var(--primary-color);
}

.tab-button:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>
