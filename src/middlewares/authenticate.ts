// Dependencies
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Error
import AppError from "../errors/AppError.js";

// Models
import { UserType } from "../models/account.js";
import { AuthToken, RequestWithAuth } from "../models/request.js";

// Use cases
import CheckIfAccountExistsUseCase from "../modules/account/useCases/authenticateUser/CheckIfAccountExistsUseCase.js";
import CheckIfAccountIsApproved from "../modules/account/useCases/authenticateUser/CheckIfAccountIsActive.js";

dotenv.config(); // Config dotenv
const SECRET_KEY = process.env.SECRET_KEY;


const invalidTokenError = new AppError("Invalid auth token", 403);
const tokenValidationError = new AppError("Could not validate token due to internal error", 500);

const checkIfAccountExistsUseCase = new CheckIfAccountExistsUseCase();
const checkIfAccountIsApproved = new CheckIfAccountIsApproved();

class Authenticate {
  private allowedUserTypes: UserType[] = [];
  private mustBeApproved: boolean;

  validateToken = async (token: string): Promise<AuthToken> => {
    if (!SECRET_KEY)
      throw tokenValidationError;

    try {
      const decodedToken = <AuthToken>(jwt.verify(token, SECRET_KEY));
      const accountExists = await checkIfAccountExistsUseCase.execute(decodedToken.id);

      if (accountExists)
        return decodedToken;

      throw invalidTokenError;
    } catch (err) {
      throw invalidTokenError;
    }
  }

  execute = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization)
      throw new AppError("Required auth token was not provided", 401);

    if (typeof authorization !== "string")
      throw invalidTokenError;

    const decodedToken = await this.validateToken(authorization);

    // Validates if user type is allowed
    if (this.allowedUserTypes.length && !this.allowedUserTypes.includes(decodedToken.type))
      throw new AppError("User has no access to this resource", 403);


    if (this.mustBeApproved) {
      const isApproved = await checkIfAccountIsApproved.execute(decodedToken.id);

      if (!isApproved)
        throw new AppError("User has no access to this resource", 403)
    }

    req.auth = decodedToken;

    return next();
  }

  constructor(allowedUserTypes: UserType[] | UserType = [], mustBeApproved: boolean = true) {
    if (!Array.isArray(allowedUserTypes)) this.allowedUserTypes = [allowedUserTypes];
    else this.allowedUserTypes = allowedUserTypes;

    this.mustBeApproved = mustBeApproved;
  }
}

export default Authenticate;