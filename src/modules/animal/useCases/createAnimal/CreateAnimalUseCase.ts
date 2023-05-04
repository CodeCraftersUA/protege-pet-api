// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.ts';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.ts';

// Helpers
import generateUniqueId from '../../../../helpers/generateUniqueId.ts';

// Models
import Animal from '../../../../models/animal.ts';


const prisma = new PrismaClient();

class CreateAccountUseCase {
  execute = async ({ animal, accountId }: { animal: Animal, accountId: string }): Promise<void> => {
    try {
      const animalSickness = animal.sickness.map(sickness => ({ sicknessId: sickness.id }));

      await prisma.animal.create({
        data: {
          id: generateUniqueId(),
          name: animal.name,
          specie: animal.specie,
          gender: animal.gender,
          owner: accountId,
          sickness: {
            create: animalSickness
          }
        }
      });
    } catch (err) {
      console.error(err)
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 400);

      throw err;
    }
  }
}

export default CreateAccountUseCase;