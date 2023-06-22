// Dependencies
import { AnimalSpecie, PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js';

// Models
import { Sickness } from '../../../../models/sickness.js';


const prisma = new PrismaClient();

interface params {
  id: string,
  name?: string
}

class UpdateSicknessUseCase {
  private sicknessSelection = {
    id: true,
    name: true,
    species: {
      select: {
        specie: true
      }
    }
  }

  execute = async ({ id, name }: params): Promise<Sickness> => {
    try {
      const queryResult = await prisma.sickness.update({
        data: {
          name: name,
        },
        select: this.sicknessSelection,
        where: { id }
      });

      return {
        id: queryResult.id,
        name: queryResult.name,
        species: queryResult.species ? queryResult.species.map(specie => specie.specie) : []
      };
    } catch (err) {
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 400);

      throw err;
    }
  }
}

export default UpdateSicknessUseCase;