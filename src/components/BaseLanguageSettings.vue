<template>
  <div class="setting-item">
    <label for="language">{{ t('LanguageSettings.Language') }}:</label>
    <select id="language" :value="selectedLanguage" @change="onChange">
      <option value="pt">
        <FlagIcon iso="br" /> {{ t('pt-BR.LanguageSettings.Portuguese') }}
      </option>
      <option value="en">
        <FlagIcon iso="us" /> {{ t('pt-BR.LanguageSettings.English') }}
      </option>
      <option value="es">
        <FlagIcon iso="es" /> {{ t('pt-BR.LanguageSettings.Espanhol') }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import 'vue-flag-icon';
const props = defineProps<{ selectedLanguage: string }>()
const emit = defineEmits<{
  (e: 'update:selectedLanguage', v: string): void
}>()

const { locale, t } = useI18n()

// Sincroniza o i18n
watch(() => props.selectedLanguage, v => {
  if (v) locale.value = v
})

function onChange(event: Event) {
  const v = (event.target as HTMLSelectElement).value
  emit('update:selectedLanguage', v)
  locale.value = v
}
</script>
