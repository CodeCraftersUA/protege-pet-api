// Dependencies
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Errors
import AppError from "../../../../errors/AppError.js";

// UseCases
import AuthenticateUserUseCase from "./AuthenticateUserUseCase.js";

dotenv.config(); // Config dotenv
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUserUseCase = new AuthenticateUserUseCase();

class AuthenticateUserController {
  handler = async (
    req: Request,
    res: Response
  ) => {

    const { email, password } = req.body;


    // Verify if user exists
    const account = await authenticateUserUseCase.execute({ email, password });

    // Data token contains
    const tokenData = {
      id: account.id,
      name: account.name,
      email: account.email,
      type: account.type
    }

    if (!SECRET_KEY) throw new AppError("Secret key missing", 500);
    const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: '720h' });

    res.status(200).json({
      token: `bearer ${token}`,
      expiresIn: 2592000000,
    });
  }
}

export default AuthenticateUserController;
