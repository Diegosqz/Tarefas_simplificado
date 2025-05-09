<template>
  <div class="action-buttons">
    <button class="save-button" @click="onSave" :disabled="!isFormValid">
      {{ $t('Save Settings') }}
    </button>
    <button class="cancel-button" @click="onCancel">
      {{ $t('user.cancel') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

// Props
const { isFormValid } = defineProps<{ isFormValid: boolean }>();

// Emits
const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'cancel'): void; // Novo emit opcional
}>();

const router = useRouter();

// Salvar e redirecionar
function onSave() {
  emit('save');
  console.log('Botão Salvar clicado!');
  router.replace({ name: 'AboutView' });
}

// Cancelar: emitir e redirecionar
function onCancel() {
  emit('cancel'); // Permite ao pai restaurar valores salvos, se necessário
  console.log('Botão Cancelar clicado!');
  router.replace({ name: 'AboutView' });
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.save-button,
.cancel-button {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
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
