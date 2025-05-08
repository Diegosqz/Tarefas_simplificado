<template>
  <div>
    <!-- Componente de Usuário (nome e idade) -->
    <div class="setting-item">
      <label for="name" class="input-label">
        <UserIcon class="icon" aria-hidden="true" />
      </label>
      <input id="name" v-model="localUserName" :placeholder="$t('settings.insertorname')" required />

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
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { UserIcon, CalendarIcon, MailIcon } from 'lucide-vue-next';

// Tradução
const { t } = useI18n();

// Props recebidas do pai
const props = defineProps<{
  userName: string;
  dn: string;
  email: string;
}>();

// Emit para atualizar valores no componente pai
const emit = defineEmits<{
  (e: 'update:userName', value: string): void;
  (e: 'update:dn', value: string): void;
  (e: 'update:email', value: string): void;
}>();

// Variáveis locais
const localUserName = ref(props.userName);
const localDn = ref(props.dn);
const localEmail = ref(props.email);

// Carregar dados do localStorage
onMounted(() => {
  const storedName = localStorage.getItem('userName');
  const storedDn = localStorage.getItem('dn');
  const storedEmail = localStorage.getItem('email');

  if (storedName) localUserName.value = storedName;
  if (storedDn) localDn.value = storedDn;
  if (storedEmail) localEmail.value = storedEmail;
});

// Watchers para salvar e emitir alterações
watch(localUserName, (val) => {
  emit('update:userName', val);
  localStorage.setItem('userName', val);
});

watch(localDn, (val) => {
  emit('update:dn', val);
  localStorage.setItem('dn', val);
});

watch(localEmail, (val) => {
  emit('update:email', val);
  localStorage.setItem('email', val);
});
</script>

<style scoped>
.setting-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
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
