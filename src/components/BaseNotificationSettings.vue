<template>
  <div>
    <div class="setting-item">
      <label for="notifications">Notificações:</label>
      <input type="checkbox" :checked="notificationsEnabled" @change="updateNotifications($event)" />
      <span>{{ notificationsEnabled ? 'Ativado' : 'Desativado' }}</span>
    </div>

    <div class="setting-item">
      <label for="notification-email">Email para Notificações:</label>
      <input
        id="notification-email"
        type="email"
        :value="notificationEmail"
        @input="updateEmail($event)"
        placeholder="exemplo@email.com"
      />
    </div>

    <div class="setting-item">
      <label for="notification-phone">Telefone para Notificações:</label>
      <input
        id="notification-phone"
        type="tel"
        :value="notificationPhone"
        @input="updatePhone($event)"
        placeholder="(11) 91234-5678"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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

function updateNotifications(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:notificationsEnabled', target.checked);
}

function updateEmail(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:notificationEmail', target.value);
}

function updatePhone(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:notificationPhone', target.value);
}
</script>
