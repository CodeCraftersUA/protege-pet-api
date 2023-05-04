// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.ts';

// Models
import { LoginCredentials } from "../../../../models/account.ts";

// Utils
import Crypto from '../../../../utils/Crypto.ts';

const prisma = new PrismaClient();
const crypto = new Crypto();

class AuthenticateUserUseCase {
  execute = async ({ email, password }: LoginCredentials) => {
    const account = await prisma.account.findFirst({
      where: { email }
    });

    if (account) {
      const isPasswordValid = await crypto.compare(password, account.password);
      if (isPasswordValid) return account;
    }

    throw new AppError(`E-mail or password invalid`, 401);
  }
}

export default AuthenticateUserUseCase;