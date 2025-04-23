<template>
  <div>
    <!-- Notificações -->
    <div class="setting-item">
      <label for="notifications">Notificações:</label>
      <input type="checkbox" :checked="notificationsEnabled" @change="updateNotifications($event)" />
      <span>{{ notificationsEnabled ? 'Ativado' : 'Desativado' }}</span>
    </div>

    <!-- Email principal -->
    <div class="setting-item">
      <label for="notification-email">Email para Notificações:</label>
      <input id="notification-email" type="email" :value="notificationEmail" @input="updateEmail($event)"
        placeholder="exemplo@email.com" />
    </div>

    <!-- Emails adicionais -->
    <div v-for="(email, index) in additionalEmails" :key="'extra-email-' + index" class="setting-item input-group">
      <input type="email" v-model="additionalEmails[index]" placeholder="Email adicional" />
      <button type="button" @click="removeEmail(index)">🗑️</button>
    </div>
    <button type="button" @click="addEmail">+ Adicionar Email</button>

    <!-- Telefone principal -->
    <div class="setting-item">
      <label for="notification-phone">Telefone para Notificações:</label>
      <input id="notification-phone" type="tel" :value="notificationPhone" @input="updatePhone($event)"
        placeholder="(11) 91234-5678" />
    </div>

    <!-- Telefones adicionais -->
    <div v-for="(phone, index) in additionalPhones" :key="'extra-phone-' + index" class="setting-item input-group">
      <input type="tel" v-model="additionalPhones[index]" placeholder="Telefone adicional" /> <button type="button"
        @click="removePhone(index)">🗑️</button>

    </div>
    <button type="button" @click="addPhone">+ Adicionar Telefone</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  notificationsEnabled: Boolean,
  notificationEmail: String,
  notificationPhone: String,
});

const emit = defineEmits([
  'update:notificationsEnabled',
  'update:notificationEmail',
  'update:notificationPhone',
]);

const additionalEmails = ref<string[]>([]);
const additionalPhones = ref<string[]>([]);

function updateNotifications(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:notificationsEnabled', target.checked);
}

function updateEmail(event: Event) {
  emit('update:notificationEmail', (event.target as HTMLInputElement).value);
}

function updatePhone(event: Event) {
  emit('update:notificationPhone', (event.target as HTMLInputElement).value);
}

// Add/remove extras
function addEmail() {
  additionalEmails.value.push('');
}
function removeEmail(index: number) {
  const confirmed = window.confirm('Deseja remover este email?');
  if (confirmed) {
    additionalEmails.value.splice(index, 1);
  }
}

function addPhone() {
  additionalPhones.value.push('');
}
function removePhone(index: number) {
  const confirmed = window.confirm('Deseja remover este telefone?');
  if (confirmed) {
    additionalPhones.value.splice(index, 1);
  }
}
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.input-group input {
  flex: 1;
  min-width: 0;
}

.input-group button {
  padding: 6px 10px;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
