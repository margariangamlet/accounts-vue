<script setup lang="ts">
import Button from 'primevue/button'
import AccountFormItem from './AccountFormItem.vue'
import { useAccountsStore } from '@/stores/accounts'

const { accounts, addEmptyAccount, updateAccount, removeAccount } = useAccountsStore()

// Метод для удаления аккаунта использует механику делегирования событий
function handleRemoveAccount(event: Event): void {
  const element = (event.target as Element).closest('button')
  if (!element?.dataset.deleteaccountid) return

  removeAccount(element.dataset.deleteaccountid)
}
</script>

<template>
  <div class="accounts-form">
    <div class="accounts-form__header">
      <p class="accounts-form__header__title">Учетные записи</p>
      <Button
        icon="pi pi-plus"
        aria-label="Добавить аккаунт"
        variant="outlined"
        size="large"
        @click="addEmptyAccount"
      />
    </div>
    <div class="accounts-form__info-message">
      <i class="pi pi-question-circle"></i>
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <div class="accounts-form__accounts" @click="handleRemoveAccount">
      <AccountFormItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update="updateAccount"
      />
    </div>
  </div>
</template>

<style scoped>
.accounts-form {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 32px;

  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px;
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

  background-color: var(--p-emerald-500);
}

.accounts-form__accounts {
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
}
</style>
