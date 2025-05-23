<template>
  <div class="settings-page">
    <div class="settings-header">
      <div class="header-title-with-controls">
        <h1>{{ $t('settings.title') }}</h1>
        <div class="top-controls-inline">
          <div class="language-wrapper">
            <BaseTooltipButton label="Trocar idioma" @click="toggleLanguageMenu">
              <span class="current-language">
                {{ getFlag(locale) }}
                <span class="arrow" :class="{ open: languageMenuVisible }">▾</span>
              </span>
            </BaseTooltipButton>
            <div v-if="languageMenuVisible" class="language-options">
              <span v-for="lang in otherLanguages" :key="lang" @click.stop="selectLanguage(lang)">
                {{ getFlag(lang) }}
              </span>
            </div>
          </div>

          <BaseTooltipButton label="Alternar Tema" @click="toggleTheme">
            <div class="theme-switcher">
              <span>{{ currentTheme === 'dark' ? '🌙' : '☀️' }}</span>
            </div>
          </BaseTooltipButton>
        </div>
      </div>

      <div class="tabs">
        <button class="tab-button" :class="{ active: activeTab === 'notifications' }"
          @click="activeTab = 'notifications'">
          <BellIcon />
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'user' }" @click="activeTab = 'user'">
          <UserIcon />
        </button>
      </div>
    </div>

    <div class="settings-content">
      <div v-if="activeTab === 'notifications'">
        <BaseNotificationSettings :notificationsEnabled="notificationsEnabled" :notificationEmail="notificationEmail"
          :notificationPhone="notificationPhone" @update:notificationsEnabled="notificationsEnabled = $event"
          @update:notificationEmail="notificationEmail = $event"
          @update:notificationPhone="notificationPhone = $event" />
      </div>
      <div v-if="activeTab === 'user'">
        <BaseUserSettings :userName="userName" :dn="dn" :email="email" @update:userName="userName = $event"
          @update:dn="dn = $event" @update:email="email = $event" />
      </div>
    </div>

    <BaseActionButtons :isFormValid="isFormValid" @save="saveSettings" @cancel="cancelreturn" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useLanguage } from '@/components/composable/useLanguage.ts';

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

// Estado do formulário
const notificationEmail = ref(localStorage.getItem('notificationEmail') || '');
const notificationPhone = ref(localStorage.getItem('notificationPhone') || '');
const userName = ref(localStorage.getItem('userName') || '');
const dn = ref(localStorage.getItem('dn') || '');
const email = ref(localStorage.getItem('email') || '');

// Estado de interface
const activeTab = ref<'notifications' | 'user'>('notifications');
const notificationsEnabled = ref(true);

// Router
const router = useRouter();

// Tema
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.theme);
function toggleTheme() {
  themeStore.toggleTheme();
}
function applyTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
}
onMounted(() => {
  applyTheme(currentTheme.value);
});
watch(currentTheme, (theme) => {
  applyTheme(theme);
});

// Idioma
const {
  locale,
  changeLanguage,
  getFlag,
  otherLanguages
} = useLanguage();

const languageMenuVisible = ref(false);
function toggleLanguageMenu() {
  languageMenuVisible.value = !languageMenuVisible.value;
}
function selectLanguage(lang: string) {
  changeLanguage(lang);
  languageMenuVisible.value = false;
}

// Validação
const isFormValid = computed(() =>
  !!userName.value && !!dn.value && !!email.value
);

// Função para salvar configurações
function saveSettings() {
  localStorage.setItem('notificationEmail', notificationEmail.value);
  localStorage.setItem('notificationPhone', notificationPhone.value);
  localStorage.setItem('userName', userName.value);
  localStorage.setItem('dn', dn.value);
  localStorage.setItem('email', email.value);
  router.push({ name: 'AboutView' });
}

function cancelreturn() {
  router.push({ name: 'AboutView' });

}
//Função para restaurar dados salvos
//function restoreFromLocalStorage() {
//notificationEmail.value = localStorage.getItem('notificationEmail') || '';
//notificationPhone.value = localStorage.getItem('notificationPhone') || '';
//userName.value = localStorage.getItem('userName') || '';
//dn.value = localStorage.getItem('dn') || '';
//email.value = localStorage.getItem('email') || '';
//alert($t('settings.restored'));
//router.push({ name: 'AboutView' });
//}
</script>

<style scoped>
.settings-page {
  background-color: var(--neutral-bg);
  color: var(--text-color);
  padding: 20px;
}

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
  background-color: var(--neutral-bg-light);
  border: 1px solid var(--neutral-border);
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
  color: var(--text-color);
}

.language-options span:hover {
  background-color: #f0f0f0;
}

.theme-switcher {
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  color: var(--text-color);
}

.current-language {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-color);
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
</style>
