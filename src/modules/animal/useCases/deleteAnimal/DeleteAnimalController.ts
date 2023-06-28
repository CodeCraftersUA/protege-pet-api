// Dependencies
import { Response } from "express";
import { RequestWithAuth } from "../../../../models/request.js";

// UseCases
import DeleteAnimalUseCase from "./DeleteAnimalUseCase.js";
import AppError from "../../../../errors/AppError.js";
import { isAnimalFromProtector } from "../../../../utils/validations/isAnimalFromProtector.js";


const deleteAnimalUseCase = new DeleteAnimalUseCase();

class DeleteAnimalController {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    if (!req.auth) throw new AppError("Internal server error", 500);

    const { id } = req.params;
    const accountId = req.auth.id

    const animalIsFromProtector = await isAnimalFromProtector({ accountId, animalId: id })
    if (!animalIsFromProtector)
      throw new AppError("Cannot delete animal that does not belong to protector", 403);

    await deleteAnimalUseCase.execute({ id });

    res.sendStatus(200);
  }
}

export default DeleteAnimalController;