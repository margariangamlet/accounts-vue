<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="accounts-form">
    <div class="accounts-form__header">
      <p class="accounts-form__header__title">Учетные записи</p>
      <Button icon="pi pi-plus" aria-label="Добавить аккаунт" variant="outlined" size="large" />
    </div>
    <div class="accounts-form__info-message">
      <i class="pi pi-question-circle"></i>
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>
  </div>
</template>

<style scoped>
.accounts-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 32px;

  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.accounts-form__header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.accounts-form__header__title {
  font-size: 24px;
  font-weight: bold;
}

.accounts-form__info-message {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 8px;
  border-radius: var(--p-border-radius-md);

  background-color: var(--p-emerald-600);
}
</style>
