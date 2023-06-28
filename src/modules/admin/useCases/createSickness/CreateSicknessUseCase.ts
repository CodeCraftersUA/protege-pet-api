// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js'

// Helpers
import generateUniqueId from '../../../../helpers/generateUniqueId.js';

// Models
import { NewSickness, Sickness } from '../../../../models/sickness.js';


const prisma = new PrismaClient();


class CreateSicknessUseCase {
  execute = async (sickness: NewSickness): Promise<Sickness> => {
    try {
      const queryResult = await prisma.sickness.create({
        data: {
          name: sickness.name,
          species: {
            create: sickness.species.map(specie => ({ specie }))
          },
          id: generateUniqueId(),
        },
        select: {
          id: true,
          name: true,
          species: {
            select: {
              specie: true
            }
          }
        }
      });

      return {
        id: queryResult.id,
        name: queryResult.name,
        species: queryResult.species.map(specie => specie.specie)
      };
    } catch (err) {
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 409);

      throw err;
    }
  }
}

export default CreateSicknessUseCase;