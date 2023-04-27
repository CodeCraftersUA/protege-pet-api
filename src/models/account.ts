export default interface Account {
  id: string,
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

export interface AuthToken {
  id: string,
  name: string,
  email: string,
  type: UserType,
  iat: number,
  exp: number
}