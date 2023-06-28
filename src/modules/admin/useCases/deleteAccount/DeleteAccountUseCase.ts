// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { RECORD_DOES_NOT_EXIST } from '../../../../errors/prismaErrorsCodes.js';


interface params {
  id: string
}

const prisma = new PrismaClient();

class DeleteAnimalUseCase {
  execute = async ({ id }: params): Promise<void> => {
    try {
      await prisma.account.delete({
        where: { id }
      });
    } catch (err) {
      console.error(err)
      if (err.code === RECORD_DOES_NOT_EXIST)
        throw new AppError(`Account was not found`, 4040);

      throw err;
    }
  }
}

export default DeleteAnimalUseCase;