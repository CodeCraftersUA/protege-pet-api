// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js';

// Models
import Animal from '../../../../models/animal.js';


interface params {
  id: string,
  animal: Animal
}

const prisma = new PrismaClient();

class UpdateAnimalUseCase {
  execute = async ({ id, animal }: params): Promise<Animal> => {
    try {
      const queryResult = await prisma.animal.update({
        data: {
          name: animal.name,
          specie: animal.specie,
          gender: animal.gender,
          description: animal.description,
        },
        where: { id },
        select: {
          id: true,
          name: true,
          gender: true,
          specie: true,
          description: true,
          sickness: {
            select: {
              sickness: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          owner: false,
          addedAt: true,
          account: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return {
        id: queryResult.id,
        gender: queryResult.gender,
        specie: queryResult.specie,
        name: queryResult.name,
        addedAt: queryResult.addedAt,
        description: queryResult.description,
        sickness: queryResult.sickness.map(sickness => ({
          id: sickness.sickness.id,
          name: sickness.sickness.name
        })),
        account: {
          id: queryResult.account.id,
          name: queryResult.account.name
        }
      }
    } catch (err) {
      console.error(err)
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 409);

      throw err;
    }
  }
}

export default UpdateAnimalUseCase;