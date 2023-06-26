// Dependencies
import { AnimalSpecie, Complaint, PrismaClient } from '@prisma/client';

// Models
import Animal from '../../../../models/animal.js';


const prisma = new PrismaClient();

interface params {
  quantity: number,
  offset: number,
  specie?: AnimalSpecie,
}

interface ReturnType {
  options: {
    total: number,
    offset: number,
    quatity: number,
    length: number
  },
  data: Complaint[]
}

class ListComplaintUseCase {
  execute = async ({ quantity, offset, specie }: params) => {
    const queryResult = await prisma.$transaction([
      prisma.complaint.count({
        where: {
          status: {
            equals: 'REQUESTED'
          },
          specie: specie
        }
      }),
      prisma.complaint.findMany({
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
        },
        where: {
          status: {
            equals: 'REQUESTED'
          },
          specie: specie
        },
        take: quantity,
        skip: offset,
        orderBy: {
          addedAt: 'desc'
        }
      })
    ]);

    return {
      options: {
        total: queryResult[0],
        offset: offset,
        quatity: quantity,
        length: queryResult[1].length
      },
      data: queryResult[1].map(complaint => ({
        id: complaint.id,
        name: complaint.name,
        specie: complaint.specie,
        phone: complaint.phone,
        description: complaint.description,
        addedAt: complaint.addedAt,
        address: {
          city: complaint.address.city,
          state: complaint.address.state,
          street: complaint.address.street,
          zipCode: complaint.address.zipCode,
          complement: complaint.address.complement
        }
      }))
    }
  }
}

export default ListComplaintUseCase;