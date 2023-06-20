// Dependencies
import { AnimalTransference, AnimalTransferenceStatus, PrismaClient } from "@prisma/client";

// Error
import AppError from "../../../../errors/AppError.js";

const prisma = new PrismaClient();

interface params {
  id: string,
  status: AnimalTransferenceStatus
}

class UpdateTransferenceUseCase {
  execute = async ({ id, status }: params): Promise<AnimalTransference> => {
    try {
      const queryResult = await prisma.animalTransference.update({
        data: {
          status
        },
        where: {
          id
        }
      });

      return queryResult;
    } catch (err) {
      if (err?.code === "P2025")
        throw new AppError(`Could not find id ${id}`, 404);

      throw err;
    }
  }
}

export default UpdateTransferenceUseCase;