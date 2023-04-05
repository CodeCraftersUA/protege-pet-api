// Dependencies
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Errors
import AppError from "../errors/AppError.js";

// Services
import * as authServices from "../services/auth.js";

dotenv.config(); // Config dotenv
const SECRET_KEY = process.env.SECRET_KEY;

interface LoginCredentials {
  email: String,
  password: String
}

const generateUserToken = async ({ email, password }: LoginCredentials = { email: "", password: "" }) => {
  // Verify if user exists
  const user = await authServices.fetchUserByEmailAndPassword(email, password);

  // Case user does not exists, returns 401
  if (!user) throw new AppError(`E-mail or password invalid`, 401);

  // Data token contains
  const tokenData = {
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type
  }

  const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: '720h' });

  return token;
}

export {
  generateUserToken
}