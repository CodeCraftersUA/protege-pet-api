// Dependencies
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Error
import AppError from "../errors/AppError.js";

// Models
import { UserType, AuthToken } from "../models/account.js";

dotenv.config(); // Config dotenv
const SECRET_KEY = process.env.SECRET_KEY;


const invalidTokenError = new AppError("Invalid auth token", 403);
const tokenValidationError = new AppError("Could not validate token due to internal error", 500);

class Authenticate {
  private allowedUserTypes: UserType[] = [];

  validateToken = (token: string): AuthToken => {
    if (!SECRET_KEY)
      throw tokenValidationError;

    try {
      return <AuthToken>(jwt.verify(token, SECRET_KEY));
    } catch (err) {
      throw invalidTokenError;
    }
  }

  execute = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { authorization } = req.headers;

    if (!authorization)
      throw new AppError("Required auth token was not provided", 401);

    if (typeof authorization !== "string")
      throw invalidTokenError;

    const decodedToken = this.validateToken(authorization);

    // Validates if user type is allowed
    if (this.allowedUserTypes.length && !this.allowedUserTypes.includes(decodedToken.type))
      throw new AppError("User has no access to this resource", 403);

    return next();
  }

  constructor(allowedUserTypes: UserType[] | UserType = []) {
    if (!Array.isArray(allowedUserTypes)) this.allowedUserTypes = [allowedUserTypes];
    else this.allowedUserTypes = allowedUserTypes;
  }
}

export default Authenticate;