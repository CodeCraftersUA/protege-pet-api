// Dependencies
import { AnimalGender, AnimalSpecie, PrismaClient } from '@prisma/client';

// Models
import Animal from '../../../../models/animal.js';


const prisma = new PrismaClient();

interface params {
  quantity: number,
  offset: number,
  gender?: AnimalGender,
  specie?: AnimalSpecie ,
  accountId?: string
}
interface ReturnType {
  options: {
    total: number,
    offset: number,
    quatity: number,
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
          gender: true,
          specie: true,
          name: true,
          sickness: true,
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
        quatity: quantity,
        length: queryResult[1].length
      },
      data: queryResult[1].map(animal => ({
        id: animal.id,
        gender: animal.gender,
        specie: animal.specie,
        name: animal.name,
        addedAt: animal.addedAt,
        sickness: animal.sickness.map(sickness => ({
          id: sickness.sicknessId
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