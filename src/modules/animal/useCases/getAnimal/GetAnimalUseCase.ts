// Dependencies
import { PrismaClient } from '@prisma/client';

// Models
import Animal from '../../../../models/animal.js';

// Errors
import { RECORD_TO_DELETE_DOES_NOT_EXIST } from '../../../../errors/prismaErrorsCodes.js';
import AppError from '../../../../errors/AppError.js';


const prisma = new PrismaClient();

interface params {
  id: string
}

class ListAnimalsUserCase {
  execute = async ({ id }: params): Promise<Animal> => {
    try {
      const queryResult = await prisma.animal.findUniqueOrThrow({
        select: {
          id: true,
          name: true,
          gender: true,
          specie: true,
          description: true,
          active: true,
          sickness: {
            select: {
              sickness: {
                select: {
                  id: true,
                  name: true,
                },
              },
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
        },
        where: {
          id,
        },
      }
      );

      if (!queryResult.active)
        throw new AppError("Could not locate animal", 404);

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
      if (err.code === RECORD_TO_DELETE_DOES_NOT_EXIST)
        throw new AppError("Could not locate animal", 404);

      throw err;
    }
  }
}

export default ListAnimalsUserCase;