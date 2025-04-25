<template>
  <div>
    <!-- Notificações -->
    <div class="setting-item">
      <label for="notifications">Notificações:</label>
      <div class="status-toggle">
        <span>{{ notificationsEnabled ? 'Ativado' : 'Desativado' }}</span>
        <input id="notifications" type="checkbox" :checked="notificationsEnabled" @change="updateNotifications" />
      </div>
    </div>

    <!-- Email principal -->
    <div class="setting-item">
      <label for="notification-email">Email:</label>
      <input id="notification-email" type="email" :value="notificationEmail" @input="updateEmail"
        placeholder="exemplo@email.com" />
    </div>

    <!-- Emails adicionais -->
    <div v-for="(email, index) in additionalEmails" :key="`extra-email-${index}`" class="setting-item">
      <label class="placeholder-label"></label>
      <input type="email" v-model="additionalEmails[index]" placeholder="Email adicional" />
      <button type="button" @click="removeEmail(index)">🗑️</button>
    </div>
    <div class="setting-item">
      <span class="placeholder-label"></span>
      <button class="add-button" type="button" @click="addEmail">
        + Adicionar Email
      </button>
    </div>

    <!-- Telefone principal -->
    <div class="setting-item">
      <label for="notification-phone">Telefone:</label>
      <input id="notification-phone" type="tel" :value="notificationPhone" @input="updatePhone"
        placeholder="(11) 91234-5678" />
    </div>

    <!-- Telefones adicionais -->
    <div v-for="(phone, index) in additionalPhones" :key="`extra-phone-${index}`" class="setting-item">
      <label class="placeholder-label"></label>
      <input type="tel" v-model="additionalPhones[index]" placeholder="Telefone adicional" />
      <button type="button" @click="removePhone(index)">🗑️</button>
    </div>
    <div class="setting-item">
      <span class="placeholder-label"></span>
      <button class="add-button" type="button" @click="addPhone">
        + Adicionar Telefone
      </button>
    </div>
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
.setting-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}

.setting-item label,
.setting-item .placeholder-label {
  width: 120px;
  flex-shrink: 0;
}

/* Override global input width:100% */
.setting-item input {
  flex: 1;
  width: auto;
}

.status-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-button {
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.add-button:hover {
  background: #0056b3;
}
</style>
