// Dependencies
import { AnimalSpecie, PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js';

// Helpers
import generateUniqueId from '../../../../helpers/generateUniqueId.js';

// Models
import Animal from '../../../../models/animal.js';

interface params {
  complaint: {
    name: string,
    specie: AnimalSpecie,
    phone: string,
    description: string,
    address: {
      street: string,
      zipCode: string,
      complement?: string,
      city: string,
      state: string
    }
  }
}

const prisma = new PrismaClient();

class CreateComplaintUseCase {
  execute = async ({ complaint }: params) => {
    try {
      const queryResult = await prisma.complaint.create({
        data: {
          id: generateUniqueId(),
          name: complaint.name,
          specie: complaint.specie,
          phone: complaint.phone,
          description: complaint.description,
          address: {
            create: {
              id: generateUniqueId(),
              city: complaint.address.city,
              state: complaint.address.state,
              street: complaint.address.street,
              zipCode: complaint.address.zipCode,
              complement: complaint.address.complement
            }
          }
        },
        select: {
          id: true,
          name: true,
          specie: true,
          phone: true,
          description: true,
          addedAt: true,
          address: {
            select: {
              city: true,
              state: true,
              street: true,
              zipCode: true,
              complement: true
            }
          }
        }
      });

      return {
        id: queryResult.id,
        name: queryResult.name,
        specie: queryResult.specie,
        phone: queryResult.phone,
        description: queryResult.description,
        addedAt: queryResult.addedAt,
        address: {
          city: queryResult.address.city,
          state: queryResult.address.state,
          street: queryResult.address.street,
          zipCode: queryResult.address.zipCode,
          complement: queryResult.address.complement
        }
      }
    } catch (err) {
      console.error(err)
      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 400);

      throw err;
    }
  }
}

export default CreateComplaintUseCase;