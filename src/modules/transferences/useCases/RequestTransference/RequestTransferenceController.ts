// Dependencies
import { Response } from "express";
import { RequestWithAuth } from "../../../../models/request.js";

// UseCases
import CreateTransferenceUseCase from "./RequestTransferenceUseCase.js";
import AppError from "../../../../errors/AppError.js";

// Utils
import { isAnimalFromProtector } from "../../../../utils/validations/isAnimalFromProtector.js";


const createTransferenceUseCase = new CreateTransferenceUseCase();

class RequestTransferenceController {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    const { animalId, receiverId } = req.body;

    if (!req.auth) throw new AppError("Internal server error", 500);
    if (receiverId === req.auth.id) throw new AppError("Cannot to transfer an animal to yourself", 400);

    if (!await isAnimalFromProtector({ animalId, accountId: req.auth.id }))
      throw new AppError("Cannot transfer an animal you do not possess", 403);

    const newTransference = await createTransferenceUseCase.execute({
      animalId,
      receiverId,
      requesterId: req.auth.id
    });

    res.status(201).json(newTransference);
  }
}

export default RequestTransferenceController;