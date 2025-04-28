<template>
  <div>
    <!-- Componente de Usuário (nome e idade) -->
    <div class="setting-item">
      <label for="name">{{ t(name.message) }}
      </label>
      <input id="name" v-model="localUserName" :placeholder="t('insertorname.message')" required />

      <label for="dn">{{ t('birthdate.message') }}
      </label>
      <input id="dn" type="date" v-model="localDn" required />
    </div>

    <!-- Campo de Email -->
    <div class="setting-item">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="localEmail" placeholder="exemplo@email.com" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

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
}
</style>
