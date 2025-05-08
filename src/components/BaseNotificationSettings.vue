<template>
  <div>
    <!-- Notificações -->
    <div class="setting-item">
      <label for="Notificações">{{ $t('settings.notifications') }}:</label>
      <div class="status-toggle">
        <span>{{ notificationsEnabled ? $t('settings.enabled') : $t('settings.disabled') }}</span>
        <input id="notifications" type="checkbox" :checked="notificationsEnabled" @change="updateNotifications" />
      </div>
    </div>

    <!-- Email principal -->
    <div class="setting-item">
      <label for="notification-email">{{ $t('settings.email') }}:</label>
      <div class="input-wrapper">
        <input id="notification-email" type="email" v-model="mainEmail" :readonly="mainEmailLocked"
          :placeholder="$t('settings.email')" :class="{ 'input-error': mainEmailError }" @input="clearMainEmailError" />
        <span v-if="mainEmailError" class="error-text">Campo vazio não pode ser adicionado</span>
      </div>
      <div class="actions">
        <button v-if="mainEmailLocked && mainEmail" @click="editMainEmail">✏️</button>
        <button v-else @click="lockMainEmail">✔️</button>
      </div>
    </div>

    <!-- Emails adicionais -->
    <div v-for="(email, index) in additionalEmails" :key="`email-${index}`" class="setting-item">
      <label class="placeholder-label"></label>
      <div class="input-wrapper">
        <input type="email" v-model="email.value" :readonly="email.locked" :placeholder="$t('settings.addEmail')"
          :class="{ 'input-error': emailErrors.includes(index) }" @input="clearEmailError(index)" />
        <span v-if="emailErrors.includes(index)" class="error-text">Campo vazio não pode ser adicionado</span>
      </div>
      <div class="actions">
        <template v-if="pendingEmailDeletion === index">
          <button @click="confirmRemoveEmail(index)">✅</button>
          <button @click="cancelRemoveEmail">❌</button>
        </template>
        <template v-else>
          <button v-if="email.value && email.locked" @click="editEmail(index)">✏️</button>
          <button v-else @click="lockEmail(index)">✔️</button>
          <button @click="askRemoveEmail(index)">🗑️</button>
        </template>
      </div>
    </div>

    <div class="setting-item">
      <span class="placeholder-label"></span>
      <button class="add-button" @click="addEmail">{{ $t('settings.addEmail') }}</button>
    </div>

    <!-- Telefone principal -->
    <div class="setting-item">
      <label for="notification-phone">{{ $t('settings.phone') }}:</label>
      <div class="input-wrapper">
        <input id="notification-phone" type="tel" v-model="mainPhone" :readonly="mainPhoneLocked"
          :placeholder="$t('settings.phone')" :class="{ 'input-error': mainPhoneError }" @input="clearMainPhoneError" />
        <span v-if="mainPhoneError" class="error-text">Campo vazio não pode ser adicionado</span>
      </div>
      <div class="actions">
        <button v-if="mainPhoneLocked && mainPhone" @click="editMainPhone">✏️</button>
        <button v-else @click="lockMainPhone">✔️</button>
      </div>
    </div>

    <!-- Telefones adicionais -->
    <div v-for="(phone, index) in additionalPhones" :key="`phone-${index}`" class="setting-item">
      <label class="placeholder-label"></label>
      <div class="input-wrapper">
        <input type="tel" v-model="phone.value" :readonly="phone.locked" :placeholder="$t('settings.addPhone')"
          :class="{ 'input-error': phoneErrors.includes(index) }" @input="clearPhoneError(index)" />
        <span v-if="phoneErrors.includes(index)" class="error-text">Campo vazio não pode ser adicionado</span>
      </div>
      <div class="actions">
        <template v-if="pendingPhoneDeletion === index">
          <button @click="confirmRemovePhone(index)">✅</button>
          <button @click="cancelRemovePhone">❌</button>
        </template>
        <template v-else>
          <button v-if="phone.value && phone.locked" @click="editPhone(index)">✏️</button>
          <button v-else @click="lockPhone(index)">✔️</button>
          <button @click="askRemovePhone(index)">🗑️</button>
        </template>
      </div>
    </div>

    <div class="setting-item">
      <span class="placeholder-label"></span>
      <button class="add-button" @click="addPhone">{{ $t('settings.addPhone') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.theme);

function applyTheme(theme: string) {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
}
onMounted(() => applyTheme(currentTheme.value));
watch(currentTheme, (theme) => applyTheme(theme));

// Props e Emits
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

// Main email/phone state
const mainEmail = ref(props.notificationEmail || '');
const mainPhone = ref(props.notificationPhone || '');
const mainEmailLocked = ref(false);
const mainPhoneLocked = ref(false);
const mainEmailError = ref(false);
const mainPhoneError = ref(false);

// Emit on change
watch(mainEmail, (val) => emit('update:notificationEmail', val));
watch(mainPhone, (val) => emit('update:notificationPhone', val));

// Modelos adicionais
type InputItem = { value: string; locked: boolean };
const additionalEmails = ref<InputItem[]>([]);
const additionalPhones = ref<InputItem[]>([]);

const pendingEmailDeletion = ref<number | null>(null);
const pendingPhoneDeletion = ref<number | null>(null);

const emailErrors = ref<number[]>([]);
const phoneErrors = ref<number[]>([]);

// Principal
function lockMainEmail() {
  if (mainEmail.value.trim()) {
    mainEmailLocked.value = true;
    mainEmailError.value = false;
  } else {
    mainEmailError.value = true;
  }
}
function editMainEmail() {
  mainEmailLocked.value = false;
}
function clearMainEmailError() {
  if (mainEmail.value.trim()) {
    mainEmailError.value = false;
  }
}

function lockMainPhone() {
  if (mainPhone.value.trim()) {
    mainPhoneLocked.value = true;
    mainPhoneError.value = false;
  } else {
    mainPhoneError.value = true;
  }
}
function editMainPhone() {
  mainPhoneLocked.value = false;
}
function clearMainPhoneError() {
  if (mainPhone.value.trim()) {
    mainPhoneError.value = false;
  }
}

// Emails adicionais
function addEmail() {
  additionalEmails.value.push({ value: '', locked: false });
}
function lockEmail(index: number) {
  const email = additionalEmails.value[index];
  if (email.value.trim()) {
    email.locked = true;
    emailErrors.value = emailErrors.value.filter(i => i !== index);
  } else {
    if (!emailErrors.value.includes(index)) emailErrors.value.push(index);
  }
}
function editEmail(index: number) {
  additionalEmails.value[index].locked = false;
}
function askRemoveEmail(index: number) {
  pendingEmailDeletion.value = index;
}
function cancelRemoveEmail() {
  pendingEmailDeletion.value = null;
}
function confirmRemoveEmail(index: number) {
  additionalEmails.value.splice(index, 1);
  pendingEmailDeletion.value = null;
}
function clearEmailError(index: number) {
  if (additionalEmails.value[index].value.trim()) {
    emailErrors.value = emailErrors.value.filter(i => i !== index);
  }
}

// Telefones adicionais
function addPhone() {
  additionalPhones.value.push({ value: '', locked: false });
}
function lockPhone(index: number) {
  const phone = additionalPhones.value[index];
  if (phone.value.trim()) {
    phone.locked = true;
    phoneErrors.value = phoneErrors.value.filter(i => i !== index);
  } else {
    if (!phoneErrors.value.includes(index)) phoneErrors.value.push(index);
  }
}
function editPhone(index: number) {
  additionalPhones.value[index].locked = false;
}
function askRemovePhone(index: number) {
  pendingPhoneDeletion.value = index;
}
function cancelRemovePhone() {
  pendingPhoneDeletion.value = null;
}
function confirmRemovePhone(index: number) {
  additionalPhones.value.splice(index, 1);
  pendingPhoneDeletion.value = null;
}
function clearPhoneError(index: number) {
  if (additionalPhones.value[index].value.trim()) {
    phoneErrors.value = phoneErrors.value.filter(i => i !== index);
  }
}
</script>

<style scoped>
.setting-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.setting-item label,
.setting-item .placeholder-label {
  width: 120px;
  flex-shrink: 0;
}

.setting-item input {
  flex: 1;
  padding: 6px;
}

input[readonly] {
  background-color: #f4f4f4;
  color: #555;
  border-color: #ccc;
}

.status-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actions {
  display: flex;
  gap: 4px;
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
}

.add-button:hover {
  background: #0056b3;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  color: #333;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-error {
  border: 1px solid red;
  background-color: #ffe6e6;
}

.error-text {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
