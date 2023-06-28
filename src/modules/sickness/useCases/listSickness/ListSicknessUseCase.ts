// Dependencies
import { AnimalSpecie, PrismaClient } from "@prisma/client";

// Types
import { Sickness } from "../../../../models/sickness";

const prisma = new PrismaClient();

interface params {
  specie?: AnimalSpecie,
  quantity: number,
  offset: number
}

interface ReturnType {
  options: {
    total: number,
    offset: number,
    quantity: number,
    length: number
  },
  data: Sickness[]
}

class ListSicknessUseCase {
  execute = async ({ specie, quantity = 100, offset = 0 }: params): Promise<ReturnType> => {
    const where: any = {
      active: true,
      species: specie ? {
        some: {
          specie
        }
      } : undefined
    }

    const queryResult = await prisma.$transaction([
      prisma.sickness.count({
        where: where
      }),
      prisma.sickness.findMany({
        select: {
          id: true,
          name: true,
          species: {
            select: {
              specie: true
            }
          }
        },
        where: where,
        skip: offset,
        take: quantity,
        orderBy: {
          name: 'asc'
        }
      })
    ]);

    return {
      options: {
        total: queryResult[0],
        length: queryResult[1].length,
        offset: offset,
        quantity: quantity,
      },
      data: queryResult[1].map(sickness => ({
        id: sickness.id,
        name: sickness.name,
        species: sickness.species.map(specie => specie.specie)
      }))
    };
  }
}

export default ListSicknessUseCase;