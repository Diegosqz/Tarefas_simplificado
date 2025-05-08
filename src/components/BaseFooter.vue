<template>
  <footer class="footer">
    <p>{{ $t('Footer.developedBy') }}</p>
    <div class="social-icons">
      <!-- GitHub ou portfólio fictício como exemplo -->
      <a href="https://github.com/_diegosqz" target="_blank" aria-label="GitHub" rel="noopener noreferrer"
        class="icon-link">
        <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </a>

      <a href="https://wa.me/" target="_blank" aria-label="WhatsApp" rel="noopener noreferrer" class="icon-link">
        <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M16 13a4 4 0 0 1-7.9 1"></path>
          <path d="M16 13s1-3-4-3a4 4 0 1 0-3 3"></path>
          <path d="M2 15a10 10 0 1 0 10-10"></path>
          <path d="M19 21l-3-3"></path>
        </svg>
      </a>

      <a href="https://instagram.com/_diegosqz" target="_blank" aria-label="Instagram" rel="noopener noreferrer"
        class="icon-link">
        <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8"></path>
          <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
        </svg>
      </a>

      <a href="https://t.me/" target="_blank" aria-label="Telegram" rel="noopener noreferrer" class="icon-link">
        <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <polygon points="22 2 11 13 8 20 22 2"></polygon>
          <line x1="2" y1="12" x2="15" y2="15"></line>
        </svg>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
//import { useI18n } from 'vue-i18n';
//const { t } = useI18n();
</script>

<style scoped>
.footer {
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--neutral-border);
  text-align: center;
  user-select: none;
  background-color: var(--neutral-bg);
  color: #1693e0;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark .footer {
  background-color: #222;
  color: #ddd;
  border-color: #444;
}

.social-icons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.icon-link {
  color: inherit;
  transition: color 0.3s ease;
  display: flex;
}

.icon-link:hover,
.icon-link:focus {
  color: #42b983;
  outline: none;
  text-decoration: none;
}

.icon-link svg {
  display: block;
}
</style>
