<template>
  <div class="page-wrapper">
    <header class="page-header">
      <h1>
        <slot name="title" />
      </h1>
      <div class="header-controls">
        <slot name="controls" />
      </div>
    </header>
    <main class="page-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout básico compartilhado entre as views
</script>

<style scoped>
.page-wrapper {
  max-width: var(--page-max-width);
  margin: 2rem auto;
  padding: var(--page-padding);
  background: var(--neutral-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-light);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

.page-content {
  width: 100%;
}
</style>
