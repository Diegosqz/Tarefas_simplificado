<template>
  <div class="setting-item">
    <label for="theme">Tema:</label>
    <select id="theme" :value="selectedTheme" @input="updateTheme($event)">
      <option value="light">Claro</option>
      <option value="dark">Escuro</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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
</script>
