<template>
  <div class="tooltip-wrapper">
    <button :title="label" :class="['tooltip-button', type]" @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false" @click="$emit('click')" :style="{ color: iconColor }">
      <slot>
        <!-- fallback: mostra o ícone se nenhum slot for passado -->
        {{ icon }}
      </slot>
    </button>
    <span v-if="showTooltip" class="tooltip">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
const isDark = inject('isDark', false)

const iconColor = computed(() => {
  return isDark ? 'white' : 'black'
})

defineProps<{
  label: string;
  icon?: string;
  type?: 'default' | 'primary' | 'danger';
}>();

defineEmits(['click']);

const showTooltip = ref(false);
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

/* botão base */
.tooltip-button {
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  /* menor fonte, afeta emoji também */
  padding: 4px 8px;
  /* reduzido */
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  line-height: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.language-options {
  margin-top: 5px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
  z-index: 100;
}

.language-options span {
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
}

.language-options span:hover {
  background-color: #f0f0f0;
}


.tooltip-button svg,
.tooltip-button i {
  width: 16px;
  height: 16px;
  font-size: 0.9rem;
}

/* estilos por tipo */
.tooltip-button.default {
  /*background-color: #f0f0f0;*/
  /*color: #333;*/
  background-color: var(--neutral-bg);
  color: var(--text-color);
  border: 1px solid var(--neutral-border);
}

.tooltip-button.primary {
  background-color: #42b983;
  color: white;
}

.tooltip-button.danger {
  background-color: #e74c3c;
  color: white;
}

/* tooltip */
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
