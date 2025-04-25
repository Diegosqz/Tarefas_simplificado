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
