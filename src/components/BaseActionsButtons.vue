<template>
  <div class="action-buttons">
    <button class="save-button" @click="onSave" :disabled="!isFormValid">Salvar Configurações</button>
    <button class="cancel-button" @click="onCancel">Cancelar</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

// Props do componente
const { isFormValid } = defineProps<{ isFormValid: boolean }>();

const router = useRouter();

// Função para lidar com o clique no botão "Salvar"
function onSave() {
  // Emitir evento para salvar configurações
  emit('save');
}

// Função para lidar com o clique no botão "Cancelar"
function onCancel() {
  router.push({ name: 'AboutView' });
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 10px;
}

.save-button,
.cancel-button {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  background-color: #42b983;
  color: #fff;
  border: none;
}

.save-button:hover {
  background-color: #388e60;
}

.cancel-button {
  background-color: #f44336;
  color: #fff;
  border: none;
}

.cancel-button:hover {
  background-color: #e53935;
}
</style>
