// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js';


interface params {
  id: string
}

const prisma = new PrismaClient();

class DeleteAnimalUseCase {
  execute = async ({ id }: params): Promise<void> => {
    try {
      await prisma.animal.update({
        data: {
          active: false
        },
        where: { id }
      });
    } catch (err) {
      console.error(err)
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 400);

      throw err;
    }
  }
}

export default DeleteAnimalUseCase;