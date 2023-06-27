// Dependencies
import { AnimalSpecie, ComplaintStatus, PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js';

interface params {
  id: string,
  status: ComplaintStatus
}

const prisma = new PrismaClient();

class UpdateComplaintUseCase {
  execute = async ({ id, status }: params) => {
    try {
      const queryResult = await prisma.complaint.update({
        data: {
          status,
        },
        select: {
          id: true,
          name: true,
          specie: true,
          phone: true,
          description: true,
          status: true,
          addedAt: true,
          situation: true,
          address: {
            select: {
              district: true,
              city: true,
              state: true,
              street: true,
              zipCode: true,
              complement: true
            }
          }
        },
        where: {
          id
        }
      });

      return {
        id: queryResult.id,
        name: queryResult.name,
        specie: queryResult.specie,
        phone: queryResult.phone,
        description: queryResult.description,
        status: queryResult.status,
        addedAt: queryResult.addedAt,
        situation: queryResult.situation,
        address: {
          district: queryResult.address.district,
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

export default UpdateComplaintUseCase;