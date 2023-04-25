// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';

// Interfaces
import { LoginCredentials } from "../../../../models/account.js";

const prisma = new PrismaClient();

class AuthenticateUserUseCase {
  execute = async ({ email, password }: LoginCredentials) => {
    const account = await prisma.account.findFirst({
      where: {
        email,
        password
      }
    });

    if (account) return account;

    throw new AppError(`E-mail or password invalid`, 401);
    // In case account does not exists, returns 401
  }
}

export default AuthenticateUserUseCase;