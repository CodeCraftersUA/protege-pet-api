// Dependencies
import { AnimalSpecie } from "@prisma/client";
import { Request, Response } from "express";

// UseCases
import UpdateSicknessUseCase from "./UpdateSicknessUseCase.js";

const updateSicknessUseCase = new UpdateSicknessUseCase();

class UpdateSicknessController {
  handler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const queryResult = await updateSicknessUseCase.execute({
      id,
      name: name as string | undefined
    });

    res.status(200).json(queryResult);
  }
}

export default UpdateSicknessController;