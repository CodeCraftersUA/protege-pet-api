// Dependencies
import { Response } from "express";

// Errors
import AppError from "../../../../errors/AppError.js";

// UseCases
import ListTransferenceUseCase from "./ListTransferenceUseCase.js";

// Helpers
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";

// Types
import { RequestWithAuth } from "../../../../models/request.js";
import { isAnimalTransferenceStatus } from "../../../../utils/validations/isAnimalTransferenceStatus.js";
import { AnimalTransferenceStatus } from "@prisma/client";


const listTransferenceUseCase = new ListTransferenceUseCase();

class ListTransferenceController {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    if (!req.auth) throw new AppError("Internal server error", 500);

    const { offset, quantity } = getOffsetAndQuantity(req);
    const { receiverId, requesterId, animalId, status } = req.query;

    if (receiverId && typeof receiverId !== "string") throw new AppError("Invalid receiverId", 400);
    if (requesterId && typeof requesterId !== "string") throw new AppError("Invalid requesterId", 400);
    if (animalId && typeof animalId !== "string") throw new AppError("Invalid animalId", 400);
    if (status && typeof status !== "string") throw new AppError("Invalid status", 400);
    if (status && !isAnimalTransferenceStatus(status)) throw new AppError("Invalid status", 400);

    const animals = await listTransferenceUseCase.execute({
      accountId: req.auth.id,
      offset,
      quantity,
      receiverId,
      requesterId,
      animalId,
      status: status as AnimalTransferenceStatus
    });

    res.status(200).json(animals);
  }
}

export default ListTransferenceController;