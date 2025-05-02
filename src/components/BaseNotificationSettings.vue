<template>
  <div>

    <!-- Notificações -->
    <div class="setting-item">
      <label for="Notificações">{{ $t('Settings.notifications') }}:</label>
      <div class="status-toggle">
        <span>
          {{ notificationsEnabled ? $t('Settings.enabled') : $t('Settings.disabled') }}
        </span>
        <input id="notifications" type="checkbox" :checked="notificationsEnabled" @change="updateNotifications" />
      </div>
    </div>

    <!-- Email principal -->

    <div class="setting-item">
      <label for="notification-email">{{ $t('Settings.email') }}:</label>
      <input id="notification-email" type="email" :value="notificationEmail" @input="updateEmail"
        :placeholder="$t('Settings.email')" />
    </div>

    <!-- Emails adicionais -->

    <div v-for="(email, index) in additionalEmails" :key="`extra-email-${index}`" class="setting-item">
      <label class="placeholder-label"></label>
      <input type="email" v-model="additionalEmails[index]" :placeholder="$t('Settings.addEmail')" />
      <button type="button" @click="removeEmail(index)">🗑️</button>
    </div>

    <div class="setting-item">
      <span class="placeholder-label"></span>
      <button class="add-button" type="button" @click="addEmail">
        {{ $t('Settings.addEmail') }}
      </button>
    </div>

    <!-- Telefone principal -->

    <div class="setting-item">
      <label for="notification-phone">{{ $t('Settings.phone') }}:</label>
      <input id="notification-phone" type="tel" :value="notificationPhone" @input="updatePhone"
        :placeholder="$t('Settings.phone')" />
    </div>

    <!-- Telefones adicionais -->

    <div v-for="(phone, index) in additionalPhones" :key="`extra-phone-${index}`" class="setting-item">
      <label class="placeholder-label"></label>
      <input type="tel" v-model="additionalPhones[index]" :placeholder="$t('Settings.addPhone')" />
      <button type="button" @click="removePhone(index)">🗑️</button>
    </div>
    <div class="setting-item">
      <span class="placeholder-label"></span>
      <button class="add-button" type="button" @click="addPhone">
        {{ $t('Settings.addPhone') }}
      </button>
    </div>

  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
// Tema global com Pinia
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.theme);
function toggleTheme() {
  themeStore.toggleTheme();
}
// Aplicar classe do tema ao carregar e quando mudar
onMounted(() => {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(currentTheme.value);
});
watch(currentTheme, (theme) => {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
});
// Idioma local
const currentLanguage = ref('pt-BR');
const languageMenuVisible = ref(false);
const availableLanguages = ['pt-BR', 'en-US', 'es'];
const otherLanguages = computed(() => availableLanguages.filter(lang => lang !== currentLanguage.value));

function toggleLanguageMenu() {
  languageMenuVisible.value = !languageMenuVisible.value;
}
function changeLanguage(lang: string) {
  locale.value = lang;
  currentLanguage.value = lang;
  languageMenuVisible.value = false;
}

function getFlag(lang: string): string {
  switch (lang) {
    case 'pt-BR': return '🇧🇷';
    case 'en-US': return '🇺🇸';
    case 'es': return '🇪🇸';
    default: return '🌐';
  }
}

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
  const confirmed = window.confirm($t('Settings.removeConfirmationEmail'));
  if (confirmed) {
    additionalEmails.value.splice(index, 1);
  }
}
function addPhone() {
  additionalPhones.value.push('');
}
function removePhone(index: number) {
  const confirmed = window.confirm($t('Settings.removeConfirmationPhone'));
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

.page-wrapper {
  width: 100%;
  max-width: 1200px;
  /* largura máxima da "tela" */
  margin: 0 auto;
  /* centraliza horizontalmente */
  padding: 20px;
  /* espaço interno */
  box-sizing: border-box;
}
</style>
