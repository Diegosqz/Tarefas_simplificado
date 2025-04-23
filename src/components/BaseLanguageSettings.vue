<template>
  <div class="setting-item">
    <label for="language">Idioma:</label>
    <select id="language" :value="selectedLanguage" @input="updateLanguage($event)">
      <option value="pt">Português</option>
      <option value="en">Inglês</option>
      <option value="es">Espanhol</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Prop recebida do componente pai
const props = defineProps({
  selectedLanguage: String,
});

// Emitir evento para atualizar o valor de selectedLanguage
const emit = defineEmits(['update:selectedLanguage']);

function updateLanguage(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:selectedLanguage', target.value);
}
</script>
