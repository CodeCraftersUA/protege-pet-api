// Dependencies
import { Request, Response } from "express";

// UseCases
import DeleteAccountUseCase from "./DeleteAccountUseCase.js";


const deleteAccountUseCase = new DeleteAccountUseCase();

class DeleteAnimalController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await deleteAccountUseCase.execute({ id });

    res.sendStatus(200);
  }
}

export default DeleteAnimalController;