// Dependencies
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const animalExists = async (animalId: string): Promise<boolean> => {
  const queryResult = await prisma.animal.count({
    where: {
      id: animalId,
      active: true
    }
  });

  if (queryResult)
    return true;

  return false;
};

export default animalExists;