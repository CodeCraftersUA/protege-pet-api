// Dependencies
import { Request } from "express";

// Interface
import { UserType } from "./account.ts";


export interface RequestWithAuth extends Request {
  auth?: AuthToken
}

export interface AuthToken {
  id: string,
  name: string,
  email: string,
  type: UserType,
  iat: number,
  exp: number
}