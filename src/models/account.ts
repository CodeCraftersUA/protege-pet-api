export default interface Account {
  id: number,
  name: string,
  type: UserType,
  email: string,
  password: string,
  cnpj: string
}

export interface LoginCredentials {
  email: string,
  password: string
}

export enum UserType {
  PROTECTOR = "PROTECTOR",
  ADMIN = "ADMIN"
}