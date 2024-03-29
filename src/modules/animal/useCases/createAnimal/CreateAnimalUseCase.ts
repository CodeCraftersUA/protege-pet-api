// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js';

// Helpers
import generateUniqueId from '../../../../helpers/generateUniqueId.js';

// Models
import Animal from '../../../../models/animal.js';


const prisma = new PrismaClient();

class CreateAccountUseCase {
  execute = async ({ animal, accountId }: { animal: Animal, accountId: string }): Promise<Animal> => {
    try {
      const animalSickness = animal.sickness.map(sickness => ({ sicknessId: sickness.id }));

      const queryResult = await prisma.animal.create({
        data: {
          id: generateUniqueId(),
          name: animal.name,
          specie: animal.specie,
          gender: animal.gender,
          owner: accountId,
          description: animal.description,
          sickness: {
            create: animalSickness
          }
        },
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
            },
            where: {
              sickness: {
                active: true
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

export default CreateAccountUseCase;