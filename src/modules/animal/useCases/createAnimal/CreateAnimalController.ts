// Dependencies
import { Request, Response } from "express";

// UseCases
import CreateAnimalUseCase from "./CreateAnimalUseCase.js";


const createAnimalUseCase = new CreateAnimalUseCase();

class CreateAnimalController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const animalData = req.body;

    await createAnimalUseCase.execute({
      ...animalData
    });

    res.sendStatus(201);
  }
}

export default CreateAnimalController;