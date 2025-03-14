import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { AccountType } from '@/const'
import type { Tag, Account } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem('accounts') || '[]'))
  const toast = useToast()

  function addEmptyAccount(): void {
    accounts.value.push({
      id: crypto.randomUUID(),
      tags: [],
      type: AccountType.ldap,
      login: '',
      password: null,
    })
  }

  function updateAccount(params: {
    id: string
    tags: Tag[]
    type: AccountType
    login: string
    password: string
  }): void {
    const { id, tags, type, login, password } = params
    const accountIndex = accounts.value.findIndex((account) => account.id === id)
    if (accountIndex === -1) return

    accounts.value[accountIndex].tags = tags
    accounts.value[accountIndex].type = type
    accounts.value[accountIndex].login = login
    accounts.value[accountIndex].password = password

    localStorage.setItem('accounts', JSON.stringify(accounts.value))
    toast.add({ severity: 'success', summary: 'Учетная запись сохранена', life: 3000 })
  }

  function removeAccount(id: string): void {
    const accountIndex = accounts.value.findIndex((acc) => acc.id === id)
    if (accountIndex === -1) return

    accounts.value.splice(accountIndex, 1)
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
    toast.add({ severity: 'info', summary: 'Учетная запись удалена', life: 3000 })
  }

  return {
    accounts,
    addEmptyAccount,
    updateAccount,
    removeAccount,
  }
})
