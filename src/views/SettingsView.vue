<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1>{{ t('pt-BR.Settings.title') }}</h1>
      <!-- Abas horizontais com ícones -->
      <div class="tabs">
        <button class="tab-button" :class="{ active: activeTab === 'notifications' }"
          @click="activeTab = 'notifications'" aria-label="Notificações">
          <BellIcon />
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'user' }" @click="activeTab = 'user'"
          aria-label="Usuário">
          <UserIcon />
        </button>
      </div>
    </div>

    <!-- Conteúdo das configurações com base na aba selecionada -->
    <div class="settings-content">
      <div v-if="activeTab === 'notifications'">
        <BaseNotificationSettings :icon-email="MailIcon" :icon-phone="PhoneIcon"
          :notificationsEnabled="notificationsEnabled" :notificationEmail="notificationEmail"
          :notificationPhone="notificationPhone" @update:notificationsEnabled="notificationsEnabled = $event"
          @update:notificationEmail="notificationEmail = $event"
          @update:notificationPhone="notificationPhone = $event" />
      </div>
      <div v-if="activeTab === 'user'">
        <BaseUserSettings :icon-name="UserIcon" :icon-dn="CalendarIcon" :icon-email="MailIcon" :userName="userName"
          :dn="dn" :email="email" @update:userName="userName = $event" @update:dn="dn = $event"
          @update:email="email = $event" />
      </div>
    </div>

    <BaseActionButtons :isFormValid="isFormValid" @save="saveSettings" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// Import de ícones (lucide-vue-next)
import { BellIcon, UserIcon, MailIcon, PhoneIcon, CalendarIcon } from 'lucide-vue-next';
import BaseNotificationSettings from '@/components/BaseNotificationSettings.vue';
import BaseUserSettings from '@/components/BaseUserSettings.vue';
import BaseActionButtons from '@/components/BaseActionsButtons.vue';

const { t } = useI18n();
const router = useRouter();
const activeTab = ref<'notifications' | 'user'>('notifications');

// Estados das configurações
const notificationsEnabled = ref(true);
const notificationEmail = ref('');
const notificationPhone = ref('');
const userName = ref('');
const dn = ref('');
const email = ref('');
const isFormValid = computed(() => !!userName.value && !!dn.value && !!email.value);

function saveSettings() {
  alert(
    `${t('pt-BR.user.save')}:\n` +
    `${userName.value} - ${t('pt-BR.user.name')}\n` +
    `${dn.value} - ${t('pt-BR.user.birthdate')}\n` +
    `${email.value} - ${t('pt-BR.settings.email')}`
  );
  router.push({ name: 'AboutView' });
}
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 16px;
}

.tab-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-color);
  transition: color 0.2s, background 0.2s;
}

.tab-button.active {
  color: var(--primary-color);
}

.tab-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.settings-content {
  margin-top: 20px;
}
</style>
