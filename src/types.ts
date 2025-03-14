import { AccountType } from './const'

export type Tag = {
  text: string
}

export type Account = {
  id: string
  tags: Tag[]
  type: AccountType
  login: string
  password: string | null
}
