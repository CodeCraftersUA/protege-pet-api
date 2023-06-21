// Dependencies
import { Response } from "express";
import { RequestWithAuth } from "../../../../models/request.js";

// UseCases
import UpdateAnimalUseCase from "./UpdateAnimalUseCase.js";
import AppError from "../../../../errors/AppError.js";
import { isAnimalFromProtector } from "../../../../utils/validations/isAnimalFromProtector.js";


const updateAnimalUseCase = new UpdateAnimalUseCase();

class UpdateAnimalController {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    if (!req.auth) throw new AppError("Internal server error", 500);

    const { id } = req.params;
    const animalData = req.body;
    const accountId = req.auth.id

    if (!isAnimalFromProtector({ accountId, animalId: id }))
      throw new AppError("Cannot update animal that does not belong to protector", 403);

    const updatedAnimal = await updateAnimalUseCase.execute({
      id: id,
      animal: animalData,
    });

    res.status(201).json(updatedAnimal);
  }
}

export default UpdateAnimalController;