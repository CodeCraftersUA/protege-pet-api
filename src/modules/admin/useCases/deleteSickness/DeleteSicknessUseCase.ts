// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { RECORD_DOES_NOT_EXIST } from '../../../../errors/prismaErrorsCodes.js';


interface params {
  id: string
}

const prisma = new PrismaClient();

class DeleteSicknessUseCase {
  execute = async ({ id }: params): Promise<void> => {
    try {
      await prisma.sickness.delete({
        where: { id }
      });
    } catch (err) {
      console.error(err)
      if (err.code === RECORD_DOES_NOT_EXIST)
        throw new AppError(`Record was not found`, 404);

      throw err;
    }
  }
}

export default DeleteSicknessUseCase;