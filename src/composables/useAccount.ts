import { computed, reactive, ref } from 'vue'
import { formatTags } from '@/utils/formatTags'
import { trimTags } from '@/utils/trimTags'
import { AccountType } from '@/const'
import type { Account } from '@/types'

export function useAccount(params: { account: Account; emit: any }) {
  const { account, emit } = params

  const accountForm = reactive({
    tags: account.tags.map(({ text }) => text).join(';'),
    type: account.type,
    login: account.login,
    password: account.password || '',
  })

  // Touched признаки обозначают, что пользователь притронулся к изменению поля
  // Нужны для того, чтобы показывать ошибки валидации после потери фокуса поля
  const areTagsTouched = ref(false)
  const isLoginTouched = ref(false)
  const isPasswordTouched = ref(false)

  const areTagsValid = computed<boolean>(() => accountForm.tags.length <= 50)
  const isLoginValid = computed<boolean>(
    () => Boolean(accountForm.login.trim()) && accountForm.login.length <= 100,
  )
  const isPasswordValid = computed<boolean>(
    () =>
      accountForm.type === AccountType.ldap ||
      (accountForm.type === AccountType.local &&
        Boolean(accountForm.password.trim()) &&
        accountForm.password.length <= 100),
  )

  function handleFieldChange(field: 'tags' | 'type' | 'login' | 'password') {
    if (field === 'tags') {
      areTagsTouched.value = true
      accountForm.tags = trimTags(accountForm.tags)
    }

    if (field === 'login') {
      isLoginTouched.value = true
      accountForm.login = accountForm.login.trim()
    }

    if (field === 'password') {
      isPasswordTouched.value = true
      accountForm.password = accountForm.password.trim()
    }

    if (field === 'type' && accountForm.type === AccountType.ldap) {
      isPasswordTouched.value = false
    }

    // Если хотя бы одно поле невалидно, то мы не добавляем/сохраняем учетную запись
    if (!areTagsValid.value || !isLoginValid.value || !isPasswordValid.value) return

    areTagsTouched.value = false
    isLoginTouched.value = false
    isPasswordTouched.value = false

    emit('update', {
      id: account.id,
      tags: formatTags(accountForm.tags),
      type: accountForm.type,
      login: accountForm.login.trim(),
      password: accountForm.type === AccountType.local ? accountForm.password.trim() : null,
    })
  }

  return {
    accountForm,
    areTagsValid,
    isLoginValid,
    isPasswordValid,
    areTagsTouched,
    isLoginTouched,
    isPasswordTouched,
    handleFieldChange,
  }
}
