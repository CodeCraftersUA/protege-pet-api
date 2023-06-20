// Dependencies
import { AnimalTransference, AnimalTransferenceStatus, PrismaClient } from '@prisma/client';

// Helpers
import generateUniqueId from '../../../../helpers/generateUniqueId.js';
import AppError from '../../../../errors/AppError.js';

interface params {
  requesterId: string,
  animalId: string,
  receiverId: string
}

const prisma = new PrismaClient();

class RequestTransferenceUseCase {
  execute = async ({ requesterId, animalId, receiverId }: params): Promise<AnimalTransference> => {
    const transferenceExistsAndIsWaitingApproval = await prisma.animalTransference.count({
      where: {
        animalId,
        status: AnimalTransferenceStatus.WAITING_APPROVAL
      }
    });

    if (transferenceExistsAndIsWaitingApproval) {
      throw new AppError("Animal cannot be transfered while another transference is active", 400);
    }

    const queryResult = await prisma.animalTransference.create({
      data: {
        id: generateUniqueId(),
        animalId: animalId,
        status: AnimalTransferenceStatus.WAITING_APPROVAL,
        requesterId: requesterId,
        receiverId: receiverId
      }
    });

    return queryResult;
  }
}

export default RequestTransferenceUseCase;