// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.ts';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.ts'

// Helpers
import generateUniqueId from '../../../../helpers/generateUniqueId.ts';

// Models
import Account from '../../../../models/account.ts';


const prisma = new PrismaClient();

class CreateAccountUseCase {
  execute = async (account: Account) => {
    try {
      await prisma.account.create({
        data: {
          ...account,
          id: generateUniqueId(),
        }
      });
    } catch (err) {
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 400);

      throw err;
    }
  }
}

export default CreateAccountUseCase;