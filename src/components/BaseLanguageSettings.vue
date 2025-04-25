<template>
  <div class="setting-item">
    <label for="language">Idioma:</label>
    <select id="language" :value="selectedLanguage" @input="updateLanguage($event)">
      <option value="pt" :title="'Português'">
        <FlagIcon iso="br" /> Português
      </option>
      <option value="en" :title="'Inglês'">
        <FlagIcon iso="us" /> Inglês
      </option>
      <option value="es" :title="'Espanhol'">
        <FlagIcon iso="es" /> Espanhol
      </option>
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

<style scoped>
/* Aqui você pode adicionar estilos personalizados para o seu componente */
</style>
