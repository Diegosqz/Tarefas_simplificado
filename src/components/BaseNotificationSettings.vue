<template>
  <div class="settings-wrapper">
    <!-- Notificações -->
    <div class="notification-row">
      <label for="notifications">Notificações:</label>
      <div class="status-toggle">
        <span>{{ notificationsEnabled ? 'Ativado' : 'Desativado' }}</span>
        <input id="notifications" type="checkbox" :checked="notificationsEnabled"
          @change="updateNotifications($event)" />
      </div>
    </div>

    <!-- Email principal -->
    <div class="setting-item">
      <label for="notification-email">Email:</label>
      <input id="notification-email" type="email" :value="notificationEmail" @input="updateEmail($event)"
        placeholder="exemplo@email.com" />
    </div>

    <!-- Emails adicionais -->
    <div v-for="(email, index) in additionalEmails" :key="'extra-email-' + index" class="input-group">
      <input type="email" v-model="additionalEmails[index]" placeholder="Email adicional" />
      <button type="button" @click="removeEmail(index)">🗑️</button>
    </div>
    <button class="add-button" type="button" @click="addEmail">
      + Adicionar Email
    </button>

    <!-- Telefone principal -->
    <div class="setting-item">
      <label for="notification-phone">Telefone:</label>
      <input id="notification-phone" type="tel" :value="notificationPhone" @input="updatePhone($event)"
        placeholder="(11) 91234-5678" />
    </div>

    <!-- Telefones adicionais -->
    <div v-for="(phone, index) in additionalPhones" :key="'extra-phone-' + index" class="input-group">
      <input type="tel" v-model="additionalPhones[index]" placeholder="Telefone adicional" />
      <button type="button" @click="removePhone(index)">🗑️</button>
    </div>
    <button class="add-button" type="button" @click="addPhone">
      + Adicionar Telefone
    </button>
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
/* Centralizador geral */
.settings-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Bloco geral de cada campo */
.setting-item {
  width: 100%;
  max-width: 400px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

/* Notificação - layout horizontal centralizado */
.notification-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.status-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Inputs agrupados com botão 🗑️ */
.input-group {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
}

.input-group input {
  flex: 1;
  min-width: 0;
}

.input-group button {
  padding: 6px 5px;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 18px;
}

/* Botões de adicionar */
.add-button {
  display: block;
  margin: 10px auto 20px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-button:hover {
  background: #0056b3;
}
</style>
