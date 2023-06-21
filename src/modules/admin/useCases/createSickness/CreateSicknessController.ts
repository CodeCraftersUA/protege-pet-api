// Dependencies
import { Request, Response } from "express";

// UseCases
import CreateSicknessUseCase from "./CreateSicknessUseCase.js";

const createSicknessUseCase = new CreateSicknessUseCase();

class CreateAccountController {
  handler = async (req: Request, res: Response) => {
    const sicknessData = req.body;

    const queryResult = await createSicknessUseCase.execute({
      ...sicknessData,
    });

    res.status(201).json(queryResult);
  }
}

export default CreateAccountController;