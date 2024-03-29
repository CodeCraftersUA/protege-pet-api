// Dependencies
import { Response } from "express";
import { RequestWithAuth } from "../../../../models/request.js";

// UseCases
import CreateAnimalUseCase from "./CreateAnimalUseCase.js";
import AppError from "../../../../errors/AppError.js";


const createAnimalUseCase = new CreateAnimalUseCase();

class CreateAnimalController {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    if (!req.auth) throw new AppError("Internal server error", 500);

    const animalData = req.body;

    const createdAnimal = await createAnimalUseCase.execute({
      animal: animalData,
      accountId: req.auth.id
    });

    res.status(201).json(createdAnimal);
  }
}

export default CreateAnimalController;