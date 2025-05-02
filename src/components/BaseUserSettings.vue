<template>
  <div>
    <!-- Componente de Usuário (nome e idade) -->
    <div class="setting-item">
      <label for="name" class="input-label">
        <UserIcon class="icon" aria-hidden="true" />
      </label>
      <input id="name" v-model="localUserName" :placeholder="$t('Settings.insertorname')" required />

      <label for="dn" class="input-label">
        <CalendarIcon class="icon" aria-hidden="true" />
      </label>
      <input id="dn" type="date" v-model="localDn" required />
    </div>

    <!-- Campo de Email -->
    <div class="setting-item">
      <label for="email" class="input-label">
        <MailIcon class="icon" aria-hidden="true" />
      </label>
      <input id="email" type="email" v-model="localEmail" placeholder="exemplo@email.com" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { UserIcon, CalendarIcon, MailIcon } from 'lucide-vue-next';
const { t } = useI18n();
const currentLanguage = ref('pt');
const languageMenuVisible = ref(false);
const availableLanguages = ['en', 'pt', 'es'];
const currentTheme = ref(localStorage.getItem('theme') || 'light');

// Alternar tema claro/escuro
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('dark-theme', currentTheme.value === 'dark');
  localStorage.setItem('theme', currentTheme.value);
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(currentTheme.value);
}

// Menu de idiomas
function toggleLanguageMenu() {
  languageMenuVisible.value = !languageMenuVisible.value;
}
const otherLanguages = computed(() => availableLanguages.filter(lang => lang !== currentLanguage.value));
function changeLanguage(lang: string) {
  watch(currentLanguage, (lang) => {
    locale.value = lang;
  });
  languageMenuVisible.value = false;
  console.log(`Idioma trocado para: ${lang}`);
}
function getFlag(lang: string): string {
  switch (lang) {
    case 'pt': return '🇧🇷';
    case 'en': return '🇺🇸';
    case 'es': return '🇪🇸';
    default: return '🌐';
  }
}

// Props
const props = defineProps<{
  userName: string;
  dn: string;
  email: string;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:userName', value: string): void;
  (e: 'update:dn', value: string): void;
  (e: 'update:email', value: string): void;
}>();

// Refs locais para evitar mutação direta
const localUserName = ref(props.userName);
const localDn = ref(props.dn);
const localEmail = ref(props.email);

// Watchers para emitir atualizações ao pai
watch(localUserName, (val) => emit('update:userName', val));
watch(localDn, (val) => emit('update:dn', val));
watch(localEmail, (val) => emit('update:email', val));
</script>

<style scoped>
.setting-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.input-label {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--text-color);
}

.setting-item input {
  flex: 1;
  padding: 6px 8px;
}
</style>
