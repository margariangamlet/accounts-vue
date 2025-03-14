<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Password from 'primevue/password'
import IftaLabel from 'primevue/iftalabel'
import Toast from 'primevue/toast'
import { useAccount } from '@/composables/useAccount'
import { AccountType } from '@/const'
import type { Account } from '@/types'

const props = defineProps<{ account: Account }>()
const emit = defineEmits(['update'])
const {
  accountForm,
  areTagsValid,
  isLoginValid,
  isPasswordValid,
  areTagsTouched,
  isLoginTouched,
  isPasswordTouched,
  handleFieldChange,
} = useAccount({
  account: props.account,
  emit,
})
</script>

<template>
  <div
    :class="[
      'account-form-item',
      {
        'account-form-item_without-password': accountForm.type !== AccountType.local,
        'account-form-item_with-password': accountForm.type === AccountType.local,
      },
    ]"
  >
    <Toast />
    <IftaLabel>
      <InputText
        :id="`tags-${account.id}`"
        v-model="accountForm.tags"
        :invalid="!areTagsValid && areTagsTouched"
        fluid
        @blur="handleFieldChange('tags')"
      />
      <label :for="`tags-${account.id}`">Метки</label>
      <small class="account-form-item__error-text" v-if="!areTagsValid && areTagsTouched"
        >Не более 50 символов</small
      >
    </IftaLabel>

    <IftaLabel>
      <Select
        :inputId="`type-${account.id}`"
        v-model="accountForm.type"
        :options="[AccountType.ldap, AccountType.local]"
        fluid
        @change="handleFieldChange('type')"
      />
      <label :for="`type-${account.id}`">Тип записи</label>
    </IftaLabel>

    <IftaLabel>
      <InputText
        :id="`login-${account.id}`"
        v-model="accountForm.login"
        :invalid="!isLoginValid && isLoginTouched"
        fluid
        @blur="handleFieldChange('login')"
      />
      <label :for="`login-${account.id}`">Логин</label>
      <small class="account-form-item__error-text" v-if="!isLoginValid && isLoginTouched"
        >Обязательное поле, не более 100 символов</small
      >
    </IftaLabel>

    <IftaLabel v-if="accountForm.type === AccountType.local">
      <Password
        :id="`password-${account.id}`"
        v-model="accountForm.password"
        :invalid="!isPasswordValid && isPasswordTouched"
        toggleMask
        :feedback="false"
        fluid
        @blur="handleFieldChange('password')"
      />
      <label :for="`password-${account.id}`">Пароль</label>
      <small class="account-form-item__error-text" v-if="!isPasswordValid && isPasswordTouched"
        >Обязательное поле, не более 100 символов</small
      >
    </IftaLabel>

    <Button
      class="account-form-item__remove-button"
      icon="pi pi-trash"
      variant="text"
      severity="danger"
      aria-label="Удалить аккаунт"
      :data-deleteAccountId="account.id"
    />
  </div>
</template>

<style scoped>
.account-form-item {
  display: grid;
  grid-template-columns: 2fr 1fr 4fr 40px;
  align-items: start;
}

.account-form-item span {
  margin-right: 12px;
}

.account-form-item_without-password {
  grid-template-columns: 2fr 1fr 4fr 40px;
}

.account-form-item_with-password {
  grid-template-columns: 2fr 1fr 2fr 2fr 40px;
}

.account-form-item__remove-button {
  height: 52px;
}

.account-form-item__error-text {
  color: var(--p-red-600);
}
</style>
