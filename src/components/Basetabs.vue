<template>
  <div class="tabs-container">
    <button v-for="tab in tabs" :key="tab.key" :class="['tab-button', { active: activeKey === tab.key }]"
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
.tabs-container {
  display: flex;
  gap: var(--tab-gap);
  margin-bottom: var(--section-gap);
}

.tab-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--control-padding);
  font-size: 1.25rem;
  color: var(--text-color);
  transition: color 0.2s;
}

.tab-button.active {
  color: var(--primary-color);
}

.tab-button:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>
