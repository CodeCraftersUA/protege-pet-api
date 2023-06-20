// Dependencies
import { PrismaClient } from "@prisma/client";

interface params {
  transferenceId: string,
}

const prisma = new PrismaClient();

export const doesTransferenceCanBeUpdated = async ({ transferenceId }: params): Promise<boolean> => {
  try {
    const queryResult = await prisma.animalTransference.findUniqueOrThrow({
      where: {
        id: transferenceId,
      }
    });

    const updatefulStatus = ["WAITING_APPROVAL"];

    if (!updatefulStatus.includes(queryResult.status))
      return false;

    return true
  } catch (err) {
    return false;
  }
}