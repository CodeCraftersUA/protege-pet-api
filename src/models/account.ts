export interface Account {
  id: string,
  name: string,
  email: string,
  cnpj: string | null,
  type: UserType,
}

export interface NewAccount {
  id: string,
  name: string,
  type: UserType,
  email: string,
  password: string,
  cnpj: string,
  active?: boolean
}
export interface LoginCredentials {
  email: string,
  password: string
}

export const UserType: { [x: string]: 'ADMIN' | 'PROTECTOR' } = {
  ADMIN: 'ADMIN',
  PROTECTOR: 'PROTECTOR'
}

export type UserType = typeof UserType[keyof typeof UserType]