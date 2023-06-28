// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js'

// Helpers
import generateUniqueId from '../../../../helpers/generateUniqueId.js';

// Models
import { NewAccount } from '../../../../models/account.js';


const prisma = new PrismaClient();

const defaultApprovedByType = {
  "PROTECTOR": false,
  "ADMIN": true
}

class CreateAccountUseCase {
  execute = async (account: NewAccount): Promise<string> => {
    try {
      const queryResult = await prisma.account.create({
        data: {
          ...account,
          approved: defaultApprovedByType[account.type],
          id: generateUniqueId(),
        }
      });

      return queryResult.id;
    } catch (err) {
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 409);

      throw err;
    }
  }
}

export default CreateAccountUseCase;