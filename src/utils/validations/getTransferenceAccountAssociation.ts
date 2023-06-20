// Dependencies
import { PrismaClient } from "@prisma/client";

interface params {
  transferenceId: string,
  accountId: string,
}

const prisma = new PrismaClient();

export const getTransferenceAccountAssociation = async ({ accountId, transferenceId }: params): Promise<"RECEIVER" | "REQUESTER" | null> => {
  try {
    const queryResult = await prisma.animalTransference.findUniqueOrThrow({
      where: {
        id: transferenceId,
      }
    });

    if (queryResult.receiverId === accountId)
      return "RECEIVER";

    if (queryResult.requesterId === accountId)
      return "REQUESTER";

    return null;
  } catch (err) {
    return null;
  }
}