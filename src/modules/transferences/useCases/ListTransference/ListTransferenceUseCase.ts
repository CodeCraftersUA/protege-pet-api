// Dependencies
import { AnimalTransference, AnimalTransferenceStatus, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface params {
  accountId: string,
  quantity: number,
  offset: number,
  animalId?: string,
  receiverId?: string,
  requesterId?: string,
  status?: AnimalTransferenceStatus
}

interface ReturnType {
  options: {
    total: number,
    offset: number,
    quantity: number,
    length: number
  },
  data: AnimalTransference[]
}

class ListTransferenceUseCase {
  execute = async ({ accountId, quantity, offset, animalId, receiverId, requesterId, status }: params): Promise<ReturnType> => {
    const queryResult = await prisma.$transaction([
      prisma.animalTransference.count({
        where: {
          status: {
            not: AnimalTransferenceStatus.CANCELED
          }
        }
      }),
      prisma.animalTransference.findMany({
        where: {
          OR: [
            {
              receiverId: {
                equals: accountId
              },
            },
            {
              requesterId: {
                equals: accountId
              },
            }
          ],
          receiverId,
          requesterId,
          animalId,
          status: {
            not: AnimalTransferenceStatus.CANCELED,
            equals: status
          }
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
      data: queryResult[1]
    }
  }
}

export default ListTransferenceUseCase;