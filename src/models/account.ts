export default interface Account {
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

export enum UserType {
  PROTECTOR = "PROTECTOR",
  ADMIN = "ADMIN"
}