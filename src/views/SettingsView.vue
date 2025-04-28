<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1>Configurações</h1>
      <!-- Abas horizontais -->
      <div class="tabs">
        <button class="tab-button" :class="{ active: activeTab === 'notifications' }"
          @click="activeTab = 'notifications'">
          Notificações
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'user' }" @click="activeTab = 'user'">
          Usuário
        </button>
      </div>
    </div>
    <!-- Conteúdo das configurações com base na aba selecionada -->
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
    <BaseActionButtons :isFormValid="isFormValid" @save="saveSettings" />
  </div>


</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import BaseNotificationSettings from '@/components/BaseNotificationSettings.vue';
import BaseActionButtons from '@/components/BaseActionsButtons.vue';
import BaseUserSettings from '@/components/BaseUserSettings.vue';

const { t } = useI18n();

const availableTabs = ['notifications', 'user'];
const activeTab = ref(availableTabs[0]);

const notificationsEnabled = ref(true);
const notificationEmail = ref('');
const notificationPhone = ref('');
const userName = ref('');
const dn = ref('');
const email = ref('');
const router = useRouter();

const isFormValid = computed(() => userName.value && dn.value && email.value);

function saveSettings() {
  alert(`${t('user.save')}:
    ${t('user.name')}: ${userName.value}
    ${t('user.birthdate')}: ${dn.value}
    ${t('settings.email')}: ${email.value}`);
  router.push({ name: 'AboutView' });
}
</script>
<!--<div v-if="activeTab === 'language'">
        <BaseLanguageSettings :selectedLanguage="selectedLanguage"
          @update:selectedLanguage="selectedLanguage = $event" />
      </div>-->
<!--<div v-if="activeTab === 'user'">
       Componente de Usuário (nome e idade)
        <div class="setting-item">
          <label for="name">Nome</label>
          <input id="name" v-model="userName" placeholder="Insira seu nome" required />
          <label for="dn">Data de nascimento</label>
          <input id="dn" type="date" v-model="dn" required />
        </div>
         Campo de Email
        <div class="setting-item">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="email" placeholder="exemplo@email.com" />
        </div>
      </div>-->
<!--<button class="tab-button" :class="{ active: activeTab === 'language' }" @click="activeTab = 'language'">
          Idioma
        </button>-->
<!--<div v-if="activeTab === 'theme'">
        <BaseThemeSettings :selectedTheme="selectedTheme" @update:selectedTheme="selectedTheme = $event" />
      </div>-->
<!-- Botões de ação -->
<!--<button class="tab-button" :class="{ active: activeTab === 'theme' }" @click="activeTab = 'theme'">
          Tema
        </button>-->
