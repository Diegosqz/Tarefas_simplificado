<template>
  <div class="settings-page">
    <div class="settings-header">
      <!-- Título e controles -->
      <div class="header-title-with-controls">
        <h1>{{ t('pt-BR.Settings.title') }}</h1>
        <div class="top-controls-inline">
          <!-- Botão e menu de idioma -->
          <div class="language-wrapper">
            <BaseTooltipButton label="Trocar idioma" @click="toggleLanguageMenu">
              <span class="current-language">
                {{ getFlag(currentLanguage) }}
                <span class="arrow" :class="{ open: languageMenuVisible }">▾</span>
              </span>
            </BaseTooltipButton>

            <div v-if="languageMenuVisible" class="language-options">
              <span v-for="lang in otherLanguages" :key="lang" @click.stop="changeLanguage(lang)">
                {{ getFlag(lang) }}
              </span>
            </div>
          </div>

          <!-- Botão de tema -->
          <BaseTooltipButton label="Alternar Tema" @click="toggleTheme">
            <div class="theme-switcher">
              <span>{{ currentTheme === 'dark' ? '🌙' : '☀️' }}</span>
            </div>
          </BaseTooltipButton>
        </div>
      </div>

      <!-- Abas -->
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

    <!-- Conteúdo -->
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

import {
  BellIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon
} from 'lucide-vue-next';

import BaseNotificationSettings from '@/components/BaseNotificationSettings.vue';
import BaseUserSettings from '@/components/BaseUserSettings.vue';
import BaseActionButtons from '@/components/BaseActionsButtons.vue';
import BaseTooltipButton from '@/components/BaseTooltipButton.vue';

const router = useRouter();
const { t, locale } = useI18n();

// Idioma
const currentLanguage = ref('pt');
const languageMenuVisible = ref(false);
const availableLanguages = ['en', 'pt', 'es'];
const otherLanguages = computed(() =>
  availableLanguages.filter(lang => lang !== currentLanguage.value)
);

function toggleLanguageMenu() {
  languageMenuVisible.value = !languageMenuVisible.value;
}

function changeLanguage(lang: string) {
  currentLanguage.value = lang;
  locale.value = lang;
  languageMenuVisible.value = false;
}

function getFlag(lang: string): string {
  switch (lang) {
    case 'pt': return '🇧🇷';
    case 'en': return '🇺🇸';
    case 'es': return '🇪🇸';
    default: return '🌐';
  }
}

// Tema
const currentTheme = ref(localStorage.getItem('theme') || 'light');

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('dark-theme', currentTheme.value === 'dark');
  localStorage.setItem('theme', currentTheme.value);
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(currentTheme.value);
}

// Tabs e conteúdo
const activeTab = ref<'notifications' | 'user'>('notifications');
const notificationsEnabled = ref(true);
const notificationEmail = ref('');
const notificationPhone = ref('');
const userName = ref('');
const dn = ref('');
const email = ref('');
const isFormValid = computed(() =>
  !!userName.value && !!dn.value && !!email.value
);

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
.settings-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-title-with-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.top-controls-inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-wrapper {
  position: relative;
}

.language-options {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 5px;
  z-index: 100;
  min-width: 40px;
}

.language-options span {
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
}

.language-options span:hover {
  background-color: #f0f0f0;
}

.theme-switcher {
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}

.current-language {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.arrow {
  font-size: 14px;
  color: #555;
  transition: transform 0.2s ease;
  display: inline-block;
}

.arrow.open {
  transform: rotate(180deg);
}

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

body.dark-theme {
  background-color: #121212;
  color: #e0e0e0;
}
</style>
