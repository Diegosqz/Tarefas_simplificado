<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1>Configurações</h1>
      <!-- Abas horizontais -->
      <div class="tabs">
        <button class="tab-button" :class="{ active: activeTab === 'theme' }" @click="activeTab = 'theme'">
          Tema
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'notifications' }"
          @click="activeTab = 'notifications'">
          Notificações
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'language' }" @click="activeTab = 'language'">
          Idioma
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'user' }" @click="activeTab = 'user'">
          Usuário
        </button>
      </div>
    </div>

    <!-- Conteúdo das configurações com base na aba selecionada -->
    <div class="settings-content">
      <div v-if="activeTab === 'theme'">
        <BaseThemeSettings :selectedTheme="selectedTheme" @update:selectedTheme="selectedTheme = $event" />
      </div>

      <div v-if="activeTab === 'notifications'">
        <BaseNotificationSettings :notificationsEnabled="notificationsEnabled" :notificationEmail="notificationEmail"
          :notificationPhone="notificationPhone" @update:notificationsEnabled="notificationsEnabled = $event"
          @update:notificationEmail="notificationEmail = $event"
          @update:notificationPhone="notificationPhone = $event" />
      </div>

      <div v-if="activeTab === 'language'">
        <BaseLanguageSettings :selectedLanguage="selectedLanguage"
          @update:selectedLanguage="selectedLanguage = $event" />
      </div>

      <div v-if="activeTab === 'user'">
        <!-- Componente de Usuário (nome e idade) -->
        <div class="setting-item">
          <label for="name">Nome</label>
          <input id="name" v-model="userName" placeholder="Insira seu nome" required />

          <label for="dob">Data de nascimento</label>
          <input id="dob" type="date" v-model="dob" required />
        </div>

        <!-- Campo de Email -->
        <div class="setting-item">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="email" placeholder="exemplo@email.com" />
        </div>
      </div>
    </div>

    <!-- Botões de ação -->
    <BaseActionButtons :isFormValid="isFormValid" @save="saveSettings" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseThemeSettings from '@/components/BaseThemeSettings.vue';
import BaseLanguageSettings from '@/components/BaseLanguageSettings.vue';
import BaseNotificationSettings from '@/components/BaseNotificationSettings.vue';
import BaseActionButtons from '@/components/BaseActionsButtons.vue';

const activeTab = ref('theme');
const selectedTheme = ref('light');
const selectedLanguage = ref('pt');
const notificationsEnabled = ref(true);
const notificationEmail = ref('');
const notificationPhone = ref('');
const userName = ref('');
const dob = ref('');
const email = ref('');
const router = useRouter();

// Computed property para verificar se o formulário está válido
const isFormValid = computed(() => userName.value && dob.value && email.value);

// Função para salvar as configurações
function saveSettings() {
  alert(`Configurações salvas:
    Tema: ${selectedTheme.value}
    Idioma: ${selectedLanguage.value}
    Nome: ${userName.value}
    Data de Nascimento: ${dob.value}
    Email: ${email.value}`);
  router.push({ name: 'AboutView' });
}
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tab-button {
  background-color: #f0f0f0;
}

.tab-button.active {
  background-color: var(--primary-color);
  color: #fff;
  font-weight: bold;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
</style>
