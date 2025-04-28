<template>
  <div class="setting-item">
    <label for="theme">{{ $t(theme) }}:</label>
    <select id="theme" :value="selectedTheme" @input="updateTheme($event)">
      <option value="light">{{ t('light') }}</option>
      <option value="dark">{{ t('dark') }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
// Prop recebida do componente pai
const props = defineProps({
  selectedTheme: String,
});

// Emitir evento para atualizar o valor de selectedTheme
const emit = defineEmits(['update:selectedTheme']);

function updateTheme(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:selectedTheme', target.value);
}
watch(
  () => props.selectedTheme,
  (newTheme) => {
    document.body.classList.remove('light', 'dark'); // remove classes anteriores
    if (newTheme) {
      document.body.classList.add(newTheme); // adiciona classe nova
    }
  },
  { immediate: true } // já aplica o tema ao carregar
);
</script>
