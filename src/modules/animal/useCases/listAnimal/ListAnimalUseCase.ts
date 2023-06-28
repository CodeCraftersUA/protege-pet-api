// Dependencies
import { AnimalGender, AnimalSpecie, PrismaClient } from '@prisma/client';

// Models
import Animal from '../../../../models/animal.js';


const prisma = new PrismaClient();

interface params {
  quantity: number,
  offset: number,
  gender?: AnimalGender,
  specie?: AnimalSpecie,
  accountId?: string
}
interface ReturnType {
  options: {
    total: number,
    offset: number,
    quantity: number,
    length: number
  },
  data: Animal[]
}
class ListAnimalsUserCase {
  execute = async ({ quantity, offset, gender, specie, accountId }: params): Promise<ReturnType> => {
    const queryResult = await prisma.$transaction([
      prisma.animal.count({
        where: {
          active: true
        }
      }),
      prisma.animal.findMany({
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
          active: true,
          owner: accountId,
          gender: gender,
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
        quantity: quantity,
        length: queryResult[1].length
      },
      data: queryResult[1].map(animal => ({
        id: animal.id,
        gender: animal.gender,
        specie: animal.specie,
        name: animal.name,
        addedAt: animal.addedAt,
        description: animal.description,
        sickness: animal.sickness.map(sickness => ({
          id: sickness.sickness.id,
          name: sickness.sickness.name
        })),
        account: {
          id: animal.account.id,
          name: animal.account.name
        }
      }))
    }
  }
}

export default ListAnimalsUserCase;