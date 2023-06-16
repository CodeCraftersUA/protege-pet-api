// Dependencies
import { PrismaClient } from "@prisma/client";

interface params {
  animalId: string,
  accountId: string,
}

const prisma = new PrismaClient();

export const isAnimalFromProtector = async ({ accountId, animalId }: params): Promise<boolean> => {
  const queryResult = await prisma.animal.count({
    where: {
      id: animalId,
      active: true,
      owner: accountId,
    }
  })


  if (queryResult) return true;
  return false;
}