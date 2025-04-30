<template>
  <div class="tooltip-wrapper">
    <button type="button" :title="label" class="tooltip-button" :class="variant" @mouseenter="showTooltip = true"
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isDark = inject<boolean>('isDark', false);

// Props: 'variant' não conflita com atributo HTML 'type'
const props = defineProps<{
  label: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'danger';
}>();

// Define emit do clique
const emit = defineEmits<{
  (e: 'click'): void;
}>();

// Tooltip visibility
const showTooltip = ref(false);

// Cor do ícone baseado no tema atual
const iconColor = computed(() => (isDark ? '#fff' : '#000'));
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
  padding: 4px 4px;
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  line-height: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

/* variantes de estilo */
.default {
  background-color: var(--neutral-bg);
  color: var(--text-color);
  border: 1px solid var(--neutral-border);
}

.primary {
  background-color: var(--primary-color);
  color: #fff;
}

.danger {
  background-color: #e74c3c;
  color: #fff;
}

/* tooltip */
.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
}
</style>
